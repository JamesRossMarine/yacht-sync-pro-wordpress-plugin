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

            $post_author_id = $this->context->post->post_author;

            $site_url = home_url();
            $current_post = $this->context->post;
            $permalink = get_permalink($current_post);

            $yacht_meta = get_post_meta($current_post->ID);
            // var_dump($yacht_meta);

            $fuel_type = get_post_meta($current_post->ID, 'YSP_EngineFuel', true);
            $engine_type = get_post_meta($current_post->ID, 'YSP_EngineModel', true);

            // we should probably add some data validation here
            $data = [
                "@type"         => "Vehicle",
                "@id"           => $permalink . "#vehicle",
                "url"           => $permalink,
                "name"          => $current_post->post_title,
                "vehicleEngine" => $engine_type,
                "fuelType"      => $fuel_type,
            ];
            
            return $data;
        }
    }