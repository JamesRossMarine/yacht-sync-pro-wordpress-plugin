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
				//'year',		
				//'length',
				'make',
				'boatclass'
			];

			$orders_of_withins = [];

			$grabbed_params = '';

			foreach ($order_of_params as $param) {

				switch ($param) {
					case 'ys_keyword':
						if (isset($params['ys_keyword'])) {

							$pVal = '"'. $params['ys_keyword'] .'"';
						
						}

						break;

					case 'year':
						if (isset($params[ 'yearlo' ]) && isset($params['yearhi'])) {
							$pVal = $params['yearlo'].' - '.$params['yearhi'];
						}
						elseif (isset($params['yearlo'])) {
							$pVal = $params['yearlo']; 

						}
						elseif (isset($params['yearhi'])) {
							$pVal = $params['yearhi'];
						}

						break;
					
					
					case 'length':
						if (isset($params['lengthUnit']) && $params['lengthUnit'] == 'meter') {

							if (isset($params[ 'lengthlo' ]) && isset($params['lengthhi'])) {
								$pVal = ''.$params['lengthlo'].'m - '.$params['lengthhi'].'m ';
							}
							elseif (isset($params['lengthlo'])) {
								$pVal = ''. number_format($params['lengthlo']).'m ';

							}
							elseif (isset($params['lengthhi'])) {
								$pVal = ''. number_format($params['lengthhi']) .'m ';
							}
						}
						else {
							if (isset($params[ 'lengthlo' ]) && isset($params['lengthhi'])) {
								$pVal = ''.$params['lengthlo'].'ft - '.$params['lengthhi'].'ft ';
							}
							elseif (isset($params['lengthlo'])) {
								$pVal = ''. number_format($params['lengthlo']).'ft ';

							}
							elseif (isset($params['lengthhi'])) {
								$pVal = ''. number_format($params['lengthhi']) .'ft ';
							}

						}

						break;
					
					default:

						if ($wp_query->query_vars['post_type'] == 'rai_yacht') {
							$pVal = $wp_query->query_vars[$param];
						}
						elseif (isset($params[ $param ])) {
							$pVal = $params[ $param ];
						}
						else {
							$pVal=null;
						}
						
						break;
				}
				
				if (isset($pVal) && ! is_null($pVal)) {
					if (is_array($pVal)) {
						$pVal = join(' + ', $pVal);

						$grabbed_params.=$pVal.' ';
	 				}
					elseif (is_string($pVal) && ! empty($pVal)) {
						$pVal_a = explode('+', $pVal);

						if (count($pVal_a) > 1) {
							$pVal = join(' + ', $pVal_a);
							
							$grabbed_params.=$pVal.' ';

						}
						else {
							$grabbed_params.=$pVal.' ';

						}
						
					}

				}

				unset($pVal);

			}


			return $grabbed_params;
		}

		
		public function grab_second_params($params) {
			global $wp_query;

			$order_of_params=[
				'length',
				'year',
				'price',
				'staterooms'
			];

			$orders_of_withins = [];

			$grabbed_params = '';

			foreach ($order_of_params as $param) {

				switch ($param) {
					case 'staterooms':
						if (isset($params['staterooms'])) {
							$pVal = 'With '. $params['staterooms'] .' Cabins';
						}

						break;
					case 'length':
						if (isset($params['lengthUnit']) && $params['lengthUnit'] == 'meter') {

							if (isset($params[ 'lengthlo' ]) && isset($params['lengthhi'])) {
								$pVal = 'Between '.$params['lengthlo'].'m - '.$params['lengthhi'].'m ';
							}
							elseif (isset($params['lengthlo'])) {
								$pVal = 'Above '. number_format($params['lengthlo']).'m ';

							}
							elseif (isset($params['lengthhi'])) {
								$pVal = 'Under '. number_format($params['lengthhi']) .'m ';
							}
						}
						else {
							if (isset($params[ 'lengthlo' ]) && isset($params['lengthhi'])) {
								$pVal = 'Between '.$params['lengthlo'].'ft - '.$params['lengthhi'].'ft ';
							}
							elseif (isset($params['lengthlo'])) {
								$pVal = 'Above '. number_format($params['lengthlo']).'ft ';

							}
							elseif (isset($params['lengthhi'])) {
								$pVal = 'Under '. number_format($params['lengthhi']) .'ft ';
							}

						}

						break;

					case 'price':

						if (isset($params[ 'pricelo' ]) && isset($params['pricehi'])) {
							$pVal = 'With prices between $'.number_format($params['pricelo']).' - $'.number_format($params['pricehi']);
						}
						elseif (isset($params['pricelo'])) {
							$pVal = 'with prices above $'. number_format($params['pricelo']);

						}
						elseif (isset($params['pricehi'])) {
							$pVal = 'with prices under $'. number_format($params['pricehi']) .'';
						}

						break;

					case 'year':
						if (isset($params[ 'yearlo' ]) && isset($params['yearhi'])) {
							$pVal = 'Between '.$params['yearlo'].' - '.$params['yearhi'];
						}
						elseif (isset($params['yearlo'])) {
							$pVal = 'Between '.$params['yearlo'].' - '.date("Y", strtotime('+2year'));

						}
						elseif (isset($params['yearhi'])) {
							$pVal = "up to ".$params['yearhi'];
						}

						break;

					default:
						$pVal=null;
						break;
				}

				if (isset($pVal) && ! is_null($pVal)) {
					if (is_string($pVal) && ! empty($pVal)) {
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

		public function cleanup_params($p) {

			foreach ($p as $index_p => $pv) {
				if (empty($pv)) {
					unset($p[$index_p]);
				}
			}

			return $p;

		}


		public function generate_title($passed_params = []) {

			$passed_params = $this->cleanup_params($passed_params);

			$grabbed_params=$this->grab_params($passed_params);
			$grabbed_second_params=$this->grab_second_params($passed_params);
			$grabbed_location=$this->grab_location($passed_params);

			return sprintf(
				'%sYachts %s for Sale %s | %s',

				$grabbed_params,
				$grabbed_second_params,
				$grabbed_location,
				get_bloginfo('name')
			);

		}

		public function generate_meta_description($passed_params = []) {

			$passed_params = $this->cleanup_params($passed_params);

			$grabbed_params=$this->grab_params($passed_params);
			$grabbed_second_params=$this->grab_second_params($passed_params);
			$grabbed_location=$this->grab_location($passed_params);

			return sprintf(
				'Find %sboats and yachts %s for sale %s',

				$grabbed_params,
				$grabbed_second_params,
				$grabbed_location
			);
		}

		public function generate_heading($passed_params = []) {

			$passed_params = $this->cleanup_params($passed_params);

			$grabbed_params=$this->grab_params($passed_params);
			$grabbed_second_params=$this->grab_second_params($passed_params);
			$grabbed_location=$this->grab_location($passed_params);

			return sprintf(
				'%sYachts %s for Sale %s',

				$grabbed_params,
				$grabbed_second_params,
				$grabbed_location
			);

		}

		public function generate_paragraph($passed_params = []) {

			$passed_params = $this->cleanup_params($passed_params);

			$grabbed_params=$this->grab_params($passed_params);
			$grabbed_second_params=$this->grab_second_params($passed_params);
			$grabbed_location=$this->grab_location($passed_params);

			return sprintf(
				'Find %sboats and yachts %s for sale %s',

				$grabbed_params,
				$grabbed_second_params,
				$grabbed_location
			);

		}	

	}