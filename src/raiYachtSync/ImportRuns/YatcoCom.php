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

			$this->euro_c_c = intval($this->options->get('euro_c_c'));
			$this->usd_c_c = intval($this->options->get('usd_c_c'));
			

			$this->euro_c_c = intval($this->options->get('euro_c_c'));
			$this->usd_c_c = intval($this->options->get('usd_c_c'));	
		}

		public function run() {
			global $wpdb;

			var_dump('Started Yacht Broker.org Import');

	        $headers = [
	            'headers' => [
	                'X-API-KEY'   => $this->yachtBrokerAPIKey,
	                'X-CLIENT-ID' => $this->yachtClientId
	            ]
	        ];

	        $apiUrlOne  = 'https://www.yatco.com/wp-json/yatco/yachts';

	        $apiCall = wp_remote_get($apiUrlOne, $headers);

	        $api_status_code = wp_remote_retrieve_response_code($apiCall);

	        $json = json_decode(wp_remote_retrieve_body($apiCall), true);

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
	        	$apiUrl  = 'https://www.yatco.com/wp-json/yatco/yachts?page_size='.$this->yachtBrokerLimit;

	        	$apiUrl .='&page_index='.$page;

		        $apiCallWhile = wp_remote_get($apiUrl, $headers);
		        $apiBody = json_decode($apiCallWhile['body'], true);

		        if (count($apiBody['Results']) == 0) {
		        	break;
		        }

				foreach ($apiBody['Results'] as $row) {
		            $yachtSynced++; 
		           	
		           	$theBoat=[
		           		
		           	];

		           	$MapToBoatOrg=[
		           		'YTCID' => 'VesselID',
		  				'SalesStatus' => 'VesselStatus',
		                'SaleClassCode' => 'VesselCondition',
		                'CompanyName' => 'CompanyID' ,
		                /*'GeneralBoatDescription' => 'Summary' ,
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
		                'CabinCountNumeric' => 'CabinCount'*/
		           	];

		           	foreach ($MapToBoatOrg as $mapToKey => $key) {
		           		if (isset($row[ $key ])) {
		           			$theBoat[ $mapToKey ] = $row[ $key ];
		           		}
		           		else {
		           			$theBoat[ $mapToKey ] = '';
		           		}

		           	}

		            if (! empty($theBoat['VesselID'])) {
		                $find_post=get_posts([
		                    'post_type' => 'syncing_rai_yacht',
		                    'meta_query' => [
		                        array(
		                           'key' => 'YTCID',
		                           'value' => $theBoat['VesselID'],
		                           'compare' => '=',
		                       )
		                    ],
		                ]);
		            }
		            else {
		                $find_post=[];
		            }

		            $post_id=0;

		            if (isset($find_post[0]->ID)) {
		                $post_id=$find_post[0]->ID;

		                $wpdb->delete($wpdb->postmeta, ['post_id' => $find_post[0]->ID], ['%d']);
		            }

		            $theBoat['CompanyBoat'] = 1;

		            $y_post_id=wp_insert_post(
		            	apply_filters('raiys_yacht_post', 
			                [
			                    'ID' => $post_id,
								'post_type' => 'syncing_rai_yacht',
								
								'post_title' =>  addslashes( $theBoat['ModelYear'].' '.$theBoat['BuilderName'].' '.$theBoat['Model'].' '.$theBoat['VesselName'] ),

								'post_name' => sanitize_title(
									$theBoat['ModelYear'].'-'.$theBoat['BuilderName'].'-'.$theBoat['Model']
								),
								'post_content' => $theBoat['BrokerTeaser'],
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