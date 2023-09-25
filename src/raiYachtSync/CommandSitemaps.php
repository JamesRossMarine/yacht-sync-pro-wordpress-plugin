<?php
	class raiYachtSync_CommandSitemap {
		protected $environment;

	    public function __construct( ) {
	        $this->environment = wp_get_environment_type();

	        $this->mapsOfSearch = new raiYachtSync_SitemapsOfSearch();
	    }

	    public function __invoke( $args ) {	

	    	
	        WP_CLI::log( 'COMPLETED SITEMAPS' );
	    }
	}