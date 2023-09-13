<?php
	class raiYachtSync_ImportRuns_GlobalBoatsCom {
   		protected $limit = 153;
	
		public $globalInventoryUrl = 'https://services.boats.com/pls/boats/search?fields=SalesStatus,MakeString,Model,ModelYear,BoatCategoryCode,SaleClassCode,StockNumber,BoatLocation,BoatName,BoatClassCode,BoatHullMaterialCode,BoatHullID,DesignerName,RegistrationCountryCode,NominalLength,LengthOverall,BeamMeasure,MaxDraft,BridgeClearanceMeasure,DryWeightMeasure,Engines,CruisingSpeedMeasure,RangeMeasure,AdditionalDetailDescription,DriveTypeCode,MaximumSpeedMeasure,FuelTankCountNumeric,FuelTankCapacityMeasure,WaterTankCountNumeric,WaterTankCapacityMeasure,HoldingTankCountNumeric,HoldingTankCapacityMeasure,CabinsCountNumeric,SingleBerthsCountNumeric,DoubleBerthsCountNumeric,TwinBerthsCountNumeric,HeadsCountNumeric,GeneralBoatDescription,AdditionalDetailDescription,EmbeddedVideoPresent,Videos,Images,NormPrice,Price,CompanyName,SalesRep,DocumentID,BuilderName,IMTTimeStamp,PlsDisclaimer&key=';

		public function __construct() {

			$this->options = new raiYachtSync_Options();

			$this->key=$this->options->get('boats_com_api_global_key');

			$this->globalInventoryUrl .= $this->key;

		}

		public function run() {
			global $wpdb;
			
			$offset = 0;
			$yachtsSynced = 0;

			// Sync broker inventory
			$apiCall = wp_remote_get($this->globalInventoryUrl, ['timeout' => 300]);

				$apiCall['body']=json_decode($apiCall['body'], true);

	        $total = $apiCall['body']['data']['numResults'];

	        //var_dump($total);

			//$apiCallInventory = $apiCall['body']['data']['results'];

			while ($total > $yachtsSynced) {
				$apiUrl = $this->globalInventoryUrl;
				$apiUrl = $apiUrl.'&start='. $offset .'&rows='. $this->limit;

				//var_dump($offset);

				sleep(10);
 
				// Sync broker inventory
				$apiCallForWhile = wp_remote_get($apiUrl, ['timeout' => 300]);

				//var_dump($apiCallForWhile);

				$apiCallForWhile['body']=json_decode($apiCallForWhile['body'], true);	

				$apiCallInventory = $apiCallForWhile['body']['data']['results'];

				foreach ($apiCallInventory as $boat) {
					$yachtsSynced++;

					$record=$boat;
					$boatC = json_decode(json_encode($boat));

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

				  	$url = 'https://services.boats.com/pls/boats/details?id=' . $boat['DocumentID'] . '&key='.$this->key;
					
					$apiCall = wp_remote_get($url, ['timeout' => 300]);

					$response = $apiCall['body'];

						$response=json_decode($response, true);

					$data = $response;

					if (isset($data['data']['PlsDisclaimer'])) {
						$plsDisclaimer = $data['data']['PlsDisclaimer'];

						$newDisclaimer = substr($plsDisclaimer, 3, -4);

						$finalDisclaimer = "We provide this yacht listing in good faith, and although we cannot guarantee its accuracy or the condition of the boat. The " . $newDisclaimer . " She is subject to prior sale, price change, or withdrawal without notice and does not imply a direct representation of a specific yacht for sale.";

					    $boatC->MOD_DIS = $finalDisclaimer;
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

	                if (isset($boat['BoatLocation'])) {
	                    $boatC->YSP_City = $boat['BoatLocation']['BoatCityName'];
	                    $boatC->YSP_CountryID = $boat['BoatLocation']['BoatCountryID'];
	                    $boatC->YSP_State = $boat['BoatLocation']['BoatStateCode'];
                    }

                    // $output = preg_replace('/(<[^>]+) style=".*?"/i', '$1', $input);

		            $y_post_id=wp_insert_post(
		                [
		                    'ID' => $post_id,
							'post_type' => 'rai_yacht',
							'post_title' =>  addslashes( $boat['ModelYear'].' '.$boat['MakeString'].' '.$boat['Model'].' '.$boat['BoatName']),
							
							'post_name' => sanitize_title(
								$boat['ModelYear'].'-'.$boat['MakeString'].'-'.$boat['Model']
							),

							//'post_contnet' => $boat['GeneralBoatDescription'][0],
							
							'post_contnet' => '',
							'post_status' => 'publish',
							'meta_input' => apply_filters('raiys_yacht_meta_sync', $boatC),
						]
					);

					//var_dump($boat['BoatName']);

		            //if ( defined( 'WP_CLI' ) && WP_CLI ) {
                        if (is_wp_error($y_post_id)) {
                            //var_dump( 'Document ID - '. $boat['DocumentID']);

                            //var_dump($boat);
                        }
                    //}

				}

				$offset = $offset + $this->limit;
			
				if ($yachtsSynced != $offset) {
					//echo 'off sync \n';
				}

			}

			//var_dump($offset);
			//var_dump($yachtsSynced);



		}


	}