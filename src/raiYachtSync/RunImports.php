<?php
	class raiYachtSync_RunImports {

		public function __construct() {
			
			$this->ImportGlobalBoatsCom = new raiYachtSync_ImportRuns_GlobalBoatsCom();
			$this->ImportBrokerageOnlyBoatsCom = new raiYachtSync_ImportRuns_BrokerageOnlyBoatsCom();

			$this->ImportYachtBrokerOrg = new raiYachtSync_ImportRuns_YachtBrokerOrg();


		}

		public function cleanup() {
		
			$yArgs=[
	            'fields' => "ids",
	            'post_type' => 'rai_yatch',
	            'posts_per_page' => -1,
	        ];

	        $pt_yachts=get_posts($yArgs);

	        foreach ($pt_yachts as $yID) {
	            wp_delete_post($yID, true);
	        }
		
		}

		public function run() {
            
			$this->cleanup();

			// @ToDo For Loop the Runs  

			$this->ImportGlobalBoatsCom->run();
			$this->ImportBrokerageOnlyBoatsCom->run();

			$this->ImportYachtBrokerOrg->run();

		}
       


	}
