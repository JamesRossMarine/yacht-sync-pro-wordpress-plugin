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
			$yacht_ysp_beam_feet = get_post_meta( $post->ID, 'YSP_BeamFeet', true );
			$yacht_ysp_beam_meter = get_post_meta( $post->ID, 'YSP_BeamMeter', true );
			$yacht_ysp_broker_name = get_post_meta( $post->ID, 'YSP_BrokerName', true );
			$yacht_ysp_city = get_post_meta( $post->ID, 'YSP_City', true );
			$yacht_ysp_country_id = get_post_meta( $post->ID, 'YSP_CountryID', true );
			$yacht_ysp_state = get_post_meta( $post->ID, 'YSP_State', true );
			$yacht_ysp_engine_count = get_post_meta( $post->ID, 'YSP_EngineCount', true );
			$yacht_ysp_engine_fuel = get_post_meta( $post->ID, 'YSP_EngineFuel', true );
			$yacht_ysp_engine_hours = get_post_meta( $post->ID, 'YSP_EngineHours', true );
			$yacht_ysp_engine_model = get_post_meta( $post->ID, 'YSP_EngineModel', true );
			$yacht_ysp_engine_power = get_post_meta( $post->ID, 'YSP_EnginePower', true );
			$yacht_ysp_engine_type = get_post_meta( $post->ID, 'YSP_EngineType', true );
			$yacht_norm_price = get_post_meta( $post->ID, 'NormPrice', true );
			$yacht_ysp_euro_val = get_post_meta( $post->ID, 'YSP_EuroVal', true );
			$yacht_ysp_loa_feet = get_post_meta( $post->ID, 'YSP_LOAFeet', true );
			$yacht_ysp_loa_meter = get_post_meta( $post->ID, 'YSP_LOAMeter', true );
			$yacht_ysp_length = get_post_meta( $post->ID, 'YSP_Length', true );
			$yacht_ysp_listing_date = get_post_meta( $post->ID, 'YSP_ListingDate', true );
			$yacht_make_string = get_post_meta( $post->ID, 'MakeString', true );
			$yacht_model = get_post_meta( $post->ID, 'Model', true );
			$yacht_model_year = get_post_meta( $post->ID, 'ModelYear', true );
			$yacht_sales_status = get_post_meta( $post->ID, 'SalesStatus', true );

			$yacht_additional_detail_description = get_post_meta( $post->ID, 'AdditionalDetailDescription', true );
			$yacht_boat_category_code = get_post_meta( $post->ID, 'BoatCategoryCode', true );
			$yacht_boat_class_code = get_post_meta( $post->ID, 'BoatClassCode', true );
			$yacht_has_boat_hull_id = get_post_meta( $post->ID, 'HasBoatHullID', true );
			$yacht_boat_hull_id = get_post_meta( $post->ID, 'BoatHullID', true );
			$yacht_boat_hull_material_code = get_post_meta( $post->ID, 'BoatHullMaterialCode', true );
			$yacht_boat_name = get_post_meta( $post->ID, 'BoatName', true );
			$yacht_company_boat = get_post_meta( $post->ID, 'CompanyBoat', true );
			$yacht_company_name = get_post_meta( $post->ID, 'CompanyName', true );
			$yacht_document_id = get_post_meta( $post->ID, 'DocumentID', true );
			$yacht_general_boat_description = get_post_meta( $post->ID, 'GeneralBoatDescription', true );
			$yacht_fuel_tank_capacity_measure = get_post_meta( $post->ID, 'FuelTankCapacityMeasure', true );
			$yacht_fuel_tank_count_numeric = get_post_meta( $post->ID, 'FuelTankCountNumeric', true );
			$yacht_fuel_tank_material_code = get_post_meta( $post->ID, 'FuelTankMaterialCode', true );
			$yacht_heads_count_numeric = get_post_meta( $post->ID, 'HeadsCountNumeric', true );
			$yacht_holding_tank_capacity_measure = get_post_meta( $post->ID, 'HoldingTankCapacityMeasure', true );
			$yacht_holding_tank_count_numeric = get_post_meta( $post->ID, 'HoldingTankCountNumeric', true );
			$yacht_holding_tank_material_code = get_post_meta( $post->ID, 'HoldingTankMaterialCode', true );
			$yacht_water_tank_capacity_measure = get_post_meta( $post->ID, 'WaterTankCapacityMeasure', true );
			$yacht_water_tank_count_numeric = get_post_meta( $post->ID, 'WaterTankCountNumeric', true );
			$yacht_water_tank_material_code = get_post_meta( $post->ID, 'WaterTankMaterialCode', true );
			$yacht_total_engine_hours_numeric = get_post_meta( $post->ID, 'TotalEngineHoursNumeric', true );
			$yacht_total_engine_power_quantity = get_post_meta( $post->ID, 'TotalEnginePowerQuantity', true );
			?>
			<label>Beam Measure (ft)</label>
			<input style="margin-bottom: 5px" type="number" name="YSP_BeamFeet" step="0.5" value="<?= $yacht_ysp_beam_feet ?>">
			<br>
			<label>Beam Measure (m)</label>
			<input style="margin-bottom: 5px" type="number" name="YSP_BeamMeter" step="0.5" value="<?= $yacht_ysp_beam_meter ?>">
			<br>
			<label>Broker Name</label>
			<input style="margin-bottom: 5px" type="text" name="YSP_BrokerName" value="<?= $yacht_ysp_broker_name ?>">
			<br>
			<label>Yacht City Name</label>
			<input style="margin-bottom: 5px" type="text" name="YSP_City" value="<?= $yacht_ysp_city ?>">
			<br>
			<label>Yacht Country Name</label>
			<input style="margin-bottom: 5px" type="text" name="YSP_CountryID" value="<?= $yacht_ysp_country_id ?>">
			<br>
			<label>Yacht State Name</label>
			<input style="margin-bottom: 5px" type="text" name="YSP_State" value="<?= $yacht_ysp_state ?>">
			<br>
			<label>Engine Count</label>
			<input style="margin-bottom: 5px" type="text" name="YSP_EngineCount" value="<?= $yacht_ysp_engine_count ?>">
			<br>
			<label>Engine Fuel</label>
			<input style="margin-bottom: 5px" type="text" name="YSP_EngineFuel" value="<?= $yacht_ysp_engine_fuel ?>">
			<br>
			<label>Engine Hours</label>
			<input style="margin-bottom: 5px" type="number" name="YSP_EngineHours" value="<?= $yacht_ysp_engine_hours ?>">
			<br>
			<label>Engine Model</label>
			<input style="margin-bottom: 5px" type="text" name="YSP_EngineModel" value="<?= $yacht_ysp_engine_model ?>">
			<br>
			<label>Engine Power</label>
			<input style="margin-bottom: 5px" type="text" name="YSP_EnginePower" value="<?= $yacht_ysp_engine_power ?>">
			<br>
			<label>Engine Type</label>
			<input style="margin-bottom: 5px" type="text" name="YSP_EngineType" value="<?= $yacht_ysp_engine_type ?>">
			<br>
			<label>Price (USD)</label>
			<input style="margin-bottom: 5px" type="number" name="NormPrice" value="<?= $yacht_norm_price ?>">
			<br>
			<label>Price (EUR)</label>
			<input style="margin-bottom: 5px" type="number" name="YSP_EuroVal" value="<?= $yacht_ysp_euro_val ?>">
			<br>
			<label>Length</label>
			<input style="margin-bottom: 5px" type="text" name="YSP_Length" value="<?= $yacht_ysp_length ?>">
			<br>
			<label>Overall Length (ft)</label>
			<input style="margin-bottom: 5px" type="number" name="YSP_LOAFeet" step="0.5" value="<?= $yacht_ysp_loa_feet ?>">
			<br>
			<label>Overall Length (m)</label>
			<input style="margin-bottom: 5px" type="number" name="YSP_LOAMeter" step="0.5" value="<?= $yacht_ysp_loa_meter ?>">
			<br>
			<label>Listing Date</label>
			<input style="margin-bottom: 5px" type="date" name="YSP_ListingDate" value="<?= $yacht_ysp_listing_date ?>">
			<br>
			<label>Make</label>
			<input style="margin-bottom: 5px" type="text" name="MakeString" value="<?= $yacht_make_string ?>">
			<br>
			<label>Model</label>
			<input style="margin-bottom: 5px" type="text" name="Model" value="<?= $yacht_model ?>">
			<br>
			<label>Year</label>
			<input style="margin-bottom: 5px" type="number" name="ModelYear" min="1900" max="<?= (string) date("Y") + 1 ?>" value="<?= $yacht_model_year ?>">
			<br>
			<label>Sales Status</label>
			<select style="margin-bottom: 5px" name="SalesStatus">
				<option value="Active" <?php if ($yacht_sales_status == "Active") echo "selected"; ?>>Active</option>
				<option value="SalePending" <?php if ($yacht_sales_status == "SalePending") echo "selected"; ?>>Sale Pending</option>
				<option value="Sold" <?php if ($yacht_sales_status == "Sold") echo "selected"; ?>>Sold</option>
			</select>
			<br>
			<label>Yacht Category</label>
			<input style="margin-bottom: 5px" type="text" name="BoatCategoryCode" value="<?= $yacht_boat_category_code ?>">
			<br>
			<label>Yacht Class</label>
			<input style="margin-bottom: 5px" type="text" name="BoatClassCode" value="<?= $yacht_boat_class_code ?>">
			<br>
			<label>Has Hull ID</label>
			<input style="margin-bottom: 5px" type="text" name="HasHullID" value="<?= $yacht_has_boat_hull_id ?>">
			<br>
			<label>Hull ID</label>
			<input style="margin-bottom: 5px" type="text" name="BoatHullID" value="<?= $yacht_boat_hull_id ?>">
			<br>
			<label>Hull Material</label>
			<input style="margin-bottom: 5px" type="text" name="BoatHullMaterialCode" value="<?= $yacht_boat_hull_material_code ?>">
			<br>
			<label>Yacht Name</label>
			<input style="margin-bottom: 5px" type="text" name="BoatName" value="<?= $yacht_boat_name ?>">
			<br>
			<label>Company Owned</label>
			<select style="margin-bottom: 5px" name="CompanyBoat">
				<option value="0" <?php if ($yacht_company_boat == "0") echo "selected"; ?>>No</option>
				<option value="1" <?php if ($yacht_company_boat == "1") echo "selected"; ?>>Yes</option>
			</select>
			<br>
			<label>Company Name</label>
			<input style="margin-bottom: 5px" type="text" name="CompanyName" value="<?= $yacht_company_name ?>">
			<br>
			<label>Document ID</label>
			<input style="margin-bottom: 5px" type="text" name="DocumentID" value="<?= $yacht_document_id ?>">
			<br>
			<label>General Description</label>
			<textarea style="margin-bottom: 5px" name="GeneralBoatDescription"><?= $yacht_general_boat_description ?></textarea>
			<br>
			<label>Additional Detail Description</label>
			<textarea style="margin-bottom: 5px" name="AdditionalDetailDescription"><?= $yacht_additional_detail_description ?></textarea>
			<br>
			<label>Heads Count</label>
			<input style="margin-bottom: 5px" type="number" name="HeadsCountNumeric" value="<?= $yacht_heads_count_numeric ?>">
			<br>
			<label>Fuel Tank Capacity</label>
			<input style="margin-bottom: 5px" type="text" name="FuelTankCapacityMeasure" value="<?= $yacht_fuel_tank_capacity_measure ?>">
			<br>
			<label>Fuel Tank Count</label>
			<input style="margin-bottom: 5px" type="text" name="FuelTankCountNumeric" value="<?= $yacht_fuel_tank_count_numeric ?>">
			<br>
			<label>Fuel Tank Material</label>
			<input style="margin-bottom: 5px" type="text" name="FuelTankMaterialCode" value="<?= $yacht_fuel_tank_material_code ?>">
			<br>
			<label>Holding Tank Capacity</label>
			<input style="margin-bottom: 5px" type="text" name="HoldingTankCapacityMeasure" value="<?= $yacht_holding_tank_capacity_measure ?>">
			<br>
			<label>Holding Tank Count</label>
			<input style="margin-bottom: 5px" type="text" name="HoldingTankCountNumeric" value="<?= $yacht_holding_tank_count_numeric ?>">
			<br>
			<label>Holding Tank Material</label>
			<input style="margin-bottom: 5px" type="text" name="HoldingTankMaterialCode" value="<?= $yacht_holding_tank_material_code ?>">
			<br>
			<label>Water Tank Capacity</label>
			<input style="margin-bottom: 5px" type="text" name="WaterTankCapacityMeasure" value="<?= $yacht_water_tank_capacity_measure ?>">
			<br>
			<label>Water Tank Count</label>
			<input style="margin-bottom: 5px" type="text" name="WaterTankCountNumeric" value="<?= $yacht_water_tank_count_numeric ?>">
			<br>
			<label>Water Tank Material</label>
			<input style="margin-bottom: 5px" type="text" name="WaterTankMaterialCode" value="<?= $yacht_water_tank_material_code ?>">
			<br>
			<label>Total Engine Hours</label>
			<input style="margin-bottom: 5px" type="number" name="TotalEngineHoursNumberic" value="<?= $yacht_total_engine_hours_numeric ?>">
			<br>
			<label>Total Engine Power Quantity</label>
			<input style="margin-bottom: 5px" type="text" name="TotalEnginePowerQuantity" value="<?= $yacht_total_engine_power_quantity ?>">
			<br>

		<?php
		
		}

		public function rai_yacht_data_save($post_id) {
            if ( isset($_POST['YSP_BeamFeet'])) {
                update_post_meta(
                    $post_id,
                    'YSP_BeamFeet',
                    $_POST['YSP_BeamFeet']
                );
            }
            if ( isset($_POST['YSP_BeamMeter'])) {
                update_post_meta(
                    $post_id,
                    'YSP_BeamMeter',
                    $_POST['YSP_BeamMeter']
                );
            }
            if ( isset($_POST['YSP_BrokerName'])) {
                update_post_meta(
                    $post_id,
                    'YSP_BrokerName',
                    $_POST['YSP_BrokerName']
                );
            }
            if ( isset($_POST['YSP_City'])) {
                update_post_meta(
                    $post_id,
                    'YSP_City',
                    $_POST['YSP_City']
                );
            }
			if ( isset($_POST['YSP_CountryID'])) {
                update_post_meta(
                    $post_id,
                    'YSP_CountryID',
                    $_POST['YSP_CountryID']
                );
            }
            if ( isset($_POST['YSP_State'])) {
                update_post_meta(
                    $post_id,
                    'YSP_State',
                    $_POST['YSP_State']
                );
            }
            if ( isset($_POST['YSP_EngineCount'])) {
                update_post_meta(
                    $post_id,
                    'YSP_EngineCount',
                    $_POST['YSP_EngineCount']
                );
            }
            if ( isset($_POST['YSP_EngineFuel'])) {
                update_post_meta(
                    $post_id,
                    'YSP_EngineFuel',
                    $_POST['YSP_EngineFuel']
                );
            }
            if ( isset($_POST['YSP_EngineHours'])) {
                update_post_meta(
                    $post_id,
                    'YSP_EngineHours',
                    $_POST['YSP_EngineHours']
                );
            }
			if ( isset($_POST['YSP_EngineModel'])) {
                update_post_meta(
                    $post_id,
                    'YSP_EngineModel',
                    $_POST['YSP_EngineModel']
                );
            }
			if ( isset($_POST['YSP_EnginePower'])) {
                update_post_meta(
                    $post_id,
                    'YSP_EnginePower',
                    $_POST['YSP_EnginePower']
                );
            }
			if ( isset($_POST['YSP_EngineType'])) {
                update_post_meta(
                    $post_id,
                    'YSP_EngineType',
                    $_POST['YSP_EngineType']
                );
            }
			if ( isset($_POST['NormPrice'])) {
                update_post_meta(
                    $post_id,
                    'NormPrice',
                    $_POST['NormPrice']
                );
            }
			if ( isset($_POST['NormPrice'])) {
                update_post_meta(
                    $post_id,
                    'NormPrice',
                    $_POST['NormPrice']
                );
            }
			if ( isset($_POST['YSP_EuroVal'])) {
                update_post_meta(
                    $post_id,
                    'YSP_EuroVal',
                    $_POST['YSP_EuroVal']
                );
            }
			if ( isset($_POST['YSP_Length'])) {
                update_post_meta(
                    $post_id,
                    'YSP_Length',
                    $_POST['YSP_Length']
                );
            }
			if ( isset($_POST['YSP_LOAFeet'])) {
                update_post_meta(
                    $post_id,
                    'YSP_LOAFeet',
                    $_POST['YSP_LOAFeet']
                );
            }
			if ( isset($_POST['YSP_LOAMeter'])) {
                update_post_meta(
                    $post_id,
                    'YSP_LOAMeter',
                    $_POST['YSP_LOAMeter']
                );
            }
			if ( isset($_POST['YSP_ListingDate'])) {
                update_post_meta(
                    $post_id,
                    'YSP_ListingDate',
                    $_POST['YSP_ListingDate']
                );
            }
			if ( isset($_POST['MakeString'])) {
                update_post_meta(
                    $post_id,
                    'MakeString',
                    $_POST['MakeString']
                );
            }
			if ( isset($_POST['Model'])) {
                update_post_meta(
                    $post_id,
                    'Model',
                    $_POST['Model']
                );
            }
			if ( isset($_POST['ModelYear'])) {
                update_post_meta(
                    $post_id,
                    'ModelYear',
                    $_POST['ModelYear']
                );
            }
			if ( isset($_POST['SalesStatus'])) {
                update_post_meta(
                    $post_id,
                    'SalesStatus',
                    $_POST['SalesStatus']
                );
            }
			if ( isset($_POST['BoatCategoryCode'])) {
                update_post_meta(
                    $post_id,
                    'BoatCategoryCode',
                    $_POST['BoatCategoryCode']
                );
            }
			if ( isset($_POST['BoatClassCode'])) {
                update_post_meta(
                    $post_id,
                    'BoatClassCode',
                    $_POST['BoatClassCode']
                );
            }
			if ( isset($_POST['HasHullID'])) {
                update_post_meta(
                    $post_id,
                    'HasHullID',
                    $_POST['HasHullID']
                );
            }
			if ( isset($_POST['BoatHullID'])) {
                update_post_meta(
                    $post_id,
                    'BoatHullID',
                    $_POST['BoatHullID']
                );
            }
			if ( isset($_POST['BoatHullMaterialCode'])) {
                update_post_meta(
                    $post_id,
                    'BoatHullMaterialCode',
                    $_POST['BoatHullMaterialCode']
                );
            }
			if ( isset($_POST['BoatName'])) {
                update_post_meta(
                    $post_id,
                    'BoatName',
                    $_POST['BoatName']
                );
            }
			if ( isset($_POST['CompanyBoat'])) {
                update_post_meta(
                    $post_id,
                    'CompanyBoat',
                    $_POST['CompanyBoat']
                );
            }
			if ( isset($_POST['CompanyName'])) {
                update_post_meta(
                    $post_id,
                    'CompanyName',
                    $_POST['CompanyName']
                );
            }
			if ( isset($_POST['DocumentID'])) {
                update_post_meta(
                    $post_id,
                    'DocumentID',
                    $_POST['DocumentID']
                );
            }
			if ( isset($_POST['GeneralBoatDescription'])) {
                update_post_meta(
                    $post_id,
                    'GeneralBoatDescription',
                    $_POST['GeneralBoatDescription']
                );
            }
			if ( isset($_POST['AdditionalDetailDescription'])) {
                update_post_meta(
                    $post_id,
                    'AdditionalDetailDescription',
                    $_POST['AdditionalDetailDescription']
                );
            }
			if ( isset($_POST['HeadsCountNumeric'])) {
                update_post_meta(
                    $post_id,
                    'HeadsCountNumeric',
                    $_POST['HeadsCountNumeric']
                );
            }
			if ( isset($_POST['FuelTankCapacityMeasure'])) {
                update_post_meta(
                    $post_id,
                    'FuelTankCapacityMeasure',
                    $_POST['FuelTankCapacityMeasure']
                );
            }
			if ( isset($_POST['FuelTankCapacityMeasure'])) {
                update_post_meta(
                    $post_id,
                    'FuelTankCapacityMeasure',
                    $_POST['FuelTankCapacityMeasure']
                );
            }
			if ( isset($_POST['FuelTankCountNumeric'])) {
				update_post_meta(
					$post_id,
					'FuelTankCountNumeric',
					$_POST['FuelTankCountNumeric']
				);
			}
			if ( isset($_POST['FuelTankMaterialCode'])) {
				update_post_meta(
					$post_id,
					'FuelTankMaterialCode',
					$_POST['FuelTankMaterialCode']
				);
			}
			if ( isset($_POST['HoldingTankCapacityMeasure'])) {
				update_post_meta(
					$post_id,
					'HoldingTankCapacityMeasure',
					$_POST['HoldingTankCapacityMeasure']
				);
			}
			if ( isset($_POST['HoldingTankCountNumeric'])) {
				update_post_meta(
					$post_id,
					'HoldingTankCountNumeric',
					$_POST['HoldingTankCountNumeric']
				);
			}
			if ( isset($_POST['HoldingTankMaterialCode'])) {
				update_post_meta(
					$post_id,
					'HoldingTankMaterialCode',
					$_POST['HoldingTankMaterialCode']
				);
			}
			if ( isset($_POST['WaterTankCapacityMeasure'])) {
				update_post_meta(
					$post_id,
					'WaterTankCapacityMeasure',
					$_POST['WaterTankCapacityMeasure']
				);
			}
			if ( isset($_POST['WaterTankCountNumeric'])) {
				update_post_meta(
					$post_id,
					'WaterTankCountNumeric',
					$_POST['WaterTankCountNumeric']
				);
			}
			if ( isset($_POST['WaterTankMaterialCode'])) {
				update_post_meta(
					$post_id,
					'WaterTankMaterialCode',
					$_POST['WaterTankMaterialCode']
				);
			}
			if ( isset($_POST['TotalEngineHoursNumberic'])) {
				update_post_meta(
					$post_id,
					'TotalEngineHoursNumberic',
					$_POST['TotalEngineHoursNumberic']
				);
			}
			if ( isset($_POST['TotalEnginePowerQuantity'])) {
				update_post_meta(
					$post_id,
					'TotalEnginePowerQuantity',
					$_POST['TotalEnginePowerQuantity']
				);
			}
        }

	}