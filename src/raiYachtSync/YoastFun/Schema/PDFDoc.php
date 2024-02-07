<?php
    class raiYachtSync_YoastFun_Schema_PDFDoc {

        public $context;

        public function __construct( WPSEO_Schema_Context $context ) {
            $this->context = $context;

            $this->options = new raiYachtSync_Options();
        }

        public function is_needed() {
            return is_singular('rai_yacht');
        }

        public function generate() {
            $current_post = $this->context->post;
            
            $pdf_url = get_post_meta($current_post->ID, 'YSP_PDF_URL', true);

            if (empty($pdf_url)) {
                return [];
            }

            $data = [
                "@type" => "DigitalDocument",
                "name" => $current_post->post_title.' Brochure' ,
                "author" => $this->options->get('company_name'),
                "url" => $pdf_url,
            ];

            return $data;
        }
    }