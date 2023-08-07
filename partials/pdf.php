<?php

$meta = get_post_meta($yacht_post_id);

foreach ($meta as $indexM => $valM) {
    if (is_array($valM) && !isset($valM[1])) {
        $meta[$indexM] = $valM[0];
    }
}

$vessel = array_map("maybe_unserialize", $meta);

$vessel = (object) $vessel;

//var_dump($vessel);

//<!--TITLE-->
if ($vessel->BoatName != null) {
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

if ($boatState != "") {
    $boatLocation = ucwords($boatCity) . ', ' . $boatState;
} else {
    $boatLocation = ucwords($boatCity) . ', ' . $boatCountry;
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
        /* GENERAL CLASSES */
        .text-center {
            text-align: center;
        }

        .text-right {
            text-align: right;
        }

        .text-left {
            text-align: left;
        }

        .w-100 {
            width: 100%;
        }

        .w-75 {
            width: 75%;
        }

        .w-50 {
            width: 50%;
        }

        .w-25 {
            width: 25%;
        }

        .padding-row {
            padding-bottom: 10px;
        }

        .d-inline-block {
            display: inline-block;
        }

        .d-flex {
            display: flex;
        }

        .justify-content-center {
            justify-content: center;
        }

        .align-items-center {
            align-items: center;
        }

        /* CUSTOM CLASSES */
        .page-break {
            page-break-after: always
        }

        .first-page-container {
            color: #C00020;
            text-align: center;
            text-transform: uppercase;
            font-weight: 400;
            font-size: 16px;
            height: 100vh;
        }

        .second-page-container {
            color: #C00020;
            text-align: center;
            text-transform: uppercase;
            font-weight: 400;
            font-size: 16px;
            height: 100vh;
        }

        .first-table {
            width: 100%;
        }

        .first-page-table-td {
            text-align: center;
        }

        .second-page-table-td {
            width: 50%;
        }

        .second-page-table-td h4 {
            margin: 0;
        }

        .yatch-main-info {
            color: #252f38;
        }

        .main-image {
            margin-bottom: 20px;
        }

        .supporting-info-title {
            color: #252F38;
            font-size: 14px;
            text-transform: uppercase;
            width: 50%;
            float: left;
        }

        .supporting-info-description {
            color: #252F38;
            font-size: 12px;
            text-transform: capitalize;
            width: 50%;
            float: right;
        }

        .supporting-info-row {
            margin-bottom: 10px;
            border-bottom: 1px solid #252F38;
        }

        .footer-phone {
            color: #252F38;
            font-size: 12px;
        }

        .footer-email {
            color: #252F38;
            font-size: 12px;
            text-transform: lowercase;
        }

        .footer-link {
            color: #C00020
        }
    </style>
</head>

<body>
    <div class="print-ctnr">

        <!--PAGE 1-->
        <div class="first-page-container page-break">
            <table class="first-table">
                <tr>
                    <td class="first-page-table-td">
                        <img src="<?php echo get_template_directory_uri(); ?>/pdf_images/IYG_Logo_PDF.png" alt="alt-logo">
                    </td>
                </tr>
                <tr>
                    <td class="first-page-table-td">
                        <h3><?php echo $vesselH1 ?></h3>
                    </td>
                </tr>
            </table>
        </div>

        <!--PAGE 2 Main Image and Specs-->
        <div class="second-page-container page-break">
            <table class="w-100">
                <tr class="w-100">
                    <td class="second-page-table-td text-left" style="padding-bottom: 10px">
                        <h4><?php echo $vesselH1 ?></h4>
                    </td>
                    <td class="second-page-table-td text-right" style="vertical-align: top; padding-bottom: 10px; color: #252F38;">
                        <h4><?php echo is_numeric($price[0]) ? '$' . $price : $price ?></h4>
                    </td>
                </tr>
                <tr>
                    <td>
                        <img src="<?php echo get_template_directory_uri(); ?>/pdf_images/separator.png" alt="italian-flag">
                    </td>
                </tr>
            </table>
            <!--MAIN IMAGE-->
            <div class="main-image">
                <img src="<?php echo $imageUrl ?>" width="100%;">
            </div>
            <div class="yacht-main-info page-break">
                <table class="general-info-section w-100">
                    <tr class="w-100">
                        <table>
                            <tr>
                                <td>
                                    <img src="<?php echo get_template_directory_uri(); ?>/pdf_images/y-location.png" alt="yacht-location" height="50px" width="50px">
                                </td>
                                <td style="padding-left: 10px">
                                    <h5 style="color: #252F38; font-size: 14px; text-transform: uppercase; margin: 0;">Location</h5>
                                    <p style="color: #252F38; font-size: 12px;"><?php echo $boatLocation ?></p>
                                </td>

                                <td style="background-color: #C00020; height: 50px; width: 0.25px; bord"></td>

                                <td style="padding-left: 15px">
                                    <img src="<?php echo get_template_directory_uri(); ?>/pdf_images/y-builder.png" alt="yacht-builder" height="50px" width="45px">
                                </td>
                                <td style="padding-left: 10px">
                                    <h5 style="color: #252F38; font-size: 14px; text-transform: uppercase; margin: 0;">Builder</h5>
                                    <p style="color: #252F38; font-size: 12px;"><?php echo $make ?></p>
                                </td>

                                <td style="background-color: #C00020; height:50px; width: 0.25px;"></td>

                                <td style="padding-left: 15px">
                                    <img src="<?php echo get_template_directory_uri(); ?>/pdf_images/y-cabins.png" alt="yacht-cabins" height="50px" width="50px">
                                </td>
                                <td style="padding-left: 10px">
                                    <h5 style="color: #252F38; font-size: 14px; text-transform: uppercase; margin: 0;">Cabins</h5>
                                    <p style="color: #252F38; font-size: 12px;"><?php echo $cabinCount ?></p>
                                </td>

                                <td style="background-color: #C00020; height: 50px; width: 0.25px;"></td>

                                <td style="padding-left: 15px">
                                    <img src="<?php echo get_template_directory_uri(); ?>/pdf_images/y-length.png" alt="yacht-length" height="50px" width="80px">
                                </td>
                                <td style="padding-left: 10px">
                                    <h5 style="color: #252F38; font-size: 14px; text-transform: uppercase; margin: 0;">Length</h5>
                                    <p style="color: #252F38; font-size: 12px;"><?php echo $lengthMeters ?> m / <?php echo $length ?></p>
                                </td>
                            </tr>
                        </table>

                    </tr>
                </table>
                <table class="yoi-specifications w-100">
                    <tr class="yoi-title w-100">
                        <h4>Specifications</h4>
                    </tr>
                    <tr class="w-100">
                        <td class="w-50">
                            <table class="w-100">
                                <tr class="supporting-info-row">
                                    <td class="supporting-info-title">YACHT TYPE</td>
                                    <td class="supporting-info-description"><?php echo $category ?></td>
                                </tr>
                                <tr class="supporting-info-row">
                                    <td class="supporting-info-title">BRAND</td>
                                    <td class="supporting-info-description"><?php echo $make ?></td>
                                </tr>
                                <tr class="supporting-info-row">
                                    <td class="supporting-info-title">YEAR</td>
                                    <td class="supporting-info-description"><?php echo $year ?></td>
                                </tr>
                                <tr class="supporting-info-row">
                                    <td class="supporting-info-title">HULL</td>
                                    <td class="supporting-info-description"><?php echo $construction ?></td>
                                </tr>
                                <tr class="supporting-info-row">
                                    <td class="supporting-info-title">DAYS LISTED</td>
                                    <td class="supporting-info-description">
                                        <?php
                                        $to_date = time();
                                        $itemReceivedDate = $vessel->IMTTimeStamp;
                                        $itemDate = substr($itemReceivedDate, 0, 10);
                                        //console_log($itemReceivedDate);
                                        $from_date = strtotime($vessel->IMTTimeStamp);

                                        //console_log('>>>>>>>>>>', $from_date);
                                        $day_diff = $to_date - $from_date;
                                        echo floor($day_diff / (60 * 60 * 24)) . "\n";
                                        ?> days
                                    </td>
                                </tr>
                                <tr class="supporting-info-row">
                                    <td class="supporting-info-title">PRICE</td>
                                    <td class="supporting-info-description"><?php echo $price ?></td>
                                </tr>
                            </table>
                        </td>
                        <td class="w-50">
                            <table class="w-100">
                                <tr class="supporting-info-row">
                                    <td class="supporting-info-title">LENGTH OVERALL</td>
                                    <td class="supporting-info-description"><?php echo $lengthOverallMeters ?> m / <?php echo $lengthOverall ?></td>
                                </tr>
                                <tr class="supporting-info-row">
                                    <td class="supporting-info-title">BEAM</td>
                                    <td class="supporting-info-description"><?php echo $beam ?></td>
                                </tr>
                                <tr class="supporting-info-row">
                                    <td class="supporting-info-title">MAX DRAFT</td>
                                    <td class="supporting-info-description"><?php echo $draft ?></td>
                                </tr>
                                <tr class="supporting-info-row">
                                    <td class="supporting-info-title">MAX SPEED</td>
                                    <td class="supporting-info-description"><?php echo $maxSpeed ?> kn</td>
                                </tr>
                                <tr class="supporting-info-row">
                                    <td class="supporting-info-title">CRUISING SPEED</td>
                                    <td class="supporting-info-description"><?php echo $cruisingSpeed ?> kn</td>
                                </tr>
                                <tr class="supporting-info-row">
                                    <td class="supporting-info-title">ENGINES</td>
                                    <td class="supporting-info-description"><?php echo $engineQty ?> x <?php echo $engineFuel1 ?></td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
                <table class="brochure footer w-100" style="margin-top: 23%;">
                    <tr class="w-100">
                        <td class="w-50">
                            <img src="<?php echo get_template_directory_uri(); ?>/pdf_images/IYG_Logo_PDF.png" class="img-fluid" alt="italian-flag" height="54px" width="150px">
                        </td>
                        <td class="w-50">
                            <table class="w-100">
                                <tr>
                                    <td>
                                        <h5 style="margin-bottom: 0;"> Boomer Jousma | Sales Executive</h5>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="footer-phone">
                                        (954) 600-4966
                                    </td>
                                </tr>

                                <tr>
                                    <td class="footer-email">
                                        boomer@theiyg.com
                                    </td>
                                </tr>
                                <tr>
                                    <td class="footer-link">
                                        <a href="/home" style="color: #C00020; text-decoration: none; font-size: 14px; text-transform: lowercase;">www.italianyachtgroup.com</a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </div>

            <!--PAGE 3 Description and Gallery-->
            <!--IMAGES-->
            <!--PRINT LISTING FOOTER-->

            <!--PAGE 4 Gallery-->
            <div class="main-page-wrap page-break">
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
                <table class="brochure footer w-100" style="margin-top: 23%;">
                    <tr class="w-100">
                        <td class="w-50">
                            <img src="<?php echo get_template_directory_uri(); ?>/pdf_images/IYG_Logo_PDF.png" class="img-fluid" alt="italian-flag" height="54px" width="150px">
                        </td>
                        <td class="w-50">
                            <table class="w-100">
                                <tr>
                                    <td>
                                        <h5 style="margin-bottom: 0;"> Boomer Jousma | Sales Executive</h5>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="footer-phone">
                                        (954) 600-4966
                                    </td>
                                </tr>

                                <tr>
                                    <td class="footer-email">
                                        boomer@theiyg.com
                                    </td>
                                </tr>
                                <tr>
                                    <td class="footer-link">
                                        <a href="/home" style="color: #C00020; text-decoration: none; font-size: 14px; text-transform: lowercase;">www.italianyachtgroup.com</a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </div>

            <div class="main-page-wrap page-break">
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


                <table class="brochure footer w-100" style="margin-top: 23%;">
                    <tr class="w-100">
                        <td class="w-50">
                            <img src="<?php echo get_template_directory_uri(); ?>/pdf_images/IYG_Logo_PDF.png" class="img-fluid" alt="italian-flag" height="54px" width="150px">
                        </td>
                        <td class="w-50">
                            <table class="w-100">
                                <tr>
                                    <td>
                                        <h5 style="margin-bottom: 0;"> Boomer Jousma | Sales Executive</h5>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="footer-phone">
                                        (954) 600-4966
                                    </td>
                                </tr>

                                <tr>
                                    <td class="footer-email">
                                        boomer@theiyg.com
                                    </td>
                                </tr>
                                <tr>
                                    <td class="footer-link">
                                        <a href="/home" style="color: #C00020; text-decoration: none; font-size: 14px; text-transform: lowercase;">www.italianyachtgroup.com</a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </div>
</body>

</html>


<!--END PRINT LISTING-->