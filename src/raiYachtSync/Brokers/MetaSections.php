<?php  
    #[AllowDynamicProperties]
    class raiYachtSync_Brokers_MetaSections {
		public function __construct() {

		}

		public function add_actions_and_filters() {
           
            add_action( 'add_meta_boxes', [$this, 'broker_meta_boxes'] );

            add_action( 'save_post', [$this, 'broker_info_save'] );
            
        }

        public function broker_meta_boxes() {
            add_meta_box(
                'rai_broker_info_id', // Unique ID
                'Broker Info', // Box title
                [$this, 'broker_info_html'],  // Content callback, must be of type callable
                ['rai_broker']  // Post type
            );

        }

        public function broker_info_html($post) {
            $broker_fname = get_post_meta( $post->ID, 'rai_broker_fname', true );     
            $broker_lname = get_post_meta( $post->ID, 'rai_broker_lname', true );     
            $broker_email = get_post_meta( $post->ID, 'rai_broker_email', true );     
            $broker_phone = get_post_meta( $post->ID, 'rai_broker_phone', true );  
            $main_broker = get_post_meta($post->ID, 'rai_main_broker', true) ?: '0';      
            ?>

                <label>First Name</label>
                <br>
                <input style="margin-bottom: 5px" type="text" name="broker_fname" value="<?= $broker_fname ?>">
                <br>
                <label>Last Name</label>
                <br>
                <input style="margin-bottom: 5px" type="text" name="broker_lname" value="<?= $broker_lname ?>">
                <br>
                <label>Email</label>
                <br>
                <input style="margin-bottom: 5px" type="text" name="broker_email" value="<?= $broker_email ?>">
                <br>
                <label>Phone</label>
                <br>
                <input style="margin-bottom: 5px" type="text" name="broker_phone" value="<?= $broker_phone ?>">
                <br>
                <label>Main Broker</label><br>
                <input type="checkbox" name="main_broker" value="1" <?php checked($main_broker, '1'); ?>><br>

            <?php 

        }

        public function broker_info_save($post_id) {
            if ( isset($_POST['broker_fname'])) {
                update_post_meta(
                    $post_id,
                    'rai_broker_fname',
                    $_POST['broker_fname']
                );
            }
            if ( isset($_POST['broker_lname'])) {
                update_post_meta(
                    $post_id,
                    'rai_broker_lname',
                    $_POST['broker_lname']
                );
            }
            if ( isset($_POST['broker_email'])) {
                update_post_meta(
                    $post_id,
                    'rai_broker_email',
                    $_POST['broker_email']
                );
            }
            if ( isset($_POST['broker_phone'])) {
                update_post_meta(
                    $post_id,
                    'rai_broker_phone',
                    $_POST['broker_phone']
                );
            }
            $main_broker = isset($_POST['main_broker']) ? '1' : '0';
            update_post_meta($post_id, 'rai_main_broker', $main_broker);
        }

    }