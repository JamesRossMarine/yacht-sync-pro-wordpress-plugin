<?php 
    #[AllowDynamicProperties]

	class YachtSyncPro_YoastFun_Breadcrumbs {

		public function __construct() {
			$this->options = new YachtSyncPro_Options();
		}
	
		public function add_actions_and_filters() {
			add_filter('wpseo_breadcrumb_links',  [$this, 'breadcrumbs'], 10, 1);
		}

		public function breadcrumbs($links) {
			global $wp_query, $post;

			if (is_singular('rai_yacht')) {
				/*
					$meta = get_post_meta($post->ID);

			        foreach ($meta as $indexM => $valM) {
			            if (is_array($valM) && !isset($valM[1])) {
			                $meta[$indexM] = $valM[0];
			            }
			        }

			        $vessel = array_map("maybe_unserialize", $meta);
					
					$vessel=json_decode(json_encode($vessel), true);
				*/

				$links=[];

				$links[] = [
			        'url' => home_url(),
			        'text' => 'Home',
			    ];

			    $links[] = [
			        'url' => get_permalink( $this->options->get('yacht_search_page_id') ),
			        'text' => get_the_title( $this->options->get('yacht_search_page_id') ),
			    ];

			    $links[] = [
			        'url' => get_permalink($post->ID),
			        'text' => $post->post_title
			    ];
			}

			if (is_singular('rai_team')) {
				/*
					$meta = get_post_meta($post->ID);

			        foreach ($meta as $indexM => $valM) {
			            if (is_array($valM) && !isset($valM[1])) {
			                $meta[$indexM] = $valM[0];
			            }
			        }

			        $vessel = array_map("maybe_unserialize", $meta);
					
					$vessel=json_decode(json_encode($vessel), true);
				*/
					
				$links=[];

				$links[] = [
			        'url' => home_url(),
			        'text' => 'Home',
			    ];

			    $links[] = [
			        'url' => get_permalink( $this->options->get('team_page_id') ),
			        'text' => get_the_title( $this->options->get('team_page_id') ),
			    ];

			    $links[] = [
			        'url' => get_permalink($post->ID),
			        'text' => $post->post_title
			    ];
			}

			return $links;

		}

	}