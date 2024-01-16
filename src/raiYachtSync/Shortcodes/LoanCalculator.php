<?php
    class raiYachtSync_Shortcodes_LoanCalculator {
        public function __construct() {
			$this->options = new raiYachtSync_Options();
		}

        public function add_actions_and_filters() {
            add_shortcode('ys-loan-calculator', [$this, 'loan_calculator']);
        }

        public function loan_calculator($atts = array(), $content = null) {
            // normalize attribute keys, lowercase
            $atts = array_change_key_case((array)$atts, CASE_LOWER);
            
            // override default attributes with user attributes
            $attributes = shortcode_atts([
                
            ], $atts);

            ob_start();
            
                $file_to_include=RAI_YS_PLUGIN_TEMPLATES_DIR.'/loan-calc.php'; 

                include apply_filters('rai_ys_loan_calculator_template', $file_to_include);

            return ob_get_clean();
        }
    }