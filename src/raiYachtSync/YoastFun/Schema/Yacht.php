<?php
    class raiYachtSync_YoastFun_Schema_Yacht {

        public $context;

        public function __construct( WPSEO_Schema_Context $context ) {
            $this->context = $context;
        }

        public function is_needed() {
            return is_singular('rai_yacht');
        }

        public function generate() {

            $site_url = home_url();
            $current_post = $this->context->post;
            $permalink = get_permalink($current_post);

            $description = get_post_meta($current_post->ID,'GeneralBoatDescription', true);
            $description = strip_tags($description[0]);
            $fuel_type = get_post_meta($current_post->ID, 'YSP_EngineFuel', true);
            $engine_type = get_post_meta($current_post->ID, 'YSP_EngineModel', true);
            $model_year = get_post_meta($current_post->ID, 'ModelYear', true);
            $make_string = get_post_meta($current_post->ID, 'MakeString', true);
            $model_type = get_post_meta($current_post->ID, 'Model', true);
            $document_id = get_post_meta($current_post->ID, 'DocumentID', true);
            $speed = get_post_meta($current_post, 'MaximumSpeedMeasure', true);
            $price = get_post_meta($current_post->ID, 'Price', true);
            $price = intval($price);

            $images = get_post_meta($current_post->ID, 'Images', true);
            $images_array = array();

            foreach ($images as $image) {
                $images_array[] = $image->Uri;
            }

            // we should probably add some data validation here
            $data = [
                "@type"         => "Vehicle",
                "@id"           => $permalink . "#vehicle",
                "url"           => $permalink,
                "name"          => $current_post->post_title,
                "description"   => $description,
                "sku"           => $document_id,
                "image"         => $images_array,
                "modelDate"     => $model_year,
                "productID"     => $document_id,
                "manufacturer"  => $make_string,
                "model"         => $model_type,
                "speed"         => $speed,
                "vehicleEngine" => $engine_type,
                "fuelType"      => $fuel_type,
                "offers"        => (object) array(
                    "@type"         => "Offer",
                    "name"          => $current_post->post_title,
                    "price"         => strval($price),
                    "url"           => $site_url . "/#webpage",
                    "priceCurrency" => "USD",
                    "availability"  => "InStock"
                )
            ];
            
            return $data;
        }
    }