<?php
	#[AllowDynamicProperties]
	class raiYachtSync_PostTypesMetaBoxes {

		public function __construct() {

		}

		public function add_actions_and_filters() {

			add_action( 'add_meta_boxes', [ $this, 'addRaiYachtMetaBoxes' ], 12);

		}

		public function addRaiYachtMetaBoxes() { 
			add_meta_box(
				'rai_yacht_sync_meta_box',
				'Yacht Sync',
				[ $this, 'raiYachtSyncMetaBoxCallback' ],
				'rai_yacht',
				'normal',
				'high'
			);									
		}

	}