<?php
	class raiYachtSync_SitemapsOfSearch {

		public function __construct() {
			$this->db_helper = new raiYachtSync_DBHelper();
			$this->options = new raiYachtSync_Options();
		}

		public function get_last_mod($url_paths) {
			$paths = explode('/', $url_paths);

			$search_parameters=[];

			foreach($paths as $path) {
				$phase = explode('-', $path);
			
				$val = join('-', array_slice($phase, 1));

				$val = str_replace('-', ' ', $val);

				$search_parameters[ $phase[0] ] = ucwords($val);
			}

			$args=[
				'post_type' => 'rai_yacht',
				'posts_per_page' => 1, 

				'meta_query' => [
					'listingdate' => [
						'key' => 'YSP_ListingDate',
						'type' => 'DATE'
					]
				],
				
				'orderby' => 'listingdate',
				'order' => 'DESC',
				'fields' => 'ids',

				'params_from_paths' => $search_parameters
			];

			foreach($paths as $path) {
				$phase = explode('-', $path);

				$key = $phase[0];

				if (!empty($key)) {
					$val=join(' ', array_slice($phase, 1));
					$args[ $key ] = $val;
				}
			}

			$yachts=get_posts($args);

			if (isset($yachts[0])) {
				return get_post_meta($yachts[0], 'YSP_ListingDate', true);
			}
			else {
				return 'no date';
			}



		}

		public function generateSitemap() {
		
			// create $path_list from $params
			$builders_list=$this->db_helper->get_unique_yacht_meta_values('MakeString');
			$conditions=$this->db_helper->get_unique_yacht_meta_values('SaleClassCode');
			$hull_material=$this->db_helper->get_unique_yacht_meta_values('BoatHullMaterialCode');
			$staterooms=['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
			$yearlo=$this->db_helper->get_unique_yacht_meta_values('ModelYear');

			$path_list=[];

			foreach($conditions as $c) {
				$path_list[]="condition-$c/";
			}

			foreach($staterooms as $s) {
				$path_list[]="staterooms-$s/";
			}
/*
			foreach($builders_list as $b) {
				$path_list[]="make-$b/";

				foreach($conditions as $c) {
					$path_list[]="condition-$c/make-$b/";
				}
			}
			foreach($hull_material as $h) {
				$path_list[]="hull-$h/";
			}
			
			foreach($yearlo as $yl) {
				$path_list[]="yearlo-$yl/";
			}
*/
			if (isset($path_list)) {
				$path_list_divied = array_chunk($path_list, 40000);

				$xml_files = [];

				foreach ($path_list_divied as $d_pathListing) {
					$xml_file = '';
			
					$xml_file.='<?xml version="1.0" encoding="UTF-8"?>';

					$xml_file.='<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';

						$yacht_search_url = ''; //get_permalink($this->options->get('yacht_search_page_id'));

						foreach ($d_pathListing as $url_path) {
							$url_path = strtolower($url_path);

							$url = $yacht_search_url.$url_path;

							$last_mod = $this->get_last_mod($url_path);
							//$last_mod = date("m/d/y",getlastmod());

							//if (! isset($xml_change_frq)) {
								$xml_change_frq = 'weekly';
							//}

							//if (! isset($xml_priority)) {
								$xml_priority = '0.6';
							//}			

							if ($last_mod == 'no date') {}
							else {
								
								$xml_file.= '<url>';
									$xml_file.= '<loc>'. htmlspecialchars($url, ENT_QUOTES, 'UTF-8') .'</loc>';
									$xml_file.= '<lastmod>'. $last_mod . '</lastmod>';
									$xml_file.= '<changefreq>'. $xml_change_frq .'</changefreq>';
									$xml_file.= '<priority>'. $xml_priority .'</priority>';
								$xml_file.= '</url>';

							}

						}
									
					$xml_file.= '</urlset>';

					$xml_files[] = $xml_file;
				}

				//exit;
			}
			else {
				$xml_files=[
					'<?xml version="1.0" encoding="UTF-8"?><NODATA>$path_list not given</NODATA>'
				];
			}

			foreach($xml_files as $xmlIndex => $xfile) {
				$myfile = fopen("./sitemap-$xmlIndex.xml", "w") or die("Unable to open file!");
				fwrite($myfile, $xfile);
				fclose($myfile);
			}
		}

	}