<?php
	class raiYachtSync_Cron {


	    public function __construct() {
	    	$this->options = new raiYachtSync_Options();
	    }

	    public function add_actions_and_filters() {

	    	add_action( 'init', [$this, 'cron_scheduler']);

	    	add_action( 'rai_cron_yacht_sync', [$this, 'run_cron_yacht_sync']);
	    	//add_action( 'rai_cron_yacht_sync_for_brokerage_only', [$this, 'run_cron_yacht_sync_for_brokerage_only']);
			add_action( 'rai_cron_euro_c_save', [$this, 'run_cron_euro_c_save']);

	    }

	    public function cron_scheduler() {
	
			if ( ! wp_next_scheduled( 'rai_cron_euro_c_save' ) ) {
			    wp_schedule_event( strtotime('02:00:00'), 'daily', 'rai_cron_euro_c_save' );
			}

	    	if ( ! wp_next_scheduled( 'rai_cron_yacht_sync' ) ) {
			    wp_schedule_event( strtotime('04:00:00'), 'daily', 'rai_cron_yacht_sync' );
			}

			if ( ! wp_next_scheduled( 'rai_cron_yacht_sync_brokerage_only' ) ) {
			    //wp_schedule_event( strtotime('10:00:00'), 'daily', 'rai_cron_yacht_sync_for_brokerage_only' );
			}
	    	
	    }

	    public function run_cron_yacht_sync() {

	    	$RunImports=new raiYachtSync_RunImports();
			
		    $RunImports->run();

	    }

	    public function run_cron_yacht_sync_for_brokerage_only() {

	    	$RunImports=new raiYachtSync_RunImports();
			
		    $RunImports->run_brokerage_only();

	    }

		public function run_cron_euro_c_save() {

			$apiUrl = 'http://api.exchangerate.host/live?access_key=ad455b3579ad64232171cc9a50087f6f&source=USD&symbols=EUR';
		
			$response = wp_remote_get($apiUrl, [
				
			]);
			
			$responseBody = wp_remote_retrieve_body($response);
			$responseCode = wp_remote_retrieve_response_code($response);
			
			$result = json_decode($responseBody);
			
			if (! is_wp_error($result) && $responseCode == 200) {
				if (isset($result->quotes)) {
					$this->options->update('euro_c_c', $result->quotes->USDEUR);
				}
				else {
					$this->options->update('euro_c_c', 0.92);
				}
			}
			else {
				$this->options->update('euro_c_c', 0.92);
			}

			$apiUrl = 'http://api.exchangerate.host/live?access_key=ad455b3579ad64232171cc9a50087f6f&source=EUR&symbols=USD';
		
			$response = wp_remote_get($apiUrl);
			$responseBody = wp_remote_retrieve_body($response);
			$responseCode = wp_remote_retrieve_response_code($response);
			
			$result = json_decode($responseBody);
			
			if (! is_wp_error($result) && $responseCode == 200) {
				if (isset($result->quotes)) {
					$this->options->update('usd_c_c', $result->quotes->EURUSD);
				}
				else {
					$this->options->update('usd_c_c', 1.08);
				}
			}
			else {
				$this->options->update('usd_c_c', 1.08);

			}

		}
	}