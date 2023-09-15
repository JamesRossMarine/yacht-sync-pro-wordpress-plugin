<?php 
	class raiYachtSync_RewriteURL {
		public function __construct() {

			$this->options = new raiYachtSync_Options();

			$this->yatch_search_id=$this->options->get('yacht_search_page_id' );

			$this->post_yacht_search = get_post($this->yatch_search_id);
		}

		public function add_actions_and_filters() {
			add_action('init', [$this, 'rewrite_rules'], -1);

			add_filter('query_vars', [$this, 'add_query_vars']);
		}

		public function add_query_vars($vars) {

			$vars[]='search_paths';

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




	}