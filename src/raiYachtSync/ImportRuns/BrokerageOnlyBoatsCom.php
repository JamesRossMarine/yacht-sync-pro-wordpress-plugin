<?php
	class raiYachtSync_ImportRuns_BrokerageOnlyBoatsCom {
   		protected $limit = 200;
		protected $yachtBrokerLimit = 30;
		
		public $brokerageInventoryUrl = 'https://api.boats.com/inventory/search?key=5rz42z95sp3q93vpjup99v993bewke';

		public function __construct() {

		}
		
		public function run() {
			global $wpdb;

			$offset = 0;

			// Sync broker inventory
			$apiCall = wp_remote_get($this->brokerageInventoryUrl, ['timeout' => 300]);

				$apiCall['body']=json_decode($apiCall['body'], true);

	        $total = $apiCall['body']['numResults'];

			//$apiCallInventory = $apiCall['body']['results'];

			while ($total > ($offset)) {

				$apiUrl = $this->brokerageInventoryUrl;

				$apiUrl = $apiUrl.'&start='. $offset .'&rows='. $this->limit;

				// Sync broker inventory
				$apiCallForWhile = wp_remote_get($apiUrl, ['timeout' => 300]);

				//var_dump($apiCallForWhile);

				$apiCallForWhile['body']=json_decode($apiCallForWhile['body'], true);	

				$apiCallInventory = $apiCallForWhile['body']['results'];

				foreach ($apiCallInventory as $boat) {
					$record=$boat;
					$boatC = json_decode(json_encode($boat));

					//$boatC->CompanyName = 'Italian Yacht Group';
					
		            if (! empty($record['BoatHullID'])) {
		                $find_post=get_posts([
		                    'post_type' => 'rai_yatch',
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

		            $post_id=0;

		            if (isset($find_post[0]->ID)) {
		                $post_id=$find_post[0]->ID;

		                $wpdb->delete($wpdb->postmeta, ['post_id' => $find_post[0]->ID], ['%d']);
		            }

		            $y_post_id=wp_insert_post(
		                [
		                    'ID' => $post_id,
							'post_type' => 'rai_yatch',
							
							'post_title' =>  $boat['ModelYear'].' '.$boat['MakeString'].' '.$boat['Model'].' '.$boat['BoatName'],
							
							'post_name' => sanitize_title(
								$boat['ModelYear'].'-'.$boat['MakeString'].'-'.$boat['Model']
							),

							'post_contnet' => $boat['GeneralBoatDescription'],
							'post_status' => 'publish',
							'meta_input' => $boatC,

						]
					);


				}

				$offset = $offset + $this->limit;



			}

		}


	}