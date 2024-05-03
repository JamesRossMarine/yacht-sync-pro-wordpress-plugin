<?php
    class raiYachtSync_YoastFun_Schema_VideoObject {

    public $context;

    public function __construct( WPSEO_Schema_Context $context ) {
        $this->context = $context;
        $this->options = new raiYachtSync_Options();

        if (isset($this->context->post)) {
            $this->context->video = get_post_meta($this->context->post->ID, 'Videos', true);
        }

        $this->youtube_data_api_key = $this->options->get('youtube_data_api_key');
        

    }

    public function is_needed() {
        return is_singular('rai_yacht') && isset($this->context->video->url[0]);
    }

    public function generate() {

        $youtube_data_api_key = $this->youtube_data_api_key;

        $url = $this->context->video->url[0];
        $url_without_query = strstr($url, "?", true);
        $url_parts = explode("/", $url_without_query);
        $video_id = end($url_parts);


        $api_url = "https://www.googleapis.com/youtube/v3/videos?id=" . $video_id . "&key=" . $youtube_data_api_key . "&part=contentDetails,snippet";

        $youtube_data_response = wp_remote_get(
            esc_url_raw( $api_url ),
            array(
                'headers' => array(
                    'referer' => home_url()
                )
            )
        );

        $youtube_data_response = json_decode(wp_remote_retrieve_body($youtube_data_response));
        $youtube_description = $youtube_data_response->items[0]->snippet->description;
        $youtube_description = strip_tags($youtube_description);
        $youtube_description = preg_replace('/[^a-zA-Z0-9\s]/', '', $youtube_description);

        if (isset($youtube_data_api_key) && $youtube_data_api_key != "") {
            $data = [
                "@type" => "VideoObject",
                "name" => $this->context->post->post_title . " Video",
                "description" => $youtube_description,
                "thumbnailUrl" => $this->context->video->thumbnailUrl[0],
                "contentUrl" => $this->context->video->url[0],
                "uploadDate" => $youtube_data_response->items[0]->snippet->publishedAt,
                "duration" => $youtube_data_response->items[0]->contentDetails->duration
            ];
    
            return $data;
        }

        return [];
    }
}   