<?php

    class raiYachtSync_YoastFun_Schema_Broker {

        public $context;

        public function __construct( WPSEO_Schema_Context $context ) {
            $this->context = $context;
        }

        public function is_needed() {
            return is_singular('rai_team');
        }

        public function generate() {

            $post_author_id = $this->context->post->post_author;
            $site_url = home_url();
            $current_post = $this->context->post;
            $permalink = get_permalink($current_post);
            $rai_team_email = get_post_meta($current_post->ID, 'rai_team_email', true);
            $rai_team_phone = get_post_meta($current_post->ID, 'rai_team_phone', true);

            $featured_image_data = wp_get_attachment_image_src(get_post_thumbnail_id($current_post), 'full');

            // Extract the URL, width, and height from the image data
            $featured_image_url = isset($featured_image_data[0]) ? $featured_image_data[0] : '';
            $featured_image_width = isset($featured_image_data[1]) ? $featured_image_data[1] : '';
            $featured_image_height = isset($featured_image_data[2]) ? $featured_image_data[2] : '';

            // we should probably add some data validation here
            $data = [
                "@type"         => "Person",
                "@id"           => $permalink . "#person",
                "url"           => $permalink,
                "name"          => $current_post->post_title,
                "email"         => $rai_team_email,
                "telephone"     => $rai_team_phone,
                "image"         => (object) array (
                    "@type"          => "ImageObject",
                    "url"            => $featured_image_url,
                    "height"         => $featured_image_height,
                    "width"         => $featured_image_width
                ),
                "worksFor"      => (object) array (
                    "@type"          => "Organization",
                    "@id"            => $site_url . "/#organization"
                )
            ];
            
            return $data;
        }
    }