<?php
	
	class raiYachtSync_Shortcodes_YachtSearchSeo {

		public function __construct() {
			$this->options = new raiYachtSync_Options();

			$this->SearchSEO = new raiYachtSync_SearchSEO();

		}

		public function add_actions_and_filters() {

			add_shortcode('ysp-search-heading', [$this, 'search_heading']);
			add_shortcode('ysp-search-paragraph', [$this, 'search_paragraph']);

		}

		public function search_heading($atts, $content) {
			global $wp_query;

			$heading = $this->SearchSEO->generate_heading( $wp_query->get('params_from_paths') );

			return '<h1 id="ysp-search-heading">'. $heading .'</h1>';

		}

		public function search_paragraph($atts, $content) {
			global $wp_query;

			$paragraph = $this->SearchSEO->generate_paragraph( $wp_query->get('params_from_paths') );

			return '<p id="ysp-search-paragraph">'. $paragraph .'</p>';

		}

	}