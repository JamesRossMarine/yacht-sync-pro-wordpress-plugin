<?php
    class raiYachtSync_YoastFun_Schema_Search_Item_List {

        public $context;

        public function __construct( WPSEO_Schema_Context $context ) {
            $this->context = $context;
            $this->options = new raiYachtSync_Options();
        }

        public function is_needed() {

            $yacht_sync_search_page = $this->options->get('yacht_search_page_id');

            return is_singular($yacht_sync_search_page);
        }

        public function generate() {

            $site_url = home_url();
            $current_post = $this->context->post;
            $permalink = get_permalink($current_post);

            $args = array(
                'post_type'     => 'rai_yacht',
                'post_per_page' => 3,
                ''
            );

            $list_of_yachts = get_posts($args);

            var_dump($list_of_yachts);

            // foreach ($list_of_yachts as $yacht){

            // }

            // we should probably add some data validation here
            $data = [
                "@type"           => "ItemList",
                "name"            => "Browse All Yachts and Boats For Sale",
                "numberOfItems"   => 12,
                "itemListElement" => ""
            ];
            
            return $data;
        }
    }