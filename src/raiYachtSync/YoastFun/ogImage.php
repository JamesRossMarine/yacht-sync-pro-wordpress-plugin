<?php
	class raiYachtSync_YoastFun_ogImage {

		public function __construct() {
								
		}
	
		public function add_actions_and_filters() {
			add_action( 'wpseo_add_opengraph_images', [$this, 'add_images'], 10, 1 );

		}

		public function add_images($object) {
			global $wp_query, $post;


			if (is_singular('rai_yacht')) {
				$VesselImages=get_post_meta($post->ID, 'Images', true);

				$image = ['url' => $VesselImages[0]->Uri];

				$object->add_image( $image );
			}


		}
	}