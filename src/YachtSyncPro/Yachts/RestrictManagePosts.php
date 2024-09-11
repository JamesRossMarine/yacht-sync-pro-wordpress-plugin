<?php
    #[AllowDynamicProperties]

    class YachtSyncPro_Yachts_RestrictManagePosts {
        public function __construct() {
            $this->DBHelper = new YachtSyncPro_DBHelper();
        }
        
        public function add_actions_and_filters() {
            add_action( 'restrict_manage_posts', array($this, 'rai_yacht_filtering_by_boat_class'), 10, 1 );
            add_action( 'restrict_manage_posts', array($this, 'rai_yacht_filtering_by_builder'), 10, 1 );
            add_action( 'restrict_manage_posts', array($this, 'rai_yacht_filtering_by_condition'), 10, 1 );
            add_action( 'restrict_manage_posts', array($this, 'rai_yacht_filtering_by_min_length'), 10, 1 );
            add_action( 'restrict_manage_posts', array($this, 'rai_yacht_filtering_by_max_length'), 10, 1 );
            add_action( 'restrict_manage_posts', array($this, 'rai_yacht_filtering_by_min_price'), 10, 1 );
            add_action( 'restrict_manage_posts', array($this, 'rai_yacht_filtering_by_max_price'), 10, 1 );
        }

        public function rai_yacht_filtering_by_boat_class($post_type) {
            if ($post_type != 'rai_yacht') {
                return;
            }

            $taxonomies_slugs = array (
                'boatclass'
            );

            foreach( $taxonomies_slugs as $slug ) {
                $taxonomy = get_taxonomy($slug);
                $selected = '';
                $selected = isset( $_REQUEST[ $slug ] ) ? $_REQUEST[ $slug ] : '';
                
                wp_dropdown_categories ( array (
                    'show_option_all' => __("Show All {$taxonomy->label}"),
                    'taxonomy' => $slug,
                    'name' => $slug,
                    'orderby' => 'name',
                    'selected' => $selected,
                    'show_count' => true,
                    'hide_empty' => true,
                ) );
            }
        }

        public function rai_yacht_filtering_by_builder($post_type) {
            if($post_type != 'rai_yacht'){
                return;
            }
            
            global $wpdb;

            $selected = '';
            $request_attr = 'make';
            $meta_key = 'MakeString';

            if ( isset($_REQUEST[$request_attr]) ) {
            
                $selected = $_REQUEST[$request_attr];
            }

            $results = $this->DBHelper->get_unique_yacht_meta_values($meta_key);
            
            echo '<select name="make">';
            echo '<option value="0">' . __( 'All makes', 'ysp.local' ) . ' </option>';

            foreach($results as $make){
                $select = ($make == $selected) ? ' selected="selected"':'';
                echo '<option value="' . $make . '"' . $select . '>' . $make . ' </option>';
            }

            echo '</select>';
        }

        public function rai_yacht_filtering_by_condition($post_type) {
            if($post_type != 'rai_yacht'){
                return;
            }
            
            global $wpdb;

            $selected = '';
            $request_attr = 'condition';
            $meta_key = 'SaleClassCode';

            if ( isset($_REQUEST[$request_attr]) ) {
            
                $selected = $_REQUEST[$request_attr];
            }

            $results = $this->DBHelper->get_unique_yacht_meta_values($meta_key);
            
            echo '<select name="condition">';
            echo '<option value="">' . __( 'Any condition', 'ysp.local' ) . ' </option>';

            foreach($results as $condition){
                $select = ($condition == $selected) ? ' selected="selected"':'';
                echo '<option value="' . $condition . '"' . $select . '>' . $condition . ' </option>';
            }

            echo '</select>';
        }

        public function rai_yacht_filtering_by_min_length($post_type) {
            if($post_type != 'rai_yacht'){
                return;
            }
            
            global $wpdb;

            $selected = '';
            $request_attr = 'lengthlo';
            $meta_key = 'YSP_Length';

            if ( isset($_REQUEST[$request_attr]) ) {
            
                $selected = $_REQUEST[$request_attr];
            }

            $results = $this->DBHelper->get_unique_yacht_meta_values($meta_key);
            echo '<input type="number" name="lengthlo" placeholder="Any minimum length (ft)" value="' . esc_attr($selected) . '" />';
        }

        public function rai_yacht_filtering_by_max_length($post_type) {
            if($post_type != 'rai_yacht'){
                return;
            }
            
            global $wpdb;

            $selected = '';
            $request_attr = 'lengthhi';
            $meta_key = 'YSP_Length';

            if ( isset($_REQUEST[$request_attr]) ) {
            
                $selected = $_REQUEST[$request_attr];
            }

            $results = $this->DBHelper->get_unique_yacht_meta_values($meta_key);
            echo '<input type="number" name="lengthhi" placeholder="Any maximum length (ft)" value="' . esc_attr($selected) . '" />';
        }

        public function rai_yacht_filtering_by_min_price($post_type) {
            if($post_type != 'rai_yacht'){
                return;
            }
            
            global $wpdb;

            $selected = '';
            $request_attr = 'pricelo';
            $meta_key = 'NormPrice';

            if ( isset($_REQUEST[$request_attr]) ) {
            
                $selected = $_REQUEST[$request_attr];
            }

            $results = $this->DBHelper->get_unique_yacht_meta_values($meta_key);

            echo '<input type="number" name="pricelo" placeholder="Any minimum price" value="' . esc_attr($selected) . '" />';
        }

        public function rai_yacht_filtering_by_max_price($post_type) {
            if($post_type != 'rai_yacht'){
                return;
            }
            
            global $wpdb;

            $selected = '';
            $request_attr = 'pricehi';
            $meta_key = 'NormPrice';

            if ( isset($_REQUEST[$request_attr]) ) {
            
                $selected = $_REQUEST[$request_attr];
            }

            $results = $this->DBHelper->get_unique_yacht_meta_values($meta_key);
            echo '<input type="number" name="pricehi" placeholder="Any maximum price" value="' . esc_attr($selected) . '" />';
        }
    }