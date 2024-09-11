<?php
	#[AllowDynamicProperties]
	class YachtSyncPro_CommandRedoYachtMetaDescriptions {
		protected $environment;

	    public function __construct( ) {
	        $this->environment = wp_get_environment_type();

			$this->ChatGPTYachtDescriptionVersionTwo = new YachtSyncPro_ChatGPTYachtDescriptionVersionTwo();
	    }

	    public function __invoke( $args ) {	
			global $wpdb;

			$delete_meta_desc = $wpdb->query( 
				$wpdb->prepare( 
					"DELETE pm FROM $wpdb->postmeta pm
					INNER JOIN $wpdb->posts AS p ON p.ID = pm.post_id 
					WHERE p.post_type = %s AND pm.meta_key = '_yoast_wpseo_metadesc'",
					'rai_yacht'
				)
			);

			$yachts = get_posts([
                'post_type' => 'rai_yacht',
                'posts_per_page' => -1,
            ]);

			foreach ($yachts as $yacht) {
				$meta = get_post_meta($yacht->ID);

		        foreach ($meta as $indexM => $valM) {
		            if (is_array($valM) && !isset($valM[1])) {
		                $meta[$indexM] = $valM[0];
		            }
		        }

		        $vessel = array_map("maybe_unserialize", $meta);

		        $vessel = (object) $vessel; 
				
				$_yoast_wpseo_metadesc = $this->ChatGPTYachtDescriptionVersionTwo->make_description(
					'Vessel Name - '.$vessel->ModelYear.' '.$vessel->MakeString.' '.$vessel->Model.' '.$vessel->BoatName. '. '.
					'Vessel Description - '.join(' ', $vessel->GeneralBoatDescription)
				);

				var_dump($yacht->ID);
				var_dump($_yoast_wpseo_metadesc);

				update_post_meta($yacht->ID, '_yoast_wpseo_metadesc', $_yoast_wpseo_metadesc);

			}

	    }
	}