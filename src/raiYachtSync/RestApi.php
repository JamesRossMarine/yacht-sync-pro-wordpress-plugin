<?php

	require RAI_YS_PLUGIN_DIR .'/lib-dompdf/autoload.inc.php';

   	use Dompdf\Dompdf;

	class raiYachtSync_RestApi {

		public function __construct() {

			$this->RunImports = new raiYachtSync_RunImports();
			
		}

		public function add_actions_and_filters() {

			add_action('rest_api_init', [$this, 'register_rest_routes']);

		}

		public function register_rest_routes() {

			register_rest_route( 'raiys', '/sync', array(
		        'callback' => [$this, 'sync_yachts'],
		        'methods'  => [WP_REST_Server::READABLE],
		        'permission_callback' => '__return_true',
		        'args' => array(
		            
		        )
		    ) );

		    register_rest_route( 'raiys', '/yachts', array(
		        'callback' => [$this, 'yachts'],
		        'methods'  => [WP_REST_Server::READABLE, WP_REST_Server::CREATABLE],
		        'permission_callback' => '__return_true',
		        'args' => array(
		            
		        )
		    ) );

			register_rest_route( 'raiys', '/dropdown-options', array(
		        'callback' => 'ross_yacht_dropdown_options',
		        'methods'  => [WP_REST_Server::READABLE],
		        'permission_callback' => '__return_true',
		        'args' => array(
		            'label' => array(
		                'required' => false,
		                'default' => [],
		            ),
		        )
		    ) );

		    // PDF 
		    register_rest_route( 'raiys', '/yacht-pdf', array(
		        'callback' => [$this, 'yacht_pdf'],
		        'methods'  => [WP_REST_Server::READABLE, WP_REST_Server::CREATABLE],
		        'permission_callback' => '__return_true',
		        'args' => array(
		            
		        )
		    ) );


		}

		public function sync_yachts(WP_REST_Request $request) {

			$this->RunImports->run();

			return ['success' => 'finished sync =)'];

		}

		public function yachts(WP_REST_Request $request) {

			$yArgs = [

			];

			$yachts_query=new WP_Query($yArgs);

			$return = [
				'total' => $yachts_query->found_posts,
				'results' => []
			];

			while ( $yachts_query->have_posts() ) {
				$yachts_query->the_post();

				$meta = get_post_meta($yachts_query->post->ID);

				foreach ($meta as $indexM => $valM) {
					if (is_array($valM) && ! isset($valM[1])) {
						$meta[$indexM] = $valM[0];
					}
				}

				$meta2=array_map("maybe_unserialize", $meta);
				
				$return['results'][] = $meta2;

			}

			wp_reset_postdata();

			return $return;

	    }

	    public function get_unique_yacht_meta_values( $key = 'trees', $type = 'post', $status = 'publish' ) {
			global $wpdb;
			if( empty( $key ) )
				return;
			
			$res = $wpdb->get_col( $wpdb->prepare( "
				SELECT DISTINCT pm.meta_value FROM {$wpdb->postmeta} pm
				LEFT JOIN {$wpdb->posts} p ON p.ID = pm.post_id
				INNER JOIN {$wpdb->postmeta} pmm ON pmm.post_id = pm.post_id
				WHERE pm.meta_key = '%s'
				AND p.post_status = '%s' 
				AND p.post_type = '%s' 
				AND pmm.meta_key = 'SalesStatus' 
				AND pmm.meta_value != 'Sold'
				ORDER BY pm.meta_value ASC
				", $key, $status, $type ) );

			return $res;
		}

	   	public function yacht_dropdown_options(WP_REST_Request $request) {

	   		$return = [
	   			'Builders' => $this->get_unique_yacht_meta_values('MakeString', 'rai_yatch'),

	   			'HullMaterials' => $this->get_unique_yacht_meta_values('BoatHullMaterialCode', 'rai_yatch'),
	   		];

	   		return $return; 

	   }

	   public function yacht_pdf(WP_REST_Request $request) {

			if ($request->get_param('yacht_post_id') != '') {
	
				$yacht_post_id = $request->get_param('yacht_post_id');

				$yacht_post = get_post( $yacht_post_id );

				$meta = get_post_meta( $yacht_post_id );

				foreach ($meta as $indexM => $valM) {
					if (is_array($valM) && ! isset($valM[1])) {
						$meta[$indexM] = $valM[0];
					}
				}

				$meta2=array_map("maybe_unserialize", $meta);

				$filename='yacht-details.pdf';

				// ----------------------

		   		$dompdf = new Dompdf();

		   		ob_start();

		   			include RAI_YS_PLUGIN_TEMPLATES_DIR.'/pdf.php';

		   		$html = ob_get_clean();

				$dompdf->loadHtml($html);

				//$dompdf->setPaper('A4', 'landscape');
				$dompdf->set_paper('A4', 'portrait');

				$dompdf->render();

				$dompdf->stream($filename);
		   
				return ['success' => 'Generated PDF'];

			}

			return ['success' => 'No YACHT ID'];
	   } 


	}