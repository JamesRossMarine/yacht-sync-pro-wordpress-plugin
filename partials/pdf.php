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

    <style>
        #pdf-page-template {
            width: 100%;
            max-width: 1440px;
            margin: auto;

        }

        .cover-page-container {

        }

        .cover-page-container-logo {
            width: 100%;
            height: 90vh;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .cover-page-container-logo img {
            width: 150px;
        }

        .cover-page-title-container {
            height: 10vh;
            display: flex;
            align-items: center;
        }

        .cover-page-title-container .cover-title {
            color: #C00020;
            width: 100%;
            text-align: center;
            font-weight: 400;
            text-transform: uppercase;
        }
        .main-title-container {
            margin-bottom: 40px;
        }
        .main-page-container {
            padding: 10px;
        }
        .main-name-price-container {
            display: flex;
            justify-content: space-between;
        }
        .main-name-price-container .main-boat-name {
            color: #C00020;
            text-transform: uppercase;
            font-weight: 400;
            margin: 0;
        }
        .main-name-price-container .main-boat-price {
            text-transform: uppercase;
            font-weight: 400;
            margin: 0;
        }

        .main-page-container .main-hero-image-container img {
            width: 100%;
            height: 800px;
            object-fit: cover;
        }

        .main-hero-image-container {
            margin-bottom: 40px;
        }
        .main-info-container {
            display: flex;
        }

        .main-location-container, .main-builder-container, .main-cabins-container, .main-length-container {
            display: flex;
        }
        .main-location, .main-builder, .main-cabins, .main-length {
            margin-left: 20px;
        }
        .location-name, .builder-name, .cabins-name, .length-name {
            margin-bottom: 10px;
        }
    </style>
</head>
<body>
    <!-- <?php var_dump($meta); ?> -->
    <div id="pdf-page-template">
        <div class="cover-page-container">
            <div class="cover-page-container-logo">
                <img src="<?php echo get_template_directory_uri(); ?>/images/pdf-img/IYG_Logo.png" alt="" />
            </div>
            <div class="cover-page-title-container">
                <h4 class="cover-title"><?= $vesselH1 ?></h4>
            </div>
        </div>
        <div class="main-page-container">
            <div class="main-title-container">
                <div class="main-name-price-container">
                    <h3 class="main-boat-name"><?= $vesselH1 ?></h3>
                    <h3 class="main-boat-price">$<?= $price ?></h3>
                </div>
                <div class="main-iyg-flag-container">
                    <img src="<?php echo get_template_directory_uri(); ?>/images/separator.svg" alt="" />
                </div>
            </div>
            <div class="main-hero-image-container">
                <img src="<?php echo $vessel->Images[0]->Uri ?>" alt="" />
            </div>
            <div class="main-info-container">
                <div class="main-location-container">
                    <img src="<?php echo get_template_directory_uri(); ?>/images/yacht-location.svg" alt="" />
                    <div class="main-location">
                        <p class="location-name">LOCATION</p>
                        <p class="location-value"><?= $boatLocation ?></p>
                    </div>
                </div>
                <div class="main-builder-container">
                    <img src="<?php echo get_template_directory_uri(); ?>/images/yacht-builder.svg" alt="" />
                    <div class="main-builder">
                        <p class="builder-name">BUILDER</p>
                        <p class="builder-value"><?= $make ?></p>
                    </div>
                </div>
                <div class="main-cabins-container">
                    <img src="<?php echo get_template_directory_uri(); ?>/images/yacht-cabins.svg" alt="" />
                    <div class="main-cabins">
                        <p class="cabins-name">CABINS</p>
                        <p class="cabins-value"><?= $cabin ?></p>
                    </div>
                </div>
                <div class="main-length-container">
                    <img src="<?php echo get_template_directory_uri(); ?>/images/yacht-length.svg" alt="" />
                    <div class="main-length">
                        <p class="length-name">LENGTH</p>
                        <p class="length-value"><?= $length ?> / <?= $lengthMeters ?></p>
                    </div>
                </div>
            </div>
        </div>
    </div>

</body>