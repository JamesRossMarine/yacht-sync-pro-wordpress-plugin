<?php 
	class raiYachtSync_StylesAndScripts {

		public function __construct() {

		}

		public function add_actions_and_filters() {
			add_action( 'wp_enqueue_scripts' , [$this, 'enqueueGlobal']);

			add_action( 'wp_enqueue_scripts' , [$this, 'enqueueYachtDetails']);
		}

		public function enqueueGlobal() {

			wp_register_style('yacht-sync-styles', RAI_YS_PLUGIN_ASSETS.'build/css/app-style.css', false, null, false);
			wp_register_script('yacht-sync-script', RAI_YS_PLUGIN_ASSETS	.'build/js/globalPlugin.js', ['jquery'], null, true);

			wp_localize_script('yacht-sync-script', 'rayis_wp_rest_url', get_rest_url());

			$js_options = [
				
			];

			wp_localize_script('yatco-client-side', '_yacht_sync_wp_option', $js_options); 

			wp_enqueue_script('yacht-sync-styles');
			wp_enqueue_style('yacht-sync-script');

		}

		public function enqueueYachtDetails() {


		}
	}