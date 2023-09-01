<?php
	class raiYachtSync_CommandSync {
		protected $environment;

	    public function __construct( ) {
	        $this->environment = wp_get_environment_type();
	    }

	    public function __invoke( $args ) {	

		    $RunImports=new raiYachtSync_RunImports();
			
		    $RunImports->run();

	        WP_CLI::log( 'COMPLETED SYNC' );
	    }
	}