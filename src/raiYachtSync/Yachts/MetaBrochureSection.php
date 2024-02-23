<?php  
    class raiYachtSync_Yachts_MetaBrochureSection {
		public function __construct() {

		}

		public function add_actions_and_filters() {
           
            add_action( 'add_meta_boxes', [$this, 'add_yacht_brochure_area'] );
            
        }

        public function add_yacht_brochure_area() {
        	add_meta_box(
                'rai_yacht_brochure', // Unique ID
                'Yacht Brochure Things', // Box title
                [$this, 'brochure_area_html'],  // Content callback, must be of type callable
                ['rai_yacht'],  // Post type
            	'side'
            );
        }

        public function brochure_area_html($post) {

        	$y_post_id = $post->ID;
        	$current_pdf =  get_post_meta($post->ID, 'YSP_PDF_URL', true);

        	if (! empty($current_pdf)) {

        		echo 'Current: <a style="word-break: break-word;" target="_blank" href="'. $current_pdf .'">'. $current_pdf .'</a><br/>';

        	}
        	else {

        		echo 'Current: No-Set<br/>';
        	}

        	?>

        		<p>Reset: <a href="<?= get_rest_url() ."raiys/redo-yacht-pdf?yacht_post_id=". $y_post_id ?>">Click Here</a></p>

                <p>Delete: <a href="<?= get_rest_url() ."raiys/delete-yacht-pdf?yacht_post_id=". $y_post_id ?>">Click Here</a></p>

        	<?php


        }



    }