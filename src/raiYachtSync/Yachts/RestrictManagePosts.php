<?php
    #[AllowDynamicProperties]

    class raiYachtSync_Yachts_RestrictManagePosts {
        public function __construct() {
            $this->DBHelper = new raiYachtSync_DBHelper();
        }
        
        public function add_actions_and_filters() {
            add_action( 'restrict_manage_posts', array($this, 'rai_yacht_filtering_by_boat_class'), 10, 1 );
            add_action( 'restrict_manage_posts', array($this, 'rai_yacht_filtering_by_builder'), 10, 1 );
        }

        public function rai_yacht_filtering_by_boat_class() {
            if (!is_singular('rai_yacht')) {
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
    }