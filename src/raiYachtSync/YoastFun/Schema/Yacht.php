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

            // we should probably add some data validation here
            $data = [
                "@type"         => "Vehicle",
                "@id"           => $permalink . "#vehicle",
                "url"           => $permalink,
                "name"          => $current_post->post_title,
            ];
            
            return $data;
        }
    }