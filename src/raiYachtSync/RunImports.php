<?php
	class raiYachtSync_RunImports {

		public function __construct() {
						
			$this->options = new raiYachtSync_Options();

			$this->ImportGlobalBoatsCom = new raiYachtSync_ImportRuns_GlobalBoatsCom();
			$this->ImportBrokerageOnlyBoatsCom = new raiYachtSync_ImportRuns_BrokerageOnlyBoatsCom();
			$this->ImportYachtBrokerOrg = new raiYachtSync_ImportRuns_YachtBrokerOrg();
			
		}

		public function pre_clean_up() {
	        global $wpdb;
			
	       	$wpdb->query( 
				$wpdb->prepare( 
					"DELETE wp FROM $wpdb->posts wp
					WHERE wp.post_type = %s",
					'syncing_rai_yacht'
				)
			);
	      
		}

		public function newLifeCycle() {

	        $wpdb->query( 
				$wpdb->prepare( 
					"UPDATE $wpdb->postmeta pm 
					INNER JOIN $wpdb->posts AS p ON pm.post_id = p.ID
					SET pm.meta_value = '0'
					WHERE p.post_type = %s AND pm.meta_key = 'Touched_InSync'",
					'rai_yacht'
				)
			);

			// sync here

			$wpdb->query( 
				$wpdb->prepare( 
					"DELETE wp FROM $wpdb->posts wp
					INNER JOIN $wpdb->posts AS p ON p.ID = pm.post_id 
					WHERE wp.post_type = %s AND pm.meta_key = 'Touched_InSync' AND pm.meta_value = '0'",
					'rai_yacht'
				)
			);

			
		}

		public function clean_up() {
	        global $wpdb;
			
			// Check if boats are in the syncing-post-type to be moved before we delete. 
	        $count_of_synced = $wpdb->get_col(
	        	$wpdb->prepare( 
					"SELECT COUNT(*) FROM $wpdb->posts wp
					WHERE wp.post_type = %s",
					'syncing_rai_yacht'
				)
	        );


	        if ($count_of_synced > 0) {
		       	$wpdb->query( 
					$wpdb->prepare( 
						"DELETE wp FROM $wpdb->posts wp
						WHERE wp.post_type = %s",
						'rai_yacht'
					)
				);

				$wpdb->query(
					"DELETE pm FROM $wpdb->postmeta pm 
					LEFT JOIN $wpdb->posts wp ON wp.ID = pm.post_id 
					WHERE wp.ID IS NULL"
				);
	        }
		}

		public function clean_up_brokerage_only() {
	        global $wpdb;

	      	// Check if boats are in the syncing-post-type to be moved before we delete. 
	        $count_of_synced = $wpdb->get_col(
	        	$wpdb->prepare( 
					"SELECT COUNT(*) FROM $wpdb->posts wp
					WHERE wp.post_type = %s",
					'syncing_rai_yacht'
				)
	        );

	        if ($count_of_synced > 0) {
		       	$wpdb->query( 
					$wpdb->prepare( 
						"DELETE wp FROM $wpdb->posts wp 
						LEFT JOIN $wpdb->postmeta pm ON pm.post_id = wp.ID 
						WHERE wp.post_type = %s AND pm.meta_key = %s", 
						'rai_yacht',
						'CompanyBoat'
					)
				);

				$wpdb->query(
					"DELETE pm FROM $wpdb->postmeta pm 
					LEFT JOIN $wpdb->posts wp ON wp.ID = pm.post_id 
					WHERE wp.ID IS NULL"
				);
			}
		}
		

		public function move_over() {
	        global $wpdb;	        

	        $wpdb->update($wpdb->posts, ['post_type'=>'rai_yacht'], ['post_type' => 'syncing_rai_yacht'], ['%s'], ['%s'] );

		}

		public function run() {
           
           	$boats_com_api_global_key = $this->options->get('boats_com_api_global_key');
			$boats_com_api_brokerage_key = $this->options->get('boats_com_api_brokerage_key');
			
			$yacht_broker_org_api_token = $this->options->get('yacht_broker_org_api_token');

			$this->pre_clean_up();

			$resultsOfSync=[];

			// @ToDo For Loop the Runs  
			// KEEP THIS IN THIS ORDER
			if (! empty($boats_com_api_global_key)) {
				$resultsOfSync[]=$this->ImportGlobalBoatsCom->run();
			}

			if (!empty($yacht_broker_org_api_token)) {
				$resultsOfSync[]=$this->ImportYachtBrokerOrg->run();
			}

			if (! empty($boats_com_api_brokerage_key)) {
				$resultsOfSync[]=$this->ImportBrokerageOnlyBoatsCom->run();
			}

			var_dump($resultsOfSync);

			$syncHadIssue=false;

			foreach ($resultsOfSync as $syncR) {
				if (isset($syncR['error'])) {
					$syncHadIssue=true;
				}
			}

			if ($syncHadIssue == false) {
				$this->clean_up();
				$this->move_over();				
			} 
		}
       

       	public function run_brokerage_only() {

 			$boats_com_api_brokerage_key = $this->options->get('boats_com_api_brokerage_key');
			
			$yacht_broker_org_api_token = $this->options->get('yacht_broker_org_api_token');

			$this->pre_clean_up();

			$resultsOfSync=[];
			
			// @ToDo For Loop the Runs  
			// KEEP THIS IN THIS ORDER
			if (!empty($yacht_broker_org_api_token)) {
				$this->ImportYachtBrokerOrg->run();
			}

			if (! empty($boats_com_api_brokerage_key)) {
				$this->ImportBrokerageOnlyBoatsCom->run();
			}
			
			$syncHadIssue=false;

			foreach ($resultsOfSync as $syncR) {
				if (isset($syncR['error'])) {
					$syncHadIssue=true;
				}

			}

			if ($syncHadIssue == false) {
				$this->clean_up_brokerage_only();
				$this->move_over();
			}

       	}


	}
