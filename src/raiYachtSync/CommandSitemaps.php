<?php
	class raiYachtSync_CommandSitemaps {
		protected $environment;

	    public function __construct( ) {
	        $this->environment = wp_get_environment_type();

	        $this->mapsOfSearch = new raiYachtSync_SitemapsOfSearch();
	    }

	    public function __invoke( $args ) {	
			$timestamp = microtime( true );
			WP_CLI::log( 'MY ASS CHECKER' );
			WP_CLI::log( 'Start time: ' . date( 'Y-m-d H:i:s', $timestamp ) );

			$this->mapsOfSearch->generateSitemap();

			$timestamp = microtime( true );
    		WP_CLI::log( 'End time: ' . date( 'Y-m-d H:i:s', $timestamp ) );
	    	
	        WP_CLI::log( 'COMPLETED SITEMAPS' );
	    }
	}