<?php
    #[AllowDynamicProperties]
	class raiYachtSync_Shortcodes_PrintMetaField {

		public function __construct() {
			$this->options = new raiYachtSync_Options();
		}

		public function add_actions_and_filters() {

			add_shortcode('ysp-meta', [$this, 'print']);

		}

		public function print($atts = array(), $content = null) {
			// normalize attribute keys, lowercase
		    $atts = array_change_key_case((array)$atts, CASE_LOWER);
		 	
		    // override default attributes with user attributes
		    $attributes = shortcode_atts([
            	'key' => '',
            ], $atts);


		    global $post;

		    if ( ! empty( $attributes['key'] ) ) {
		    	$key = $attributes['key'];

		    	$field=get_post_meta($post->ID, $key, true);

		    	if (!empty($field)) {
		    		return "<span class='ysp-print-meta $key'>". $field .'</span>';
		    	}
		    	else {
		    		return "<!-- Field has empty return -->";
		    	}


		    }
		    else {
		    	return '<!-- Key was empty -->';
		    }


        }
    }

    