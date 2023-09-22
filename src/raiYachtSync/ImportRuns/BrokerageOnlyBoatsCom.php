<?php
	class raiYachtSync_ImportRuns_BrokerageOnlyBoatsCom {
   		protected $limit = 53;
		
		public $brokerageInventoryUrl = 'https://api.boats.com/inventory/search?key=';

		public function __construct() {

			$this->options = new raiYachtSync_Options();

			$this->key=$this->options->get('boats_com_api_brokerage_key');

			$this->brokerageInventoryUrl .= $this->key;

		}
		
		public function run() {
			global $wpdb;

			$offset = 0;
			$yachtsSynced = 0;

			// Sync broker inventory
			$apiCall = wp_remote_get($this->brokerageInventoryUrl, ['timeout' => 300]);

				$apiCall['body']=json_decode($apiCall['body'], true);

	        $total = $apiCall['body']['numResults'];

			//$apiCallInventory = $apiCall['body']['results'];

			//var_dump($total);

			while ($total > ($yachtsSynced)) {

				$apiUrl = $this->brokerageInventoryUrl;

				$apiUrl = $apiUrl.'&start='. $offset .'&rows='. $this->limit;

				// Sync broker inventory
				$apiCallForWhile = wp_remote_get($apiUrl, ['timeout' => 300]);

				//var_dump($apiCallForWhile);

				$apiCallForWhile['body']=json_decode($apiCallForWhile['body'], true);	

				$apiCallInventory = $apiCallForWhile['body']['results'];

				foreach ($apiCallInventory as $boat) {
					$yachtsSynced++;
					$record=$boat;
					$boatC = json_decode(json_encode($boat));

					//$boatC->CompanyName = 'Italian Yacht Group';
					
		            $find_post=get_posts([
	                    'post_type' => 'rai_yacht',
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
			                $find_post=[];
			            }
		           	}
		           	
		            $post_id=0;

		            if (isset($find_post[0]->ID)) {
		                $post_id=$find_post[0]->ID;

		                $wpdb->delete($wpdb->postmeta, ['post_id' => $find_post[0]->ID], ['%d']);
		            }

		            if (isset($boat['Images']) && is_array($boat['Images']) && count($boat['Images']) > 0) {
                        $reducedImages = array_slice($boat['Images'], 0, 50);
                        
                        $reducedImages = array_map(
                        	function($img) {
                        		$reimg=[
                        			'Uri' => $img['Uri']
                        		];

                        		if (! empty($img['Caption'])) {
                        			$reimg['Caption']=$img['Caption'];
                        		}

                        		return (object) $reimg;
                        	}, 
                        	$reducedImages
                        );

                        $boatC->Images = $reducedImages;
                    }

					if (isset($boat['NominalLength'])) {
						$boatC->YSP_Length = (int) $boat['NominalLength'];
					}

		            if (isset($boat['BoatLocation'])) {
	                    $boatC->YSP_CountryID = $boat['BoatLocation']['BoatCountryID'];
	                    $boatC->YSP_City = $boat['BoatLocation']['BoatCityName'];
	                    $boatC->YSP_State = $boat['BoatLocation']['BoatStateCode'];
                    }

                    if (isset($boat['SalesRep'])) {
                    	$boatC->YSP_BrokerName=$boat['SalesRep']['Name'];
                    }
                    
					if (isset($boatC->AdditionalDetailDescription)) {
						foreach ($boatC->AdditionalDetailDescription as $aIndex => $description) {
							$boatC->AdditionalDetailDescription[ $aIndex ] = preg_replace('/(<[^>]+) style=".*?"/i', '$1', $description);
						}
	                }

					if (isset($boatC->GeneralBoatDescription)) {
						foreach ($boatC->GeneralBoatDescription as $gIndex => $description){
							$boatC->GeneralBoatDescription[ $gIndex ] = preg_replace('/(<[^>]+) style=".*?"/i', '$1', $description);
						}
					}

					$boatC->rai_non_syncing_vessel = '0';
					$boatC->CompanyBoat = true;
					
		            $y_post_id=wp_insert_post(
		                [
		                    'ID' => $post_id,
							'post_type' => 'rai_yacht',
							
							'post_title' => addslashes(  $boat['ModelYear'].' '.$boat['MakeString'].' '.$boat['Model'].' '.$boat['BoatName'] ),
							
							'post_name' => sanitize_title(
								$boat['ModelYear'].'-'.$boat['MakeString'].'-'.$boat['Model']
							),
							'post_content' => join(' ', $boatC->GeneralBoatDescription),
							'post_status' => 'publish',
							'meta_input' => apply_filters('raiys_yacht_meta_sync', $boatC),

						]
					);

					wp_set_post_terms($y_post_id, $boat['BoatClassCode'], 'boatclass', false);
					
					/*if ( defined( 'WP_CLI' ) && WP_CLI ) {
                        if (is_wp_error($y_post_id)) {
                            WP_CLI::log( 'Document ID - '. $boat['DocumentID']);

                            var_dump($boat);
                        }
                    }*/



				}

				$offset = $offset + $this->limit;



			}

			//var_dump($yachtsSynced);

		}


	}