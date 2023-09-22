<?php

    class raiyachtSync_Yachts_MetaSections {
        public function __construct() {

        }

        public function add_actions_and_filters() {
            add_action( 'add_meta_boxes', [$this, 'yacht_meta_boxes']);

            add_action( 'save_post', [$this, 'yacht_info_save']);
        }
        
        public function yacht_meta_boxes() {
            add_meta_box(
                'rai_yacht_info_id',
                "Static Yacht Setting",
                [$this, 'yacht_save_html'],
                ['rai_yacht'],
                'side'
            );
        }

        public function yacht_save_html ($post) {
            $yacht_save = get_post_meta( $post->ID, 'rai_non_syncing_vessel', true) ?: '0';
            ?>
            <div>
                <input style="margin-top: 2px" type="checkbox" name="non_syncing_vessel" value="1" <?php checked($yacht_save, '1'); ?>/>
                <label>Non Syncing Vessel</label>
            </div> 
            <?php
        }

        public function yacht_info_save($post_id) {
            $yacht_save = isset($_POST['non_syncing_vessel']) ? '1' : '0';
            update_post_meta($post_id, 'rai_non_syncing_vessel', $yacht_save);
        }

    }