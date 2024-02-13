<?php get_header(); ?>

<?php
    foreach ($boats as $key => $boat_post) {
        $meta = get_post_meta($boat_post->ID);

        foreach ($meta as $indexM => $valM) {
            if (is_array($valM) && !isset($valM[1])) {
                $meta[$indexM] = $valM[0];
            }
        }

        $vessel = array_map("maybe_unserialize", $meta);
        $vessel = (object) $vessel;
        $boats[$key]->yacht = $vessel;
    }
    $YSP_Options = new raiYachtSync_Options();
    $YSP_logo = $YSP_Options->get('company_logo');
    $YSP_Comapny_logo = $YSP_Options->get('company_logo');
    $company_logo_url = wp_get_attachment_image_url($YSP_Comapny_logo, 'small');
?>
<div class="ysp-compare-yachts-container">
    <div class="ysp-compare-general-container">
        <div class="ysp-compare-logo-container">
            <img style="margin: auto;" src="<?php echo esc_url($company_logo_url); ?>" alt="Company Logo" style="height: 120px; width: 120px" />
        </div>
        <div class="ysp-compare-images-container">
            <div class="ysp-compare-title-container">
                <p>Yacht Compare Tool</p>
            </div>
            <div class="ysp-compare-images">
                <?php foreach ($boats as $boat_post) : ?>
                    <div class="ysp-compare-image">
                        <img src="<?php echo $boat_post->Images[0]->Uri; ?>" alt="Yacht Image" style="width: 100%; height: 100%" />
                    </div>
                <?php endforeach; ?>
            </div>
        </div>
    </div>
    
    <div class="ysp-yacht-compare-supporting-container">
        <div class="ysp-yacht-compare-keys">
            <p>Make</p>
            <p>Model</p>
            <p>Condition</p>
            <p>Price</p>
            <p>Class</p>
            <p>Construction</p>
            <p>Boat Hull ID</p>
            <p>Has Hull ID</p>
            <p>Year</p>
            <p>Lengp</p>
            <p>Beam</p>
            <p>Engine Make</p>
            <p>Model</p>
            <p>Fuel</p>
            <p>Engine Power</p>
            <p>Type</p>
            <p>Engine Hours</p>
        </div>
        <div class="ysp-compare-info">
            <?php foreach ($boats as $boat_post) : ?>
                <div class="ysp-yacht-compare-info">
                    <p><?php echo empty($vessel->MakeString) ? "N/A" : $vessel->MakeString; ?></p>
                    <p> <?php echo empty($vessel->Model) ? "N/A" : $vessel->Model; ?></p>
                    <p> <?php echo empty($vessel->SaleClassCode) ? "N/A" : $vessel->SaleClassCode; ?></p>
                    <p> $<?php echo empty($boat_post->Price) ? "N/A" : number_format(intval($boat_post->Price), 2); ?></p>
                    <p> <?php echo empty($vessel->BoatCategoryCode) ? "N/A" : $vessel->BoatCategoryCode; ?></p>
                    <p> <?php echo empty($vessel->BoatHullMaterialCode) ? "N/A" : $vessel->BoatHullMaterialCode; ?></p>
                    <p> <?php echo empty($vessel->BoatHullID) ? "N/A" : $vessel->BoatHullID; ?></span></p>
                    <p> <?php echo empty($vessel->HasBoatHullID) ? "No" : ($vessel->HasBoatHullID == '1' ? 'Yes' : "N/A");  ?></p>
                    <p> <?php echo $boat_post->ModelYear; ?></p>
                    <p> <?php echo empty($vessel->NominalLength) ? "N/A" : $vessel->NominalLength . " / " . round((float)$vessel->NominalLength * 0.3048, 2) . ' m'; ?></p>
                    <p> <?php echo (empty($vessel->BeamMeasure) ? 'N/A' : ($vessel->BeamMeasure . '/' . (number_format((substr($vessel->BeamMeasure, 0, -3) * 0.3048), 1) . ' m'))); ?></p>
                    <p> <span class="yacht-accordion-display-value"><?php echo empty($boat_post->Engines[0]->Make) ? "N/A" : $boat_post->Engines[0]->Make; ?></span></p>
                    <p> <span class="yacht-accordion-display-value"><?php echo empty($boat_post->Engines[0]->Model) ? "N/A" : $boat_post->Engines[0]->Model; ?></span></p>
                    <p> <span class="yacht-accordion-display-value"><?php echo empty($boat_post->Engines[0]->Fuel) ? "N/A" : $boat_post->Engines[0]->Fuel; ?></span></p>
                    <p> <span class="yacht-accordion-display-value"><?php echo empty($boat_post->Engines[0]->EnginePower) ? "N/A" : $boat_post->Engines[0]->EnginePower; ?></span></p>
                    <p> <span class="yacht-accordion-display-value"><?php echo empty($boat_post->Engines[0]->Type) ? "N/A" : $boat_post->Engines[0]->Type; ?></span></p>
                    <p> <span class="yacht-accordion-display-value"><?php echo empty($boat_post->Engines[0]->Hours) ? "N/A" : number_format(intval($boat_post->Engines[0]->Hours)); ?></span></p>
                    <a class="ysp-remove-button" href="<?php echo remove_query_arg($boat_post->ID, false); ?>" class="button-link">
                        Remove Yacht
                    </a>
                </div>
            <?php endforeach; ?>
        </div>
    </div>
</div>

<?php get_footer(); 