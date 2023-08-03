<?php 

    $meta = get_post_meta($yacht_post_id);

    foreach ($meta as $indexM => $valM) {
        if (is_array($valM) && ! isset($valM[1])) {
            $meta[$indexM] = $valM[0];
        }
    }

    $vessel = array_map("maybe_unserialize", $meta);

    $vessel = (object) $vessel;

    //var_dump($vessel);
    
    //<!--TITLE-->
    if( $vessel->BoatName != null ) {
        $vesselH1 = $vessel->ModelYear . " " . $vessel->MakeString . " " . $vessel->Model . " " . $vessel->BoatName;
    //    console_log("IM INSIDE THE BOATNAME IF");
    } else {
        $vesselH1 = $vessel->ModelYear . " " . $vessel->MakeString . " " . $vessel->Model;

    }
    function ReplaceStr($str1)
    {
        // Using str_replace() function
        // to replace the word
        $res3 = str_replace(array(' USD'), '', $str1);

        // Returning the result
        return $res3;
    }

    $price = ($vessel->Price && $vessel->Price != "0.00 USD" && $vessel->Price != "1.00 USD") ? number_format(ReplaceStr(trim(str_replace(['EUR', 'USD'], '', $vessel->Price)))) : "Contact Us For Price";

    $imageArray = json_encode($vessel->Images);
    $imageData = json_decode($imageArray, true);

    // Check if the array is not empty
    if (!empty($imageData)) {
        $firstImage = $imageData[0];
        $imageUrl = $firstImage['Uri'];

    }
    $firstImage = $imageArray[0];
    
    /*$url = 'https://services.boats.com/pls/boats/details?id=' . $vessel->DocumentID . '&key=e97cdb91056f';
    
    $response = file_get_contents($url);

    $data = json_decode($response, true);

    var_dump($data);
    
    $plsDisclaimer = $data['data']['PlsDisclaimer'];
    $newDisclaimer = substr($plsDisclaimer, 3, -4);
    $finalDisclaimer = "We provide this yacht listing in good faith, and although we cannot guarantee its accuracy or the condition of the boat. The " . $newDisclaimer . " She is subject to prior sale, price change, or withdrawal without notice and does not imply a direct representation of a specific yacht for sale.";*/

    $itemReceivedDate = $vessel->ItemReceivedDate;
    $itemDate = strtotime($itemReceivedDate);

    $address = $vessel->Office->PostalAddress;
    $beam = $vessel->BeamMeasure;
    $boatHullID = $vessel->BoatHullID;
    $boatCity = $vessel->BoatLocation->BoatCityName;
    $boatState = $vessel->BoatLocation->BoatStateCode;
    $boatCountry = $vessel->BoatLocation->BoatCountryID;

    if($boatState != ""){
        $boatLocation = $boatCity . ', ' . $boatState;
    } else {
        $boatLocation = $boatCity . ', ' . $boatCountry;
    }

    $cabin = $vessel->CabinHeadroomMeasure;
    $cabinCount = $vessel->CabinsCountNumeric;
    $category = $vessel->BoatCategoryCode;
    $city = $vessel->Office->City;
    $condition = $vessel->SaleClassCode;
    $construction = $vessel->BoatHullMaterialCode;
    $country = $vessel->Office->Country;
    $cruisingSpeed = $vessel->CruisingSpeedMeasure;
    $deadriseMeasure = $vessel->$deadriseMeasure;
    $dryWeight = $vessel->DryWeightMeasure;
    $int_var = (int)filter_var($dryWeight, FILTER_SANITIZE_NUMBER_INT);
    $draft = $vessel->MaxDraft;
    $length = $vessel->NominalLength;
    $lengthMeters = $length * 0.3048;
    $lengthMeters = sprintf("%0.2f", $lengthMeters);
    $lengthOverall = $vessel->LengthOverall;
    $lengthOverallMeters = $lengthOverall * 0.3048;
    $lengthOverallMeters = sprintf("%0.2f", $lengthOverallMeters);
    $length2 = $vessel->NormNominalLength;
    $make = $vessel->MakeString;
    $model = $vessel->Model;
    $maxSpeed = $vessel->MaximumSpeedMeasure;
    $officePhone = $vessel->Office->Phone;
    $postCode = $vessel->Office->PostCode; //Zip code
    $state = $vessel->Office->State;
    $driveTypeCode = $vessel->DriveTypeCode;
    $year = $vessel->ModelYear;
    $company = $vessel->CompanyName;

    //Broker Variables
    $broker = $vessel->SalesRep->Name;
    $brokerLocation = $city . ', ' . $state;
    //        console_log($brokerLocation, '$brokerLocation');
    $phone = $vessel->Office->Phone; //Broker Phone
    //        console_log($phone, '$phone');
    //        $phoneNoDashes = ReplaceDash($phone);
    //        console_log($phoneNoDashes, '$phoneNoDashes');
    $email = $vessel->Office->Email;
    if ($email == "") {
        $email = "boomer@theiyg.com";
    }
    $muh_shareUri_facebook = get_permalink();
    $social_link = "www.facebook.com/sharer/sharer.php?u=$muh_shareUri_facebook";

    //Description
    $generalDescription = str_replace("Â", "", $vessel->GeneralBoatDescription[0]);
    $additionalDescription = str_replace("Â", "", $vessel->AdditionalDetailDescription[0]);

    //Engine Variables
    $numberOfEngines = $vessel->NumberOfEngines;
    if (is_array($vessel->Engines)) {
        $engineQty = count($vessel->Engines);

        //Engine 1
        $engineMake1 = $vessel->Engines[0]->Make;
        $engineModel1 = $vessel->Engines[0]->Model;
        $engineDrive1 = $vessel->Engines[0]->DriveTransmissionDescription;
        $engineFuel1 = $vessel->Engines[0]->Fuel;
        $enginePower1 = $vessel->Engines[0]->EnginePower;
        $engineType1 = $vessel->Engines[0]->Type;
        $engineHours1 = $vessel->Engines[0]->Hours;
        $engineLocation1 = $vessel->Engines[0]->BoatEngineLocationCode;
        $enginePropellerType1 = $vessel->Engines[0]->PropellerType;
        $engineYear1 = $vessel->Engines[0]->Year;

        //Engine 2
        $engineMake2 = $vessel->Engines[1]->Make;
        $engineModel2 = $vessel->Engines[1]->Model;
        $engineDrive2 = $vessel->Engines[1]->DriveTransmissionDescription;
        $engineFuel2 = $vessel->Engines[1]->Fuel;
        $enginePower2 = $vessel->Engines[1]->EnginePower;
        $engineType2 = $vessel->Engines[1]->Type;
        $engineHours2 = $vessel->Engines[1]->Hours;
        $engineLocation2 = $vessel->Engines[1]->BoatEngineLocationCode;
        $enginePropellerType2 = $vessel->Engines[1]->PropellerType;
        $engineYear2 = $vessel->Engines[1]->Year;
    }


    $enginePower1Numbers = intval($enginePower1);
    $enginePower2Numbers = intval($enginePower2);

    $totalEnginePower = $enginePower1Numbers + $enginePower2Numbers;

    //TANKS
    $fuelTanks = $vessel->FuelTankCountNumeric;
    $fuelTankCapacity = $vessel->FuelTankCapacityMeasure;
    $waterTanks = $vessel->WaterTankCountNumeric;
    $waterTankCapacity = $vessel->WaterTankCapacityMeasure;
    $holdingTanks = $vessel->HoldingTankCountNumeric;
    $holdingTankCapacity = $vessel->HoldingTankCapacityMeasure;

    //OTHER
    $heads = $vessel->HeadsCountNumeric;
    $windlassType = $vessel->WindlassTypeCode;
    $boatClass = $vessel->BoatClassCode[0];
?>
<!DOCTYPE html>
<html>
<head>


</head>
<body>



<div class="print-ctnr" style="max-width: 1050px !important;">
    <!--PAGE 1-->
    <div class="main-page-wrap" style="">
        <div class="splash-inner">
            <img src="<?php echo get_template_directory_uri(); ?>/images/brochure/logo-dark.svg" alt="">
            <h6><?php echo $vesselH1 ?></h6>

        </div>
    </div>
    <!--PAGE 2 Main Image and Specs-->
    <div class="main-page-wrap" style="">
        <div class="brochure-container">
            <div class="sec-title">
                <div class="row">
                    <div class="col-xl-8 col-lg-8 col-md-8 mb-3 print-title">
                        <h1><?php echo $vesselH1 ?></h1>
                        <img src="<?php echo get_template_directory_uri(); ?>/images/separator.svg" alt="">
                    </div>
                    <div class="col-xl-4 col-lg-4 col-md-4 text-start text-md-end ">
                        <div class="yacht-price">
                            <h5><?php echo is_numeric($price[0]) ? '$'.$price : $price ?></h5>
                        </div>

                    </div>
                </div>
            </div>
            <!--MAIN IMAGE-->
            <div class="row main-img">
                <div class="col-lg-12">
                    <img src="<?php echo $imageUrl ?>" width="100%;">
                    <!--                    <img src="-->
                    <?php //echo get_template_directory_uri(); ?><!--/images/brochure/yacht-img.jpg" width="100%;"-->
                    <!--                         alt="">-->
                </div>
            </div>
        </div>
        <div class="yacht-main-info">
            <div class="brochure-container">
                <div class="row align-items-center">
                    <div class="col-lg-3 col-md-6 col-6">
                        <div class="ymi-item d-flex align-items-center">
                            <div class="flex-shrink-0 d-none d-sm-block">
                                <img src="<?php echo get_template_directory_uri(); ?>/images/yacht-location.svg"
                                     class="align-self-center" alt="yacht-location">
                            </div>
                            <div class="flex-grow-1 ms-0 ms-md-4">
                                <h5 class="mt-0">Location</h5>
                                <p><?php echo $boatLocation ?></p>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6 col-6">
                        <div class="ymi-item d-flex align-items-center">
                            <div class="flex-shrink-0 d-none d-sm-block">
                                <img src="<?php echo get_template_directory_uri(); ?>/images/yacht-builder.svg"
                                     class="align-self-center" alt="yacht-location">
                            </div>
                            <div class="flex-grow-1 ms-0 ms-md-4">
                                <h5 class="mt-0">Builder</h5>
                                <p><?php echo $make ?></p>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6 col-6">
                        <div class="ymi-item d-flex align-items-center">
                            <div class="flex-shrink-0 d-none d-sm-block">
                                <img src="<?php echo get_template_directory_uri(); ?>/images/yacht-cabins.svg"
                                     class="align-self-center" alt="yacht-location">
                            </div>
                            <div class="flex-grow-1 ms-0 ms-md-4">
                                <h5 class="mt-0">Cabins</h5>
                                <p><?php echo $cabinCount ?></p>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6 col-6">
                        <div class="ymi-item ymi-last-item d-flex align-items-center">
                            <div class="flex-shrink-0 d-none d-sm-block">
                                <img src="<?php echo get_template_directory_uri(); ?>/images/yacht-length.svg"
                                     class="align-self-center" alt="yacht-location">
                            </div>
                            <div class="flex-grow-1 ms-0 ms-md-4">
                                <h5 class="mt-0">Length</h5>
                                <p><?php echo $lengthMeters ?> m / <?php echo $length ?></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="yoi-specifications">
            <div class="brochure-container">
                <div class="row specs-col">
                    <div class="col1 specs">
                        <div class="col-lg-12">
                            <div class="yoi-title">
                                <h5>Specifications</h5>
                            </div>
                        </div>
                        <div class="col-lg-6 specs-col1">
                            <ul class="specification-list list-unstyled">
                                <li><h6>Yacht Type</h6>
                                    <p><?php echo $category ?></p></li>
                                <li><h6>Brand</h6>
                                    <p><?php echo $make ?></p></li>
                                <li><h6>Year</h6>
                                    <p><?php echo $year ?></p></li>
                                <li><h6>Hull</h6>
                                    <p><?php echo $construction ?></p></li>
                                <li><h6>Days Listed</h6>
                                    <p><?php
                                        $to_date = time();
                                        $itemReceivedDate = $vessel->IMTTimeStamp;
                                        $itemDate = substr($itemReceivedDate, 0, 10);
                                        //console_log($itemReceivedDate);
                                        $from_date = strtotime($vessel->IMTTimeStamp);

                                        //console_log('>>>>>>>>>>', $from_date);
                                        $day_diff = $to_date - $from_date;
                                        echo floor($day_diff / (60 * 60 * 24)) . "\n";
                                        ?> days</p></li>
                                <li><h6>Price</h6>
                                    <p><?php echo $price ?></p></li>
                            </ul>
                        </div>
                    </div>

                    <div class="col-lg-6 col2 specs">
                        <ul class="specification-list list-unstyled">
                            <li><h6>Length Overall</h6>
                                <p><?php echo $lengthOverallMeters ?> m / <?php echo $lengthOverall ?></p></li>
                            <li><h6>Beam</h6>
                                <p><?php echo $beam ?></p></li>
                            <li><h6>Max Draft</h6>
                                <p><?php echo $draft ?></p></li>
                            <li><h6>Max Speed</h6>
                                <p><?php echo $maxSpeed ?> kn</p></li>
                            <li><h6>Cruising Speed</h6>
                                <p><?php echo $cruisingSpeed ?> kn</p></li>
                            <li><h6>Engines</h6>
                                <p><?php echo $engineQty ?> x <?php echo $engineFuel1 ?></p></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="brochure-footer">
            <div class="brochure-container">
                <div class="row footer-row">
                    <div class="col-lg-2 footer-col1">
                        <img src="<?php echo get_template_directory_uri(); ?>/images/brochure/logo-dark.svg"
                             class="img-fluid" alt="">
                    </div>
                    <div class="col-lg-4 ms-auto footer-col2">
                        <div class="row footer-row2">
                            <div class="col-lg-6 footer-col2-ctnr1">
                                <div  class="b-footer-details">
                                    <h6> Boomer Jousma | Sales Executive</h6>
                                    <p>(954) 600-4966</p>
                                    <p>boomer@theiyg.com</p>
                                    <a href="/home">www.italianyachtgroup.com</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="main-page-wrap" style="">
        <div class="brochure-container">
                <div class="row gy-3">
                    <div class="col-lg-12">
                        <div class="brochure-details">
                            <p><?php echo $generalDescription ?></p>
                        </div>
                    </div>
                </div>
        </div>
        <div class="brochure-footer">
            <div class="brochure-container">
                <div class="row footer-row">
                    <div class="col-lg-2 footer-col1">
                        <img src="<?php echo get_template_directory_uri(); ?>/images/brochure/logo-dark.svg"
                             class="img-fluid" alt="">
                    </div>
                    <div class="col-lg-4 ms-auto footer-col2">
                        <div class="row footer-row2">
                            <div class="col-lg-6 footer-col2-ctnr1">
                                <div  class="b-footer-details">
                                    <h6> Boomer Jousma | Sales Executive</h6>
                                    <p>(954) 600-4966</p>
                                    <p>boomer@theiyg.com</p>
                                    <a href="/home">www.italianyachtgroup.com</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!--PAGE 3 Description and Gallery-->
        <!--IMAGES-->
        <!--PRINT LISTING FOOTER-->

    <!--PAGE 4 Gallery-->
    <div class="main-page-wrap" style="">
        <div class="brochure-container">
            <div class="brochure-images">
                <div class="row gy-3">
                    <div class="brochure-images">
                        <div class="row gy-3 images-ctnr" style="display: flex; flex-wrap: wrap;">
                            <?php if ($imageData != null) { ?>
                                <?php foreach (array_slice($imageData, 0, 6) as $image) { ?>
                                    <div class="col-lg-6">
                                        <img src="<?php echo $image['Uri']; ?>" class="img-fluid" width="100%" alt="">
                                    </div>
                                <?php } ?>
                            <?php } ?>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="brochure-footer">
            <div class="brochure-container">
                <div class="row footer-row">
                    <div class="col-lg-2 footer-col1">
                        <img src="<?php echo get_template_directory_uri(); ?>/images/brochure/logo-dark.svg"
                             class="img-fluid" alt="">
                    </div>
                    <div class="col-lg-4 ms-auto footer-col2">
                        <div class="row footer-row2">
                            <div class=" footer-col2-ctnr1">
                                <div class="b-footer-details">
                                    <h6> Boomer Jousma | Sales Executive</h6>
                                    <p>(954) 600-4966</p>
                                    <p>boomer@theiyg.com</p>
                                    <a href="/home">www.italianyachtgroup.com</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="main-page-wrap" style="">
            <div class="brochure-container">
                <div class="brochure-images">
                    <div class="row gy-3">
                        <div class="brochure-images">
                            <div class="row gy-3 images-ctnr" style="display: flex; flex-wrap: wrap;">
        <?php if ($imageData != null) { ?>
                        <?php foreach (array_slice($imageData, 7, 8) as $image) { ?>
                            <div class="col-lg-6">
                                <img src="<?php echo $image['Uri']; ?>" class="img-fluid" width="100%" alt="">
                            </div>
                        <?php } ?>
                    <?php } ?>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        <div class="brochure-footer">
            <div class="brochure-container">
                <div class="row footer-row">
                    <div class="col-lg-2 footer-col1">
                        <img src="<?php echo get_template_directory_uri(); ?>/images/brochure/logo-dark.svg"
                             class="img-fluid" alt="">
                    </div>
                    <div class="col-lg-4 ms-auto footer-col2">
                        <div class="row footer-row2">
                            <div class=" footer-col2-ctnr1">
                                <div class="b-footer-details">
                                        <h6> Boomer Jousma | Sales Executive</h6>
                                        <p>(954) 600-4966</p>
                                        <p>boomer@theiyg.com</p>
                                        <a href="/home">www.italianyachtgroup.com</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

</body>
</html>


>


<!--END PRINT LISTING-->