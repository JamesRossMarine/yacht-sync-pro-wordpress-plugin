<?php
	#[AllowDynamicProperties]
	class raiYachtSync_Yachts_MetaSections {

		public function __construct() {
			
		}

		public function add_actions_and_filters() {

			add_action( 'add_meta_boxes', [ $this, 'yachts_meta_boxes' ]);
			add_action( 'save_post', [$this, 'rai_yacht_data_save']);

		}

		public function yachts_meta_boxes() { 
			add_meta_box(
				'rai_yacht_sync_meta_box',
				'Yacht Info',
				[ $this, 'yacht_meta_box_html' ],
				['rai_yacht']
			);									
		}

		public function yacht_meta_box_html($post) {
			include RAI_YS_PLUGIN_TEMPLATES_DIR.'/admin-metabox-yacht-basics.php';		
		}

		public function rai_yacht_data_save($post_id) {
            $fields = [
		    'YSP_BeamFeet',
		    'YSP_BeamMeter',
		    'YSP_BrokerName',
		    'YSP_City',
		    'YSP_CountryID',
		    'YSP_State',
		    'YSP_EngineCount',
		    'YSP_EngineFuel',
		    'YSP_EngineHours',
		    'YSP_EngineModel',
		    'YSP_EnginePower',
		    'YSP_EngineType',
		    'NormPrice',
		    'YSP_EuroVal',
		    'YSP_Length',
		    'YSP_LOAFeet',
		    'YSP_LOAMeter',
		    'YSP_ListingDate',
		    'MakeString',
		    'Model',
		    'ModelYear',
		    'SalesStatus',
		    'BoatCategoryCode',
		    'BoatClassCode',
		    'HasHullID',
		    'BoatHullID',
		    'BoatHullMaterialCode',
		    'BoatName',
		    'CompanyBoat',
		    'CompanyName',
		    'DocumentID',
		    //'GeneralBoatDescription',
		    //'AdditionalDetailDescription',
		    'HeadsCountNumeric',
		    'FuelTankCapacityMeasure',
		    'FuelTankCountNumeric',
		    'FuelTankMaterialCode',
		    'HoldingTankCapacityMeasure',
		    'HoldingTankCountNumeric',
		    'HoldingTankMaterialCode',
		    'WaterTankCapacityMeasure',
		    'WaterTankCountNumeric',
		    'WaterTankMaterialCode',
		    'TotalEngineHoursNumberic',
		    'TotalEnginePowerQuantity'
		];

		foreach ($fields as $field) {
		    if (isset($_POST[$field])) {
		        update_post_meta($post_id, $field, $_POST[$field]);
		    }
		}


	}