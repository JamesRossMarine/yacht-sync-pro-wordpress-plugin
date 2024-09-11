<?php
    class YachtSyncPro_YoastFun_Schema_ImageGallery {

        public $context;

    public function __construct( WPSEO_Schema_Context $context ) {
        $this->context = $context;
    }

    public function is_needed() {
        return is_singular('rai_yacht');
    }

    public function generate() {
        $current_post = $this->context->post;
        
        $images = get_post_meta($current_post->ID, 'Images', true);

        if (empty($images) || !is_array($images)) {
            return [];
        }

        $data = [
            "@type" => "ImageGallery",
            "image" => []
        ];

        foreach ($images as $image) {
            $imageObject = [
                "@type" => "ImageObject",
                "url" => $image->Uri
            ];
            $data['image'][] = $imageObject;
        }

        return $data;
    }
}