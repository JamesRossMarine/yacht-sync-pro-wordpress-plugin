<?php
    #[AllowDynamicProperties]
    
    class raiYachtSync_Shortcodes_Brokers {
        public function __construct() {

        }

        public function add_actions_and_filters() {
            add_shortcode('ys-broker-results', [$this, 'broker_results']);
        }

        public function broker_results($atts = array(), $content = null) {
            // normalize attribute keys, lowercase
		    $atts = array_change_key_case((array)$atts, CASE_LOWER);
		 
		    // override default attributes with user attributes
		    $attributes = shortcode_atts([

            ], $atts);

            ob_start();

                $file_to_include=RAI_YS_PLUGIN_TEMPLATES_DIR.'/broker-results.php';

                include apply_filters('rai_ys_broker_results_template', $file_to_include);
            
            return ob_get_clean();
        }
    }