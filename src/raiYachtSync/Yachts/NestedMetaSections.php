<?php
	#[AllowDynamicProperties]
	class raiYachtSync_Yachts_NestedMetaSections {

		public function __construct() {
			
		}

		public function add_actions_and_filters() {

			add_action( 'add_meta_boxes', [ $this, 'nested_yachts_meta_boxes' ]);
			add_action( 'save_post', [$this, 'rai_yacht_nested_data_save']);

		}

		public function nested_yachts_meta_boxes() { 
			add_meta_box(
				'rai_yacht_sync_nested_meta_box',
				'Other Yacht Info',
				[ $this, 'nested_yacht_meta_box_html' ],
				['rai_yacht']
			);									
		}

		public function nested_yacht_meta_box_html($post) {
			include RAI_YS_PLUGIN_TEMPLATES_DIR.'/admin-nested-metabox-yacht-basics.php';
		}

		public function rai_yacht_nested_data_save($post_id) {

			$general_boat_description = $_POST['General_Boat_Description'];

			update_post_meta($post_id, 'GeneralBoatDescription', $general_boat_description);

			$sales_rep = [
				'PartyId' => $_POST['YSP_Sales_Rep_Party_ID'],
				'Name' => $_POST['YSP_Sales_Rep_Name']
			];

			update_post_meta($post_id, 'SalesRep', $sales_rep);

			$engines = [
				[
					'Make' => $_POST['YSP_Engine_1_Make'],
					'Model' => $_POST['YSP_Engine_1_Model'],
					'Fuel' => $_POST['YSP_Engine_1_Fuel'],
					'EnginePower' => $_POST['YSP_Engine_1_EnginePower'],
					'Type' => $_POST['YSP_Engine_1_Type'],
					'Year' => $_POST['YSP_Engine_1_Year'],
					'Hours' => $_POST['YSP_Engine_1_Hours'],
					'BoatEngineLocationCode' => $_POST['YSP_Engine_1_Boat_Engine_Location_Code']
				],
				[
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

			$images = [
				0 => [
					'Uri' => $_POST['YSP_Image_1'],
				],
				1 => [
					'Uri' => $_POST['YSP_Image_2'],
				],
				2 => [
					'Uri' => $_POST['YSP_Image_3'],
				],
				3 => [
					'Uri' => $_POST['YSP_Image_4'],
				],
				4 => [
					'Uri' => $_POST['YSP_Image_5'],
				],
				5 => [
					'Uri' => $_POST['YSP_Image_6'],
				],
				6 => [
					'Uri' => $_POST['YSP_Image_7'],
				],
				7 => [
					'Uri' => $_POST['YSP_Image_8'],
				],
				8 => [
					'Uri' => $_POST['YSP_Image_9'],
				],
				9 => [
					'Uri' => $_POST['YSP_Image_10'],
				],
				10 => [
					'Uri' => $_POST['YSP_Image_11'],
				],
				11 => [
					'Uri' => $_POST['YSP_Image_12'],
				],
				12 => [
					'Uri' => $_POST['YSP_Image_13'],
				],
				13 => [
					'Uri' => $_POST['YSP_Image_14'],
				],
				14 => [
					'Uri' => $_POST['YSP_Image_15'],
				],
				15 => [
					'Uri' => $_POST['YSP_Image_16'],
				],
				16 => [
					'Uri' => $_POST['YSP_Image_17'],
				],
				17 => [
					'Uri' => $_POST['YSP_Image_18'],
				],
				18 => [
					'Uri' => $_POST['YSP_Image_19'],
				],
				19 => [
					'Uri' => $_POST['YSP_Image_20'],
				]
			];

			update_post_meta($post_id, 'Images', $images);
			
		}


	}