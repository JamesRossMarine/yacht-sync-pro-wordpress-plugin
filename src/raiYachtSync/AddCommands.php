<?php
	class raiYachtSync_AddCommands {

		public function __construct() {

		}

		public function add_actions_and_filters() {		
			if ( defined( 'WP_CLI' ) && WP_CLI ) {
				WP_CLI::add_command( 'sync-yachts', 'raiYachtSync_CommandSync' );
			}
		}

	}