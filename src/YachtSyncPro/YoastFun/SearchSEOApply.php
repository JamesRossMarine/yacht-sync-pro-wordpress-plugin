<?php
    #[AllowDynamicProperties]
	
	class YachtSyncPro_YoastFun_SearchSEOApply {
		public function __construct() {
			$this->SearchSEO = new YachtSyncPro_SearchSEO();

			$this->options = new YachtSyncPro_Options();

			$this->yacht_search_page_id = $this->options->get('yacht_search_page_id');
		}

		public function add_actions_and_filters() {
			add_filter('wpseo_title',  [$this, 'yacht_search_title'], 10, 1);
			add_filter('wpseo_metadesc',  [$this, 'yacht_search_description'], 10, 1);
			add_filter('wpseo_canonical', [ $this, 'yacht_search_cononical' ], 10, 1 );

			add_action('wp_head', [$this, 'next_prev_meta_tags'], 10, 1);


		}

		public function yacht_search_title($title) {

			global $wp_query;

			if (is_page($this->yacht_search_page_id)) {

				$super_title = $this->SearchSEO->generate_title( $wp_query->get('params_from_paths') );

				$title = $super_title;
			}

			return $title;
		}

		public function yacht_search_description($description) {
			global $wp_query;

			if (is_page($this->yacht_search_page_id)) {
				$super_descript = $this->SearchSEO->generate_meta_description( $wp_query->get('params_from_paths') );

				$description = $super_descript;
			}

			return $description;	
		}

		public function yacht_search_cononical($url) {
			
			if (is_page($this->yacht_search_page_id)) {
				$protocol = is_ssl() ? 'https://' : 'http://';
			
			    $url = ($protocol) . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
			}


			return $url;
		}

		public function next_prev_meta_tags() {

			if (is_page($this->yacht_search_page_id)) {
				global $wp_query;

				$protocol = is_ssl() ? 'https://' : 'http://';
			
			    $page_url = ($protocol) . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];

			    $page_url = preg_replace(['/(\/page_index-)\d+/'], '', $page_url);

				$params = (array) $wp_query->get('params_from_paths');

			    $yacht_query = new WP_Query(array_merge(['post_type' => 'ysp_yacht', 'posts_per_page' => 12], $params, ['page_index' => 1]));

				$total = $yacht_query->max_num_pages;

				$prev_link_needed = false;
				$next_link_needed = false;

				if (isset($params['page_index'])) {

					$c_index = $params['page_index'];

					if ($c_index == $total) {
						$prev_link_needed = $c_index - 1;
					}
					elseif ($c_index == 2) {
						$prev_link_needed = 1;
						$next_link_needed = $c_index + 1;

					}
					elseif ($c_index > 2) {
						$prev_link_needed = $c_index - 1;
						$next_link_needed = $c_index + 1;
					}

				}
				elseif ($total > 1) {
					$next_link_needed = 1 + 1;
				}

				if ($prev_link_needed > 0) {
					echo '<link rel="prev" href="'. $page_url .'page_index-'. $prev_link_needed .'/">';

				}

				if ($next_link_needed > 0) {
					echo '<link rel="next" href="'. $page_url .'page_index-'. $next_link_needed .'/">';

				}

			}
		}

	}