<?php

	class raiYachtSync_PostTypes {

		public function __construct() {

		}

		public function add_actions_and_filters() {

			add_action( 'init', [ $this, 'addPostTypes' ], 12);

		}

		public function addPostTypes() {
	
			register_post_type('rai_yatch', [

           		'labels' => array(
					'name' => 'Synced Yachts',
					'singular_name' => 'Yacht',
				),
				
				'has_archive' => false,
				//'query_var' => 'rai_yacht_id',

				'public' => true,
				'publicly_queryable' => true,
				'can_export' => false,

            ]);

			register_post_type('rai_soldyatch', [

           		'labels' => array(
					'name' => 'Sold Yachts',
					'singular_name' => 'Sold Yacht',
				),
				
				'has_archive' => false,
				//'query_var' => 'rai_yacht_id',

				'public' => true,
				'publicly_queryable' => true,
				'can_export' => false,

           ]);

           register_post_type('rai_broker', [

           		'labels' => array(
					'name' => 'Ross Brokers',
					'singular_name' => 'Broker',
				),
				
				'has_archive' => false,
				'query_var' => 'rai_broker_id',

				'public' => false,
				'publicly_queryable' => true,
				'can_export' => false,

           ]);

		}

	}