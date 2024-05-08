<?php
	#[AllowDynamicProperties]
	class raiYachtSync_PostTypesMetaBoxes {

		public function __construct() {
			
		}

		public function add_actions_and_filters() {

			add_action( 'add_meta_boxes', [ $this, 'add_rai_yachts_meta_boxes' ], 12);

		}

		public function add_rai_yachts_meta_boxes() { 
			add_meta_box(
				'rai_yacht_sync_meta_box',
				'Yacht Info',
				[ $this, 'rai_yacht_meta_box_callback' ],
				['rai_yacht']
			);									
		}

		public function rai_yacht_meta_box_callback() {

		}

	}