<?php
	class raiYachtSync_AddCommands {

		public function __construct() {

		}

		public function add_actions_and_filters() {		
			if ( defined( 'WP_CLI' ) && WP_CLI ) {
				WP_CLI::add_command( 'sync-yachts', 'raiYachtSync_CommandSync' );
				WP_CLI::add_command( 'sync-brokerage-only', 'raiYachtSync_CommandSyncBrokerageOnly' );
				WP_CLI::add_command( 'sitemap-generator', 'raiYachtSync_CommandSitemaps' );
			}
		}

	}