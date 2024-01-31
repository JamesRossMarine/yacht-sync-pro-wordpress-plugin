<?php
class raiYachtSync_YoastFun_Schema_Yacht
{

    public $context;

    public function __construct(WPSEO_Schema_Context $context)
    {
        $this->context = $context;
    }

    public function is_needed()
    {
        return is_singular('rai_yacht');
    }

    public function generate()
    {

        $current_post = $this->context->post;
        $permalink = get_permalink($current_post);
        $site_url = home_url();
        $description = get_post_meta($current_post->ID, 'GeneralBoatDescription', true);
        $description = strip_tags($description[0]);
        $description = htmlspecialchars($description);
        $fuel_type = get_post_meta($current_post->ID, 'YSP_EngineFuel', true);
        $engine_type = get_post_meta($current_post->ID, 'YSP_EngineModel', true);
        $model_year = get_post_meta($current_post->ID, 'ModelYear', true);
        $make_string = get_post_meta($current_post->ID, 'MakeString', true);
        $model_type = get_post_meta($current_post->ID, 'Model', true);
        $document_id = get_post_meta($current_post->ID, 'DocumentID', true);
        $speed = get_post_meta($current_post->ID, 'MaximumSpeedMeasure', true);
        $price = get_post_meta($current_post->ID, 'Price', true);
        $price = intval($price);

        $images = get_post_meta($current_post->ID, 'Images', true);
        $images_array = array();

        foreach ($images as $image) {
            // $images_array[] = (object) array(
            //     "associatedMedia" => (object) array(
            //         '@type' => "ImageObject",
            //         "thumbnail" => (object) array(
            //             '@type' => "ImageObject",
            //             'url'   => $image->Uri
            //         )
            //     )
            // );
            $images_array[] = [
                '@type' => "ImageObject",
                "thumbnail" => [
                    '@type' => "ImageObject",
                    'url'   => $image->Uri
                ]
            ];
        }

        // we should probably add some data validation here
        $data = [
            "@type" => "Vehicle",
            "name" => $current_post->post_title,
            "mpn" => $document_id,
            "sku" => $document_id,
            "url" => $permalink,
            "image" => $images[0]->Uri,
            'category' => '',
            "description" => $description,
            "modelDate" => $model_year,
            "manufacturer" => $make_string,
            "brand" => $make_string,
            "model" => $model_type,
            "speed" => $speed,
            "vehicleEngine" => $engine_type,
            "fuelType" => $fuel_type,
            "offers" => [
                "@type" => "Offer",
                "name" => $current_post->post_title,
                "price" => $price,
                "priceCurrency" => "USD",
                "availability"  => "InStock"
            ]
        ];

            // [
            //     "@type" => "ImageGallery",
            //     "associatedMedia" => $images_array
            // ]

        return $data;
    }
}
