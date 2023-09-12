<?php  
    class raiYachtSync_GutenbergBlocks {

        public function __construct() {
            
            $this->Shortcode_Yachts=new raiYachtSync_Shortcodes_YachtSearch();
		}

		public function add_actions_and_filters() {
            add_action('init', [$this, 'serverside_blocks']);

            add_action('init', [$this, 'js_scripts']);

	        add_action( 'enqueue_block_editor_assets', [$this, 'pass_styles'] );
        }

        public function js_scripts() {
            wp_register_script(
                'ysp-gutenberg-blocks',
                RAI_YS_PLUGIN_ASSETS .'/build/js/all-blocks.js',
                   array( 'wp-block-editor', 'wp-blocks', 'wp-components', 'wp-element', 'wp-server-side-render'),
                null
            );
    
            $js_vars = [
                //'wp_rest_url' => get_rest_url(),
                'theme_url' => get_template_directory_uri(),
            ];
    
            wp_localize_script('ysp-gutenberg-blocks', 'ysp-blocks', $js_vars); 

        }

       
        public function pass_styles() {

            if (! is_customize_preview()) {
                wp_enqueue_style( 
                    'ysp-style', 
                    RAI_YS_PLUGIN_ASSETS .'/build/css/app-style.css', 
                    array( 'wp-edit-blocks' ), 
                    null
                );
            }
    
        }

        public function serverside_blocks() {
            register_block_type( 'ysp-blocks/hform-block', [
                'api_version'    => 1,
                'title'          => 'Horizontal Form',
                'editor_script'  => 'ysp-gutenberg-blocks',
                'attributes'     => [
                    
                ],
                'render_callback' => [$this, 'hform_block']
            ]);
            register_block_type( 'ysp-blocks/vform-block', [
                'api_version'    => 1,
                'title'          => 'Vertical Form',
                'editor_script'  => 'ysp-gutenberg-blocks',
                'attributes'     => [
                    
                ],
                'render_callback' => [$this, 'vform_block']
            ]);
            register_block_type( 'ysp-blocks/ysp-yacht-results-block', [
                'api_version'    => 1,
                'title'          => 'Yachts Results',
                'editor_script'  => 'ysp-gutenberg-blocks',
                'attributes'     => [
                    
                ],
                'render_callback' => [$this, 'yacht_results']
            ]);
        }

        public function hform_block($props) {
            return $this->Shortcode_Yachts->h_searchform($props, '');
        }
        public function vform_block($props) {
            return $this->Shortcode_Yachts->v_searchform($props, '');
        }
        public function yacht_results($props) {
            return $this->Shortcode_Yachts->yacht_results($props, '');
        }

    }


	