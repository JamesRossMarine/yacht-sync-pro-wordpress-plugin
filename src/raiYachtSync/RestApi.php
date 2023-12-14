<?php

	class raiYachtSync_RestApi {

		public function __construct() {

			$this->options = new raiYachtSync_Options();
			$this->db_helper = new raiYachtSync_DBHelper();

			$this->RunImports = new raiYachtSync_RunImports();
			
			$this->SearchSEO = new raiYachtSync_SearchSEO();

			$this->Stats = new raiYachtSync_Stats();

		}

		public function add_actions_and_filters() {

			add_action('rest_api_init', [$this, 'register_rest_routes']);
			add_filter( 'wp_mail_content_type', [$this, 'wp_mail_set_content_type'] );

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
			
			register_rest_route( 'raiys', '/set-yacht-pdf', array(
		        'callback' => [$this, 'set_yacht_pdf'],
		        'methods'  => [WP_REST_Server::READABLE, WP_REST_Server::CREATABLE],
		        'permission_callback' => '__return_true',
		        'args' => array(
		            
		        )
		    ) );

		    register_rest_route( 'raiys', '/checker-yacht-pdf', array(
		        'callback' => [$this, 'checker_yacht_pdf'],
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
			register_rest_route( 'raiys', '/yacht-leads', array(
		        'callback' => [$this, 'yacht_leads'],
		        'methods'  => [WP_REST_Server::READABLE, WP_REST_Server::CREATABLE],
		        'permission_callback' => '__return_true',
		        'args' => array(
		            
		        )
		    ) );
			register_rest_route( 'raiys', '/broker-leads', array(
		        'callback' => [$this, 'broker_leads'],
		        'methods'  => [WP_REST_Server::READABLE, WP_REST_Server::CREATABLE],
		        'permission_callback' => '__return_true',
		        'args' => array(
		            
		        )
		    ) );

			register_rest_route( 'raiys', '/compare', array(
		        'callback' => [$this, 'compare_yachts'],
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

			$r_params=$request->get_params();

			foreach ($r_params as $rIndex => $p) {
				if (is_array($p)) {
					if (! isset($p[1])) {
						$r_params[ $rIndex ] = $p[0];
					}
				}
			}
			

			$yArgs=array_merge($yArgs, $r_params);

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

			$return['query'] = $yachts_query->query_vars;

			$return['SEO'] = $this->SearchSEO->all_together( $yArgs );

			$return['stats'] = $this->Stats->run( $yArgs );
			
			return $return;

	    }

		function compare_yachts(WP_REST_Request $request) {
			$ids = $request->get_param('postID');
		
			$ids_array = explode(',', $ids);
			$boats = array(); 
		
			foreach ($ids_array as $id) {
				$boat = get_post($id);

				if ($boat) {
					$boats[] = $boat; 
				}
			}

			header('Content-Type: text/html; charset=UTF-8');
		
			$file_to_include = RAI_YS_PLUGIN_TEMPLATES_DIR.'/compare-yachts.php';
		
			include apply_filters('rai_ys_yacht_compare_yachts', $file_to_include);

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
					$return[ $label ] = $this->db_helper->get_unique_yacht_meta_values( $labelsToMetaField[ $label ] );
				}
	
				set_transient('rai_yacht_dropdown_options_'.join('_', $labels), $return, 4 * HOUR_IN_SECONDS);
			}

	   		return $return; 

	   }

	   public function yacht_list_options(WP_REST_Request $request) {

	   		$labels = $request->get_param('labels');

	   		$labelsKey=[
	   			'Keywords' => function() {
	   				$makes=$this->db_helper->get_unique_yacht_meta_values('MakeString');

	   				//$years=$this->get_unique_yacht_meta_values('ModelYear', 'rai_yacht');
	   				
	   				$models=$this->db_helper->get_unique_yacht_meta_values('Model');
	   				$boat_names=$this->db_helper->get_unique_yacht_meta_values('BoatName');
	   				
	   				//$lengths=$this->get_unique_yacht_meta_values('LengthOverall', 'rai_yacht');

	   				$list = array_merge($makes, $models, $boat_names);

	   				$list = array_filter($list, function($item) {
	   					return (! is_numeric($item));
	   				});

	   				$list=array_values($list);

	   				return $list;

	   			},

	   			'Cities' => function() {

	   				$list = $this->get_unique_yacht_meta_values('YSP_City');

	   				return $list;

	   			},

	   			'DisplayedLocation' => function() {

	   				global $wpdb;
				
					$res = $wpdb->get_col( $wpdb->prepare( "
						SELECT DISTINCT IF(pmmm.meta_value='US' OR pmmm.meta_value='US', CONCAT(pm.meta_value, ', ', pmmmm.meta_value), CONCAT(pm.meta_value, ', ', pmmm.meta_value)) FROM {$wpdb->postmeta} pm
						LEFT JOIN {$wpdb->posts} p ON p.ID = pm.post_id
						INNER JOIN {$wpdb->postmeta} pmm ON pmm.post_id = pm.post_id
						INNER JOIN {$wpdb->postmeta} pmmm ON pmmm.post_id = pm.post_id
						INNER JOIN {$wpdb->postmeta} pmmmm ON pmmmm.post_id = pm.post_id
						WHERE pm.meta_key = 'YSP_City' 
						AND pmmm.meta_key = 'YSP_CountryID'  
						AND pmmmm.meta_key = 'YSP_State'  
						AND p.post_status = '%s'
						AND p.post_type = '%s' 
						AND pmm.meta_key = 'SalesStatus' 
						AND pmm.meta_value != 'Sold'
						AND LENGTH(pm.meta_value) > 1
						ORDER BY pm.meta_value ASC
						", 'publish', 'rai_yacht' ) );

					return $res;

	   			},

	   		];

	   		$return = get_transient('rai_yacht_list_options_'.join('_', $labels));

			if (! $return){
				foreach ($labels as $label) {
					if (is_callable($labelsKey[ $label ])) {
						$return[ $label ] = $labelsKey[ $label ]();
					}
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

	   public function set_yacht_pdf(WP_REST_Request $request) {

			if ($request->get_param('yacht_post_id') != '') {
	
				$yacht_post_id = $request->get_param('yacht_post_id');

				$body_params = (array) $request->get_params();

				update_post_meta($yacht_post_id, 'YSP_PDF_URL', $body_params['result']['renderUrl']);

				return ['success' => 'joshie was here'];
		    	
			}
			else {
				return ['success' => 'No YACHT ID'];
			}

	   }

	   	public function checker_yacht_pdf(WP_REST_Request $request) {

			if ($request->get_param('yacht_post_id') != '') {
				$yacht_post_id=$request->get_param('yacht_post_id');
	
				$s3_url=get_post_meta($yacht_post_id, 'YSP_PDF_URL', true);

				if (!is_null($s3_url) && !empty($s3_url)) {
					return $s3_url;
				}
				else {
				//	wp_remote_get("https://api.urlbox.io/v1/0FbOuhgmL1s2bINM/pdf?url=". get_rest_url() ."raiys/yacht-pdf?yacht_post_id=". $request->get_param('yacht_post_id'), ['timeout' => 300]);
				}

				return ['success' => 'joshie was here'];
		    	
			}
			else {
				return ['success' => 'No YACHT ID'];
			}

	   }


	   public function yacht_pdf_download(WP_REST_Request $request) {

			if ($request->get_param('yacht_post_id') != '') {
	
				$yacht_post_id = $request->get_param('yacht_post_id');

				$yacht_p = get_post($yacht_post_id);

				$s3_url=get_post_meta($yacht_post_id, 'YSP_PDF_URL', true);

				// ----------------------

				
				if (!is_null($s3_url) && !empty($s3_url)) {
					$apiCall = wp_remote_get($s3_url, [
						'timeout' => 10, 
						'stream' => true, 
						'headers' => [
							'Content-Type'  => 'application/pdf',

						]
					]);
					
					//wp_redirect($s3_url);
					//exit();
				}
				else {
					$apiCall = wp_remote_get(
						"https://api.urlbox.io/v1/0FbOuhgmL1s2bINM/pdf?url=". get_rest_url() ."raiys/yacht-pdf?yacht_post_id=". $request->get_param('yacht_post_id'), 

						[
							'timeout' => 300, 
							'headers' => [
								'Content-Type'  => 'application/pdf',
							]
						]
					);

				}
				//$apiCall = wp_remote_get(get_rest_url() . 'raiys/yacht-pdf-download?yacht_post_id=' . $request->get_param('yacht_post_id'));

				$api_status_code = wp_remote_retrieve_response_code($apiCall);

				if ($api_status_code == '200') {

				}
				else {

				}

				header('Content-Type: application/pdf; charset=UTF-8; ');
				header('Content-Disposition: inline; filename='.$yacht_p->post_title.'.pdf');
				//var_dump($apiCall);
				echo wp_remote_retrieve_body($apiCall);

		    	
			}
			else {
				return ['success' => 'No YACHT ID'];
			}

	   } 

	   public function wp_mail_set_content_type() {
			return 'text/html';
	   }

	  	public function spamChecker($form_data) {

	   		$comment = array(
			    'comment_type' => 'contact-form',
			    
			    'comment_author' => $form_data['fname'].' '.$form_data['lname'],
			    'comment_author_email' => $form_data['email'],

			    'comment_content' => $form_data['message'],

			    'permalink' => $form_data['ReferrerUrl'],

			    'honeypot_field_name' => 'fax',
			    
			    'hidden_honeypot_field' => $form_data['fax'],

			    'fax' => $form_data['fax'],

			);

			// good comment until proven bad
			$akismet = new raiYachtSync_Akismet('4ebc51dc31b7');
			
			if(!$akismet->error) {

			    //Check to see if the key is valid
			    if($akismet->valid_key()) {

				    $results = ['spam_aki' => true, 'error' => 'Please refresh and try again. Spam Key Issue.'];
			    
			    }
			    				    
			    if ($akismet->is_spam($comment)) {

				    $results = ['spam_aki' => true, 'error' => 'Please refresh and try again.'];
			    
			    }
			    else {
				
					$results = ['not_spam_aki' => true];
			    
			    }
			}
			return $results;
	  	}

	   	public function yacht_leads(WP_REST_Request $request) {

			$to = $this->options->get('send_lead_to_this_email');
			
			//$to = 'hauk@jamesrossadvertising.com';
			$fname = $request->get_param('fname');
			$lname = $request->get_param('lname');
			$message = $request->get_param('message');
			$email = $request->get_param('email');
			$phone = $request->get_param('phone');
			$fax = $request->get_param('fax');
			$vesselHidden = $request->get_param('yatchHidden');
			$ReferrerUrl = $_SERVER['HTTP_REFERER'];

			$subject = $fname . " " . $lname . " " . 'submitted an inquiry' ;

			$spamChecker = $this->spamChecker([
				'fname' => $fname,
				'lname' => $lname,
				'message' => $message,
				'email' => $email,
				'phone' => $phone,
				'yachtHidden' => $vesselHidden,	
				'fax' => $fax,
				'ReferrerUrl' => $ReferrerUrl
			]);

			if  ( isset( $spamChecker['not_spam_aki']) && $spamChecker['not_spam_aki'] == true ) {
				$fullMessage = '<!DOCTYPE html><html><body>';
				$fullMessage .= '<h1>' . $subject . '</h1>';
				$fullMessage .= '<p><strong>Vessel:</strong> ' . $vesselHidden . '</p>';
				$fullMessage .= '<p><strong>Page:</strong> ' . $ReferrerUrl . '</p>';
				$fullMessage .= '<p><strong>Name:</strong> ' . "$fname $lname" . '</p>';
				$fullMessage .= '<p><strong>Email:</strong> ' . $email . '</p>';
				$fullMessage .= '<p><strong>Phone:</strong> ' . $phone . '</p>';
				$fullMessage .= '<p><strong>Message:</strong></p>';
				$fullMessage .= '<p>' . nl2br($message) . '</p>'; 
			
				$fullMessage .= '</body></html>';
			
				$headers = array(
					'Content-Type: text/html; charset=UTF-8',
				);
			
				$sent = wp_mail($to, $subject, $fullMessage, $headers);
			
				if ($sent) {
					return array('message' => 'Email sent successfully');
				} else {
					return array('error' => 'Email failed to send');
				}
			}
			else {
				return array('error' => 'Email failed to send');
			}
		}

		public function broker_leads(WP_REST_Request $request) {
		
			$brokerID=$request->get_param('brokerID');
			//$broker=get_post($request->get_param('brokerID'));
			$broker_email = get_post_meta($brokerID, "rai_broker_email", true);

			$to = $broker_email;

			$fname = $request->get_param('fname');
			$lname = $request->get_param('lname');
			$message = $request->get_param('message');
			$email = $request->get_param('email');
			$phone = $request->get_param('phone');
			$fax = $request->get_param('fax');
			$ReferrerUrl = $_SERVER['HTTP_REFERER'];

			$subject = $fname . " " . $lname . " " . 'submitted an inquiry' ;

			$spamChecker = $this->spamChecker([
				'fname' => $fname,
				'lname' => $lname,
				'message' => $message,
				'email' => $email,
				'phone' => $phone,
				'brokerID' => $broker_email,
				'fax' => $fax,
				'ReferrerUrl' => $_SERVER['HTTP_REFERER']
			]);

			if  ( isset( $spamChecker['not_spam_aki']) && $spamChecker['not_spam_aki'] == true ) {
			
				$fullMessage = '<!DOCTYPE html><html><body>';
				$fullMessage .= '<h1>' . $subject . '</h1>';
				$fullMessage .= '<p><strong>Name:</strong> ' . "$fname $lname" . '</p>';
				$fullMessage .= '<p><strong>Page:</strong> ' . $ReferrerUrl . '</p>';
				$fullMessage .= '<p><strong>Email:</strong> ' . $email . '</p>';
				$fullMessage .= '<p><strong>Phone:</strong> ' . $phone . '</p>';
				$fullMessage .= '<p><strong>Message:</strong></p>';
				$fullMessage .= '<p>' . nl2br($message) . '</p>'; 
			
				$fullMessage .= '</body></html>';
			
				$headers = array(
					'Content-Type: text/html; charset=UTF-8',
				);
			
				$sent = wp_mail($to, $subject, $fullMessage, $headers);

				if ($sent) {
					return array('message' => 'Email sent successfully');
				} else {
					return array('error' => 'Email failed to send');
					}
			}
			else {
				return array('error' => 'Email failed to send');
			}
		}
	}