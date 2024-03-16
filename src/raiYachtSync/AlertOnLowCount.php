<?php
	class raiYachtSync_AlertOnLowCount {

		public function __construct( ) {

	    	$this->options = new raiYachtSync_Options();

	    	$this->who = $this->options->get('alert_emails');
	    	$this->low_count = $this->options->get('alert_on_low_count');

	    }


	    public function email() {
	    	global $wpdb;

	    	$liveListingCount = $wpdb->get_var(
	        	$wpdb->prepare( 
					"SELECT COUNT(*) FROM $wpdb->posts wp
					WHERE wp.post_type = %s",
					'rai_yacht'
				)
	        );

	        $already_scaned = get_transient('rai_listing_fell_below');

	    	if (! $already_scaned || $liveListingCount < $this->low_count) {

	    		set_transient('rai_listing_fell_below', 'yes', 4 * HOUR_IN_SECONDS);

	    		$siteName = get_bloginfo('name');
	    		$siteUrl = get_bloginfo('url');

	    		$to = $this->who;

	    		$subject = $siteName . ' - Listing count has dropped below the recommended amount.';

	    		$message = '<!DOCTYPE html><html><body>';
				$message .= '<h1>' . $subject . '</h1>';

				$message .= '<p></p>';

				$message .= '<a href="'. $siteUrl .'">'. $siteName .'</a>'; 
			
				$message .= '</body></html>';

	    		$headers = array(
					'Content-Type: text/html; charset=UTF-8',
				);
			
	    		$sent = wp_mail($to, $subject, $fullMessage, $headers);

	    		if ($sent) {
					return array('message' => 'Email sent successfully');
				} 
				else {
					return array('error' => 'Email failed to send');
				}
	    	}

	    }

	}