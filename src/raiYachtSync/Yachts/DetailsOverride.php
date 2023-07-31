<?php
	class raiYachtSync_Yachts_DetailsOverride {
		public function __construct() {

		}

		public function add_actions_and_filters() {

			//add_filter('single_template', [$this, 'use_single_template'], 10, 1);

		}

		public function use_single_template($single_template) {

			global $post, $wp_query;

			if (is_singular('rai_yatch')) {
				$single_template = RAI_YS_PLUGIN_TEMPLATES_DIR.'/single-yacht.php';

			}

			return $single_template;

		}
	}