<?php
	class raiYachtSync_RunImports {

		public function __construct() {
						
			$this->options = new raiYachtSync_Options();

			$this->ImportGlobalBoatsCom = new raiYachtSync_ImportRuns_GlobalBoatsCom();
			$this->ImportBrokerageOnlyBoatsCom = new raiYachtSync_ImportRuns_BrokerageOnlyBoatsCom();

			$this->ImportYachtBrokerOrg = new raiYachtSync_ImportRuns_YachtBrokerOrg();


		}

		public function cleanup() {
	        global $wpdb;
		
	       	$wpdb->query( 
				$wpdb->prepare( 
					"DELETE wp FROM $wpdb->posts wp 
					LEFT JOIN $wpdb->postmeta pm ON pm.post_id = wp.ID 
					WHERE wp.post_type = %s",
					'rai_yacht'
				)
			);

			$wpdb->query(
				"DELETE pm FROM $wpdb->postmeta pm 
				LEFT JOIN $wpdb->posts wp ON wp.ID = pm.post_id 
				WHERE wp.ID IS NULL"
			);

		/*	$yArgs=[
	            'fields' => "ids",
	            'post_type' => 'rai_yacht',
	            'posts_per_page' => -1,
	        ];

	        $pt_yachts=get_posts($yArgs);

	        foreach ($pt_yachts as $yID) {
	            wp_delete_post($yID, true);
	        }*/

	        /* 
				DELETE wp FROM wp_posts wp 
				LEFT JOIN wp_postmeta pm ON pm.post_id = wp.ID 
				WHERE wp.post_type = 'rai_yacht'

				DELETE pm FROM wp_postmeta pm 
				LEFT JOIN wp_posts wp ON wp.ID = pm.post_id 
				WHERE wp.ID IS NULL
	         */
		}

		public function run() {
            
			$this->cleanup();

			// @ToDo For Loop the Runs  
			// KEEP THIS IN THIS ORDER
			//$this->ImportGlobalBoatsCom->run();

			//$this->ImportYachtBrokerOrg->run();

			$this->ImportBrokerageOnlyBoatsCom->run();

		}
       


	}
