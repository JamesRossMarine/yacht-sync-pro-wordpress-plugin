<?php

    $yacht_ysp_general_boat_description = get_post_meta( $post->ID, 'General_Boat_Description', true );
    $yacht_ysp_sales_rep_party_id = get_post_meta( $post->ID, 'YSP_Sales_Rep_Party_ID', true );
    $yacht_ysp_sales_rep_name = get_post_meta($post->ID, 'YSP_Sales_Rep_Name', true);

    $yacht_ysp_engine_1_make = get_post_meta( $post->ID, 'YSP_Engine_1_Make', true );
    $yacht_ysp_engine_1_model = get_post_meta( $post->ID, 'YSP_Engine_1_Model', true );
    $yacht_ysp_engine_1_fuel = get_post_meta( $post->ID, 'YSP_Engine_1_Fuel', true );
    $yacht_ysp_engine_1_engine_power = get_post_meta( $post->ID, 'YSP_Engine_1_Engine_Power', true );
    $yacht_ysp_engine_1_type = get_post_meta( $post->ID, 'YSP_Engine_1_Type', true );

    $yacht_ysp_engine_2_make = get_post_meta( $post->ID, 'YSP_Engine_2_Make', true );
    $yacht_ysp_engine_2_model = get_post_meta( $post->ID, 'YSP_Engine_2_Model', true );
    $yacht_ysp_engine_2_fuel = get_post_meta( $post->ID, 'YSP_Engine_2_Fuel', true );
    $yacht_ysp_engine_2_engine_power = get_post_meta( $post->ID, 'YSP_Engine_2_Engine_Power', true );
    $yacht_ysp_engine_2_type = get_post_meta( $post->ID, 'YSP_Engine_2_Type', true );

    $yacht_ysp_image_1 = get_post_meta( $post->ID, 'YSP_Image_1', true );
    $yacht_ysp_image_2 = get_post_meta( $post->ID, 'YSP_Image_2', true );
    $yacht_ysp_image_3 = get_post_meta( $post->ID, 'YSP_Image_3', true );
    $yacht_ysp_image_4 = get_post_meta( $post->ID, 'YSP_Image_4', true );
    $yacht_ysp_image_5 = get_post_meta( $post->ID, 'YSP_Image_5', true );
    $yacht_ysp_image_6 = get_post_meta( $post->ID, 'YSP_Image_6', true );
    $yacht_ysp_image_7 = get_post_meta( $post->ID, 'YSP_Image_7', true );
    $yacht_ysp_image_8 = get_post_meta( $post->ID, 'YSP_Image_8', true );
    $yacht_ysp_image_9 = get_post_meta( $post->ID, 'YSP_Image_9', true );
    $yacht_ysp_image_10 = get_post_meta( $post->ID, 'YSP_Image_10', true );
    $yacht_ysp_image_11 = get_post_meta( $post->ID, 'YSP_Image_11', true );
    $yacht_ysp_image_12 = get_post_meta( $post->ID, 'YSP_Image_12', true );
    $yacht_ysp_image_13 = get_post_meta( $post->ID, 'YSP_Image_13', true );
    $yacht_ysp_image_14 = get_post_meta( $post->ID, 'YSP_Image_14', true );
    $yacht_ysp_image_15 = get_post_meta( $post->ID, 'YSP_Image_15', true );
    $yacht_ysp_image_16 = get_post_meta( $post->ID, 'YSP_Image_16', true );
    $yacht_ysp_image_17 = get_post_meta( $post->ID, 'YSP_Image_17', true );
    $yacht_ysp_image_18 = get_post_meta( $post->ID, 'YSP_Image_18', true );
    $yacht_ysp_image_19 = get_post_meta( $post->ID, 'YSP_Image_19', true );
    $yacht_ysp_image_20 = get_post_meta( $post->ID, 'YSP_Image_20', true );
?>


<div id="yacht-nested-metabox-basics">
    <div class="metafield">
        <label>General Boat Description</label>
        <input type="text" name="General_Boat_Description" value="<?= $yacht_ysp_general_boat_description ?>">
    </div>
    <div class="metafield">
        <label>YSP Sales Rep Party ID</label>
        <input type="text" name="YSP_Sales_Rep_Party_ID" value="<?= $yacht_ysp_sales_rep_party_id ?>">
    </div>
    <div class="metafield">
        <label>YSP Sales Rep Name</label>
        <input type="text" name="YSP_Sales_Rep_Name" value="<?= $yacht_ysp_sales_rep_name ?>">
    </div>
    <div class="metafield">
        <label>YSP Engine 1 Make</label>
        <input type="text" name="YSP_Engine_1_Make" value="<?= $yacht_ysp_engine_1_make ?>">
    </div>
    <div class="metafield">
        <label>YSP Engine 1 Model</label>
        <input type="text" name="YSP_Engine_1_Model" value="<?= $yacht_ysp_engine_1_model ?>">
    </div>
    <div class="metafield">
        <label>YSP Engine 1 Fuel</label>
        <input type="text" name="YSP_Engine_1_Fuel" value="<?= $yacht_ysp_engine_1_fuel ?>">
    </div>
    <div class="metafield">
        <label>YSP Engine 1 Engine Power</label>
        <input type="text" name="YSP_Engine_1_Engine_Power" value="<?= $yacht_ysp_engine_1_engine_power ?>">
    </div>
    <div class="metafield">
        <label>YSP Engine 1 Type</label>
        <input type="text" name="YSP_Engine_1_Type" value="<?= $yacht_ysp_engine_1_type ?>">
    </div>
    <div class="metafield">
        <label>YSP Engine 1 Year</label>
        <input type="text" name="YSP_Engine_1_Year" value="<?= $yacht_ysp_engine_1_type ?>">
    </div>
    <div class="metafield">
        <label>YSP Engine 1 Hours</label>
        <input type="text" name="YSP_Engine_1_Hours" value="<?= $yacht_ysp_engine_1_type ?>">
    </div>
    <div class="metafield">
        <label>YSP Engine 1 Boat Engine Location Code</label>
        <input type="text" name="YSP_Engine_1_Boat_Engine_Location_Code" value="<?= $yacht_ysp_engine_1_type ?>">
    </div>
    <div class="metafield">
        <label>YSP Engine 2 Make</label>
        <input type="text" name="YSP_Engine_2_Make" value="<?= $yacht_ysp_engine_2_make ?>">
    </div>
    <div class="metafield">
        <label>YSP Engine 2 Model</label>
        <input type="text" name="YSP_Engine_2_Model" value="<?= $yacht_ysp_engine_2_model ?>">
    </div>
    <div class="metafield">
        <label>YSP Engine 2 Fuel</label>
        <input type="text" name="YSP_Engine_2_Fuel" value="<?= $yacht_ysp_engine_2_fuel ?>">
    </div>
    <div class="metafield">
        <label>YSP Engine 2 Engine Power</label>
        <input type="text" name="YSP_Engine_2_Engine_Power" value="<?= $yacht_ysp_engine_2_engine_power ?>">
    </div>
    <div class="metafield">
        <label>YSP Engine 2 Type</label>
        <input type="text" name="YSP_Engine_2_Type" value="<?= $yacht_ysp_engine_2_type ?>">
    </div>
    <div class="metafield">
        <label>YSP Engine 2 Year</label>
        <input type="text" name="YSP_Engine_2_Year" value="<?= $yacht_ysp_engine_2_type ?>">
    </div>
    <div class="metafield">
        <label>YSP Engine 2 Hours</label>
        <input type="text" name="YSP_Engine_2_Hours" value="<?= $yacht_ysp_engine_2_type ?>">
    </div>
    <div class="metafield">
        <label>YSP Engine 2 Boat Engine Location Code</label>
        <input type="text" name="YSP_Engine_2_Boat_Engine_Location_Code" value="<?= $yacht_ysp_engine_2_type ?>">
    </div>
    <div class="metafield">
        <label>YSP Image 1</label>
        <input type="text" name="YSP_Image_1" value="<?= $yacht_ysp_image_1 ?>">
        <input type="button" value="Or Upload" id="ysp_image_1">
    </div>
    <div class="metafield">
        <label>YSP Image 2</label>
        <input type="text" name="YSP_Image_2" value="<?= $yacht_ysp_image_2 ?>">
    </div>
    <div class="metafield">
        <label>YSP Image 3</label>
        <input type="text" name="YSP_Image_3" value="<?= $yacht_ysp_image_3 ?>">
    </div>
    <div class="metafield">
        <label>YSP Image 4</label>
        <input type="text" name="YSP_Image_4" value="<?= $yacht_ysp_image_4 ?>">
    </div>
    <div class="metafield">
        <label>YSP Image 5</label>
        <input type="text" name="YSP_Image_5" value="<?= $yacht_ysp_image_5 ?>">
    </div>
    <div class="metafield">
        <label>YSP Image 6</label>
        <input type="text" name="YSP_Image_6" value="<?= $yacht_ysp_image_6 ?>">
    </div>
    <div class="metafield">
        <label>YSP Image 7</label>
        <input type="text" name="YSP_Image_7" value="<?= $yacht_ysp_image_7 ?>">
    </div>
    <div class="metafield">
        <label>YSP Image 8</label>
        <input type="text" name="YSP_Image_8" value="<?= $yacht_ysp_image_8 ?>">
    </div>
    <div class="metafield">
        <label>YSP Image 9</label>
        <input type="text" name="YSP_Image_9" value="<?= $yacht_ysp_image_9 ?>">
    </div>
    <div class="metafield">
        <label>YSP Image 10</label>
        <input type="text" name="YSP_Image_10" value="<?= $yacht_ysp_image_10 ?>">
    </div>
    <div class="metafield">
        <label>YSP Image 11</label>
        <input type="text" name="YSP_Image_11" value="<?= $yacht_ysp_image_11 ?>">
    </div>
    <div class="metafield">
        <label>YSP Image 12</label>
        <input type="text" name="YSP_Image_12" value="<?= $yacht_ysp_image_12 ?>">
    </div>
    <div class="metafield">
        <label>YSP Image 13</label>
        <input type="text" name="YSP_Image_13" value="<?= $yacht_ysp_image_13 ?>">
    </div>
    <div class="metafield">
        <label>YSP Image 14</label>
        <input type="text" name="YSP_Image_14" value="<?= $yacht_ysp_image_14 ?>">
    </div>
    <div class="metafield">
        <label>YSP Image 15</label>
        <input type="text" name="YSP_Image_15" value="<?= $yacht_ysp_image_15 ?>">
    </div>
    <div class="metafield">
        <label>YSP Image 16</label>
        <input type="text" name="YSP_Image_16" value="<?= $yacht_ysp_image_16 ?>">
    </div>
    <div class="metafield">
        <label>YSP Image 17</label>
        <input type="text" name="YSP_Image_17" value="<?= $yacht_ysp_image_17 ?>">
    </div>
    <div class="metafield">
        <label>YSP Image 18</label>
        <input type="text" name="YSP_Image_18" value="<?= $yacht_ysp_image_18 ?>">
    </div>
    <div class="metafield">
        <label>YSP Image 19</label>
        <input type="text" name="YSP_Image_19" value="<?= $yacht_ysp_image_19 ?>">
    </div>
    <div class="metafield">
        <label>YSP Image 20</label>
        <input type="text" name="YSP_Image_20" value="<?= $yacht_ysp_image_20 ?>">
    </div>
</div>


<style type="text/css">
	#yacht-nested-metabox-basics .metafield{
		display: block;
		margin-top: 10px;
		margin-bottom: 10px;
		padding-bottom: 10px;
		border-bottom: 1px solid #000;
	}

	#yacht-nested-metabox-basics .metafield label{
		display: block;
		margin-bottom: 10px;
	}

	#yacht-nested-metabox-basics .metafield input{
		display: block;
		width: 100%;
		max-width: 500px;

	}
    #yacht-nested-metabox-basics .metafield input[type="button"]{
        margin-top: 20px;
    }
</style>