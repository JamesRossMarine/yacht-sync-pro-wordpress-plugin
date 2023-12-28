<?php

	class raiYachtSync_ImportRuns_YatcoCom {
		public $yachtBrokerAPIKey = '';
   		public $yachtClientId = '';
   		protected $url = '';
   		protected $yachtBrokerLimit = 43;

		public function __construct() {

			$this->options = new raiYachtSync_Options();
			$this->LocationConvert = new raiYachtSync_LocationConvert();

			$this->euro_c_c = intval($this->options->get('euro_c_c'));
			$this->usd_c_c = intval($this->options->get('usd_c_c'));
			
			$this->euro_c_c = intval($this->options->get('euro_c_c'));
			$this->usd_c_c = intval($this->options->get('usd_c_c'));	
		}

		public function run() {
			global $wpdb;

			var_dump('Started YATCO Import');

	        $headers = [
	        	'timeout' => 120,
	        	
	            'headers' => [
	             
	            ]
	        ];

	        $apiUrlOne  = 'https://www.yatco.com/wp-json/yatco/yachts';

	        $apiCall = wp_remote_get($apiUrlOne, $headers);

	        $api_status_code = wp_remote_retrieve_response_code($apiCall);

	        $json = json_decode(wp_remote_retrieve_body($apiCall), true);

	        if ($api_status_code == 200 && isset($json['Results'])) {
				// return;
			}
			elseif ($api_status_code == 401) {
				return ['error' => 'Error with auth'];
			}
			else {
				var_dump('BALLS 2948');
				return ['error' => 'Error http error '.$api_status_code];
			}

	        $total = $json['Count'];
	        $yachtSynced = 0;
	        $page = 1;

	        while ($total > $yachtSynced) {


	        	$apiUrl  = 'https://www.yatco.com/wp-json/yatco/yachts?page_size='.$this->yachtBrokerLimit;

	        	$apiUrl .='&page_index='.$page;

	        	var_dump($apiUrl);

	        	$page++;

	        	sleep(15);

		        $apiCallWhile = wp_remote_get($apiUrl, $headers);
		        $apiBody = json_decode($apiCallWhile['body'], true);

		        if (count($apiBody['Results']) == 0) {
		        	var_dump('returned zero');

		        	break;
		        }

		        if (! isset($apiBody['Results'])) {
		        	var_dump($apiBody);
		        	var_dump(wp_remote_retrieve_response_code($apiCallWhile));

		        }

				foreach ($apiBody['Results'] as $row) {
		            $yachtSynced++; 
		           	
		           	$theBoat=[
		           		
		           	];

		           	$MapToBoatOrg=[
		           		'YTC_VESSEL_ID' => 'VesselID',
		  				'SalesStatus' => 'VesselStatus',
		                'SaleClassCode' => 'VesselCondition',
		                'CompanyName' => 'CompanyID' ,

		                'GeneralBoatDescription' => 'BrokerTeaser' ,
		                
		                'Price' => 'AskingPrice' ,

		                //'NormPrice' => 'PriceUSD',
		                
		                'ModelYear' => 'Year',
		                'Model' => 'Model',
		                
		                //'PriceHideInd' => 'PriceHidden',
		                
		                'MakeString' => 'BuilderName',
		                
		                'BoatCategoryCode' => 'MainCategoryText',
		                'BoatName' => 'VesselName',

		                //'CruisingSpeedMeasure' => 'CruiseSpeed', 
		                //'MaximumSpeedMeasure' => 'MaximumSpeed',

		                //'RangeMeasure' => 'RangeNMI',
		                'BeamMeasure' => 'BeamFeet',
		                
		                'LastModificationDate' => 'ModifiedDate',

		                //'WaterTankCapacityMeasure' => 'FreshWaterCapacityGallons',
		                //'FuelTankCapacityMeasure' => 'FuelTankCapacityGallons' ,
		                
		                //'DryWeightMeasure' => 'DryWeight' ,
		                
		                'CabinsCountNumeric' => 'StateRooms',
		                
		                //'HeadsCountNumeric' => 'HeadCount',
		                
		                'BoatHullMaterialCode' => 'HullMaterial',
		                //'BoatHullID' => 'HullIdentificationNumber',
		                
		                //'DisplayLengthFeet' => 'LOAFeet',
		                //'TaxStatusCode' => 'TaxStatus',
		                
		                'NominalLength' => 'LOAFeet',

		                'YSP_LOAFeet' => 'LOAFeet',
		                'YSP_LOAMeter' => 'LOAMeters',
						
						'YSP_BeamFeet' => 'BeamFeet',
		                'YSP_BeamMeter' => 'BeamMeters',

		                //'AdditionalDetailDescription' => 'Description',
		                //'CabinCountNumeric' => 'CabinCount'
		           	];

		           	foreach ($MapToBoatOrg as $mapToKey => $key) {
		           		if (isset($row[ $key ])) {
		           			$theBoat[ $mapToKey ] = $row[ $key ];
		           		}
		           		else {
		           			$theBoat[ $mapToKey ] = '';
		           		}

		           	}

		           	$detailsUrl = 'https://yatco.com/wp-json/yatco/yacht-detail?vessel_id=' . $row['MLSID'];
					
					$apiCallDetails = wp_remote_get($detailsUrl, ['timeout' => 120]);

					$response = $apiCallDetails['body'];

						$response=json_decode($response, true);

					$data = $response;

					if (isset($data['PhotoGallery']) && is_array($data['PhotoGallery'])) {
	 
						$reducedImages = array_slice($data['PhotoGallery'], 0, 100);

	                    $reducedImages = array_map(
	                    	function($img) {
	                    		$reimg=[
	                    			'Uri' => $img['largeImageURL']
	                    		];

	                    		if (! empty($img['Caption'])) {
	                    			$reimg['Caption']=$img['Caption'];
	                    		}

	                    		return (object) $reimg;
	                    	}, 
	                    	$reducedImages
	                    );

	                    $theBoat['Images'] = $reducedImages;
	                    $theBoat['CompanyName'] = $data['Company']['CompanyName'];

					}

	                $find_post=get_posts([
	                    'post_type' => 'syncing_rai_yacht',
	                    'meta_query' => [
	                        array(
	                           'key' => 'YTC_VESSEL_ID',
	                           'value' => $row['VesselID']
	                       )
	                    ],
	                ]);
	           
		            $post_id=0;

		            if (isset($find_post[0]->ID)) {
		                $post_id=$find_post[0]->ID;

		                $wpdb->delete($wpdb->postmeta, ['post_id' => $find_post[0]->ID], ['%d']);
		            }

		            var_dump($theBoat);

		            $y_post_id=wp_insert_post(
		            	apply_filters('raiys_yacht_post', 
			                [
			                    'ID' => $post_id,
								'post_type' => 'syncing_rai_yacht',
								
								'post_title' =>  addslashes( $row['ModelYear'].' '.$row['BuilderName'].' '.$theBoat['Model'].' '.$row['VesselName'] ),

								'post_name' => sanitize_title(
									$row['ModelYear'].'-'.$row['BuilderName'].'-'.$row['Model']
								),
								'post_content' => $row['BrokerTeaser'],
								'post_status' => 'publish',
								'meta_input' => apply_filters('raiys_yacht_meta_sync', (object) $theBoat)

							],
							$theBoat
						)
					);

					//wp_set_post_terms($y_post_id, $theBoat['BoatClassCode'], 'boatclass', false);
		        }

	        }

	        return ['success' => 'Successfully Sync Yatco.com Brokerage Only Feed'];
 
	        // after for loop
	    }
	}