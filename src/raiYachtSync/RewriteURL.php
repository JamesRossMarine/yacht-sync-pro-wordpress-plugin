<?php 
	#[AllowDynamicProperties]
	class raiYachtSync_RewriteURL {
		public function __construct() {

			$this->options = new raiYachtSync_Options();

			$this->yatch_search_id=$this->options->get('yacht_search_page_id' );

			$this->post_yacht_search = get_post($this->yatch_search_id);
		}

		public function add_actions_and_filters() {
			add_action('init', [$this, 'rewrite_rules'], -1);

			add_filter('query_vars', [$this, 'add_query_vars']);

			add_action('pre_get_posts', [$this, 'pre_get_query_params_from_paths'], 10, 1);
		}

		public function add_query_vars($vars) {

			$vars[]='search_paths';
			$vars[]='params_from_paths';

			return $vars;
		}

		public function rewrite_rules() {

			if (isset($this->post_yacht_search->post_name ) && $this->post_yacht_search->post_name != '') {
				add_rewrite_rule(
				    $this->post_yacht_search->post_name.'/?([^*]*)?',
				    'index.php?page_id='. $this->yatch_search_id .'&search_paths=$matches[1]',
				    'top'
			    );
			}

		}

		public function pre_get_query_params_from_paths($query) {

			if ($query->get('search_paths') != "") {

				$paths = explode("/", $query->get('search_paths'));

				//var_dump($paths);

				$search_parameters=[];

				foreach($paths as $path) {
					$phase = explode('-', $path);
				
					$val = join('-', array_slice($phase, 1));

					$val = str_replace('-', ' ', $val);

					$search_parameters[ $phase[0] ] = ucwords($val);

				}

				$query->set('params_from_paths', $search_parameters);
			}

		}



	}