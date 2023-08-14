<?php
	class raiYachtSync_ImportRuns_GlobalBoatsCom {
   		protected $limit = 200;
		protected $yachtBrokerLimit = 30;
	
		protected $globalInventoryUrl = 'https://services.boats.com/pls/boats/search?key=e97cdb91056f&fields=SalesStatus,MakeString,Model,ModelYear,BoatCategoryCode,SaleClassCode,StockNumber,BoatLocation,BoatName,BoatClassCode,BoatHullMaterialCode,BoatHullID,DesignerName,RegistrationCountryCode,NominalLength,LengthOverall,BeamMeasure,MaxDraft,BridgeClearanceMeasure,DryWeightMeasure,Engines,CruisingSpeedMeasure,RangeMeasure,AdditionalDetailDescription,DriveTypeCode,MaximumSpeedMeasure,FuelTankCountNumeric,FuelTankCapacityMeasure,WaterTankCountNumeric,WaterTankCapacityMeasure,HoldingTankCountNumeric,HoldingTankCapacityMeasure,CabinsCountNumeric,SingleBerthsCountNumeric,DoubleBerthsCountNumeric,TwinBerthsCountNumeric,HeadsCountNumeric,GeneralBoatDescription,AdditionalDetailDescription,EmbeddedVideoPresent,Videos,Images,NormPrice,Price,CompanyName,SalesRep,DocumentID,BuilderName,IMTTimeStamp,PlsDisclaimer';

		public function __construct() {

		}

		public function run() {
			global $wpdb;
			
			$offset = 0;

			// Sync broker inventory
			$apiCall = wp_remote_get($this->globalInventoryUrl, ['timeout' => 300]);

				$apiCall['body']=json_decode($apiCall['body'], true);

	        $total = $apiCall['body']['data']['numResults'];

			$apiCallInventory = $apiCall['body']['data']['results'];

			while ($total > ($offset)) {
				$apiUrl = $this->globalInventoryUrl;
				$apiUrl = $apiUrl.'&start='. $offset .'&rows='. $this->limit;

				// Sync broker inventory
				$apiCallForWhile = wp_remote_get($apiUrl, ['timeout' => 300]);

				//var_dump($apiCallForWhile);

				$apiCallForWhile['body']=json_decode($apiCallForWhile['body'], true);	

				$apiCallInventory = $apiCallForWhile['body']['data']['results'];

				foreach ($apiCallInventory as $boat) {
					$record=$boat;
					$boatC = json_decode(json_encode($boat));

		            if (! empty($record['BoatHullID'])) {
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
		                           'value' => $record['BoatHullID'],
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
							'post_title' => $boat['BoatName'],
							'post_contnet' => $boat['GeneralBoatDescription'],
							'post_status' => 'publish',
							'meta_input' => $boatC,

						]
					);

					//var_dump($boat['BoatName']);


				}

				$offset = $offset + $this->limit;



			}



			




		}


	}