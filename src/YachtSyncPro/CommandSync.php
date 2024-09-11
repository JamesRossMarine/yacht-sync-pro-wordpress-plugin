<?php
	#[AllowDynamicProperties]
	class YachtSyncPro_CommandSync {
		protected $environment;

	    public function __construct( ) {
	        $this->environment = wp_get_environment_type();
	    }

	    public function __invoke( $args ) {	

		    $RunImports=new YachtSyncPro_RunImports();
			
		    $RunImports->run();

	        WP_CLI::log( 'COMPLETED SYNC' );
	    }
	}