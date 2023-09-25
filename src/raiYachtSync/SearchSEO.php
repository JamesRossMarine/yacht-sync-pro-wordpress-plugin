<?php
	class raiYachtSync_SearchSEO {

		public function __construct() {

		}

		public function add_actions_and_filters() {



		}

		public function grab_params($params = []) {
			global $wp_query;

			$order_of_params=[
				'condition',
				'ys_keyword',
				// sail or motor
				'make'
			];

			$grabbed_params = '';

			foreach ($order_of_params as $param) {

				if ($wp_query->query_vars['post_type'] == 'rai_yacht') {
					$pVal=$wp_query->query_vars[$param];
				}
				else {
					$pVal=$params[ $param ];
				}

				if (! is_null($pVal)) {

					if (is_array($pVal)) {
						$pVal = join(' + ', $pVal);

						$grabbed_params.=$pVal.' ';
	 				}
					elseif (is_string($pVal) && ! empty($pVal)) {
						$grabbed_params.=$pVal.' ';
					}

				}

			}


			return $grabbed_params;
		}

		public function grab_location($params) {
			return '';
		}

		public function generate_title($passed_params = []) {

			$grabbed_params=$this->grab_params($passed_params);

			$grabbed_location=$this->grab_location($passed_params);

			return sprintf(
				'%sYachts for Sale %s | %s',

				$grabbed_params,
				$grabbed_location,
				get_bloginfo('name')
			);

		}

		public function generate_meta_description() {


		}

		public function generate_heading() {


		}

		public function generate_paragraph() {

		}	

	}