<?php
get_header();
?>

<main id="primary" class="site-main">
    <?php
    while (have_posts()) :
        the_post();

        $meta = get_post_meta($post->ID);

        foreach ($meta as $indexM => $valM) {
            if (is_array($valM) && !isset($valM[1])) {
                $meta[$indexM] = $valM[0];
            }
        }

        $vessel = array_map("maybe_unserialize", $meta);

        $vessel = (object) $vessel; ?>
        <!-- <?php var_dump($vessel) ?> -->

        <div id="ysp-yacht-details">
            <div class="yacht-main-container">
                <div class="yacht-general-info">
                    <div class="yacht-name-price-info">
                        <h1 class="yacht-title">
                            <?php echo ($vessel->ModelYear . ' ' . $vessel->MakeString . ' ' . $vessel->BoatName) ?>
                        </h1>
                        <h2 class="yacht-price">
                            <?php echo ('$' . $vessel->Price) ?>
                        </h2>
                    </div>
                    <div class="yacht-make-year-info">
                        <h3 class="yacht-make"><?php echo ($vessel->MakeString); ?></h3>
                        <p class="vertical-separator">|
                        <p>
                        <h3 class="yacht-year"><?php echo ($vessel->ModelYear) ?></h3>
                    </div>
                </div>
                <div class="yacht-image-container">
                    <div class="carousel carousel-main yacht-main-image-container">
                        <?php foreach($vessel->Images as $imageObject) { ?>
                            <div class="carousel-cell">
                                <img class="yacht-image" src="<?php echo ($imageObject->Uri); ?>" alt="yacht-image"/>
                            </div>
                        <?php } ?>
                    </div>
                </div>
                <div class="yacht-nav-image-container">
                    <div class="carousel carousel-nav">
                        <?php foreach($vessel->Images as $imageObject) { ?>
                            <div class="carousel-cell">
                                <div class="carousel-nav-overlay"></div>
                                <img class="yacht-image" src="<?php echo ($imageObject->Uri); ?>" alt="yacht-image"/>
                            </div>
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
                                <p><?php echo (empty($vessel->MakeString) ? 'N/A' : ($vessel->LengthOverall . '/' . (number_format((substr($vessel->LengthOverall, 0, -3) * 0.3048), 1) . ' m'))); ?></p>
                            </div>
                        </div>
                        <div class="yacht-beam">
                            <div class="yacht-beam-text">
                                <img src="<?php echo RAI_YS_PLUGIN_ASSETS; ?>images/arrow-left-right.png" alt="beam-icon" />
                                <p>Beam</p>
                            </div>
                            <div class="yacht-beam-value">
                                <p><?php echo (empty($vessel->BeamMeasure) ? 'N/A' : ($vessel->BeamMeasure . '/' . (number_format((substr($vessel->BeamMeasure, 0, -3) * 0.3048), 1) . ' m'))); ?></p>
                            </div>
                        </div>
                        <div class="yacht-cabins">
                            <div class="yacht-cabins-text">
                                <img src="<?php echo RAI_YS_PLUGIN_ASSETS; ?>images/bed-double.png" alt="bed-icon" />
                                <p>Cabins</p>
                            </div>
                            <div class="yacht-cabins-value">
                                <p><?php echo (empty($vessel->CabinsCountNumeric) ? 'N/A' : $vessel->CabinsCountNumeric); ?></p>
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
                <div class="yacht-download-brochure-container">
                    <a href="<?php echo get_rest_url(); ?>raiys/yacht-pdf-loader?yacht_post_id=<?php echo get_the_ID(); ?>" target="_blank">
                        <button class="yacht-download-button">
                            <img src="<?php echo RAI_YS_PLUGIN_ASSETS; ?>images/download.png" alt="download-icon" />
                            Download Brochure
                        </button>
                    </a>
                </div>
                <div class="yacht-mobile-broker-container">
                    <div class="broker-profile-image"></div>
                    <div class="broker-info">
                        <p class="broker-name">First Last Name</p>
                        <p class="broker-title">Broker</p>
                        <p class="broker-email">broker@gmail.com</p>
                        <p class="broker-phone">+1 (305) 652-8000</p>
                    </div>
                </div>
                <div class="yacht-mobile-form-container">
                    <p class="yacht-form-title">Inquire Now</p>
                    <form class="single-yacht-detils-lead" action="/submit" method="post">
                        <div>
                        <input type="hidden" id="yatchHidden" name="yatchHidden" value="<?php echo ($vessel->ModelYear . ' ' . $vessel->MakeString . ' ' . $vessel->BoatName) ?>">
                        </div>
                        <div>
                            <label for="fname">First name</label>
                            <input type="text" id="fname" name="fname" placeholder="First name" required />
                        </div>
                        <div>
                            <label for="lname">Last name</label>
                            <input type="text" id="lname" name="lname" placeholder="Last name" required />
                        </div>
                        <div>
                            <label for="email">E-mail</label>
                            <input type="email" id="email" name="email" placeholder="name@email.com" required />
                        </div>
                        <div>
                            <label for="phone">Phone number</label>
                            <input type="tel" id="phone" name="phone" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" placeholder="+1 (777) 777-7777" required />
                        </div>
                        <div>
                            <label for="inquirytype">Inquiry type</label>
                            <select>
                                <option value="Buying a yacht" selected>Buying a yacht</option>
                                <option value="Selling a yacht">Selling a yacht</option>
                                <option value="Trading a yacht">Trading a yacht</option>
                            </select>
                        </div>
                        <div>
                            <label for="message">Message</label>
                            <textarea id="message" name="message" placeholder="Type your message"></textarea>
                        </div>
                        <div>
                            <p class="form-disclaimer">Your privacy is important to us; to learn about how we protect it, read our <a href="#">privacy policy.</a></p>
                        </div>
                        <input class="yacht-form-submit" type="submit" value="Send" />


                    </form>
                    <div class="success-message" style="display: none; background-color: #4CAF50; color: #fff; padding: 10px; text-align: center;">
                        <p class="success-messages">Thank you for getting in touch. We will be in touch shortly.</p>
                    </div>

                </div>
                <div class="yacht-general-description-container">
                    <p class="yacht-description-label">
                        Description
                    </p>
                    <div class="yacht-description-value">
                        <?php echo ($vessel->GeneralBoatDescription[0]) ?>
                    </div>
                </div>
                <div class="yacht-specs-container">
                    <p class="yacht-specs-label">
                        Specifications
                    </p>
                    <div class="yacht-specs-value">
                        <div class="yacht-specs-item">
                            <p class="specification-name">Make</p>
                            <p class="specification-value"><?php echo empty($vessel->MakeString) ? "N/A" : $vessel->MakeString; ?></p>
                        </div>
                        <div class="yacht-specs-item">
                            <p class="specification-name">Model</p>
                            <p class="specification-value"><?php echo empty($vessel->Model) ? "N/A" : $vessel->Model; ?></p>
                        </div>
                        <div class="yacht-specs-item">
                            <p class="specification-name">Year</p>
                            <p class="specification-value"><?php echo empty($vessel->ModelYear) ? "N/A" : $vessel->ModelYear; ?></p>
                        </div>
                        <div class="yacht-specs-item">
                            <p class="specification-name">Class</p>
                            <p class="specification-value"><?php echo empty($vessel->BoatCategoryCode) ? "N/A" : $vessel->BoatCategoryCode; ?></p>
                        </div>
                        <div class="yacht-specs-item">
                            <p class="specification-name">Price</p>
                            <p class="specification-value"><?php echo empty($vessel->Price) ? "N/A" : '$' . $vessel->Price; ?></p>
                        </div>
                        <div class="yacht-specs-item">
                            <p class="specification-name">Fuel Tank Capacity</p>
                            <p class="specification-value"><?php echo empty($vessel->FuelTankCapacityMeasure) ? "N/A" : $vessel->FuelTankCapacityMeasure; ?></p>
                        </div>
                        <div class="yacht-specs-item">
                            <p class="specification-name">Hull Material</p>
                            <p class="specification-value"><?php echo empty($vessel->BoatHullMaterialCode) ? "N/A" : $vessel->BoatHullMaterialCode; ?></p>
                        </div>
                    </div>
                </div>
                <div class="yacht-full-details-container">
                    <p class="yacht-details-label">
                        Full Details
                    </p>
                    <div class="yacht-details-value">
                        <div class="yacht-accordion-item">
                            <p class="yacht-accordion-name">
                                General Info
                            </p>
                            <p class="yacht-accordion-arrow">
                                <img class="yacht-arrow" src="<?php echo RAI_YS_PLUGIN_ASSETS; ?>images/chevron-down.png" alt="down-arrow-icon" />
                            </p>
                        </div>
                        <div class="yacht-accordion-display">
                            <p class="yacht-accordion-display-item">Make: <?php echo empty($vessel->MakeString) ? "N/A" : $vessel->MakeString; ?></p>
                            <p class="yacht-accordion-display-item">Model: <?php echo empty($vessel->Model) ? "N/A" : $vessel->Model; ?></p>
                            <p class="yacht-accordion-display-item">Condition: <?php echo empty($vessel->SaleClassCode) ? "N/A" : $vessel->SaleClassCode; ?></p>
                            <p class="yacht-accordion-display-item">Class: <?php echo empty($vessel->BoatCategoryCode) ? "N/A" : $vessel->BoatCategoryCode; ?></p>
                            <p class="yacht-accordion-display-item">Construction: <?php echo empty($vessel->BoatHullMaterialCode) ? "N/A" : $vessel->BoatHullMaterialCode; ?></p>
                            <p class="yacht-accordion-display-item">Boat Hull ID: <?php echo empty($vessel->BoatHullID) ? "N/A" : $vessel->BoatHullID; ?></p>
                            <p class="yacht-accordion-display-item">Has Hull ID: <?php echo empty($vessel->HasBoatHullID) ? "No" : ($vessel->HasBoatHullID == '1' ? 'Yes' : "N/A");  ?></p>
                        </div>
                        <div class="yacht-accordion-item">
                            <p class="yacht-accordion-name">
                                Measurements
                            </p>
                            <p class="yacht-accordion-arrow">
                                <img class="yacht-arrow" src="<?php echo RAI_YS_PLUGIN_ASSETS; ?>images/chevron-down.png" alt="down-arrow-icon" />
                            </p>
                        </div>
                        <div class="yacht-accordion-display">
                            <p class="yacht-accordion-display-item">Length: <?php echo empty($vessel->NominalLength) ? "N/A" : $vessel->NominalLength . " / " . round((float)$vessel->NominalLength * 0.3048, 2) . ' m'; ?></p>
                            <p class="yacht-accordion-display-item">Length Overall: <?php echo empty($vessel->LengthOverall) ? "N/A" : $vessel->LengthOverall . " / " . round((float)$vessel->LengthOverall * 0.3048, 2) . ' m'; ?></p>
                            <p class="yacht-accordion-display-item">Beam: <?php echo empty($vessel->BeamMeasure) ? "N/A" : $vessel->BeamMeasure . " / " . round((float)$vessel->BeamMeasure * 0.3048, 2) . ' m'; ?></p>
                        </div>
                        <?php if (!empty($vessel->Engines[0])) { ?>
                            <div class="yacht-accordion-item">
                                <p class="yacht-accordion-name">
                                    Engine 1
                                </p>
                                <p class="yacht-accordion-arrow">
                                    <img class="yacht-arrow" src="<?php echo RAI_YS_PLUGIN_ASSETS; ?>images/chevron-down.png" alt="down-arrow-icon" />
                                </p>
                            </div>
                            <div class="yacht-accordion-display">
                                <p class="yacht-accordion-display-item">Make: <?php echo empty($vessel->Engines[0]->Make) ? "N/A" : $vessel->Engines[0]->Make; ?></p>
                                <p class="yacht-accordion-display-item">Model: <?php echo empty($vessel->Engines[0]->Model) ? "N/A" : $vessel->Engines[0]->Model; ?></p>
                                <p class="yacht-accordion-display-item">Fuel: <?php echo empty($vessel->Engines[0]->Fuel) ? "N/A" : $vessel->Engines[0]->Fuel; ?></p>
                                <p class="yacht-accordion-display-item">Engine Power: <?php echo empty($vessel->Engines[0]->EnginePower) ? "N/A" : $vessel->Engines[0]->EnginePower; ?></p>
                                <p class="yacht-accordion-display-item">Type: <?php echo empty($vessel->Engines[0]->Type) ? "N/A" : $vessel->Engines[0]->Type; ?></p>
                                <p class="yacht-accordion-display-item">Engine Hours: <?php echo empty($vessel->Engines[0]->Hours) ? "N/A" : $vessel->Engines[0]->Hours; ?></p>
                            </div>
                        <?php }
                        if (!empty($vessel->Engines[1])) { ?>
                            <div class="yacht-accordion-item">
                                <p class="yacht-accordion-name">
                                    Engine 2
                                </p>
                                <p class="yacht-accordion-arrow">
                                    <img class="yacht-arrow" src="<?php echo RAI_YS_PLUGIN_ASSETS; ?>images/chevron-down.png" alt="down-arrow-icon" />
                                </p>
                            </div>
                            <div class="yacht-accordion-display">
                                <p class="yacht-accordion-display-item">Make: <?php echo empty($vessel->Engines[1]->Make) ? "N/A" : $vessel->Engines[1]->Make; ?></p>
                                <p class="yacht-accordion-display-item">Model: <?php echo empty($vessel->Engines[1]->Model) ? "N/A" : $vessel->Engines[1]->Model; ?></p>
                                <p class="yacht-accordion-display-item">Fuel: <?php echo empty($vessel->Engines[1]->Fuel) ? "N/A" : $vessel->Engines[1]->Fuel; ?></p>
                                <p class="yacht-accordion-display-item">Engine Power: <?php echo empty($vessel->Engines[1]->EnginePower) ? "N/A" : $vessel->Engines[1]->EnginePower; ?></p>
                                <p class="yacht-accordion-display-item">Type: <?php echo empty($vessel->Engines[1]->Type) ? "N/A" : $vessel->Engines[1]->Type; ?></p>
                                <p class="yacht-accordion-display-item">Engine Hours: <?php echo empty($vessel->Engines[1]->Hours) ? "N/A" : $vessel->Engines[1]->Hours; ?></p>
                            </div>
                        <?php }
                        if (!empty($vessel->Engines[2])) { ?>
                            <div class="yacht-accordion-item">
                                <p class="yacht-accordion-name">
                                    Engine 3
                                </p>
                                <p class="yacht-accordion-arrow">
                                    <img class="yacht-arrow" src="<?php echo RAI_YS_PLUGIN_ASSETS; ?>images/chevron-down.png" alt="down-arrow-icon" />
                                </p>
                            </div>
                            <div class="yacht-accordion-display">
                                <p class="yacht-accordion-display-item">Make: <?php echo empty($vessel->Engines[2]->Make) ? "N/A" : $vessel->Engines[2]->Make; ?></p>
                                <p class="yacht-accordion-display-item">Model: <?php echo empty($vessel->Engines[2]->Model) ? "N/A" : $vessel->Engines[2]->Model; ?></p>
                                <p class="yacht-accordion-display-item">Fuel: <?php echo empty($vessel->Engines[2]->Fuel) ? "N/A" : $vessel->Engines[2]->Fuel; ?></p>
                                <p class="yacht-accordion-display-item">Engine Power: <?php echo empty($vessel->Engines[2]->EnginePower) ? "N/A" : $vessel->Engines[2]->EnginePower; ?></p>
                                <p class="yacht-accordion-display-item">Type: <?php echo empty($vessel->Engines[2]->Type) ? "N/A" : $vessel->Engines[2]->Type; ?></p>
                                <p class="yacht-accordion-display-item">Engine Hours: <?php echo empty($vessel->Engines[2]->Hours) ? "N/A" : $vessel->Engines[2]->Hours; ?></p>
                            </div>
                        <?php } ?>
                    </div>
                </div>
            </div>
            <div class="secondary-container">
                <div class="secondary-sub-container">
                    <div class="broker-info-container">
                        <div class="broker-profile-image"></div>
                        <div class="broker-info">
                            <p class="broker-name">First Last Name</p>
                            <p class="broker-title">Broker</p>
                            <p class="broker-email">broker@gmail.com</p>
                            <p class="broker-phone">+1 (305) 652-8000</p>
                        </div>
                    </div>
                    <div class="yacht-form-container">
                        <p class="yacht-form-title">Inquire Now</p>
                        <form class="single-yacht-detils-lead" action="/submit" method="post">
                            <div>
                            <input type="hidden" id="yatchHidden" name="yatchHidden" value="<?php echo ($vessel->ModelYear . ' ' . $vessel->MakeString . ' ' . $vessel->BoatName) ?>">
                            </div>
                            <div>
                                <label for="fname">First name</label>
                                <input type="text" id="fname" name="fname" placeholder="First name" required />
                            </div>
                            <div>
                                <label for="lname">Last name</label>
                                <input type="text" id="lname" name="lname" placeholder="Last name" required />
                            </div>
                            <div>
                                <label for="email">E-mail</label>
                                <input type="email" id="email" name="email" placeholder="name@email.com" required />
                            </div>
                            <div>
                                <label for="phone">Phone number</label>
                                <input type="tel" id="phone" name="phone" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" placeholder="+1 (777) 777-7777" required />
                            </div>
                            <div>
                                <label for="inquirytype">Inquiry type</label>
                                <select>
                                    <option value="Buying a yacht" selected>Buying a yacht</option>
                                    <option value="Selling a yacht">Selling a yacht</option>
                                    <option value="Trading a yacht">Trading a yacht</option>
                                </select>
                            </div>
                            <div>
                                <label for="message">Message</label>
                                <textarea id="message" name="message" placeholder="Type your message"></textarea>
                            </div>
                            <div>
                                <p class="form-disclaimer">Your privacy is important to us; to learn about how we protect it, read our <a href="#">privacy policy.</a></p>
                            </div>
                            <input class="yacht-form-submit" type="submit" value="Send" />
                        </form>
                        <div class="success-message" style="display: none; background-color: #4CAF50; color: #fff; padding: 10px; text-align: center;">
                        <p class="success-messages">Thank you for getting in touch. We will be in touch shortly.</p>
                    </div>
                    </div>
                </div>
            </div>
        </div>
        <script>
            document.addEventListener('DOMContentLoaded', function() {
                const accordions = document.querySelectorAll('.yacht-accordion-item');
                accordions.forEach(function(accordion, index) {
                    accordion.addEventListener('click', function() {
                        const arrowElement = document.querySelectorAll('.yacht-arrow')[index];
                        const displayElement = document.querySelectorAll('.yacht-accordion-display')[index];
                        arrowElement.style.transform = (displayElement.style.display === 'none' || displayElement.style.display === '') ? 'rotate(180deg)' : 'rotate(0deg)';
                        displayElement.style.display = (displayElement.style.display === 'none' || displayElement.style.display === '') ? 'block' : 'none';
                    });
                });
            });
        </script>

    <?php
    endwhile; // End of the loop.
    ?>

</main><!-- #main -->

<?php
//get_sidebar();
get_footer();
