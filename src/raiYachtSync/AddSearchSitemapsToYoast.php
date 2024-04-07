<?php
	#[AllowDynamicProperties]
	class raiYachtSync_AddSearchSitemapsToYoast {

		public function __construct() {

		}

		public function add_actions_and_filters() {		

			add_filter('wpseo_sitemap_index', [$this, 'add_sitemaps']);

		}

		public function add_sitemaps( $y_sitemap ) {

			$dir = ABSPATH."/wp-content/ysp-sitemaps/";
			$maps = [];
			$filenameAndLastMod = [];

			// Open a directory, and read its contents
			if (is_dir($dir)){
				if ($dh = opendir($dir)){
					while (($file = readdir($dh)) !== false){

						if (strpos($file, '.xml') !== false) {
							$maps[] = get_site_url()."/wp-content/ysp-sitemaps/".$file;
						}


					}

					closedir($dh);
				}
				
				foreach($maps as $f_map) {

					$cont = file_get_contents($f_map);

					$xml = simplexml_load_string($cont, "SimpleXMLElement", LIBXML_NOCDATA);
					$json = json_encode($xml);
					$array = json_decode($json, TRUE);

					if (isset($array['url'])) {
						$list = $array['url'];
						$listOfMods = [];

						foreach ($list as $item) {
							
							if (isset($item['lastmod'])) {
								
								$listOfMods[] = strtotime($item['lastmod']);
							}
						}

						if (count($listOfMods) >= 1) {
							$maxLastestMod = max($listOfMods);

							$filenameAndLastMod[] = [
								'filename' => $f_map,
								'lastmod' => date('Y-m-d', $maxLastestMod)
							];		
						}
					}

				}	

				foreach ($filenameAndLastMod as $flm) {
				
					$y_sitemap.="<sitemap> \n";
						$y_sitemap.="<loc>". $flm['filename'] ."</loc>";
						$y_sitemap.="<lastmod>". $flm['lastmod'] ."</lastmod>";
					$y_sitemap.="</sitemap> \n";

				}

			}


			return $y_sitemap;
		}




	}