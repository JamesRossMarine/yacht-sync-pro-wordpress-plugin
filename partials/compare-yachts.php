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
<div class="compare-yachts-container" style="display: flex; flex-direction: row; max-width: 1400px; margin: 80px 0px;">
    <table class="yacht-compare-table" style="display: flex; justify-content: space-between;">
        <thead>
            <tr style="display: flex; flex-direction: column;">
            <th style="height: 40vh; align-items: center; display: flex;"> <img style="margin: auto;" src="<?php echo esc_url($company_logo_url); ?>" alt="Company Logo" style="height: 120px; width: 120px" /> </th>
                <th>Make</th>
                <th>Model</th>
                <th>Condition</th>
                <th>Price</th>
                <th>Class</th>
                <th>Construction</th>
                <th>Boat Hull ID</th>
                <th>Has Hull ID</th>
                <th>Year</th>
                <th>Length</th>
                <th>Beam</th>
                <th>Engine Make</th>
                <th>Model</th>
                <th>Fuel</th>
                <th>Engine Power</th>
                <th>Type</th>
                <th>Engine Hours</th>
                <th>Remove</th>
            </tr>
        </thead>
        <tbody class="compare-info" style="display: flex; justify-content: space-between;">
            <?php foreach ($boats as $boat_post) : ?>
                <tr style="display: flex; flex-direction: column;">
                    <td class="compare-img">
                        <a href="<?php the_permalink($boat_post); ?>" >
                        <img style="width: 100%; height: 40vh;" src="<?php echo $boat_post->Images[0]->Uri; ?>">
                     </a>
                    </td>
                        <td><?php echo empty($vessel->MakeString) ? "N/A" : $vessel->MakeString; ?></td>
                        <td> <?php echo empty($vessel->Model) ? "N/A" : $vessel->Model; ?></td>
                        <td> <?php echo empty($vessel->SaleClassCode) ? "N/A" : $vessel->SaleClassCode; ?></td>
                        <td> $<?php echo $boat_post->Price; ?></td>
                        <td> <?php echo empty($vessel->BoatCategoryCode) ? "N/A" : $vessel->BoatCategoryCode; ?></td>
                        <td> <?php echo empty($vessel->BoatHullMaterialCode) ? "N/A" : $vessel->BoatHullMaterialCode; ?></td>
                        <td> <?php echo empty($vessel->BoatHullID) ? "N/A" : $vessel->BoatHullID; ?></span></td>
                        <td> <?php echo empty($vessel->HasBoatHullID) ? "No" : ($vessel->HasBoatHullID == '1' ? 'Yes' : "N/A");  ?></td>
                        <td> <?php echo $boat_post->ModelYear; ?></td>
                        <td> <?php echo empty($vessel->NominalLength) ? "N/A" : $vessel->NominalLength . " / " . round((float)$vessel->NominalLength * 0.3048, 2) . ' m'; ?></td>
                        <td> <?php echo (empty($vessel->BeamMeasure) ? 'N/A' : ($vessel->BeamMeasure . '/' . (number_format((substr($vessel->BeamMeasure, 0, -3) * 0.3048), 1) . ' m'))); ?></td>
                        <td> <span class="yacht-accordion-display-value"><?php echo empty($boat_post->Engines[0]->Make) ? "N/A" : $boat_post->Engines[0]->Make; ?></span></td>
                        <td> <span class="yacht-accordion-display-value"><?php echo empty($boat_post->Engines[0]->Model) ? "N/A" : $boat_post->Engines[0]->Model; ?></span></td>
                        <td> <span class="yacht-accordion-display-value"><?php echo empty($boat_post->Engines[0]->Fuel) ? "N/A" : $boat_post->Engines[0]->Fuel; ?></span></td>
                        <td> <span class="yacht-accordion-display-value"><?php echo empty($boat_post->Engines[0]->EnginePower) ? "N/A" : $boat_post->Engines[0]->EnginePower; ?></span></td>
                        <td> <span class="yacht-accordion-display-value"><?php echo empty($boat_post->Engines[0]->Type) ? "N/A" : $boat_post->Engines[0]->Type; ?></span></td>
                        <td> <span class="yacht-accordion-display-value"><?php echo empty($boat_post->Engines[0]->Hours) ? "N/A" : $boat_post->Engines[0]->Hours; ?></span></td>
                        <td style="height: 49px; padding: 0px;">
                            <a href="<?php echo remove_query_arg($boat_post->ID, false); ?>" class="button-link">Remove Yacht</a>
                        </td>

                </tr>
            <?php endforeach; ?>
        </tbody>
    </table>
</div>

<?php get_footer(); 