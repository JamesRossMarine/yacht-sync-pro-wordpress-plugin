<?php
	#[AllowDynamicProperties]
	class YachtSyncPro_YoastFun_SitemapPriority {

		public function __construct() {
		}
	
		public function add_actions_and_filters() {
			add_filter( 'wpseo_xml_sitemap_post_priority', [$this, 'xml_priority'], 10, 3 );
		}

		public function xml_priority( $return, $type, $post) {
		    if ($type == 'rai_yacht') {
		   		$CompanyBoat = get_post_meta($post->ID, 'CompanyBoat', true);

		   		if ($CompanyBoat === 1) {
		    		$return = 0.8;
		   		}
		   		else {
		    		$return = 0.7;
		   		}		   
		    }
		    elseif ($type == 'rai_team') {
		    	$return = 0.8;
		    }

		    return $return;
		}
	}