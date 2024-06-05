<?php 
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
<input type="number" name="YSP_BeamFeet" step="0.5" value="<?= $yacht_ysp_beam_feet ?>">
<br>
<label>Beam Measure (m)</label>
<input type="number" name="YSP_BeamMeter" step="0.5" value="<?= $yacht_ysp_beam_meter ?>">
<br>
<label>Broker Name</label>
<input type="text" name="YSP_BrokerName" value="<?= $yacht_ysp_broker_name ?>">
<br>
<label>Yacht City Name</label>
<input type="text" name="YSP_City" value="<?= $yacht_ysp_city ?>">
<br>
<label>Yacht Country Name</label>
<input type="text" name="YSP_CountryID" value="<?= $yacht_ysp_country_id ?>">
<br>
<label>Yacht State Name</label>
<input type="text" name="YSP_State" value="<?= $yacht_ysp_state ?>">
<br>
<label>Engine Count</label>
<input type="text" name="YSP_EngineCount" value="<?= $yacht_ysp_engine_count ?>">
<br>
<label>Engine Fuel</label>
<input type="text" name="YSP_EngineFuel" value="<?= $yacht_ysp_engine_fuel ?>">
<br>
<label>Engine Hours</label>
<input type="number" name="YSP_EngineHours" value="<?= $yacht_ysp_engine_hours ?>">
<br>
<label>Engine Model</label>
<input type="text" name="YSP_EngineModel" value="<?= $yacht_ysp_engine_model ?>">
<br>
<label>Engine Power</label>
<input type="text" name="YSP_EnginePower" value="<?= $yacht_ysp_engine_power ?>">
<br>
<label>Engine Type</label>
<input type="text" name="YSP_EngineType" value="<?= $yacht_ysp_engine_type ?>">
<br>
<label>Price (USD)</label>
<input type="number" name="NormPrice" value="<?= $yacht_norm_price ?>">
<br>
<label>Price (EUR)</label>
<input type="number" name="YSP_EuroVal" value="<?= $yacht_ysp_euro_val ?>">
<br>
<label>Length</label>
<input type="text" name="YSP_Length" value="<?= $yacht_ysp_length ?>">
<br>
<label>Overall Length (ft)</label>
<input type="number" name="YSP_LOAFeet" step="0.5" value="<?= $yacht_ysp_loa_feet ?>">
<br>
<label>Overall Length (m)</label>
<input type="number" name="YSP_LOAMeter" step="0.5" value="<?= $yacht_ysp_loa_meter ?>">
<br>
<label>Listing Date</label>
<input type="date" name="YSP_ListingDate" value="<?= $yacht_ysp_listing_date ?>">
<br>
<label>Make</label>
<input type="text" name="MakeString" value="<?= $yacht_make_string ?>">
<br>
<label>Model</label>
<input type="text" name="Model" value="<?= $yacht_model ?>">
<br>
<label>Year</label>
<input type="number" name="ModelYear" min="1900" max="<?= (string) date("Y") + 1 ?>" value="<?= $yacht_model_year ?>">
<br>
<label>Sales Status</label>
<select name="SalesStatus">
	<option value="Active" <?php if ($yacht_sales_status == "Active") echo "selected"; ?>>Active</option>
	<option value="SalePending" <?php if ($yacht_sales_status == "SalePending") echo "selected"; ?>>Sale Pending</option>
	<option value="Sold" <?php if ($yacht_sales_status == "Sold") echo "selected"; ?>>Sold</option>
</select>
<br>
<label>Yacht Category</label>
<input type="text" name="BoatCategoryCode" value="<?= $yacht_boat_category_code ?>">
<br>
<label>Yacht Class</label>
<input type="text" name="BoatClassCode" value="<?= $yacht_boat_class_code ?>">
<br>
<label>Has Hull ID</label>
<input type="text" name="HasHullID" value="<?= $yacht_has_boat_hull_id ?>">
<br>
<label>Hull ID</label>
<input type="text" name="BoatHullID" value="<?= $yacht_boat_hull_id ?>">
<br>
<label>Hull Material</label>
<input type="text" name="BoatHullMaterialCode" value="<?= $yacht_boat_hull_material_code ?>">
<br>
<label>Yacht Name</label>
<input type="text" name="BoatName" value="<?= $yacht_boat_name ?>">
<br>
<label>Company Owned</label>
<select name="CompanyBoat">
	<option value="0" <?php if ($yacht_company_boat == "0") echo "selected"; ?>>No</option>
	<option value="1" <?php if ($yacht_company_boat == "1") echo "selected"; ?>>Yes</option>
</select>
<br>
<label>Company Name</label>
<input type="text" name="CompanyName" value="<?= $yacht_company_name ?>">
<br>
<label>Document ID</label>
<input type="text" name="DocumentID" value="<?= $yacht_document_id ?>">
<br>
<label>Heads Count</label>
<input type="number" name="HeadsCountNumeric" value="<?= $yacht_heads_count_numeric ?>">
<br>
<label>Fuel Tank Capacity</label>
<input type="text" name="FuelTankCapacityMeasure" value="<?= $yacht_fuel_tank_capacity_measure ?>">
<br>
<label>Fuel Tank Count</label>
<input type="text" name="FuelTankCountNumeric" value="<?= $yacht_fuel_tank_count_numeric ?>">
<br>
<label>Fuel Tank Material</label>
<input type="text" name="FuelTankMaterialCode" value="<?= $yacht_fuel_tank_material_code ?>">
<br>
<label>Holding Tank Capacity</label>
<input type="text" name="HoldingTankCapacityMeasure" value="<?= $yacht_holding_tank_capacity_measure ?>">
<br>
<label>Holding Tank Count</label>
<input type="text" name="HoldingTankCountNumeric" value="<?= $yacht_holding_tank_count_numeric ?>">
<br>
<label>Holding Tank Material</label>
<input type="text" name="HoldingTankMaterialCode" value="<?= $yacht_holding_tank_material_code ?>">
<br>
<label>Water Tank Capacity</label>
<input type="text" name="WaterTankCapacityMeasure" value="<?= $yacht_water_tank_capacity_measure ?>">
<br>
<label>Water Tank Count</label>
<input type="text" name="WaterTankCountNumeric" value="<?= $yacht_water_tank_count_numeric ?>">
<br>
<label>Water Tank Material</label>
<input type="text" name="WaterTankMaterialCode" value="<?= $yacht_water_tank_material_code ?>">
<br>
<label>Total Engine Hours</label>
<input type="number" name="TotalEngineHoursNumberic" value="<?= $yacht_total_engine_hours_numeric ?>">
<br>
<label>Total Engine Power Quantity</label>
<input type="text" name="TotalEnginePowerQuantity" value="<?= $yacht_total_engine_power_quantity ?>">
<br>