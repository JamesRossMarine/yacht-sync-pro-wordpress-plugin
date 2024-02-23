<?php
    class raiYachtSync_YoastFun_Schema_VideoObject {

    public $context;

    public function __construct( WPSEO_Schema_Context $context ) {
        $this->context = $context;

        if (isset($this->context->post)) {
            $this->context->video = get_post_meta($this->context->post->ID, 'Videos', true);
        }

    }

    public function is_needed() {
        return is_singular('rai_yacht') && isset($this->context->video->url[0]);
    }

    public function generate() {

        $data = [
            "@type" => "VideoObject",
            "name" => $this->context->post->post_title . " Video",
            "thumbnailUrl" => $this->context->video->thumbnailUrl[0],
            "contentUrl" => $this->context->video->url[0],
        ];

        return $data;
    }
}   