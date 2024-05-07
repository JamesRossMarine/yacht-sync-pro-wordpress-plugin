<?php
    #[AllowDynamicProperties]

    class raiYachtSync_Yachts_RestrictManagePosts {
        public function __construct() {
            $this->add_actions_and_filters();
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

        public function rai_yacht_filtering_by_builder() {
            if(!is_singular('rai_yacht')){
                return;
              }
              $selected = '';
              $request_attr = 'MakeString';
              if ( isset($_REQUEST[$request_attr]) ) {
                $selected = $_REQUEST[$request_attr];
              }

              $meta_key = 'my_custom_field_location';
              global $wpdb;
              $results = $wpdb->get_col( 
                  $wpdb->prepare( "
                      SELECT DISTINCT pm.meta_value FROM {$wpdb->postmeta} pm
                      LEFT JOIN {$wpdb->posts} p ON p.ID = pm.post_id
                      WHERE pm.meta_key = '%s' 
                      AND p.post_status IN ('publish', 'draft')
                      ORDER BY pm.meta_value", 
                      $meta_key
                  ) 
              );
             
              echo '<select id="ysp-make-string" name="ysp-make-string">';
              echo '<option value="0">' . __( 'Show all makes', 'ysp.local' ) . ' </option>';
              foreach($results as $make){
                $select = ($make == $selected) ? ' selected="selected"':'';
                echo '<option value="' . $make . '"' . $select . '>' . $make . ' </option>';
              }
              echo '</select>';
        }
    }