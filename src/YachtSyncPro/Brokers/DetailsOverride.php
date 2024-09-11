<?php
	#[AllowDynamicProperties]
	class YachtSyncPro_Brokers_DetailsOverride {
		public function __construct() {

		}

		public function add_actions_and_filters() {

			add_filter('single_template', [$this, 'use_single_template'], 10, 1);

		}

		public function use_single_template($single_template) {

			global $post, $wp_query;

			if (is_singular('rai_team')) {
				if ( ! file_exists(get_template_directory().'/single-rai_team.php')) {
					$single_template = YSP_TEMPLATES_DIR.'/single-broker.php';
				}

			}

			return $single_template;

		}
	}