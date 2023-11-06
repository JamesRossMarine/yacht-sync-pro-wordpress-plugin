<?php
	
	class raiYachtSync_ImportRuns_GlobalBoatsCom {
   		protected $limit = 153;
	
		// Testing URL
		//public $globalInventoryUrl = 'https://services.boats.com/pls/boats/search?fields=ModelYear,MakeString,Model,BoatName,DocumentID,NominalLength,BoatClassCode&key=';
		
   		// PRODUCTION URL
		public $globalInventoryUrl = 'https://services.boats.com/pls/boats/search?fields=SalesStatus,MakeString,Model,ModelYear,BoatCategoryCode,SaleClassCode,StockNumber,BoatLocation,BoatName,BoatClassCode,BoatHullMaterialCode,BoatHullID,DesignerName,RegistrationCountryCode,NominalLength,LengthOverall,BeamMeasure,MaxDraft,BridgeClearanceMeasure,DryWeightMeasure,Engines,CruisingSpeedMeasure,RangeMeasure,AdditionalDetailDescription,DriveTypeCode,MaximumSpeedMeasure,FuelTankCountNumeric,FuelTankCapacityMeasure,WaterTankCountNumeric,WaterTankCapacityMeasure,HoldingTankCountNumeric,HoldingTankCapacityMeasure,CabinsCountNumeric,SingleBerthsCountNumeric,DoubleBerthsCountNumeric,TwinBerthsCountNumeric,HeadsCountNumeric,GeneralBoatDescription,AdditionalDetailDescription,EmbeddedVideoPresent,Videos,Images,NormPrice,Price,CompanyName,SalesRep,DocumentID,BuilderName,IMTTimeStamp,PlsDisclaimer&key=';

		public function __construct() {

			$this->options = new raiYachtSync_Options();

			$this->LocationConvert = new raiYachtSync_LocationConvert();

			$this->key=$this->options->get('boats_com_api_global_key');

			$this->globalInventoryUrl .= $this->key;

			$this->euro_c_c = intval($this->options->get('euro_c_c'));
			$this->usd_c_c = intval($this->options->get('usd_c_c'));
			
		}

		public function run() {
			global $wpdb;
			
			$offset = 0;
			$yachtsSynced = 0;

			// Sync broker inventory
			$apiCall = wp_remote_get($this->globalInventoryUrl, ['timeout' => 300]);

				$apiCall['body']=json_decode($apiCall['body'], true);

	        $total = $apiCall['body']['data']['numResults'];

	        $errors = new WP_Error();

	        //var_dump($total);

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

				if (count( $apiCallInventory ) == 0) {
					break;
				}

				foreach ($apiCallInventory as $boat) {
					$yachtsSynced++;

					$record=$boat;
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
                        $reducedImages = array_slice($boat['Images'], 0, 100);

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
						$boatC->YSP_Length = ((int) $boat['NominalLength']);
					}

	                if (isset($boat['BoatLocation'])) {
	                    $boatC->YSP_City = $boat['BoatLocation']['BoatCityName'];
	                    $boatC->YSP_CountryID = $boat['BoatLocation']['BoatCountryID'];
	                    $boatC->YSP_State = $boat['BoatLocation']['BoatStateCode'];

	                    $boatC->YSP_Full_Country = $this->LocationConvert->country[ $boatC->YSP_CountryID ];
	                    $boatC->YSP_Full_State = $this->LocationConvert->state[ $boatC->YSP_State ];
                    }

					if (isset($boat['Engines'])) {
						$boatC->YSP_EngineCount = count($boat['Engines']);
						if (isset($boat['Engines'][0]['Model'])){
							$boatC->YSP_EngineModel = $boat['Engines'][0]['Model'];
						}
						if (isset($boat['Engines'][0]['Fuel'])){
							$boatC->YSP_EngineFuel = $boat['Engines'][0]['Fuel'];
						}
						if (isset($boat['Engines'][0]['EnginePower'])){
							$boatC->YSP_EnginePower = $boat['Engines'][0]['EnginePower'];
						}
						if (isset($boat['Engines'][0]['Hours'])){
							$boatC->YSP_EngineHours = $boat['Engines'][0]['Hours'];
						}
						if (isset($boat['Engines'][0]['Type'])){
							$boatC->YSP_EngineType = $boat['Engines'][0]['Type']; 
						}
					}

					if (isset($boat['Images'][0]['LastModifiedDateTime'])){
						$boatC->YSP_ListingDate = $boat['Images'][0]['LastModifiedDateTime'];
					}


					if (isset($boat['OriginalPrice']) && isset($boat['Price'])){
						if (str_contains($boat['OriginalPrice'], 'EUR')) {
							$boatC->YSP_EuroVal = intval(str_replace(array(' EUR'), '', $boat['OriginalPrice']) );
							$boatC->YSP_USDVal = $boatC->YSP_EuroVal * $this->usd_c_c;

						} else {
							$boatC->YSP_USDVal = intval(str_replace(array(' USD'), '', $boat['OriginalPrice']));
							$boatC->YSP_EuroVal = $boatC->YSP_USDVal * $this->euro_c_c;
						}
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

		            //if ( defined( 'WP_CLI' ) && WP_CLI ) {
                        if (is_wp_error($y_post_id)) {
                            //var_dump( 'Document ID - '. $boat['DocumentID']);

                            //var_dump($boat);
                        }
                    //}

				}

				$offset = $offset + $this->limit;
			
				if ($yachtsSynced != $offset) {
					$total = $apiCallForWhile['body']['data']['numResults'];
				}

			}

			//var_dump($offset);
			//var_dump($total);
			//var_dump($yachtsSynced);



		}


	}