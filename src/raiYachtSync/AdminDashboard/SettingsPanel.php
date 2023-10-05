<?php
	class raiYachtSync_AdminDashboard_SettingsPanel {

		const SLUG = 'rai_ys';

		public function __construct() {
			$this->fields = new raiYachtSync_AdminDashboard_Fields();

		}

		public function add_actions_and_filters() {

			add_action( 'admin_init', [$this, 'register_setting'] );
			add_action( 'admin_menu', [$this, 'add_options_page'] );

		}

		public function register_setting() {
			
			register_setting( self::SLUG, self::SLUG . '_boats_com_api_global_key');
			register_setting( self::SLUG, self::SLUG . '_boats_com_api_brokerage_key');
			register_setting( self::SLUG, self::SLUG . '_yacht_broker_org_api_token');
			register_setting( self::SLUG, self::SLUG . '_yacht_broker_org_id');

			register_setting( self::SLUG, self::SLUG . '_is_euro_site');

			register_setting( self::SLUG, self::SLUG . '_color_one');
			register_setting( self::SLUG, self::SLUG . '_color_two');
			register_setting( self::SLUG, self::SLUG . '_color_third');
			register_setting( self::SLUG, self::SLUG . '_color_four');

			register_setting( self::SLUG, self::SLUG . '_send_lead_to_this_email');

			register_setting( self::SLUG, self::SLUG . '_yacht_search_page_id');

			$this->fields->set_fields();
			
		}

		public function add_options_page() {

			add_options_page(
				'Yacht Sync Settings',
				'Yacht Sync',
				'manage_options',
				self::SLUG,
				
				array( $this, 'display_options_page' )
			);

		}

		public function display_options_page() {

			include_once RAI_YS_PLUGIN_TEMPLATES_DIR.'/admin-settings.php';
		
		}


	}