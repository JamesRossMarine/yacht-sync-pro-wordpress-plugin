<?php
	class raiYachtSync_SearchSEO {

		public function __construct() {

		}

		public function add_actions_and_filters() {



		}

		public function all_together($params) {

			$all=[
				'title' => $this->generate_title($params),
				'generate_meta_description' => $this->generate_meta_description($params),
				'heading' => $this->generate_heading($params),
				'p' => $this->generate_paragraph($params)
			];

			return $all;

		}

		public function grab_params($params = []) {
			global $wp_query;

			$order_of_params=[
				'condition',
				'ys_keyword',
				// sail or motor
				//'yearlo',
				//'yearhi',		
				'make',
				'boatclass'
			];

			$orders_of_withins = [];

			$grabbed_params = '';

			foreach ($order_of_params as $param) {

				if ($wp_query->query_vars['post_type'] == 'rai_yacht') {
					$pVal = $wp_query->query_vars[$param];
				}
				elseif (isset($params[ $param ])) {
					$pVal = $params[ $param ];
				}
				else {
					$pVal=null;
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

				unset($pVal);

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

		public function generate_meta_description($passed_params = []) {

			$grabbed_params=$this->grab_params($passed_params);
			$grabbed_location=$this->grab_location($passed_params);

			return sprintf(
				'Find %sboats and yachts for sale %s',

				$grabbed_params,
				$grabbed_location
			);
		}

		public function generate_heading($passed_params = []) {

			$grabbed_params=$this->grab_params($passed_params);
			$grabbed_location=$this->grab_location($passed_params);

			return sprintf(
				'%sYachts for Sale %s',

				$grabbed_params,
				$grabbed_location
			);

		}

		public function generate_paragraph($passed_params = []) {

			$grabbed_params=$this->grab_params($passed_params);
			$grabbed_location=$this->grab_location($passed_params);

			return sprintf(
				'Find %sboats and yachts for sale %s',

				$grabbed_params,
				$grabbed_location
			);

		}	

	}