<?php
	#[AllowDynamicProperties]
	class YachtSyncPro_AlertOnDiffCount {

		public function __construct( ) {

	    	$this->options = new YachtSyncPro_Options();

	    	$this->who = $this->options->get('alert_emails');
	    	$this->low_count = 0;

	    }

	    public function countFromApi() {

	    	$brokerageInventoryUrl = 'https://api.boats.com/inventory/search?SalesStatus=Active,On-Order&key=';

			$key=$this->options->get('boats_com_api_brokerage_key');

			$brokerageInventoryUrl .= $key;

			$brokerageApiCall = wp_remote_get($brokerageInventoryUrl, ['timeout' => 120]);

				$brokerageApiCall['body']=json_decode($brokerageApiCall['body'], true);

				$api_status_code = wp_remote_retrieve_response_code($brokerageApiCall);

			if ($api_status_code == 200 && isset($brokerageApiCall['body']['numResults'])) {

				return $brokerageApiCall['body']['numResults'];

			}
			else {
				return false;
			}
	    }

	    public function email() {
	    	global $wpdb;

	    	$liveListingCount = $wpBrokerageCount = $wpdb->get_var( "
				SELECT COUNT(*) 
				FROM $wpdb->posts p 
				LEFT JOIN {$wpdb->postmeta} pm ON p.ID = pm.post_id
				WHERE p.post_type = 'rai_yacht' AND pm.meta_key = 'CompanyBoat' AND pm.meta_value = '1' 
			" );

	    	$apiListingCount = $this->countFromApi();

	        $already_scaned = get_transient('rai_teamage_lcd');

	    	if (! $already_scaned && $apiListingCount > $liveListingCount) {

	    		set_transient('rai_teamage_lcd', 'yes', 4 * HOUR_IN_SECONDS);

	    		$siteName = get_bloginfo('name');
	    		$siteUrl = get_bloginfo('url');

	    		$to = $this->who;

	    		$subject = $siteName . ' - Listing count for brokerage listings differents from API.';

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

	    }

	}