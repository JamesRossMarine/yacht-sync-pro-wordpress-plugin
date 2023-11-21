<?php
class raiYachtSync_YoastFun_Schema_Image_Gallery
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
        $data = [
            "@type" => "ImageGallery",
        ];

        return $data;
    }
}
