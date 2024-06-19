<?php
    #[AllowDynamicProperties]
	
	class raiYachtSync_ImportRuns_JsonImport {

		public function __construct($metakey = 'boats_com_api_brokerage_key') {

			$this->options = new raiYachtSync_Options();

			$this->LocationConvert = new raiYachtSync_LocationConvert();

			$this->BrochureCleanUp = new raiYachtSync_BrochureCleanUp();

			$this->ChatGPTYachtDescriptionVersionTwo = new raiYachtSync_ChatGPTYachtDescriptionVersionTwo();

			$this->opt_prerender_brochures=$this->options->get('prerender_brochures');

			$this->euro_c_c = floatval($this->options->get('euro_c_c'));
			$this->usd_c_c = floatval($this->options->get('usd_c_c'));

			$this->urlbox_secret_key = $this->options->get('pdf_urlbox_api_secret_key');

			$this->CarryOverKeys = [
				'_yoast_wpseo_title',
				'_yoast_wpseo_metadesc'
			];

		}
		
		public function run() {
			global $wpdb;

			var_dump('Started Json Import');

            $json_yacht_data_folder = WP_CONTENT_DIR . '/ysp_json_data';

            if(is_dir($json_yacht_data_folder)) {
                if(file_exists($json_yacht_data_folder . '/ysp_yacht_data.json')) {
                    $new_yacht_data_file = fopen($json_yacht_data_folder . '/ysp_yacht_data.json', 'r');

                    if($new_yacht_data_file) {
                        fclose($new_yacht_data_file);
                    }
                }
            }

            if (isset($new_yacht_data_file)) {  

                $yachts = json_decode(file_get_contents($json_yacht_data_folder . '/ysp_yacht_data.json'), true);

                foreach ($yachts as $boat) {

                    $boat = (array) $boat;

                    $record = $boat;

                    $boatC = json_decode(json_encode($boat));
                    
                    $find_post=get_posts([
	                    'post_type' => 'syncing_rai_yacht',
	                    'meta_query' => [

	                        array(
	                           'key' => 'DocumentID',
	                           'value' => $boat['DocumentID'],
	                           'compare' => '=',
	                       )
	                    ],
	                ]);       

	                if (! isset($find_post[0]->ID)) {
			            if (! empty($record['BoatHullID'])) {
			                $find_post=get_posts([
			                    'post_type' => 'syncing_rai_yacht',
			                    'meta_query' => [

			                        array(
			                           'key' => 'BoatHullID',
			                           'value' => $record['BoatHullID'],
			                           'compare' => '=',
			                       )
			                    ],
			                ]);
			            }
			            else {
			                $find_post=[];
			            }
		           	}
		           	
					$find_post_from_synced=get_posts([
	                    'post_type' => 'rai_yacht',
	                    'meta_query' => [
	                        array(
	                           'key' => 'DocumentID',
	                           'value' => $boat['DocumentID'],
	                           'compare' => '=',
	                       )
	                    ],
	                ]);

		           	if (! isset($find_post_from_synced[0]->ID)) {
			            if (! empty($record['BoatHullID'])) {
			                $find_post_from_synced=get_posts([
			                    'post_type' => 'rai_yacht',
			                    'meta_query' => [

			                        array(
			                           'key' => 'BoatHullID',
			                           'value' => $record['BoatHullID'],
			                           'compare' => '=',
			                       )
			                    ],
			                ]);
			            }
			            else {
			                $find_post_from_synced=[];
			            }
		           	}	        	         
					
	                $pdf_still_e = false;
	                $yacht_updated = false;

	                if (isset($find_post_from_synced[0]->ID)) {
	                	$synced_post_id = $find_post_from_synced[0]->ID;

		                $synced_pdf = get_post_meta($synced_post_id, 'YSP_PDF_URL', true);

		                $saved_last_mod_date = get_post_meta($synced_post_id, 'LastModificationDate', true);
		                $current_last_mod_date = $boatC->LastModificationDate;
		                
						// carry overs
						foreach ($this->CarryOverKeys as $metakey) {
							$val = get_post_meta($synced_post_id, $metakey, true);
							$boatC->{$metakey} = $val;
						}
	                }

		            $post_id=0;

		            if (isset($find_post_from_synced[0]->ID) && $yacht_updated) {
		                $post_id=$find_post_from_synced[0]->ID;

		                $wpdb->delete(
		                	$wpdb->postmeta, 
		                	[
		                		'post_id' => $find_post_from_synced[0]->ID
		                	], 
		                	['%d']
		                );
		            }
		            elseif (isset($find_post[0]->ID)) {
		                $post_id=$find_post[0]->ID;

		                $wpdb->delete($wpdb->postmeta, ['post_id' => $find_post[0]->ID], ['%d']);
		            }

                    $y_post_id=wp_insert_post(
		            	apply_filters('raiys_yacht_post', 
		            		[
			                    'ID' => $post_id,
								'post_type' => 'syncing_rai_yacht',
								'post_title' =>  addslashes( $boat['ModelYear'].' '.$boat['MakeString'].' '.$boat['Model'].' '.$boat['BoatName']),
								
								'post_name' => sanitize_title(
									$boat['ModelYear'].'-'.$boat['MakeString'].'-'.$boat['Model']
								),

								'post_content' => join(' ', $boatC->GeneralBoatDescription),
								'post_status' => 'publish',

								'meta_input' => apply_filters('raiys_yacht_meta_sync', $boatC),
							],
							$boatC
						)
					);

					wp_set_post_terms($y_post_id, $boat['BoatClassCode'], 'boatclass', false);

                }

                return ['success' => 'successfull imported json data.'];
                
            }
            else {
                return ['error' => 'Error json did not exist'];
            }

			//var_dump($yachtsSynced);

		}


	}