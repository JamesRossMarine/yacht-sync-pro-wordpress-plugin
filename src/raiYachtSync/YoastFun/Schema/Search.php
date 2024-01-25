<?php
    class raiYachtSync_YoastFun_Schema_Search {

        public $context;

        public function __construct( WPSEO_Schema_Context $context ) {
            $this->context = $context;
            
            $this->options = new raiYachtSync_Options();
			$this->yacht_search_page_id = $this->options->get('yacht_search_page_id');
        }

        public function is_needed() {
            $this->options = new raiYachtSync_Options();
			$this->yacht_search_page_id = $this->options->get('yacht_search_page_id');

            return is_page($this->yacht_search_page_id);
        }

        public function generate() {

            $site_url = home_url();
            $current_post = $this->context->post;
            $permalink = get_permalink($current_post);

            // we should probably add some data validation here
            $data = [
                "@type"         => "SearchResultsPage",
                "@id"           => $permalink . "#webpage",
            ];
            
            return $data;
        }
    }