<?php
	class raiYachtSync_Yachts_WpQueryAddon {


		public function __construct() {

		}

		public function add_actions_and_filters() {

			add_filter('query_vars', [$this, 'addQueryVars'], 30, 1);
			add_action('pre_get_posts', [$this, 'preGet'], 30, 1);
		
		}


		public function addQueryVars($vars) {

			$vars[] = 'ys_offset';
			$vars[] = 'ys_keyword';

			$vars[] = 'condition';
			$vars[] = 'hullMaterial';
			$vars[] = 'staterooms';
			$vars[] = 'make';

			$vars[] = 'yearlo';
			$vars[] = 'yearhi';

			$vars[] = 'lengthunit';

			$vars[] = 'lengthlo';
			$vars[] = 'lengthhi';

			$vars[] = 'pricelo';
			$vars[] = 'pricehi';

			$vars[] = 'sortBy';

			return $vars;
		}

		public function if_query_var_check($val) {

			return (
				isset($val)
				&&
				$val
				&&
				! empty($val)
				&&
				$val != "false"
				&&
				$val != "0"
				&&
				! is_null($val)
			) || $val === true;

		}	

		public function apply_meta_query_to_query($query, $meta_query_to_be_added, $extraKey = '') {
			
			if (count($meta_query_to_be_added) > 0) {
				$currentMetaQuery=$query->get('meta_query');
	
				if (is_array($currentMetaQuery)) {
					if (empty($extraKey)) {
						$currentMetaQuery[]=$meta_query_to_be_added;
					}
					else {
						$currentMetaQuery[ $extraKey ]=$meta_query_to_be_added;
					}
				}
				else {
					if (empty($extraKey)) {
						$currentMetaQuery=[ $meta_query_to_be_added ];
					}
					else {
						$currentMetaQuery=[ $extraKey => $meta_query_to_be_added];
					}					
				}
	
				$query->set('meta_query', $currentMetaQuery);
			}

		}



		public function preGet($query) {

			$yacht_sync_meta_query=[];

			if ($this->if_query_var_check($query->get('ys_offset'))) {

				$query->set('offset', $query->get('ys_offset'));

			}

			if ($this->if_query_var_check($query->get('ys_keyword'))) {

				$keywords=explode(' ', $query->get('ys_keyword'));

				$yacht_sync_meta_query['ys_keyword']=[];

				foreach ($keywords as $keyword) {

					$yacht_sync_meta_query['ys_keyword'][]=[
						'relation' => "OR",

						[
							'key' => 'MakeString',
							'compare' => "LIKE",
							'value' => $keyword
						],
						
						[	
							'key' => 'ModelYear',
							'compare' => "LIKE",
							'value' => $keyword
						],
						
						[
							'key' => 'Model',
							'compare' => "LIKE",
							'value' => $keyword
						],
						
						[
							'key' => 'BoatName',
							'compare' => "LIKE",
							'value' => $keyword
						],
			
						[
							'key' => 'LengthOverall',
							'compare' => "LIKE",
							'value' => $keyword
						]
					];
				}
			}

			if ($query->get('condition') == 'Used') {
				$yacht_sync_meta_query[]=[
					'key' => 'SaleClassCode',
					'compare' => "=",
					'value' => 'Used'				
				];

			}
			elseif ($query->get('condition') == 'New') {
				$yacht_sync_meta_query=[
					'relation' => 'AND',
					
					[
						'key' => 'ModelYear',
						'compare' => ">=",
						'type' => 'NUMERIC',
						'value' => date('Y')
					],

					[
						'key' => 'SaleClassCode',
						'compare' => "=",
						'value' => 'New'
					]
					
				];
			}

			if ($this->if_query_var_check($query->get('hullMaterial'))) {
				$yacht_sync_meta_query[]=[
					'key' => 'BoatHullMaterialCode',
					'compare' => "=",
					'value' => $query->get('hullMaterial')
				];
			}

			if ($this->if_query_var_check($query->get('staterooms'))) {
				$yacht_sync_meta_query[]=[
					'key' => 'CabinsCountNumeric',
					'compare' => "=",
					'type' => 'NUMERIC',
					'value' => $query->get('staterooms')
				];
			}

			if ($this->if_query_var_check($query->get('make'))) {
				$yacht_sync_meta_query[]=[
					'key' => 'MakeString',
					'compare' => "=",
					'value' => $query->get('make')
				];
			}			

			if ($this->if_query_var_check($query->get('yearlo'))) {
				$yacht_sync_meta_query[]=[
					'key' => 'ModelYear',
					'compare' => ">=",
					'type' => 'NUMERIC',
					'value' => $query->get('yearlo')
				];
			}

			if ($this->if_query_var_check($query->get('yearhi'))) {
				$yacht_sync_meta_query[]=[
					'key' => 'ModelYear',
					'compare' => "<=",
					'type' => 'NUMERIC',
					'value' => $query->get('yearhi')
				];
			}

			if ($this->if_query_var_check($query->get('pricelo'))) {
				$yacht_sync_meta_query[]=[
					'key' => 'NormPrice',
					'compare' => ">=",
					'type' => 'NUMERIC',
					'value' => $query->get('pricelo')
				];
			}

			if ($this->if_query_var_check($query->get('pricehi'))) {
				$yacht_sync_meta_query[]=[
					'key' => 'NormPrice',
					'compare' => "<=",
					'type' => 'NUMERIC',
					'value' => $query->get('pricehi')
				];
			}

			if ($query->get('lengthUnit') == 'meter') {
				if ($this->if_query_var_check($query->get('lengthlo'))) {
					$yArgs['meta_query'][]=[
						'key' => 'NominalLength',
						'compare' => ">=",
						'type' => 'NUMERIC',
						'value' => $query->get('lengthlo') * 3.048,
					];
				}

				if ($this->if_query_var_check($query->get('lengthhi'))) {
					$yArgs['meta_query'][]=[
						'key' => 'NominalLength',
						'compare' => "<=",
						'type' => 'NUMERIC',
						'value' => $query->get('lengthhi') * 3.048
					];
				}
			}
			else {
				if ($this->if_query_var_check($query->get('lengthlo'))) {
					$yArgs['meta_query'][]=[
						'key' => 'NominalLength',
						'compare' => ">=",
						'type' => 'NUMERIC',
						'value' => $query->get('lengthlo')
					];
				}

				if ($this->if_query_var_check($query->get('lengthhi'))) {
					$yArgs['meta_query'][]=[
						'key' => 'NominalLength',
						'compare' => "<=",
						'type' => 'NUMERIC',
						'value' => $query->get('lengthhi')
					];
				}

			}

			$this->apply_meta_query_to_query($query, $yacht_sync_meta_query, 'prop_meta');

			return $query;

		} 
	}