<?php
	class raiYachtSync_Shortcodes_YachtSearch {

		public function __construct() {
			$this->options = new raiYachtSync_Options();
		}

		public function add_actions_and_filters() {

			add_shortcode('ys-v-yacht-search-form', [$this, 'v_searchform']);
			add_shortcode('ys-h-yacht-search-form', [$this, 'h_searchform']);
			add_shortcode('ys-yacht-results', [$this, 'yacht_results']);

		}

		public function v_searchform($atts = array(), $content = null) {
			// normalize attribute keys, lowercase
		    $atts = array_change_key_case((array)$atts, CASE_LOWER);
		 	
		    // override default attributes with user attributes
		    $attributes = shortcode_atts([
            	
            ], $atts);

		    ob_start();
		  		
				$file_to_include=RAI_YS_PLUGIN_TEMPLATES_DIR.'/v-search-form.php'; 

		    	include apply_filters('rai_ys_v_yacht_search_template', $file_to_include);

		    return ob_get_clean();
		    
        }

        public function h_searchform($atts = array(), $content = null) {
			// normalize attribute keys, lowercase
		    $atts = array_change_key_case((array)$atts, CASE_LOWER);
		 
		    // override default attributes with user attributes
		    $attributes = shortcode_atts([
            	
            ], $atts);

            ob_start();
		  		
				$file_to_include=RAI_YS_PLUGIN_TEMPLATES_DIR.'/h-search-form.php'; 

		    	include apply_filters('rai_ys_h_yacht_search_template', $file_to_include);

		    return ob_get_clean();
        }

        public function yacht_results($atts = array(), $content = null) {
			// normalize attribute keys, lowercase
		    $atts = array_change_key_case((array)$atts, CASE_LOWER);
		 
		    // override default attributes with user attributes
		    $attributes = shortcode_atts([
            	
            ], $atts);

            ob_start();
		  		
				$file_to_include=RAI_YS_PLUGIN_TEMPLATES_DIR.'/yacht-results.php'; 

		    	include apply_filters('rai_ys_yacht_results_template', $file_to_include);

		    return ob_get_clean();

       	}

	}