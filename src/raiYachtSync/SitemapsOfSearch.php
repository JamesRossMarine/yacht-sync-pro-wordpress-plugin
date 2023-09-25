<?php
	class raiYachtSync_SitemapsOfSearch {

		public function __construct() {
			$this->db_helper = new raiYachtSync_DBHelper();
			$this->options = new raiYachtSync_Options();
		}

		public function generateSitemap() {
		
			// create $path_list from $params
			$builders_list=[];
			$conditions = ['new', 'used'];

			foreach($builders_list as $b) {
				$path_list[]='/make-$b/';

				foreach($conditions as $c) {
					$path_list[]='condition-$c/make-$b';
				}
			}

			$path_list=[
				'condition-used/',
				'condition-new/',
			];

			if (isset($path_list)) {
				$path_list_divied = array_chunk($path_list, 40000);

				$xml_files = [];

				foreach ($path_list_divied as $d_pathListing) {
					$xml_file = '';
			
					$xml_file.='<?xml version="1.0" encoding="UTF-8"?>';

					$xml_file.='<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';

						$yacht_search_url = get_permalink($this->options->get('yacht_search_page_id'));

						foreach ($d_pathListing as $url_path) {
						
							$_url_path = str_replace(' ', '-', $url_path);
							$_url_path = str_replace(')', '-', $_url_path);
							$_url_path = str_replace('(', '-', $_url_path);
							$_url_path = str_replace("'", '-', $_url_path);
							$_url_path = str_replace('-', '-', $_url_path);
							$_url_path = str_replace('.', '-', $_url_path);
							$_url_path = str_replace('’', '-', $_url_path);
							$_url_path = str_replace('"', '-', $_url_path);
							$_url_path = str_replace('/', '-', $_url_path);
							$_url_path = str_replace('`', '-', $_url_path);
							$_url_path = str_replace(']', '-', $_url_path);
							$_url_path = str_replace('[', '-', $_url_path);
							$_url_path = str_replace(',', '-', $_url_path);
							
							$url_path = $_url_path;
							
							$url_path = strtolower($url_path);

							$url = $yacht_search_url.$url_path;

							$last_mod = $this->get_last_mod($url_path);
							//$last_mod = '2022-02-01';

							if (! isset($xml_change_frq)) {
								$xml_change_frq = 'weekly';
							}

							if (! isset($xml_priority)) {
								$xml_priority = '0.6';
							}			

							if ($last_mod == 'no date') {}
							else {
								
								$xml_file.= '<url>';
									$xml_file.= '<loc>'. htmlspecialchars($url, ENT_QUOTES, 'UTF-8') .'</loc>';
									$xml_file.= '<lastmod>'. date('Y-m-d', $last_mod) . '</lastmod>';
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


			// make / write files from $xml_files

			
		}

	}