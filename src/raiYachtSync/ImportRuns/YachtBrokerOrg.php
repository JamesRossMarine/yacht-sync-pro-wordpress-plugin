<?php

	class raiYachtSync_ImportRuns_YachtBrokerOrg {
		protected $yachtBrokerAPIKey = '0a3e392e786c817195307150386779f18c69540e';
   		protected $yachtClientId = '82420';
   		protected $url = '';
   		protected $yachtBrokerLimit = 30;

		public function __construct() {

		}

		public function run() {
			global $wpdb;

	        $headers = [
	            'headers' => [
	                'X-API-KEY'   => $this->yachtBrokerAPIKey,
	                'X-CLIENT-ID' => $this->yachtClientId
	            ]
	        ];

	        $apiUrl  = 'https://api.yachtbroker.org/listings?key='.$this->yachtBrokerAPIKey.'&id='. $this->yachtClientId .'&gallery=true&engines=true&generators=true&textblocks=true&media=true&limit='.$this->yachtBrokerLimit;

	        $apiCall = wp_remote_get($apiUrl, $headers);

	        $json = json_decode($apiCall['body'], true);

	        $total = $json['total'];
	        $yachtSynced = 0;
	        $page = 1;

	        while ($total > $yachtSynced) {
	        	$apiUrl .='&page='.$page;

		        $apiCallWhile = wp_remote_get($apiUrl, $headers);
		        $apiBody = json_decode($apiCallWhile['body'], true);


		        if (isset($apiBody['next_page_url'])) {
		        	$page++;
		        }

				foreach ($json['V-Data'] as $row) {
		            $yachtSynced ++;
		           	
		           	$theBoat=[
		           		'BoatLocation' => [
		           			'BoatCityName' => $row['City'],
		           			'BoatCountryID' => $row['Country'],
		           			'BoatStateCode' => $row['State']
		           		],

		           		'SalesRep' => [
		           			'PartyId' => $row['ListingOwnerID'],
		           			'Name' => $row['ListingOwnerEmail'],
		           			'Email' => $row['ListingOwnerEmail'],
		           			'Phone' => $row['ListingOwnerPhone']
		           		],

		           	];

		           	$MapToBoatOrg=[
		           		'ID' => 'DocumentID',
		                'Condition' => 'SalesStatus',
		                'ListingOwnerBrokerageName' => 'CompanyName',
		                'Summary' => 'GeneralBoatDescription',
		                'EngineQty' => 'NumberOfEngines',
		                'PriceUSD' => 'Price',
		                'PriceUSD' => 'NormPrice',
		                'Year' => 'ModelYear',
		                'Model' => 'Model',
		                'PriceHidden' => 'PriceHideInd',
		                'Manufacturer' => 'MakeString',
		                'Type' => 'BoatCategoryCode',
		                'VesselName' => 'BoatName',
		                'CruiseSpeed' => 'CruisingSpeedMeasure',
		                'MaximumSpeed' => 'MaximumSpeedMeasure',
		                'RangeNMI' => 'RangeMeasure',
		                'BeamFeet' => 'BeamMeasure',
		                'UpdatedTimestamp' => 'LastModificationDate',
		                'FreshWaterCapacityGallons' => 'WaterTankCapacityMeasure',
		                'FuelTankCapacityGallons' => 'FuelTankCapacityMeasure',
		                'DryWeight' => 'DryWeightMeasure',
		                'CabinCount' => 'CabinsCountNumeric',
		                'HeadCount' => 'HeadsCountNumeric',
		                'HullMaterial' => 'BoatHullMaterialCode',
		                'HullIdentificationNumber' => 'BoatHullID',
		                'LOAFeet' => 'DisplayLengthFeet',
		                'TaxStatus' => 'TaxStatusCode',
		                'LOAMeters' => 'NominalLength',
		                'Description' => 'AdditionalDetailDescription'

		           	];

		           	foreach ($MapToBoatOrg as $key => $newKey) {
		           		if (isset($row[ $key ])) {
		           			$theBoat[ $newKey ] = $row[ $key ];
		           		}
		           		else {
		           			$theBoat[$newKey] = '';
		           		}

		           	}

		           	if (isset($row['gallery'])) {
		                $images = [];
		            
		                foreach ($row['gallery'] as $key => $img) {
		                    $images[] = [
		                        'Priority' => $img['Sort'],
		                        'Caption'  => $img['Title'],
		                        'Uri'      => $img['HD']
		                    ];
		                }
		            }

		            $theBoat['Images'] = $images;

		            if (isset($row['CruisingSpeedMeasure'])) {
			            $row['CruisingSpeedMeasure'] .= ' '.str_replace('Knots', 'kn', $row['SpeedUnit']);
			            $theBoat['CruisingSpeedMeasure']=$row['CruisingSpeedMeasure'];		            	
		            }

		            if (isset($row['MaximumSpeedMeasure'])) {
			            $row['MaximumSpeedMeasure']  .= ' '.str_replace('Knots', 'kn', $row['SpeedUnit']);
			            $theBoat['MaximumSpeedMeasure']=$row['MaximumSpeedMeasure'];
		            }


		            if (isset($row['BeamMeasure'])) {
		                $row['BeamMeasure'] .= ' ft';
		                $theBoat['BeamMeasure']=$row['BeamMeasure'];
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
		                    
		                    $engines[]   = [
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


		           	if (! empty($theBoat['BoatHullID'])) {
		                $find_post=get_posts([
		                    'post_type' => 'rai_yatch',
		                    'meta_query' => [

		                        /*array(
		                           'key' => 'DocumentID',
		                           'value' => $record['DocumentID'],
		                           'compare' => '=',
		                        ),*/

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

		            $post_id=0;

		            if (isset($find_post[0]->ID)) {
		                $post_id=$find_post[0]->ID;

		                $wpdb->delete($wpdb->postmeta, ['post_id' => $find_post[0]->ID], ['%d']);
		            }

		            $y_post_id=wp_insert_post(
		                [
		                    'ID' => $post_id,
							'post_type' => 'rai_yatch',
							'post_title' => $theBoat['BoatName'],
							'post_contnet' => $theBoat['GeneralBoatDescription'],
							'post_status' => 'publish',
							'meta_input' => $theBoat,

						]
					);

		           	//var_dump($theBoat);

		        }

	        }

	        // after for loop
	    }
	}