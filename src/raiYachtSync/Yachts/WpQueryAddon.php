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
			$vars[] = 'boatname';

			$vars[] = 'condition';
			$vars[] = 'hull';
			$vars[] = 'staterooms';
			$vars[] = 'make';

			$vars[] = 'yearlo';
			$vars[] = 'yearhi';

			$vars[] = 'lengthunit';

			$vars[] = 'lengthlo';
			$vars[] = 'lengthhi';

			$vars[] = 'pricelo';
			$vars[] = 'pricehi';

			$vars[] = 'stateroomlo';
			$vars[] = 'stateroomhi';

			$vars[] = 'ys_engineslo';
			$vars[] = 'ys_engineshi';
			$vars[] = 'ys_engine_model';
			$vars[] = 'ys_engine_fuel';
			$vars[] = 'ys_engine_power';
			$vars[] = 'ys_engine_hourslo';
			$vars[] = 'ys_engine_hourshi';
			$vars[] = 'ys_engine_type';

			$vars[] = 'ys_listing_date';

			$vars[] = 'ys_euroval_lo';
			$vars[] = 'ys_euroval_hi';

			// $vars[] = 'ys_type';

			$vars[] = 'ys_country';
			$vars[] = 'ys_state';
			$vars[] = 'ys_city';

			$vars[] = 'page_index';

			$vars[] = 'sortby';

			$vars[] = 'ys_only_these';

			$vars[] = 'ys_company_only';
			$vars[] = 'ys_show_only';

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
				$val != "undefined"
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

			if (is_page(6) || $query->get('post_type') == "rai_yacht") {

				if (is_array($query->get('params_from_paths'))) {
					$params = $query->get('params_from_paths');

					foreach($params as $pKey => $pV) {
						$query->set($pKey, ucwords($pV));
					}
				}


				if ($this->if_query_var_check($query->get('ys_offset'))) {

					$query->set('offset', $query->get('ys_offset'));

				}
	
				if ($this->if_query_var_check( $query->get('page_index') )  && $query->get('page_index')  >= 2 ) {

					$query->set('offset', 12 * ( $query->get('page_index') - 1));

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
							],	
							
							[									
								'key' => 'GeneralBoatDescription',
								'compare' => "LIKE",
								'value' => $keyword
							],

							[									
								'key' => 'YSP_City',
								'compare' => "LIKE",
								'value' => $keyword
							]

						];
					}
				}

				if (
					$this->if_query_var_check($query->get('ys_company_only')) 
					&& 
					(strtolower($query->get('ys_company_only')) == 'on' || $query->get('ys_company_only') == '1')
				) {
					$yacht_sync_meta_query[]=[
						'key' => 'CompanyBoat',
						'compare' => "=",
						'value' => '1'
					];
				}

				if ($this->if_query_var_check($query->get('ys_show_only')) && strtolower($query->get('ys_show_only'))== 'company') {
					$yacht_sync_meta_query[]=[
						'key' => 'CompanyBoat',
						'compare' => "=",
						'value' => '1'
					];
				}
				elseif ($this->if_query_var_check($query->get('ys_show_only')) && strtolower($query->get('ys_show_only')) == 'other-then-company') {
					$yacht_sync_meta_query[]=[
						'key' => 'CompanyBoat',
						'compare' => "NOT EXISTS",
						//'value' => '1'
					];
				}

				if ($this->if_query_var_check($query->get('ys_country'))) {
					$yacht_sync_meta_query[]=[
						'key' => 'YSP_CountryID',
						'compare' => "=",
						'value' => $query->get('ys_country')
					];
				}

				if ($this->if_query_var_check($query->get('ys_state'))) {
					$yacht_sync_meta_query[]=[
						'key' => 'YSP_State',
						'compare' => "=",
						'value' => $query->get('ys_state')
					];
				}	

				if ($this->if_query_var_check($query->get('ys_city'))) {
					$yacht_sync_meta_query[]=[
						'key' => 'YSP_City',
						'compare' => "=",
						'value' => $query->get('ys_city')
					];
				}	

				if (is_array($query->get('condition'))) {
					$yacht_sync_meta_query[]=[
						'key' => 'SaleClassCode',
						'compare' => "IN",
						'value' => $query->get('condition')
					];
				}
				elseif (strtolower($query->get('condition')) == 'used') {
					$yacht_sync_meta_query[]=[
						'key' => 'SaleClassCode',
						'compare' => "=",
						'value' => 'Used'				
					];

				}
				elseif (strtolower($query->get('condition')) == 'new') {
					$yacht_sync_meta_query[]=[
						'key' => 'SaleClassCode',
						'compare' => "=",
						'value' => 'New'
					];
				}
				
				if (is_array($query->get('hull'))) {
					$yacht_sync_meta_query[]=[
						'key' => 'BoatHullMaterialCode',
						'compare' => "in",
						'value' => $query->get('hull')
					];
				}
				elseif ($this->if_query_var_check($query->get('hull'))) {
					$yacht_sync_meta_query[]=[
						'key' => 'BoatHullMaterialCode',
						'compare' => "=",
						'value' => $query->get('hull')
					];

				}

				if (is_array($query->get('staterooms'))) {
					$yacht_sync_meta_query[]=[
						'key' => 'CabinsCountNumeric',
						'compare' => "IN",
						'type' => 'NUMERIC',
						'value' => $query->get('staterooms')
					];
				}
				elseif ($this->if_query_var_check($query->get('staterooms'))) {
					$yacht_sync_meta_query[]=[
						'key' => 'CabinsCountNumeric',
						'compare' => "=",
						'type' => 'NUMERIC',
						'value' => $query->get('staterooms')
					];
				}

				if (is_array($query->get('make'))) {
					$yacht_sync_meta_query[]=[
						'key' => 'MakeString',
						'compare' => "IN",
						'value' => $query->get('make')
					];
				}
				elseif ($this->if_query_var_check($query->get('make'))) {
					$yacht_sync_meta_query[]=[
						'key' => 'MakeString',
						'compare' => "=",
						'value' => $query->get('make')
					];
				}		

				if ($this->if_query_var_check($query->get('boatname'))) {
					$yacht_sync_meta_query[]=[
						'key' => 'MakeString',
						'compare' => "=",
						'value' => $query->get('boatname')
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

				if ($this->if_query_var_check($query->get('currency'))) {

					$currency = $query->get('currency');

					switch ($currency) {
						case 'usd':
							if ($this->if_query_var_check($query->get('pricelo'))) {
								$yacht_sync_meta_query[]=[
									'key' => 'YSP_USDVal',
									'compare' => ">=",
									'type' => 'NUMERIC',
									'value' => $query->get('pricelo')
								];
							}

							if ($this->if_query_var_check($query->get('pricehi'))) {
								$yacht_sync_meta_query[]=[
									'key' => 'YSP_USDVal',
									'compare' => "<=",
									'type' => 'NUMERIC',
									'value' => $query->get('pricehi')
								];
							}
							
							break;
						
						case 'eur':	

							if ($this->if_query_var_check($query->get('pricelo'))) {
								$yacht_sync_meta_query[]=[
									'key' => 'YSP_EuroVal',
									'compare' => ">=",
									'type' => 'NUMERIC',
									'value' => $query->get('pricelo')
								];
							}

							if ($this->if_query_var_check($query->get('pricehi'))) {
								$yacht_sync_meta_query[]=[
									'key' => 'YSP_EuroVal',
									'compare' => "<=",
									'type' => 'NUMERIC',
									'value' => $query->get('pricehi')
								];
							}


							break;

					}
				}
				else {
					if ($this->if_query_var_check($query->get('pricelo'))) {
						$yacht_sync_meta_query[]=[
							'key' => 'YSP_USDVal',
							'compare' => ">=",
							'type' => 'NUMERIC',
							'value' => $query->get('pricelo')
						];
					}

					if ($this->if_query_var_check($query->get('pricehi'))) {
						$yacht_sync_meta_query[]=[
							'key' => 'YSP_USDVal',
							'compare' => "<=",
							'type' => 'NUMERIC',
							'value' => $query->get('pricehi')
						];
					}
				}
 

				if ($this->if_query_var_check($query->get('stateroomlo'))) {
					$yacht_sync_meta_query[]=[
						'key' => 'CabinsCountNumeric',
						'compare' => ">=",
						'type' => 'NUMERIC',
						'value' => $query->get('stateroomlo')
					];
				}

				if ($this->if_query_var_check($query->get('stateroomhi'))) {
					$yacht_sync_meta_query[]=[
						'key' => 'CabinsCountNumeric',
						'compare' => "<=",
						'type' => 'NUMERIC',
						'value' => $query->get('stateroomhi')
					];
				}
				if ($this->if_query_var_check($query->get('ys_engineslo'))) {
					$yacht_sync_meta_query[]=[
						'key' => 'YSP_EngineCount',
						'compare' => ">=",
						'type' => 'NUMERIC',
						'value' => $query->get('ys_engineslo')
					];
				}

				if ($this->if_query_var_check($query->get('ys_engineshi'))) {
					$yacht_sync_meta_query[]=[
						'key' => 'YSP_EngineCount',
						'compare' => "<=",
						'type' => 'NUMERIC',
						'value' => $query->get('ys_engineshi')
					];
				}
				
				if ($this->if_query_var_check($query->get('ys_engine_model'))) {
					$yacht_sync_meta_query[]=[
						'key' => 'YSP_EngineModel',
						'compare' => "=",
						'value' => $query->get('ys_engine_model')
					];
				}
				
				if ($this->if_query_var_check($query->get('ys_engine_fuel'))) {
					$yacht_sync_meta_query[]=[
						'key' => 'YSP_EngineFuel',
						'compare' => "=",
						'value' => $query->get('ys_engine_fuel')
					];
				}
				
				if ($this->if_query_var_check($query->get('ys_engine_power'))) {
					$yacht_sync_meta_query[]=[
						'key' => 'YSP_EnginePower',
						'compare' => "=",
						'value' => $query->get('ys_engine_power')
					];
				}

				if ($this->if_query_var_check($query->get('ys_engine_hourslo'))) {
					$yacht_sync_meta_query[]=[
						'key' => 'YSP_EngineHours',
						'compare' => ">=",
						'type' => 'NUMERIC',
						'value' => $query->get('ys_engine_hourslo')
					];
				}

				if ($this->if_query_var_check($query->get('ys_engine_hourshi'))) {
					$yacht_sync_meta_query[]=[
						'key' => 'YSP_EngineHours',
						'compare' => "<=",
						'type' => 'NUMERIC',
						'value' => $query->get('ys_engine_hourshi')
					];
				}
				if ($this->if_query_var_check($query->get('ys_engine_type'))) {
					$yacht_sync_meta_query[]=[
						'key' => 'YSP_EngineType',
						'compare' => "=",
						'value' => $query->get('ys_engine_type')
					];
				}
				if ($this->if_query_var_check($query->get('ys_listing_date'))) {
					$yacht_sync_meta_query[]=[
						'key' => 'YSP_ListingDate',
						'compare' => "=",
						'value' => $query->get('ys_listing_date')
					];
				}
				if ($this->if_query_var_check($query->get('ys_euroval_lo'))) {
					$yacht_sync_meta_query[]=[
						'key' => 'YSP_EuroVal',
						'compare' => ">=",
						'type' => 'NUMERIC',
						'value' => $query->get('ys_euroval_lo')
					];
				}

				if ($this->if_query_var_check($query->get('ys_euroval_hi'))) {
					$yacht_sync_meta_query[]=[
						'key' => 'YSP_EuroVal',
						'compare' => "<=",
						'type' => 'NUMERIC',
						'value' => $query->get('ys_euroval_hi')
					];
				}

				// if ($this->if_query_var_check($query->get('ys_type'))) {
				// 	$yacht_sync_meta_query[]=[
				// 		'key' => 'YSP_Type',
				// 		'compare' => "=",
				// 		'value' => $query->get('ys_type')
				// 	];
				// }

				if ($query->get('lengthUnit') == 'meter' || $query->get('lengthUnit') == 'Meter') {
					if ($this->if_query_var_check($query->get('lengthlo'))) {
						$yacht_sync_meta_query[]=[
							'key' => 'NominalLength',
							'compare' => ">=",
							'type' => 'NUMERIC',
							'value' => $query->get('lengthlo') * 3.048,
						];
					}

					if ($this->if_query_var_check($query->get('lengthhi'))) {
						$yacht_sync_meta_query[]=[
							'key' => 'NominalLength',
							'compare' => "<=",
							'type' => 'NUMERIC',
							'value' => $query->get('lengthhi') * 3.048
						];
					}
				}
				else {
					if ($this->if_query_var_check($query->get('lengthlo'))) {
						$yacht_sync_meta_query[]=[
							'key' => 'NominalLength',
							'compare' => ">=",
							'type' => 'NUMERIC',
							'value' => $query->get('lengthlo')
						];
					}

					if ($this->if_query_var_check($query->get('lengthhi'))) {
						$yacht_sync_meta_query[]=[
							'key' => 'NominalLength',
							'compare' => "<=",
							'type' => 'NUMERIC',
							'value' => $query->get('lengthhi')
						];
					}

				}

				if ($this->if_query_var_check($query->get('ys_only_these'))){
					$only_these = explode(',', $query->get('ys_only_these'));
					$yacht_sync_meta_query[] = [
						'relation' => "OR",
						[
							'key' => 'YBDocumentID',
							'compare' => "IN",
							'value' => $only_these
						],
						
						[	
							'key' => 'DocumentID',
							'compare' => "IN",
							'value' => $only_these
						],
					];
				}

				if ($this->if_query_var_check($query->get('sortby'))) {
					$sb = strtolower($query->get('sortby'));

					$sort_split=explode(':', $sb);

					$sort_label = $sort_split[0];
					$sort_order = $sort_split[1];

					$query->set('orderby', 'meta_value_num');
					$query->set('order', $sort_order);

					switch ($sort_label) {
						case 'length':
							$query->set('meta_key', 'NominalLength');
							break;

						case 'price':
							$query->set('meta_key', 'Price');
							break;

						case 'year':
							$query->set('meta_key', 'ModelYear');
							break;

						case 'timeon':
							$query->set('meta_key', 'IMTTimeStamp');
							break;

						default:
							$query->set('orderby', 'meta_value_num');
							$query->set('order', 'DESC');
							$query->set('meta_key', 'NominalLength');

							break;
					}
				}
				else {
				
					$query->set('orderby', 'meta_value_num');
					$query->set('order', 'DESC');
					$query->set('meta_key', 'NominalLength');

				}

				$this->apply_meta_query_to_query($query, $yacht_sync_meta_query, 'prop_meta');

			}

			return $query;

		} 
	}