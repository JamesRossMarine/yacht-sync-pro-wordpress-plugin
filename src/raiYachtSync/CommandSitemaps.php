<?php
	class raiYachtSync_CommandSitemaps {
		protected $environment;

	    public function __construct( ) {
	        $this->environment = wp_get_environment_type();

	        $this->mapsOfSearch = new raiYachtSync_SitemapsOfSearch();
	    }

	    public function __invoke( $args ) {	
			$this->mapsOfSearch->generateSitemap();
	    	
	        WP_CLI::log( 'COMPLETED SITEMAPS' );
	    }
	}