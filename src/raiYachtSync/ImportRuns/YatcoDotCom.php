<?php
    #[AllowDynamicProperties]

	class raiYachtSync_ImportRuns_YatcoDotCom {
		public $yachtBrokerAPIKey = '';
   		public $yachtClientId = '';
   		protected $url = '';
   		protected $yachtBrokerLimit = 143;

		public function __construct() {

			$this->options = new raiYachtSync_Options();
			$this->LocationConvert = new raiYachtSync_LocationConvert();

			$this->euro_c_c = floatval($this->options->get('euro_c_c'));
			$this->usd_c_c = floatval($this->options->get('usd_c_c'));

			$this->api_url_base = 'http://api.yatcoboss.com/API/V1';
			$this->yachts_feed = $this->api_url_base .'/ForSale/Vessel/Search';

			$this->api_token = $this->options->get('yatco_api_token');
		}

		public function run() {
			global $wpdb;

			var_dump('Started YATCO Import');

	        $headers = [
	        	'timeout' => 120,

	        	'body' => json_encode([
	        		"Records" => 12,
	        	]),
	        	
	            'headers' => [
	             	'Authorization' => 'Basic ' . $this->api_token,
					'Accept' => 'application/json',
					'Content-Type' => 'application/json'
	            ]
	        ];

	        $apiUrlOne  = $this->yachts_feed;

	        $apiCall = wp_remote_post($apiUrlOne, $headers);

	        $api_status_code = wp_remote_retrieve_response_code($apiCall);

	        $json = json_decode(wp_remote_retrieve_body($apiCall), true);

	        var_dump(wp_remote_retrieve_body($apiCall));

	        if ($api_status_code == 200 && isset($json['Results'])) {
				// return;
			}
			elseif ($api_status_code == 401) {
				return ['error' => 'Error with auth'];
			}
			else {
				return ['error' => 'Error http error '.$api_status_code];
			}

	        $total = $json['Count'];
	        $yachtSynced = 0;
	        $page = 0;

	        while ($total > $yachtSynced) {

	        	$apiUrl  = $this->yachts_feed;

	        	$page++;

	        	sleep(15);

	        	$headers['body']=json_encode([
	        		'Records' => $this->yachtBrokerLimit,
	        		'Offset' => ($page*$this->yachtBrokerLimit)
	        	]);

		        $apiCallWhile = wp_remote_post($apiUrl, $headers);

		        $apiBody = json_decode($apiCallWhile['body'], true);

		        if (count($apiBody['Results']) == 0) {
		        	var_dump('returned zero');

		        	break;
		        }

		        if (! isset($apiBody['Results'])) {
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

		           	$detailsUrl = $this->api_url_base.'/ForSale/Vessel/'. $row['VesselID'] .'/Details/fullSpecsAll';

		           	$detail_headers = [
			        	'timeout' => 120,
	
			            'headers' => [
			             	'Authorization' => 'Basic ' . $this->api_token,
							'Accept' => 'application/json',
							'Content-Type' => 'application/json'
			            ]
			        ];

					$apiCallDetails = wp_remote_get($detailsUrl, $detail_headers);

					$response = $apiCallDetails['body'];

						$response=json_decode($response, true);

					$data = $response;

					//var_dump($data);

					if (isset($data['PhotoGallery']) && is_array($data['PhotoGallery'])) {
	 
						$reducedImages = array_slice($data['PhotoGallery'], 0, 50);

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