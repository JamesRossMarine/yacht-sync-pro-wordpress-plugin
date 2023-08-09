<?php
get_header();
?>

	<main id="primary" class="site-main">
		<?php
		while ( have_posts() ) :
			the_post();

            $meta = get_post_meta($post->ID);

            foreach ($meta as $indexM => $valM) {
                if (is_array($valM) && ! isset($valM[1])) {
                    $meta[$indexM] = $valM[0];
                }
            }

            $vessel = array_map("maybe_unserialize", $meta);

            $vessel = (object) $vessel; ?>
             <!-- <?php var_dump($vessel) ?> -->

        <div id="single-rai_yacht">
            <div class="yacht-main-container">
                <div class="yacht-general-info">
                    <div class="yacht-name-price-info">
                        <h1 class="yacht-title">
                            <?php echo($vessel->ModelYear . ' ' . $vessel->MakeString . ' ' . $vessel->BoatName) ?>
                        </h1>
                        <h2 class="yacht-price">
                            <?php echo('$' . $vessel->Price) ?>
                        </h2>
                    </div>
                    <div class="yacht-make-year-info">
                        <h3 class="yacht-make"><?php echo($vessel->MakeString); ?></h3><p class="vertical-separator">|<p><h3 class="yacht-year"><?php echo($vessel->ModelYear) ?></h3>
                    </div>
                </div>
                <div class="yacht-image-container">
                    <div class="yacht-main-image-container">
                        <img class="yacht-image" src="<?php echo($vessel->Images[0]->Uri); ?>" alt="yacht-image"/>
                    </div>
                    <div class="yacht-gallery-container">
                        <?php for ($x = 1; $x < 9; $x++){ ?>
                            <img class="yacht-gallery-image" src="<?php echo($vessel->Images[$x]->Uri); ?>" alt="<?php echo($vessel->Images[$x]->Caption); ?>" />
                        <?php } ?>
                    </div>
                </div>
                <div class="yacht-main-info-container">
                    <div class="yacht-main-info">
                        <div class="yacht-length">
                            <div class="yacht-length-text">
                                <img src="<?php echo RAI_YS_PLUGIN_ASSETS; ?>images/arrow-left-right.png" alt="length-icon" />
                                <p>Length</p>
                            </div>
                            <div class="yacht-length-value">
                                <p><?php echo ($vessel->LengthOverall . '/' . (number_format((substr($vessel->LengthOverall, 0, -3) * 0.3048), 1) . ' m')); ?></p>
                            </div>
                        </div>
                        <div class="yacht-beam">
                            <div class="yacht-beam-text">
                                <img src="<?php echo RAI_YS_PLUGIN_ASSETS; ?>images/arrow-left-right.png" alt="beam-icon" />
                                <p>Beam</p>
                            </div>
                            <div class="yacht-beam-value">
                                <p><?php echo ($vessel->BeamMeasure . '/' . (number_format((substr($vessel->BeamMeasure, 0, -3) * 0.3048), 1) . ' m')); ?></p>
                            </div>
                        </div>
                        <div class="yacht-cabins">
                            <div class="yacht-cabins-text">
                                <img src="<?php echo RAI_YS_PLUGIN_ASSETS; ?>images/bed-double.png" alt="bed-icon" />
                                <p>Cabins</p>
                            </div>
                            <div class="yacht-cabins-value">
                                <p><?php echo ($vessel->CabinsCountNumeric); ?></p>
                            </div>
                        </div>
                        <div class="yacht-guests">
                            <div class="yacht-guests-text">
                                <img src="<?php echo RAI_YS_PLUGIN_ASSETS; ?>images/users.png" alt="beam-icon" />
                                <p>Guests</p>
                            </div>
                            <div class="yacht-guests-value">
                                <p>13</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="secondary-container">
                
            </div>
        </div>

        <?php
		    endwhile; // End of the loop.
		?>

	</main><!-- #main -->

<?php
//get_sidebar();
get_footer();
