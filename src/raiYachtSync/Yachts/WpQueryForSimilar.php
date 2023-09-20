<?php
    class raiYachtSync_Yachts_WpQueryForSimilar {

        public function __construct() {
          
                        
        }

        public function add_actions_and_filters() {

            add_filter('query_vars', [$this, 'addQueryVars'], 30, 1);
            add_action('pre_get_posts', [$this, 'preGet'], 20, 1);

        }

		public function addQueryVars($vars) {
            
            $vars[] = 'similar_listings_to';

            return $vars;
        }

        public function preGet($query) {
            
            $similar_post_id = $query->get('similar_listings_to');
            
            if ( $query->get('post_type') == "rai_yacht" && is_numeric( $similar_post_id )  ) {
                $length = intval(get_post_meta($similar_post_id, 'YSP_Length', true));

                $year = intval(get_post_meta($similar_post_id, 'ModelYear', true));
                $make = get_post_meta($similar_post_id, 'MakeString', true);
                $category = wp_get_post_terms($similar_post_id, 'boatclass', array( 'fields' => 'slug' ) );

                $similar_query_one_args = [
                    'post_type' => 'rai_yacht',
                   
                    'lengthlo' => $length - 15,
                    'lengthhi' => $length + 15,

                    'yearlo' => $year - 5,
                    'yearhi' => $year + 5,

                    'make' => $make
                ];

                $similar_query_one = new WP_Query($similar_query_one_args);

                if ($similar_query_one->found_posts >= 3) {
                   $query->query_vars = array_merge($query->query_vars, $similar_query_one_args);
                }
                else {
                    $similar_query_two_args = [
                        'post_type' => 'rai_yacht',
                    
                        'lengthlo' => $length - 30,
                        'lengthhi' => $length + 30,

                        'yearlo' => $year - 10,
                        'yearhi' => $year + 10,

                        'tax_query' => array(
                            array(
                                'taxonomy' => 'boatclass',
                                'field' => 'slug',
                                'terms' => [ $category[0] ]
                            )
                        )
                    ];

                    $similar_query_two = new WP_Query($similar_query_two_args);

                    if ($similar_query_two->found_posts >= 3) {

                        $query->query_vars = array_merge($query->query_vars, $similar_query_two_args);
                    }
                    else {
                        $query->query_vars = array_merge($query->query_vars, [
                            
                            'tax_query' => array(
                                array(
                                    'taxonomy' => 'boatclass',
                                    'field' => 'slug',
                                    'terms' => [ $category[0] ]
                                )
                            )

                        ]);
                    }
                }

            }

			return $query;
            
        }


    }