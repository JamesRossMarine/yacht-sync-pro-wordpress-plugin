<?php
    #[AllowDynamicProperties]
	
	class raiYachtSync_Shortcodes_YachtSearch {

		public function __construct() {
			$this->options = new raiYachtSync_Options();
		}

		public function add_actions_and_filters() {

			add_shortcode('ys-quick-search', [$this, 'quick_search']);
			add_shortcode('ys-h-quick-search', [$this, 'quick_h_search']);

			add_shortcode('ys-v-yacht-search-form', [$this, 'v_searchform']);
			add_shortcode('ys-h-yacht-search-form', [$this, 'h_searchform']);
		
			add_shortcode('ys-v-super-yacht-search-form', [$this, 'v_super_searchform']);

			add_shortcode('ys-search-tags', [$this, 'search_tags']);

			add_shortcode('ys-yacht-results', [$this, 'yacht_results']);
			add_shortcode('ys-featured-listings', [$this, 'yacht_featured_listings']);

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

        public function v_super_searchform($atts = array(), $content = null) {
			// normalize attribute keys, lowercase
		    $atts = array_change_key_case((array)$atts, CASE_LOWER);
		 	
		    // override default attributes with user attributes
		    $attributes = shortcode_atts([
            	
            ], $atts);

		    ob_start();
		  		
				$file_to_include=RAI_YS_PLUGIN_TEMPLATES_DIR.'/v-super-search-form.php'; 

		    	include apply_filters('rai_ys_v_super_yacht_search_template', $file_to_include);

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

		public function search_tags($atts = array(), $content = null) {
			// normalize attribute keys, lowercase
		    $atts = array_change_key_case((array)$atts, CASE_LOWER);
		 
		    // override default attributes with user attributes
		    $attributes = shortcode_atts([
            	
            ], $atts);

            ob_start();
		  		
				$file_to_include=RAI_YS_PLUGIN_TEMPLATES_DIR.'/search-tags.php'; 

		    	include apply_filters('rai_ys_yacht_search_tags_template', $file_to_include);

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

		public function quick_search($atts = array(), $content = null) {
			// normalize attribute keys, lowercase
		    $atts = array_change_key_case((array)$atts, CASE_LOWER);
		 
		    // override default attributes with user attributes
		    $attributes = shortcode_atts([
            	
            ], $atts);

            $action_url = get_permalink($this->options->get('yacht_search_page_id'));

            ob_start();
		  		
				$file_to_include=RAI_YS_PLUGIN_TEMPLATES_DIR.'/quick-search.php'; 

		    	include apply_filters('rai_ys_quick_search_results_template', $file_to_include);

		    return ob_get_clean();

       	}

		public function quick_h_search($atts = array(), $content = null) {
			// normalize attribute keys, lowercase
		    $atts = array_change_key_case((array)$atts, CASE_LOWER);
		 
		    // override default attributes with user attributes
		    $attributes = shortcode_atts([
            	
            ], $atts);

			$action_url = get_permalink($this->options->get('yacht_search_page_id'));

            ob_start();
		  		
				$file_to_include=RAI_YS_PLUGIN_TEMPLATES_DIR.'/quick-h-search.php'; 

		    	include apply_filters('rai_ys_h_quick_search_results_template', $file_to_include);

		    return ob_get_clean();

       	}

		public function yacht_featured_listings($atts = array(), $content = null) {
			// normalize attribute keys, lowercase
		    $atts = array_change_key_case((array)$atts, CASE_LOWER);
		 	
		    // override default attributes with user attributes
		    $attributes = shortcode_atts([
            	
            ], $atts);

            $args = [
	            'post_type' => 'rai_yacht',
	            'posts_per_page' => -1,
	        ];
	        
	        $args = array_merge($args, $atts);

	        $yachtQuery = new WP_Query($args);

		    ob_start();
		  		
				$file_to_include=RAI_YS_PLUGIN_TEMPLATES_DIR.'/yacht-featured-listings.php'; 

		    	include apply_filters('rai_ys_featured_yacht_results_template', $file_to_include);

		    return ob_get_clean();
		    
        }

	}