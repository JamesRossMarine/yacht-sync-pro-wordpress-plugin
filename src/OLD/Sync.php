<?php

class Sync
{
    use Parser;

    protected $logFile;
    protected $documentIds = [];
    protected $error;
    protected $limit = 200;
    protected $yachtBrokerLimit = 30;
    protected $fileStream;
    protected $inventoryJsonFilename = 'masteryachtlist.json';

    protected $yachtBrokerAPIKey = '0a3e392e786c817195307150386779f18c69540e';
    protected $yachtClientId = '82340';

    protected $isExclusive = false;

    private $yactchSynced = 0; //3rd api

    public function run()
    {
        $inventoryPath = get_stylesheet_directory().'/'.$this->inventoryJsonFilename;

        $this->logFile = get_stylesheet_directory().'/api-log.txt';
        $this->truncate($this->logFile);

        // Fetch exclusive
        $this->isExclusive = true; // we will add company name manually
        $url               = 'https://api.boats.com/inventory/search?key=5rz42z95sp3q93vpjup99v993bewke';
        $count             = $this->getCount($url);
        if ( ! is_numeric($count)) {
            return;
        }

        $this->fileStream = new JsonWriter($inventoryPath);
        $this->printIt('Got '.$count.' api.boats.com.');

        $this->recurssiveSync($url);
        $this->isExclusive = false;

        $this->printIt('Synced api.boats.com.');

        $this->printIt('Syncing services.boats.com API.');

        $url = 'https://services.boats.com/pls/boats/search?key=e97cdb91056f&fields=SalesStatus,MakeString,Model,ModelYear,BoatCategoryCode,SaleClassCode,StockNumber,BoatLocation,BoatName,BoatClassCode,BoatHullMaterialCode,BoatHullID,DesignerName,RegistrationCountryCode,NominalLength,LengthOverall,BeamMeasure,MaxDraft,BridgeClearanceMeasure,DryWeightMeasure,Engines,CruisingSpeedMeasure,RangeMeasure,AdditionalDetailDescription,DriveTypeCode,MaximumSpeedMeasure,FuelTankCountNumeric,FuelTankCapacityMeasure,WaterTankCountNumeric,WaterTankCapacityMeasure,HoldingTankCountNumeric,HoldingTankCapacityMeasure,CabinsCountNumeric,SingleBerthsCountNumeric,DoubleBerthsCountNumeric,TwinBerthsCountNumeric,HeadsCountNumeric,GeneralBoatDescription,AdditionalDetailDescription,EmbeddedVideoPresent,Videos,Images,NormPrice,Price,CompanyName,SalesRep,DocumentID,BuilderName,IMTTimeStamp,PlsDisclaimer';

        $count = $this->getCount($url);

        if ( ! is_numeric($count)) {
            $this->printIt($this->error);

            return;
        }

        $this->printIt('Got '.$count.' boats from inventory API.');
        $this->recurssiveSync($url);


        $this->printIt('Syncing YachtBroker API.');
        $this->syncYachtBrokerResponse();
        $this->fileStream->cleanup();

        $this->printIt('Total yacht synced from third api: ' . $this->yactchSynced);
        $this->printIt('Total '.count($this->documentIds).' boats synced.');
        //exit;
    }

    protected function syncYachtBrokerResponse($url = null)
    {
        $headers = [
            'headers' => [
                'X-API-KEY'   => $this->yachtBrokerAPIKey,
                'X-CLIENT-ID' => $this->yachtClientId
            ]
        ];
        $apiUrl  = 'https://api.yachtbroker.org/listings?key='.$this->yachtBrokerAPIKey.'&gallery=true&engines=true&generators=true&textblocks=true&media=true&limit='.$this->yachtBrokerLimit;

        if ( ! $url) {
            $url = $apiUrl;
        }

        $body = $this->wpFetch($url, $headers);

        if ( ! $body) {
            return;
        }

        $json = json_decode($body, true);
        
        if ( ! $json || ! isset($json['V-Data'])) {
            $this->error = 'Failed to decode response from Yatch broker. Raw response from API: '.$body;
            $this->notifyByEmail('Error in API.', $this->error.'<br>. API call: '.$this->error);

            return;
        }

        $nextPageUrl = null;

        if ($json['next_page_url']) {
            $nextPageUrl = $apiUrl.'&page='.($json['current_page'] + 1);
        }

        $this->printIt('Total yachts in the API: '.$json['total']);

        foreach ($json['V-Data'] as $row) {
            if (in_array($row['ID'], $this->documentIds)) {
                $this->printIt('Got duplicate: '.$row['ID']);
                continue;
            }

            if (in_array($row['VesselName'], $this->documentIds)) {
                $this->printIt('Got duplicate vessel name: '.$row['ID']);
                continue;
            }

            $this->yactchSynced ++;
            // Uncomment for testing
            /*if ($row['ID'] != 2798642) {
                continue;
            }*/

            $this->obj = $row;

            $this->createGroup('SalesRep',
                ['ListingOwnerID', 'ListingOwnerName', 'ListingOwnerPhone', 'ListingOwnerEmail']);

            $this->createGroup('BoatLocation', ['City', 'State', 'Zip']);

            $this->renameFields([
                'ID'                         => 'DocumentID',
                'Condition'                  => 'SalesStatus',
                'SalesRep.ListingOwnerID'    => 'SalesRep.PartyId',
                'SalesRep.ListingOwnerEmail' => 'SalesRep.Email',
                'SalesRep.ListingOwnerName'  => 'SalesRep.Name',
                'SalesRep.ListingOwnerPhone' => 'SalesRep.Phone',
                'BoatLocation.City'          => 'BoatLocation.BoatCityName',
                'BoatLocation.Country'       => 'BoatLocation.BoatCountryID',
                'BoatLocation.State'         => 'BoatLocation.BoatStateCode',
                'ListingOwnerBrokerageName'  => 'CompanyName',
                'GeneralBoatDescription'     => 'Summary',
                'NumberOfEngines'            => 'EngineQty',
                'PriceUSD'                   => 'Price',
                'Year'                       => 'ModelYear',
                'PriceHidden'                => 'PriceHideInd',
                'MakeString'                 => 'Manufacturer',
                'Type'                       => 'BoatCategoryCode',
                'VesselName'                 => 'BoatName',
                'CruiseSpeed'                => 'CruisingSpeedMeasure',
                'MaximumSpeed'               => 'MaximumSpeedMeasure',
                'RangeNMI'                   => 'RangeMeasure',
                'BeamFeet'                   => 'BeamMeasure',
                'UpdatedTimestamp'           => 'LastModificationDate',
                'FreshWaterCapacityGallons'  => 'WaterTankCapacityMeasure',
                'FuelTankCapacityGallons'    => 'FuelTankCapacityMeasure',
                'DryWeight'                  => 'DryWeightMeasure',
                'CabinCount'                 => 'CabinsCountNumeric',
                'HeadCount'                  => 'HeadsCountNumeric',
                'HullMaterial'               => 'BoatHullMaterialCode',
                'HullIdentificationNumber'   => 'BoatHullID',
                'LOAFeet'                    => 'DisplayLengthFeet',
                'TaxStatus'                  => 'TaxStatusCode',
                'LOAMeters'                  => 'NormNominalLength',
                'Description'                => 'AdditionalDetailDescription',
            ]);

            $this->obj['CruisingSpeedMeasure'] .= ' '.str_replace('Knots', 'kn', $this->obj['SpeedUnit']);
            $this->obj['MaximumSpeedMeasure']  .= ' '.str_replace('Knots', 'kn', $this->obj['SpeedUnit']);
            if ($this->obj['BeamMeasure']) {
                $this->obj['BeamMeasure'] .= ' ft';
            }
            if ($this->obj['WaterTankCapacityMeasure']) {
                $this->obj['WaterTankCapacityMeasure'] .= '|gallon';
            }
            if ($this->obj['FuelTankCapacityMeasure']) {
                $this->obj['FuelTankCapacityMeasure'] .= '|gallon';
            }
            if ($this->obj['DryWeightMeasure']) {
                $this->obj['DryWeightMeasure'] .= ' lb';
            }

            if ($this->obj['Category']) {
                $this->obj['BoatClassCode'] = [$this->obj['Category']];
            }

            // if there is no additional description and TextBlocks has description then let's grab it from there.
            if ( ! $this->obj['AdditionalDetailDescription'] && isset($this->obj['Textblocks']) && is_array($this->obj['Textblocks'])) {
                $this->obj['AdditionalDetailDescription'] = '';
                foreach ($this->obj['Textblocks'] as $block) {
                    $this->obj['AdditionalDetailDescription'] .= '<h3>'.$block['Title'].'</h3>';
                    $this->obj['AdditionalDetailDescription'] .= $block['Description'];
                }
            }

            if (isset($this->obj['Engines']) && is_array($this->obj['Engines'])) {
                $engines     = [];
                $enginePower = 0;
                foreach ($this->obj['Engines'] as $engine) {
                    $enginePower += $engine['PowerHP'];
                    $engines[]   = [
                        'Make'        => $engine['EngineMake'],
                        'Model'       => $engine['EngineModel'],
                        'Fuel'        => $engine['FuelType'],
                        'EnginePower' => $engine['PowerHP'],
                        'Type'        => $engine['EngineType'],
                        'Hours'       => $engine['Hours'],
                    ];
                }
                $this->obj['Engines']                  = $engines;
                $this->obj['TotalEnginePowerQuantity'] = number_format($enginePower, 2).' hp';
            }

            $images = null;
            if ($this->obj['gallery']) {
                $images = [];
                foreach ($this->obj['gallery'] as $key => $img) {
                    $images[] = [
                        'Priority' => $img['Sort'],
                        'Caption'  => $img['Title'],
                        'Uri'      => $img['HD']
                    ];
                }
            }
            $this->obj['Images'] = $images;

            foreach ($this->obj as $k => $v) {
                if (stripos($k, 'secondary') !== false || stripos($k, 'third') !== false) {
                    unset($this->obj[$k]);
                }
            }

            $this->unsetVars([
                'ListingOwnerCell',
                'ListingOwnerBrokerageID',
                'ListingOwnerOfficeID',
                'ListingOwnerOfficeDisplayPicture',
                'gallery',
                'Textblocks',
                'DisplayPicture',
                'SpeedUnit',
            ]);
        }

        if ($nextPageUrl) {
            $this->printIt('Syncing Yacht broker next page: '.($json['current_page'] + 1));

            return $this->syncYachtBrokerResponse($nextPageUrl);
        }
    }

    /**
     * @param $url
     * @param  int  $start
     *
     * @return void|callable
     */
    protected function recurssiveSync($url, $start = 0)
    {
        $apiUrl = $url.'&start='.$start.'&rows='.$this->limit;

        $this->printIt('Syncing '.$apiUrl);

        $apiResponse = $this->getApiResponse($apiUrl);
        if ( ! $apiResponse) {
            return;
        }

        $total = $apiResponse['numResults'];

        if ($start > $total) {
            return;
        }

        foreach ($apiResponse['results'] as $record) {
            // Ignore duplicates
            if (in_array($record['DocumentID'], $this->documentIds)) {
                $this->printIt('Got duplicate: '.$record['DocumentID']);
                continue;
            }
            $this->documentIds[] = $record['DocumentID'];
            if ($this->isExclusive) {
                $record['CompanyName'] = 'Italian Yacht Group';
            }
            // Add exclusives boat name to compare
            if (isset($record['CompanyName']) && $record['CompanyName'] === 'Italian Yacht Group') {
                $this->documentIds[] = $record['BoatName'];
            }

            $this->fileStream->add($record);
        }

        $this->printIt('Synced: '.count($apiResponse['results']));
        unset($apiResponse);

        // Cleanup RAM
        gc_collect_cycles();

        $offset = $start + $this->limit;
        if ($offset > $total) {
            return;
        }

        return $this->recurssiveSync($url, $offset);
    }

    protected function getCount($url)
    {
        $url      .= '&rows=0';
        $response = $this->getApiResponse($url);
        if ( ! $response) {
            return false;
        }

        return $response['numResults'];
    }

    protected function getApiResponse($url, $json_decode = true)
    {
        $body = $this->wpFetch($url);
        if ($json_decode) {
            $json = json_decode($body, true);
            if ( ! $json || ( ! isset($json['data']) && ! isset($json['numResults']))) {
                $this->error = 'Failed to decode response. Raw response from API: '.$body;
                $this->notifyByEmail('Error in API.', $this->error.'<br>. API call: '.$this->error);

                return false;
            }

            return isset($json['data']) ? $json['data'] : $json;
        }

        return $body;
    }

    protected function wpFetch($url, $headers = [])
    {
        $headers     = array_merge($headers, ['timeout' => 300]);
        $apiResponse = wp_remote_get($url, $headers);
        if (is_wp_error($apiResponse)) {
            $this->error = $apiResponse->get_error_message();
            $this->notifyByEmail('Error in API.', $this->error.'<br>. API call: '.$this->error);

            return false;
        }

        return wp_remote_retrieve_body($apiResponse);
    }

    protected function notifyByEmail($subject, $body)
    {
        $to      = 'johan@jamesrossadvertising.com'; //sendto@example.com
        $headers = [
            'Content-Type: text/html; charset=UTF-8',
            'From: gary@jamesrossadvertising.com',
            'Cc: brandon@jamesrossadvertising.com'
        ];

        $this->printIt($body);

        wp_mail($to, $subject, $body, $headers);
    }

    protected function printIt($line, $log_in_file = true, $show_time = true)
    {
        if ($show_time) {
            $line = date('Y-m-d H:i:s').': '.$line;
        }

        if ($log_in_file) {
            file_put_contents($this->logFile, $line.PHP_EOL, FILE_APPEND);
        }

        if (php_sapi_name() != 'cli') {
            return;
        }


        echo $line, PHP_EOL;
    }

    /**
     * Truncate file.
     *
     * @param $filePath
     *
     * @return void
     */
    protected function truncate($filePath)
    {
        file_put_contents($filePath, '');
    }

}