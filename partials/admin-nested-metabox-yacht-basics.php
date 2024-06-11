<?php

    $yacht_ysp_general_boat_description = get_post_meta( $post->ID, 'GeneralBoatDescription', true );

    $sales_rep = get_post_meta( $post->ID, 'SalesRep', true );

    $yacht_ysp_sales_rep_party_id = $sales_rep->PartyId;
    $yacht_ysp_sales_rep_name = $sales_rep->Name;

    $engines = get_post_meta( $post->ID, 'Engines', true );

    /*if(isset($engines[0])) {
        $yacht_ysp_engine_1_make = $engines[0]['Make'];
        $yacht_ysp_engine_1_model = $engines[0]['Model'];
        $yacht_ysp_engine_1_fuel = $engines[0]['Fuel'];
        $yacht_ysp_engine_1_engine_power = $engines[0]['EnginePower'];
        $yacht_ysp_engine_1_type = $engines[0]['Type'];
        $yacht_ysp_engine_1_year = $engines[0]['Year'];
        $yacht_ysp_engine_1_hours = $engines[0]['Hours'];
        $yacht_ysp_engine_1_boat_engine_location_code = $engines[0]['BoatEngineLocationCode'];
    }
    
    if(isset($engines[1])) {
        $yacht_ysp_engine_2_make = $engines[1]['Make'];
        $yacht_ysp_engine_2_model = $engines[1]['Model'];
        $yacht_ysp_engine_2_fuel = $engines[1]['Fuel'];
        $yacht_ysp_engine_2_engine_power = $engines[1]['EnginePower'];
        $yacht_ysp_engine_2_type = $engines[1]['Type'];
        $yacht_ysp_engine_2_year = $engines[1]['Year'];
        $yacht_ysp_engine_2_hours = $engines[1]['Hours'];
        $yacht_ysp_engine_2_boat_engine_location_code = $engines[1]['BoatEngineLocationCode'];
    }*/

    if(isset($engines[0])) {
        $yacht_ysp_engine_1_make = $engines[0]->Make;
        $yacht_ysp_engine_1_model = $engines[0]->Model;
        $yacht_ysp_engine_1_fuel = $engines[0]->Fuel;
        $yacht_ysp_engine_1_engine_power = $engines[0]->EnginePower;
        $yacht_ysp_engine_1_type = $engines[0]->Type;
        $yacht_ysp_engine_1_year = $engines[0]->Year;
        $yacht_ysp_engine_1_hours = $engines[0]->Hours;
        $yacht_ysp_engine_1_boat_engine_location_code = $engines[0]->BoatEngineLocationCode;
    }

    if(isset($engines[1])) {
        $yacht_ysp_engine_2_make = $engines[1]->Make;
        $yacht_ysp_engine_2_model = $engines[1]->Model;
        $yacht_ysp_engine_2_fuel = $engines[1]->Fuel;
        $yacht_ysp_engine_2_engine_power = $engines[1]->EnginePower;
        $yacht_ysp_engine_2_type = $engines[1]->Type;
        $yacht_ysp_engine_2_year = $engines[1]->Year;
        $yacht_ysp_engine_2_hours = $engines[1]->Hours;
        $yacht_ysp_engine_2_boat_engine_location_code = $engines[1]->BoatEngineLocationCode;
    }


    $images = get_post_meta( $post->ID, 'Images', true );

    $yacht_ysp_image_1 = $images[0]->Uri;
    $yacht_ysp_image_2 = $images[1]->Uri;
    $yacht_ysp_image_3 = $images[2]->Uri;
    $yacht_ysp_image_4 = $images[3]->Uri;
    $yacht_ysp_image_5 = $images[4]->Uri;
    $yacht_ysp_image_6 = $images[5]->Uri;
    $yacht_ysp_image_7 = $images[6]->Uri;
    $yacht_ysp_image_8 = $images[7]->Uri;
    $yacht_ysp_image_9 = $images[8]->Uri;
    $yacht_ysp_image_10 = $images[9]->Uri;
    $yacht_ysp_image_11 = $images[10]->Uri;
    $yacht_ysp_image_12 = $images[11]->Uri;
    $yacht_ysp_image_13 = $images[12]->Uri;
    $yacht_ysp_image_14 = $images[13]->Uri;
    $yacht_ysp_image_15 = $images[14]->Uri;
    $yacht_ysp_image_16 = $images[15]->Uri;
    $yacht_ysp_image_17 = $images[16]->Uri;
    $yacht_ysp_image_18 = $images[17]->Uri;
    $yacht_ysp_image_19 = $images[18]->Uri;
    $yacht_ysp_image_20 = $images[19]->Uri;
?>


<div id="yacht-nested-metabox-basics">
    <div class="metafield">
        <label>General Boat Description</label>
        <textarea name="General_Boat_Description" style="width: 100%; height: 300px;"><?= $yacht_ysp_general_boat_description[0] ?></textarea>
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
        <input type="text" name="YSP_Engine_1_Year" value="<?= $yacht_ysp_engine_1_year ?>">
    </div>
    <div class="metafield">
        <label>YSP Engine 1 Hours</label>
        <input type="text" name="YSP_Engine_1_Hours" value="<?= $yacht_ysp_engine_1_hours ?>">
    </div>
    <div class="metafield">
        <label>YSP Engine 1 Boat Engine Location Code</label>
        <input type="text" name="YSP_Engine_1_Boat_Engine_Location_Code" value="<?= $yacht_ysp_engine_1_boat_engine_location_code ?>">
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
        <input type="text" name="YSP_Engine_2_Year" value="<?= $yacht_ysp_engine_2_year ?>">
    </div>
    <div class="metafield">
        <label>YSP Engine 2 Hours</label>
        <input type="text" name="YSP_Engine_2_Hours" value="<?= $yacht_ysp_engine_2_hours ?>">
    </div>
    <div class="metafield">
        <label>YSP Engine 2 Boat Engine Location Code</label>
        <input type="text" name="YSP_Engine_2_Boat_Engine_Location_Code" value="<?= $yacht_ysp_engine_2_boat_engine_location_code ?>">
    </div>
    <div class="metafield">
        <label>YSP Image 1</label>
        <input type="text" name="YSP_Image_1" value="<?= $yacht_ysp_image_1 ?>">
        <input type="button" value="Or Upload" data-name="YSP_Image_1" class="ysp-manual-images-uploads">
    </div>
    <div class="metafield">
        <label>YSP Image 2</label>
        <input type="text" name="YSP_Image_2" value="<?= $yacht_ysp_image_2 ?>">
        <input type="button" value="Or Upload" data-name="YSP_Image_2" class="ysp-manual-images-uploads">
    </div>
    <div class="metafield">
        <label>YSP Image 3</label>
        <input type="text" name="YSP_Image_3" value="<?= $yacht_ysp_image_3 ?>">
        <input type="button" value="Or Upload" data-name="YSP_Image_3" class="ysp-manual-images-uploads">
    </div>
    <div class="metafield">
        <label>YSP Image 4</label>
        <input type="text" name="YSP_Image_4" value="<?= $yacht_ysp_image_4 ?>">
        <input type="button" value="Or Upload" data-name="YSP_Image_4" class="ysp-manual-images-uploads">
    </div>
    <div class="metafield">
        <label>YSP Image 5</label>
        <input type="text" name="YSP_Image_5" value="<?= $yacht_ysp_image_5 ?>">
        <input type="button" value="Or Upload" data-name="YSP_Image_5" class="ysp-manual-images-uploads">
    </div>
    <div class="metafield">
        <label>YSP Image 6</label>
        <input type="text" name="YSP_Image_6" value="<?= $yacht_ysp_image_6 ?>">
        <input type="button" value="Or Upload" data-name="YSP_Image_6" class="ysp-manual-images-uploads">
    </div>
    <div class="metafield">
        <label>YSP Image 7</label>
        <input type="text" name="YSP_Image_7" value="<?= $yacht_ysp_image_7 ?>">
        <input type="button" value="Or Upload" data-name="YSP_Image_7" class="ysp-manual-images-uploads">
    </div>
    <div class="metafield">
        <label>YSP Image 8</label>
        <input type="text" name="YSP_Image_8" value="<?= $yacht_ysp_image_8 ?>">
        <input type="button" value="Or Upload" data-name="YSP_Image_8" class="ysp-manual-images-uploads">
    </div>
    <div class="metafield">
        <label>YSP Image 9</label>
        <input type="text" name="YSP_Image_9" value="<?= $yacht_ysp_image_9 ?>">
        <input type="button" value="Or Upload" data-name="YSP_Image_9" class="ysp-manual-images-uploads">
    </div>
    <div class="metafield">
        <label>YSP Image 10</label>
        <input type="text" name="YSP_Image_10" value="<?= $yacht_ysp_image_10 ?>">
        <input type="button" value="Or Upload" data-name="YSP_Image_10" class="ysp-manual-images-uploads">
    </div>
    <div class="metafield">
        <label>YSP Image 11</label>
        <input type="text" name="YSP_Image_11" value="<?= $yacht_ysp_image_11 ?>">
        <input type="button" value="Or Upload" data-name="YSP_Image_11" class="ysp-manual-images-uploads">
    </div>
    <div class="metafield">
        <label>YSP Image 12</label>
        <input type="text" name="YSP_Image_12" value="<?= $yacht_ysp_image_12 ?>">
        <input type="button" value="Or Upload" data-name="YSP_Image_12" class="ysp-manual-images-uploads">
    </div>
    <div class="metafield">
        <label>YSP Image 13</label>
        <input type="text" name="YSP_Image_13" value="<?= $yacht_ysp_image_13 ?>">
        <input type="button" value="Or Upload" data-name="YSP_Image_13" class="ysp-manual-images-uploads">
    </div>
    <div class="metafield">
        <label>YSP Image 14</label>
        <input type="text" name="YSP_Image_14" value="<?= $yacht_ysp_image_14 ?>">
        <input type="button" value="Or Upload" data-name="YSP_Image_14" class="ysp-manual-images-uploads">
    </div>
    <div class="metafield">
        <label>YSP Image 15</label>
        <input type="text" name="YSP_Image_15" value="<?= $yacht_ysp_image_15 ?>">
        <input type="button" value="Or Upload" data-name="YSP_Image_15" class="ysp-manual-images-uploads">
    </div>
    <div class="metafield">
        <label>YSP Image 16</label>
        <input type="text" name="YSP_Image_16" value="<?= $yacht_ysp_image_16 ?>">
        <input type="button" value="Or Upload" data-name="YSP_Image_16" class="ysp-manual-images-uploads">
    </div>
    <div class="metafield">
        <label>YSP Image 17</label>
        <input type="text" name="YSP_Image_17" value="<?= $yacht_ysp_image_17 ?>">
        <input type="button" value="Or Upload" data-name="YSP_Image_17" class="ysp-manual-images-uploads">
    </div>
    <div class="metafield">
        <label>YSP Image 18</label>
        <input type="text" name="YSP_Image_18" value="<?= $yacht_ysp_image_18 ?>">
        <input type="button" value="Or Upload" data-name="YSP_Image_18" class="ysp-manual-images-uploads">
    </div>
    <div class="metafield">
        <label>YSP Image 19</label>
        <input type="text" name="YSP_Image_19" value="<?= $yacht_ysp_image_19 ?>">
        <input type="button" value="Or Upload" data-name="YSP_Image_19" class="ysp-manual-images-uploads">
    </div>
    <div class="metafield">
        <label>YSP Image 20</label>
        <input type="text" name="YSP_Image_20" value="<?= $yacht_ysp_image_20 ?>">
        <input type="button" value="Or Upload" data-name="YSP_Image_20" class="ysp-manual-images-uploads">
    </div>
</div>

<script type="text/javascript">

    // jQuery().each(function() {jQuery(this)
    jQuery('#yacht-nested-metabox-basics .ysp-manual-images-uploads').each(function() {
    
        jQuery(this).on('click', function(e) {
            e.preventDefault();

            // Uploading files
            let file_frame;

            // If the media frame already exists, reopen it.
            if (file_frame) {
                file_frame.open();
                return;
            }

            // Create the media frame.
            file_frame = wp.media.frames.file_frame = wp.media({
                title: jQuery(this).data('name'),
                button: {
                    text: 'select',
                },
                multiple: false // Set to true to allow multiple files to be selected
            });

            // When a file is selected, run a callback.
            file_frame.on('select', function(){
                // We set multiple to false so only get one image from the uploader
                let attachment = file_frame.state().get('selection').first().toJSON();

                let url = attachment.url;

                let name = jQuery(this).data('name');

                let field = document.querySelector('#yacht-nested-metabox-basics input[name="'+name+'"]');

                field.value = url; //set which variable you want the field to have
            });

            // Finally, open the modal
            file_frame.open();
        })
    });

</script>


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