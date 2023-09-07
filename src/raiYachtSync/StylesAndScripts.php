<?php 
	class raiYachtSync_StylesAndScripts {

		public function __construct() {
			
			$this->options = new raiYachtSync_Options();

		}

		public function add_actions_and_filters() {
			add_action( 'wp_enqueue_scripts' , [$this, 'enqueueGlobal']);

			add_action( 'wp_enqueue_scripts' , [$this, 'enqueueYachtDetails']);
		}
		
		public function pickedColorsFromWpAdmin() {

			$colorOne = $this->options->get('color_one');
			$colorTwo = $this->options->get('color_two');

			return "
				:root {
					--main-color: $colorOne;
					--secondary-color: $colorTwo;
				}
			";

		}
		public function enqueueGlobal() {

			wp_register_style('yacht-sync-styles', RAI_YS_PLUGIN_ASSETS.'build/css/app-style.css', false, null, false);
			wp_register_script('yacht-sync-script', RAI_YS_PLUGIN_ASSETS.'build/js/globalPlugin.js', ['jquery'], null, true);

			$js_vars = [
				'wp_rest_url' => get_rest_url(),
				'assets_url' => RAI_YS_PLUGIN_ASSETS,
				'yacht_search_url' => get_permalink($this->options->get('yacht_search_page_id'))
			];

			wp_localize_script('yacht-sync-script', 'rai_yacht_sync', $js_vars); 

			wp_enqueue_script('yacht-sync-script');
			wp_enqueue_style('yacht-sync-styles');

			// wp_add_inline_style('yacht-sync-styles', $this->pickedColorsFromWpAdmin());

		}

		public function enqueueYachtDetails() {


		}
	}