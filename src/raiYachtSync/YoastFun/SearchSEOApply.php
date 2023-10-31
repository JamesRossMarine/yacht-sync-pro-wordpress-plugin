<?php

	class raiYachtSync_YoastFun_SearchSEOApply {
		public function __construct() {
			$this->SearchSEO = new raiYachtSync_SearchSEO();

			$this->options = new raiYachtSync_Options();

			$this->yacht_search_page_id = $this->options->get('yacht_search_page_id');
		}

		public function add_actions_and_filters() {
			add_filter('wpseo_title',  [$this, 'yacht_search_title'], 10, 1);
			add_filter('wpseo_metadesc',  [$this, 'yacht_search_description'], 10, 1);
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

	}