<?php
	class raiYachtSync_Cron {


	    public function __construct() {
	    	
	    }

	    public function add_actions_and_filters() {

	    	add_action( 'init', [$this, 'cron_scheduler']);
	    	add_action( 'rai_cron_yacht_sync', [$this, 'run_cron_yacht_sync']);

	    }

	    public function cron_scheduler() {

	    	if ( ! wp_next_scheduled( 'rai_cron_yacht_sync' ) ) {
			    wp_schedule_event( time(), 'daily', 'rai_cron_yacht_sync' );
			}
	    	
	    }

	    public function run_cron_yacht_sync() {

	    	$RunImports=new raiYachtSync_RunImports();
			
		    $RunImports->run();

	    }
	}