<?php
	#[AllowDynamicProperties]
	class raiYachtSync_RunImports {

		public function __construct() {
						
			$this->options = new raiYachtSync_Options();

			$this->low_count = $this->options->get('alert_on_low_count');

			$this->BrochureCleanUp = new raiYachtSync_BrochureCleanUp();

			$this->AlertOnLowCount = new raiYachtSync_AlertOnLowCount();
			$this->AlertOnDiffCount = new raiYachtSync_AlertOnDiffCount();

			$this->ImportGlobalBoatsCom = new raiYachtSync_ImportRuns_GlobalBoatsCom();
			$this->ImportGlobalBoatsCom2 = new raiYachtSync_ImportRuns_GlobalBoatsCom('boats_com_api_global_key_2');

			$this->ImportBrokerageOnlyBoatsCom = new raiYachtSync_ImportRuns_BrokerageOnlyBoatsCom();
			$this->ImportBrokerageOnlyBoatsCom2 = new raiYachtSync_ImportRuns_BrokerageOnlyBoatsCom('boats_com_api_brokerage_key_2');
			
			$this->ImportYachtBrokerOrg = new raiYachtSync_ImportRuns_YachtBrokerOrg();
			
			$this->ImportYatco = new raiYachtSync_ImportRuns_YatcoCom();
			
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

			/*$wpdb->query( 
				$wpdb->prepare( 
					"UPDATE $wpdb->postmeta pm 
					INNER JOIN $wpdb->posts AS p ON pm.post_id = p.ID
					SET pm.meta_value = '0'
					WHERE p.post_type = %s AND pm.meta_key = 'Touched_InSync'",
					'rai_yacht'
				)
			);*/
	      
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
					"DELETE p FROM $wpdb->posts p
					INNER JOIN $wpdb->postmeta AS pm ON p.ID = pm.post_id 
					WHERE p.post_type = %s AND pm.meta_key = 'Touched_InSync' AND pm.meta_value = '0'",
					'rai_yacht'
				)
			);

			
		}

		public function emailSyncFailed() {
			$siteName = get_bloginfo('name');
    		$siteUrl = get_bloginfo('url');

    		$to = $this->options->get('alert_emails');;

    		$subject = $siteName . ' - SYNC Has Failed Due A "Failed Count Check" OR API ISSUE.';

    		$message = '<!DOCTYPE html><html><body>';
			$message .= '<h1>' . $subject . '</h1>';

			$message .= '<p></p>';

			$message .= '<a href="'. $siteUrl .'">'. $siteName .'</a>'; 
		
			$message .= '</body></html>';

    		$headers = array(
				'Content-Type: text/html; charset=UTF-8',
			);
		
    		$sent = wp_mail($to, $subject, $message, $headers);

    		if ($sent) {
				return array('message' => 'Email sent successfully');
			} 
			else {
				return array('error' => 'Email failed to send');
			}
		}

		public function clean_up() {
	        global $wpdb;
			
			// Check if boats are in the syncing-post-type to be moved before we delete. 
	        $count_of_synced = $wpdb->get_var(
	        	$wpdb->prepare( 
					"SELECT COUNT(*) FROM $wpdb->posts wp
					WHERE wp.post_type = %s",
					'syncing_rai_yacht'
				)
	        );

	        if ($count_of_synced > $this->low_count) {
		       	$wpdb->query( 
					$wpdb->prepare( 
						"DELETE wp FROM $wpdb->posts wp
						WHERE wp.post_type = %s",
						'rai_yacht'
					)
				);

				/*$wpdb->query( 
					$wpdb->prepare( 
						"DELETE p FROM $wpdb->posts p
						INNER JOIN $wpdb->postmeta AS pm ON p.ID = pm.post_id 
						WHERE p.post_type = %s AND pm.meta_key = 'Touched_InSync' AND pm.meta_value = '0'",
						'rai_yacht'
					)
				);*/

				$this->pdf_cleanup();

				$wpdb->query(
					"DELETE pm FROM $wpdb->postmeta pm 
					LEFT JOIN $wpdb->posts wp ON wp.ID = pm.post_id 
					WHERE wp.ID IS NULL"
				);
	        

				return true;
	        }

	        return false;
		}

		public function clean_up_brokerage_only() {
	        global $wpdb;

	      	// Check if boats are in the syncing-post-type to be moved before we delete. 
	        $count_of_synced = $wpdb->get_var(
	        	$wpdb->prepare( 
					"SELECT COUNT(*) FROM $wpdb->posts wp
					WHERE wp.post_type = %s",
					'syncing_rai_yacht'
				)
	        );

	        if ($count_of_synced > 0) {

	        	var_dump('ping');

		       	$wpdb->query( 
					$wpdb->prepare( 
						"DELETE wp FROM $wpdb->posts wp 
						LEFT JOIN $wpdb->postmeta pm ON pm.post_id = wp.ID 
						WHERE wp.post_type = %s AND pm.meta_key = %s AND pm.meta_value = '1'", 
						'rai_yacht',
						'CompanyBoat'
					)
				);

				$this->pdf_cleanup();
	        	
	        	var_dump('ping2');

				$wpdb->query(
					"DELETE pm FROM $wpdb->postmeta pm 
					LEFT JOIN $wpdb->posts wp ON wp.ID = pm.post_id 
					WHERE wp.ID IS NULL"
				);

	        	var_dump('ping3');

	        	return true;
			}

			return false;
		}

		public function pdf_cleanup() {
			global $wpdb;

			$pdfs = $wpdb->get_col("
				SELECT pm.meta_value 
				FROM {$wpdb->postmeta} pm
				LEFT JOIN {$wpdb->posts} wp ON wp.ID = pm.post_id
				WHERE pm.meta_key = 'YSP_PDF_URL' AND pm.meta_value IS NOT NULL AND pm.meta_value != '' AND wp.ID IS NULL");

			foreach ($pdfs as $file) {
				$phase_url = parse_url($file, PHP_URL_PATH);

				$urlIsStillNeeded = $wpdb->get_var("
					SELECT pm.meta_value  
					FROM {$wpdb->postmeta} pm
					LEFT JOIN {$wpdb->posts} wp ON wp.ID = pm.post_id
					WHERE wp.post_type = 'syncing_rai_yacht' AND pm.meta_key = 'YSP_PDF_URL' AND pm.meta_value = '{$file}'
				");

				if ($urlIsStillNeeded == null) {
					//var_dump($file);
					$this->BrochureCleanUp->remove( $phase_url );
				}				
			}
		}
		
		public function move_over() {
	        global $wpdb;	        

	        $wpdb->update($wpdb->posts, ['post_type'=>'rai_yacht'], ['post_type' => 'syncing_rai_yacht'], ['%s'], ['%s'] );

		}

		public function run() {
           
           	$boats_com_api_global_key = $this->options->get('boats_com_api_global_key');
           	$boats_com_api_global_key_2 = $this->options->get('boats_com_api_global_key_2');

			$boats_com_api_brokerage_key = $this->options->get('boats_com_api_brokerage_key');
			$boats_com_api_brokerage_key_2 = $this->options->get('boats_com_api_brokerage_key_2');
			
			$yacht_broker_org_api_token = $this->options->get('yacht_broker_org_api_token');

			$this->pre_clean_up();

			$resultsOfSync=[];

			// @ToDo For Loop the Runs  
			// KEEP THIS IN THIS ORDER
			if (! empty($boats_com_api_global_key)) {
				$resultsOfSync[]=$this->ImportGlobalBoatsCom->run();
			}

			if (! empty($boats_com_api_global_key_2)) {
				$resultsOfSync[]=$this->ImportGlobalBoatsCom2->run();
			}

			if (!empty($yacht_broker_org_api_token)) {
				$resultsOfSync[]=$this->ImportYachtBrokerOrg->run();
			}

			if (! empty($boats_com_api_brokerage_key)) {
				$resultsOfSync[]=$this->ImportBrokerageOnlyBoatsCom->run();
			}

			if (! empty($boats_com_api_brokerage_key_2)) {
				$resultsOfSync[]=$this->ImportBrokerageOnlyBoatsCom2->run();
			}

			if (! empty($yatco_api_token) && $yatco_api_token == 'fortheops') {
				$resultsOfSync[]=$this->ImportYatco->run();
			}
			
			var_dump($resultsOfSync);

			$syncHadIssue=false;

			foreach ($resultsOfSync as $syncR) {
				if (isset($syncR['error'])) {
					$syncHadIssue=true;
				}
			}

			if ($syncHadIssue == false) {
				$cleaned_up=$this->clean_up();
					
				if ($cleaned_up) {
					$this->move_over();				
					$this->AlertOnLowCount->email();	
					$this->AlertOnDiffCount->email();	
				}
				else {
					// EMAIL - AS SYNC FAILED DUE TO NOT MEETING THE REQUIREMENTS OF COUNT PROBILLY
					$this->emailSyncFailed();
				}
			} 
			else {
				$this->emailSyncFailed();
			}
		}
       

       	public function run_brokerage_only() {

 			$boats_com_api_brokerage_key = $this->options->get('boats_com_api_brokerage_key');
 			$boats_com_api_brokerage_key_2 = $this->options->get('boats_com_api_brokerage_key_2');
			
			$yacht_broker_org_api_token = $this->options->get('yacht_broker_org_api_token');

			$this->pre_clean_up();

			$resultsOfSync=[];
			
			// @ToDo For Loop the Runs  
			// KEEP THIS IN THIS ORDER
			if (! empty($yacht_broker_org_api_token)) {
				$resultsOfSync[]=$this->ImportYachtBrokerOrg->run();
			}

			if (! empty($boats_com_api_brokerage_key)) {
				$resultsOfSync[]=$this->ImportBrokerageOnlyBoatsCom->run();
			}

			if (! empty($boats_com_api_brokerage_key_2)) {
				$resultsOfSync[]=$this->ImportBrokerageOnlyBoatsCom2->run();
			}
			
			$syncHadIssue=false;

			foreach ($resultsOfSync as $syncR) {
				if (isset($syncR['error'])) {
					$syncHadIssue=true;
				}
			}

			if ($syncHadIssue == false) {
				$cleaned_up = $this->clean_up_brokerage_only();
			
				if ($cleaned_up) {
					$this->move_over();				
					$this->AlertOnLowCount->email();	
					$this->AlertOnDiffCount->email();	
				}
			}
			else {
				$this->emailSyncFailed();
			}

       	}


	}
