<?php
	class yatcoConnect_WpSeo_ogImage {

		public function __construct() {
			
			$this->data = new yatcoConnect_ApiToBoss();
			
			$this->option = new yatcoConnect_Options();

			// $this->VirtualPostTypeURL = new yatcoConnect_VirtualPostTypeURL();
						
		}
	
		public function add_actions_and_filters() {
			add_action( 'wpseo_add_opengraph_images', [$this, 'add_images'], 10, 1 );

		}

		public function add_images($object) {
			global $wp_query;


			if (is_singular('yatco_yachts')) {
				$vessel = $wp_query->queried_object->boss_data;

				$image = ['url' => $vessel->PhotoGallery[0]->mediumImageURL];

				$object->add_image( $image );
			}

			if (is_singular('yatco_charters')) {
				$vessel = $wp_query->queried_object->boss_data;

				$image = ['url' => $vessel->Photos[1]->mediumImageURL,];

				$object->add_image( $image );
			}

			if (is_singular('yatco_companies')) {
				$company = $wp_query->queried_object->boss_data;

				$image = $company->ImageMediumUrl;

				$object->add_image( $image );
			}

			if (is_singular('yatco_brokers')) {
				$broker = $wp_query->queried_object->boss_data;

				$image = $broker->ImageMediumUrl;

				$object->add_image( $image );
			}

		}
	}