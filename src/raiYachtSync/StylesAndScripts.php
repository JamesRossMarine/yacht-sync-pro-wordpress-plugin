<?php 

	#[AllowDynamicProperties]
	class raiYachtSync_StylesAndScripts {

		public function __construct() {
			
			$this->options = new raiYachtSync_Options();

		}

		public function add_actions_and_filters() {
			add_action( 'wp_enqueue_scripts' , [$this, 'enqueueGlobal']);
			add_action( 'wp_enqueue_scripts' , [$this, 'enqueueYachtDetails']);
			add_action( 'admin_enqueue_scripts', [$this, 'rudr_include_js'] );
		}

		function rudr_include_js() {
			
			if ( ! did_action( 'wp_enqueue_media' ) ) {
				wp_enqueue_media();
			}

			 wp_enqueue_script( 
				'ysp-admin', 
				RAI_YS_PLUGIN_ASSETS. 'js/admin.js',
				array( 'jquery' ),
				null
			);
		}
		
		public function pickedColorsFromWpAdmin() {

			$colorOne = $this->options->get('color_one');
			$colorTwo = $this->options->get('color_two');
			$colorThree = $this->options->get('color_three');
			$colorFour = $this->options->get('color_four');

			return "
				:root {
					--main-text-color: $colorOne;
					--main-background-color: $colorTwo;
					--secondary-text-color: $colorThree;
					--secondary-background-color: $colorFour;
				}
			";

		}

		public function pickedEuroMeterFromWpAdmin() {
			$euroMeterSetting = $this->options->get('is_euro_site');

			return "";
		}
		public function pickedComapnyName() {
			$companyName = $this->options->get('comapny_name');

			return "";
		}

		public function enqueueGlobal() {

			wp_register_style('yacht-sync-styles', RAI_YS_PLUGIN_ASSETS.'build/css/app-style.noMaps.css', false, null, false);
			wp_register_script('yacht-sync-script', RAI_YS_PLUGIN_ASSETS.'build/js/globalPlugin.noMaps.js', ['jquery'], null, true);
			
			wp_register_style('ysp-single-yacht-styles', RAI_YS_PLUGIN_ASSETS.'build/css/app-single-yacht.noMaps.css', false, null, false);
			wp_register_script('ysp-single-yacht-script', RAI_YS_PLUGIN_ASSETS.'build/js/appSingleYacht.noMaps.js', ['jquery'], null, true);

			$js_vars = [
				'wp_rest_url' => get_rest_url(),
				'assets_url' => RAI_YS_PLUGIN_ASSETS,
				'yacht_search_url' => get_permalink($this->options->get('yacht_search_page_id')),
				'europe_option_picked' => $this->options->get('is_euro_site'),
				'company_name' => $this->options->get('company_name'),
				'company_number' => $this->options->get('company_number'),
				'company_logo' => wp_get_attachment_image_url($this->options->get('company_logo')),
				'euro_c_c' => $this->options->get('euro_c_c')
			];

			wp_localize_script('yacht-sync-script', 'rai_yacht_sync', $js_vars); 

			wp_enqueue_script('yacht-sync-script');
			
			wp_enqueue_style('yacht-sync-styles');

			wp_add_inline_style('yacht-sync-styles', $this->pickedColorsFromWpAdmin());

			if (is_singular('rai_yacht')) {
				wp_enqueue_style("ysp-single-yacht-styles");
				wp_enqueue_script("ysp-single-yacht-script");
			}

		}

		public function enqueueYachtDetails() {


		}
	}