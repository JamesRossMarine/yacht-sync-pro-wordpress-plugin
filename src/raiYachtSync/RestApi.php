<?php

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
		        'callback' => [$this, 'yacht_dropdown_options'],
		        'methods'  => [WP_REST_Server::CREATABLE],
		        'permission_callback' => '__return_true',
		        'args' => array(
		            'labels' => array(
		                'required' => false,
		                'default' => [],
		            ),
		        )
		    ) );

		    register_rest_route( 'raiys', '/list-options', array(
		        'callback' => [$this, 'yacht_list_options'],
		        'methods'  => [WP_REST_Server::CREATABLE],
		        'permission_callback' => '__return_true',
		        'args' => array(
		            'labels' => array(
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

		    register_rest_route( 'raiys', '/yacht-pdf-loader', array(
		        'callback' => [$this, 'yacht_pdf_loader'],
		        'methods'  => [WP_REST_Server::READABLE, WP_REST_Server::CREATABLE],
		        'permission_callback' => '__return_true',
		        'args' => array(
		            
		        )
		    ) );

		    register_rest_route( 'raiys', '/yacht-pdf-download', array(
		        'callback' => [$this, 'yacht_pdf_download'],
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
				'post_type' => 'rai_yacht',
				'posts_per_page' => 12,
			];

			$yArgs=array_merge($yArgs, $request->get_params());

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

					$meta2['_link']=get_permalink($yachts_query->post->ID);
				
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
				AND pmm.meta_value != 'Sold' AND pmm.meta_value != 'Suspend'
				ORDER BY pm.meta_value ASC
				", $key, $status, $type ) );

			return $res;
		}

	   	public function yacht_dropdown_options(WP_REST_Request $request) {

	   		$labels = $request->get_param('labels');

	   		$labelsToMetaField = [
	   			"Builders" => "MakeString",
	   			"HullMaterials" => "BoatHullMaterialCode"
	   		];

	   		$return = get_transient('rai_yacht_dropdown_options_'.join('_', $labels));

			if (! $return) {
				$return = [];

				foreach ($labels as $label) {
					$return[ $label ] = $this->get_unique_yacht_meta_values( $labelsToMetaField[ $label ], 'rai_yacht');
				}
	
				set_transient('rai_yacht_dropdown_options_'.join('_', $labels), $return, 4 * HOUR_IN_SECONDS);
			}

	   		return $return; 

	   }

	   public function yacht_list_options(WP_REST_Request $request) {

	   		$labels = $request->get_param('labels');

	   		$labelsKey=[
	   			'Keywords' => function() {
	   				$makes=$this->get_unique_yacht_meta_values('MakeString', 'rai_yacht');
	   				//$years=$this->get_unique_yacht_meta_values('ModelYear', 'rai_yacht');
	   				$models=$this->get_unique_yacht_meta_values('Model', 'rai_yacht');
	   				$boat_names=$this->get_unique_yacht_meta_values('BoatName', 'rai_yacht');
	   				//$lengths=$this->get_unique_yacht_meta_values('LengthOverall', 'rai_yacht');

	   				$list = array_merge($makes, $models, $boat_names);

	   				$list = array_filter($list, function($item) {
	   					return (! is_numeric($item));
	   				});

	   				$list=array_values($list);

	   				return $list;

	   			}

	   		];

	   		$return = get_transient('rai_yacht_list_options_'.join('_', $labels));

			if (! $return){
				foreach ($labels as $label) {
					$return[ $label ] = $labelsKey[ $label ]();
				}
				set_transient('rai_yacht_list_options'.join('_', $labels), $return, 4 * HOUR_IN_SECONDS);
			}

	   		return $return;
	   }

	   public function yacht_pdf_loader(WP_REST_Request $request) {

	   		if ($request->get_param('yacht_post_id') != '') {
	   			header('Content-Type: text/html; charset=UTF-8');

	   			$file_to_include=RAI_YS_PLUGIN_TEMPLATES_DIR.'/pdf-loader.php';

		    	include apply_filters('rai_ys_yacht_pdf_loader_template', $file_to_include);

	   		}
	   		else {
				return ['success' => 'No YACHT ID'];
			}

	   }

	   public function yacht_pdf(WP_REST_Request $request) {

			if ($request->get_param('yacht_post_id') != '') {
	
				$yacht_post_id = $request->get_param('yacht_post_id');

				// ----------------------

				header('Content-Type: text/html; charset=UTF-8');

				$file_to_include=RAI_YS_PLUGIN_TEMPLATES_DIR.'/pdf.php';

		    	include apply_filters('rai_ys_yacht_pdf_template', $file_to_include);
		    	
			}
			else {
				return ['success' => 'No YACHT ID'];
			}

	   }

	   public function yacht_pdf_download(WP_REST_Request $request) {

			if ($request->get_param('yacht_post_id') != '') {
	
				$yacht_post_id = $request->get_param('yacht_post_id');

				$yacht_p = get_post($yacht_post_id);

				// ----------------------

				header('Content-Type: application/pdf; charset=UTF-8; ');
				header('Content-Disposition: inline; filename='.$yacht_p->post_title.'.pdf');

				$apiCall = wp_remote_get("https://api.urlbox.io/v1/0FbOuhgmL1s2bINM/pdf?&url=". get_rest_url() ."raiys/yacht-pdf?yacht_post_id=". $request->get_param('yacht_post_id'), ['timeout' => 300]);

				echo $apiCall['body'];

		    	
			}
			else {
				return ['success' => 'No YACHT ID'];
			}

	   } 


	}