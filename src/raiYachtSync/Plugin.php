<?php 
	class raiYachtSync_Plugin {

		static public $indicateActivated;

		public function __construct() {
			
			$this->AdminDashboard = new raiYachtSync_AdminDashboard_SettingsPanel();
			$this->StylesAndScripts = new raiYachtSync_StylesAndScripts();

			$this->PostTypes = new raiYachtSync_PostTypes();
			$this->RestApi = new raiYachtSync_RestApi();
			
			$this->YoastFun_OgImage = new raiYachtSync_YoastFun_ogImage();
			$this->YoastFun_Descriptions = new raiYachtSync_YoastFun_Descriptions();

			$this->Yachts_WpQueryAddon = new raiYachtSync_Yachts_WpQueryAddon();
			$this->Yachts_DetailOverride = new raiYachtSync_Yachts_DetailsOverride();
			$this->Yachts_Shortcode = new raiYachtSync_Shortcodes_YachtSearch();

			$this->Brokers_DetailOverride = new raiYachtSync_Brokers_DetailsOverride();
			$this->Brokers_MetaFields = new raiYachtSync_Brokers_MetaSections();
			$this->Brokers_Shortcodes = new raiYachtSync_Shortcodes_Brokers();

			$this->Commands = new raiYachtSync_AddCommands();
			$this->Crons = new raiYachtSync_Cron();
		}

		public function isInstalled() {
			//return $this->options->isInstalled();
		}

		public function install() {
			//	$this->installer->install();
		}

		public function upgrade() {
			# Cleanup and additions/subtractions pertaining to the version upgrade
			//$this->installer->installDatabaseTables();
		}

		public function activate() {
			// activation logic
			//self::$indicateActivated = $this->options->addOption('_activated', 1);

			//$this->installer->install();
			//$this->installer->installDatabaseTables();
		}

		public function deactivate() {
			//self::$indicateActivated = $this->options->deleteOption('_activated');
		}

		public function addActionsAndFilters() {
			
			foreach ($this as $this_key_value) {

				if (method_exists($this_key_value, 'add_actions_and_filters')) {

					$this_key_value->add_actions_and_filters();

				}

			}
		}
	}