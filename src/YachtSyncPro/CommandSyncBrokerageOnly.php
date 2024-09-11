<?php
	#[AllowDynamicProperties]
	class YachtSyncPro_CommandSyncBrokerageOnly {
		protected $environment;

	    public function __construct( ) {
	        $this->environment = wp_get_environment_type();
	    }

	    public function __invoke( $args ) {	

		    $RunImports=new YachtSyncPro_RunImports();
			
		    $RunImports->run_brokerage_only();

	        WP_CLI::log( 'COMPLETED BROKERAGE ONLY SYNC' );
	    }
	}