<?php
	#[AllowDynamicProperties]
	class YachtSyncPro_Yachts_NestedMetaSections {

		public function __construct() {
			
		}

		public function add_actions_and_filters() {

			add_action( 'add_meta_boxes', [ $this, 'nested_yachts_meta_boxes' ]);
			add_action( 'save_post_rai_yacht', [$this, 'rai_yacht_nested_data_save']);

		}

		public function nested_yachts_meta_boxes() {

			
			add_meta_box(
				'rai_yacht_sync_nested_meta_boxs',
				'Other Yacht Info',
				[ $this, 'nested_yacht_meta_box_html' ],
				['rai_yacht']
			);									
		}

		public function nested_yacht_meta_box_html($post) {
			include YSP_TEMPLATES_DIR.'/admin-nested-metabox-yacht-basics.php';
		}

		public function rai_yacht_nested_data_save($post_id) {
			if ( isset($_POST['is_yacht_manual_entry']) && $_POST['is_yacht_manual_entry'] == 'yes') {

				$general_boat_description = $_POST['General_Boat_Description'];

				update_post_meta($post_id, 'GeneralBoatDescription', [ $general_boat_description ]);

				$sales_rep = (object) [
					'PartyId' => $_POST['YSP_Sales_Rep_Party_ID'],
					'Name' => $_POST['YSP_Sales_Rep_Name']
				];

				update_post_meta($post_id, 'SalesRep', $sales_rep);

				$engines = [
					(object) [
						'Make' => $_POST['YSP_Engine_1_Make'],
						'Model' => $_POST['YSP_Engine_1_Model'],
						'Fuel' => $_POST['YSP_Engine_1_Fuel'],
						'EnginePower' => $_POST['YSP_Engine_1_EnginePower'],
						'Type' => $_POST['YSP_Engine_1_Type'],
						'Year' => $_POST['YSP_Engine_1_Year'],
						'Hours' => $_POST['YSP_Engine_1_Hours'],
						'BoatEngineLocationCode' => $_POST['YSP_Engine_1_Boat_Engine_Location_Code']
					],
					(object) [
						'Make' => $_POST['YSP_Engine_2_Make'],
						'Model' => $_POST['YSP_Engine_2_Model'],
						'Fuel' => $_POST['YSP_Engine_2_Fuel'],
						'EnginePower' => $_POST['YSP_Engine_2_EnginePower'],
						'Type' => $_POST['YSP_Engine_2_Type'],
						'Year' => $_POST['YSP_Engine_2_Year'],
						'Hours' => $_POST['YSP_Engine_2_Hours'],
						'BoatEngineLocationCode' => $_POST['YSP_Engine_2_Boat_Engine_Location_Code']
					]
				];

				update_post_meta($post_id, 'Engines', $engines);

				$images = [];

				for ($im=0; $im <= 19; $im++) {

					if (isset($_POST['YSP_Image_'.$im]) && !empty($_POST['YSP_Image_'.$im])) {
						$images[ $im ]=(object) [
							'Uri' => $_POST['YSP_Image_'.$im],
		 				];
					}

				}

				update_post_meta($post_id, 'Images', $images);
				
			}
		}


	}