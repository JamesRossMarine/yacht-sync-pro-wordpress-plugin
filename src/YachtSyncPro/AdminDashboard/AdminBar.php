<?php
	#[AllowDynamicProperties]
	class YachtSyncPro_AdminDashboard_AdminBar {

		public function __construct() {

			$this->options = new YachtSyncPro_Options();

		}

		public function add_actions_and_filters() {

			add_action('admin_bar_menu', [$this, 'add_toolbar_for_brochures'], 100);

		}

		public function add_toolbar_for_brochures($admin_bar) {

			if (is_singular('rai_yacht')) {

				global $post;

			    $admin_bar->add_menu( array(
			        'id'    => 'yacht-brochure',
			        'title' => 'More Brochure Options',
			        'href'  => '#',
			        'meta'  => array(
			            'title' => __('More Brochures'),            
			        ),
			    ));

			    $admin_bar->add_menu( array(
			        'id'    => 'some-more-pics',
			        'parent' => 'yacht-brochure',
			        'title' => 'Download A Borchure With 36 Image Of The Gallery',
			        'href'  => get_rest_url() ."raiys/yacht-pdf-download?GalleryLimit=". 36 ."&yacht_post_id=". $post->ID,
			        'meta'  => array(
			            'title' => __('Download A Borchure With 36 Images Of Gallery'),
			            'target' => '_blank',
			            'class' => ''
			        ),
			    ));

			    $admin_bar->add_menu( array(
			        'id'    => 'half-pics',
			        'parent' => 'yacht-brochure',
			        'title' => 'Download A Borchure With Half Of Gallery',
			        'href'  => get_rest_url() ."raiys/yacht-pdf-download?GalleryLimit=". 60 ."&yacht_post_id=". $post->ID,
			        'meta'  => array(
			            'title' => __('Download A Borchure With Half Of Gallery'),
			            'target' => '_blank',
			            'class' => ''
			        ),
			    ));

			    $admin_bar->add_menu( array(
			        'id'    => 'full-bro',
			        'parent' => 'yacht-brochure',
			        'title' => 'Download A Borchure With The Whole Gallery',
			        'href'  => get_rest_url() ."raiys/yacht-pdf-download?GalleryLimit=". 120 ."&yacht_post_id=". $post->ID,
			        'meta'  => array(
			            'title' => __('Download A Borchure With The Whole Gallery'),
			            'target' => '_blank',
			            'class' => 'my_menu_item_class'
			        ),
			    ));

			}
		
		}
	}