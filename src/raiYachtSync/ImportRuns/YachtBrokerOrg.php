<?php

	class raiYachtSync_ImportRuns_YachtBrokerOrg {
		public $yachtBrokerAPIKey = '';
   		public $yachtClientId = '';
   		protected $url = '';
   		protected $yachtBrokerLimit = 23;

		public function __construct() {

			$this->options = new raiYachtSync_Options();
			$this->LocationConvert = new raiYachtSync_LocationConvert();

			$this->yachtBrokerAPIKey = $this->options->get('yacht_broker_org_api_token');
			$this->yachtClientId = $this->options->get('yacht_broker_org_id');

			$this->euro_c_c = floatval($this->options->get('euro_c_c'));
			$this->usd_c_c = floatval($this->options->get('usd_c_c'));

			$this->opt_prerender_brochures=$this->options->get('prerender_brochures');

			$this->CarryOverKeys = [
				'_yoast_wpseo_title',
				'_yoast_wpseo_metadesc'
			];
		}

		public function run() {
			global $wpdb;

			var_dump('Started Yacht Broker.org Import');

	        $headers = [
	            'headers' => [
	                'X-API-KEY'   => $this->yachtBrokerAPIKey,
	                'X-CLIENT-ID' => $this->yachtClientId
	            ],

	            'timeout' => 120
	        ];

	        $apiUrlOne  = 'https://api.yachtbroker.org/listings?key='.$this->yachtBrokerAPIKey.'&id='. $this->yachtClientId .'&gallery=true&engines=true&generators=true&textblocks=true&media=true&limit='.$this->yachtBrokerLimit;

	        $apiCall = wp_remote_get($apiUrlOne, $headers);

	        $api_status_code = wp_remote_retrieve_response_code($apiCall);

	        $json = json_decode(wp_remote_retrieve_body($apiCall), true);

	        var_dump($api_status_code);
	        var_dump($apiUrlOne);

	        if ($api_status_code == 200 && isset($json['V-Data'])) {
				// return;
			}
			elseif ($api_status_code == 401) {
				return ['error' => 'Error with auth'];
			}
			else {
				return ['error' => 'Error http error '.$api_status_code];
			}

	        $total = $json['total'];
	        $yachtSynced = 0;
	        $page = 1;

	        while ($total > $yachtSynced) {
	        	$apiUrl  = 'https://api.yachtbroker.org/listings?key='.$this->yachtBrokerAPIKey.'&id='. $this->yachtClientId .'&gallery=true&engines=true&generators=true&textblocks=true&media=true&limit='.$this->yachtBrokerLimit;

	        	$apiUrl .='&page='.$page;

		        $apiCallWhile = wp_remote_get($apiUrl, $headers);
		        $apiBody = json_decode($apiCallWhile['body'], true);

		        if (isset($apiBody['next_page_url'])) {
		        	$page++;
		        }

		        if (count($apiBody['V-Data']) == 0) {
		        	break;
		        }

				foreach ($apiBody['V-Data'] as $row) {
		            $yachtSynced++; 
		           	
		           	$theBoat=[
		           		'BoatLocation' => (object) [
		           			'BoatCityName' => $row['City'],
		           			'BoatCountryID' => $this->LocationConvert->filpped_country[ $row['Country'] ],
		           			'BoatStateCode' => $this->LocationConvert->filpped_state[ $row['State'] ]
		           		],

		           		'YSP_City' => $row['City'],
		           		'YSP_CountryID' => $this->LocationConvert->filpped_country[ $row['Country'] ],
		           		'YSP_State' => $this->LocationConvert->filpped_state[ $row['State'] ],

		           		'YSP_Full_Country' => $row['Country'],
		           		'YSP_Full_State' => $row['State'],

		           		'SalesRep' => (object)  [
		           			'PartyId' => $row['ListingOwnerID'],
		           			'Name' => $row['ListingOwnerName'],
		           			'Email' => $row['ListingOwnerEmail'],
		           			'Phone' => $row['ListingOwnerPhone']
		           		],

		           		'YSP_BrokerName' => $row['ListingOwnerName']
		           	];

		           	$MapToBoatOrg=[
		           		'YBDocumentID' => 'ID',
		  				'SalesStatus' => 'Status',
		                'SaleClassCode' => 'Condition',
		                'CompanyName' => 'ListingOwnerBrokerageName' ,
		                'GeneralBoatDescription' => 'Summary' ,
		                'NumberOfEngines' => 'EngineQty',
		                'Price' => 'PriceUSD' ,
		                'NormPrice' => 'PriceUSD',
		                'ModelYear' => 'Year',
		                'Model' => 'Model',
		                'PriceHideInd' => 'PriceHidden',
		                'MakeString' => 'Manufacturer',
		                'BoatCategoryCode' => 'Type',
		                'BoatName' => 'VesselName',
		                'CruisingSpeedMeasure' => 'CruiseSpeed', 
		                'MaximumSpeedMeasure' => 'MaximumSpeed',
		                'RangeMeasure' => 'RangeNMI',
		                'BeamMeasure' => 'BeamFeet',
		                'LastModificationDate' => 'UpdatedTimestamp',
		                'WaterTankCapacityMeasure' => 'FreshWaterCapacityGallons',
		                'FuelTankCapacityMeasure' => 'FuelTankCapacityGallons' ,
		                'DryWeightMeasure' => 'DryWeight' ,
		                'CabinsCountNumeric' => 'CabinCount',
		                'HeadsCountNumeric' => 'HeadCount',
		                'BoatHullMaterialCode' => 'HullMaterial',
		                'BoatHullID' => 'HullIdentificationNumber',
		                'DisplayLengthFeet' => 'LOAFeet',
		                'TaxStatusCode' => 'TaxStatus',
		                
		                'NominalLength' => 'LOAFeet',
		                'YSP_LOAFeet' => 'LOAFeet',
		                'YSP_LOAMeter' => 'LOAMeter',
						
						'YSP_BeamFeet' => 'BeamFeet',
		                'YSP_BeamMeter' => 'BeamMeter',

		                'AdditionalDetailDescription' => 'Description',
		                'CabinCountNumeric' => 'CabinCount'
		           	];

		           	foreach ($MapToBoatOrg as $mapToKey => $key) {
		           		if (isset($row[ $key ])) {
		           			$theBoat[ $mapToKey ] = $row[ $key ];
		           		}
		           		else {
		           			$theBoat[ $mapToKey ] = '';
		           		}

		           	}

		           	if (isset($row['gallery'])) {
		                $images = [];
		            
		                foreach ($row['gallery'] as $key => $img) {
		                    $images[] = (object) [
		                        //'Priority' => $img['Sort'],
		                        'Caption'  => $img['Title'],
		                        'Uri'      => $img['HD']
		                    ];
		                }
		            }

		            $theBoat['Images'] = $images;

					if (isset($row['NominalLength'])) {
						$theBoat['YSP_Length'] = (int) $row['NominalLength'];
					}

		            if (isset($row['CruisingSpeedMeasure'])) {
			            $row['CruisingSpeedMeasure'] .= ' '.str_replace('Knots', 'kn', $row['SpeedUnit']);
			            $theBoat['CruisingSpeedMeasure']=$row['CruisingSpeedMeasure'];		            	
		            }

		            if (isset($row['MaximumSpeedMeasure'])) {
			            $row['MaximumSpeedMeasure']  .= ' '.str_replace('Knots', 'kn', $row['SpeedUnit']);
			            $theBoat['MaximumSpeedMeasure']=$row['MaximumSpeedMeasure'];
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
					// if (isset($boat['OriginalPrice']) && isset($boat['Price'])){
					// 	if (str_contains($boat['OriginalPrice'], 'EUR')) {
					// 		$boatC->YSP_EuroVal = intval(str_replace(array(' EUR'), '', $boat['OriginalPrice']) );
					// 		$boatC->YSP_USDVal = $boatC->YSP_EuroVal * $this->usd_c_c;

					// 	} else {
					// 		$boatC->YSP_USDVal = intval(str_replace(array(' USD'), '', $boat['OriginalPrice']));
					// 		$boatC->YSP_EuroVal = $boatC->YSP_USDVal * $this->euro_c_c;
					// 	}
					// }

		            if (isset($row['BeamFeet'])) {
		                $row['BeamFeet'] .= ' ft';
		                $theBoat['BeamMeasure']=$row['BeamFeet'];
		            }

		            if (isset($row['WaterTankCapacityMeasure'])) {
		                $row['WaterTankCapacityMeasure'] .= '|gallon';

		                $theBoat['WaterTankCapacityMeasure']=$row['WaterTankCapacityMeasure'];
		            }
		            
		            if (isset($row['FuelTankCapacityMeasure'])) {
		                $row['FuelTankCapacityMeasure'] .= '|gallon';

		                $theBoat['FuelTankCapacityMeasure'] = $row['FuelTankCapacityMeasure'];
		            }
		            
		            if (isset($row['DryWeightMeasure'])) {
		                $row['DryWeightMeasure'] .= ' lb';

		                $theBoat['DryWeightMeasure'] = $row['DryWeightMeasure'];
		            }

		            if (isset($row['Category'])) {
		                $theBoat['BoatClassCode'] = [$row['Category']];
		            }

		            // if there is no additional description and TextBlocks has description then let's grab it from there.
		            if (isset($row['AdditionalDetailDescription']) && ! empty($row['AdditionalDetailDescription']) 
		            	&& 
		            	isset($row['Textblocks']) && is_array($row['Textblocks'])
		            ) {
		                $theBoat['AdditionalDetailDescription'] = '';

		                foreach ($row['Textblocks'] as $block) {
		                    $theBoat['AdditionalDetailDescription'] .= '<h3>'.$block['Title'].'</h3>';
		                    $theBoat['AdditionalDetailDescription'] .= $block['Description'];
		                }
		            }

		            if (isset($row['Engines']) && is_array($row['Engines'])) {
		                $engines     = [];
		                $enginePower = 0;
		                foreach ($row['Engines'] as $engine) {
		                    $enginePower += $engine['PowerHP'];
		                    
		                    $engines[]   = (object)  [
		                        'Make'        => $engine['EngineMake'],
		                        'Model'       => $engine['EngineModel'],
		                        'Fuel'        => $engine['FuelType'],
		                        'EnginePower' => $engine['PowerHP'],
		                        'Type'        => $engine['EngineType'],
		                        'Hours'       => $engine['Hours'],
		                    ];
		                }
		                $theBoat['Engines']                  = $engines;
		                $theBoat['TotalEnginePowerQuantity'] = number_format($enginePower, 2).' hp';
		            }

		         /*   if (isset($boat['Engines'])) {
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
					}*/

		            if (! empty($theBoat['BoatHullID'])) {
		                $find_post=get_posts([
		                    'post_type' => 'syncing_rai_yacht',
		                    'meta_query' => [
		                        array(
		                           'key' => 'BoatHullID',
		                           'value' => $theBoat['BoatHullID'],
		                           'compare' => '=',
		                       )
		                    ],
		                ]);                
		            }
		            else {
		                $find_post=[];
		            }

		            $find_post_from_synced=get_posts([
	                    'post_type' => 'rai_yacht',
	                    'meta_query' => [
	                        array(
	                           'key' => 'BoatHullID',
	                           'value' => $theBoat['BoatHullID'],
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
			                           'key' => 'YBDocumentID',
			                           'value' => $theBoat['YBDocumentID'],
			                           'compare' => '=',
			                       )
			                    ],
			                ]);
			            }
			            else {
			                $find_post_from_synced=[];
			            }
		           	}	        	         
					
					if (isset($find_post_from_synced[0]->ID)) {
	                	$synced_post_id = $find_post_from_synced[0]->ID;

		                $synced_pdf = get_post_meta($synced_post_id, 'YSP_PDF_URL', true);

		                $saved_last_mod_date = get_post_meta($synced_post_id, 'LastModificationDate', true);
		                $current_last_mod_date = $boatC->LastModificationDate;

		                if (!is_null($synced_pdf) && !empty($synced_pdf)) {
							$apiPDF = wp_remote_request($synced_pdf, [
								'method' => 'HEAD',

								'timeout' => 180,
								'stream' => false, 
								
								'headers' => [
									'Content-Type'  => 'application/pdf',

								]
							]);

							$api_status_code = wp_remote_retrieve_response_code($apiPDF);

							if ($api_status_code == '200') {
								$pdf_still_e = true;
							}
						}

						if (strtotime($current_last_mod_date) > strtotime($saved_last_mod_date)) {
							$pdf_still_e = false;
							$yacht_updated = true;
						}

						if ( $pdf_still_e ) {
							$theBoat['YSP_PDF_URL'] = $synced_pdf;
						}

						// carry overs
						foreach ($this->CarryOverKeys as $metakey) {
							$val = get_post_meta($synced_post_id, $metakey, true);
							$theBoat[ $metakey ] = $val;
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
		            /*elseif (isset($find_post_from_synced[0]->ID) && $yacht_updated == false) {
		                $post_id=$find_post_from_synced[0]->ID;
		            	
		            }*/
		            elseif (isset($find_post[0]->ID)) {
		                $post_id=$find_post[0]->ID;

		                $wpdb->delete($wpdb->postmeta, ['post_id' => $find_post[0]->ID], ['%d']);
		            }

		            $theBoat['CompanyBoat'] = 1;
		            $theBoat['Touched_InSync'] = 1;

		            $y_post_id=wp_insert_post(
		            	apply_filters('raiys_yacht_post', 
			                [
			                    'ID' => $post_id,
								'post_type' => 'syncing_rai_yacht',
								'post_title' =>  addslashes( $theBoat['ModelYear'].' '.$theBoat['MakeString'].' '.$theBoat['Model'].' '.$theBoat['BoatName'] ),
								'post_name' => sanitize_title(
									$theBoat['ModelYear'].'-'.$theBoat['MakeString'].'-'.$theBoat['Model']
								),
								'post_content' => $theBoat['GeneralBoatDescription'],
								'post_status' => 'publish',
								'meta_input' => apply_filters('raiys_yacht_meta_sync', (object) $theBoat)

							],
							$theBoat
						)
					);

					wp_set_post_terms($y_post_id, $theBoat['BoatClassCode'], 'boatclass', false);

					if ($this->opt_prerender_brochures == 'yes' && $pdf_still_e == false && ! in_array($theBoat['SalesStatus'], ['Sold', 'Suspend']) ) {

						$generatorPDF = wp_remote_post(
							"https://api.urlbox.io/v1/render/async", 
							[
								'headers' => [
									'Authorization' => 'Bearer ae1422deb6fc4f658c55f5dda7a08704',
									'Content-Type' => 'application/json'
								],
								'body' => json_encode([
									'url' => get_rest_url() ."raiys/yacht-pdf?yacht_post_id=". $y_post_id,
									'webhook_url' => get_rest_url() ."raiys/set-yacht-pdf?yacht_post_id=". $y_post_id,
									'use_s3' => true,
									'format' => 'pdf'
								])
							]
						);

					}
		        }

	        }

	        return ['success' => 'Successfully Sync YachtBroker.org Brokerage Only Feed'];
 
	        // after for loop
	    }
	}