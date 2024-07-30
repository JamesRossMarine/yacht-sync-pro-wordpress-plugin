<?php  
	#[AllowDynamicProperties]
		
	class raiYachtSync_Yachts_MetaBrochureSection {
	public function __construct() {

	}

	public function add_actions_and_filters() {
		   
			add_action('admin_print_scripts', [$this, 'admin_scripts']);
			add_action('admin_print_styles', [$this, 'admin_styles']);
			add_action( 'add_meta_boxes', [$this, 'add_yacht_brochure_area'] );
			add_action( 'save_post_rai_yacht', [$this, 'rai_yacht_save_pdf']);
		}

		public function admin_scripts() {
			wp_enqueue_script('media-upload');
			wp_enqueue_script('thickbox');
		}

		public function admin_styles() {
			wp_enqueue_style('thickbox');
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

				<b>ENTER NEW PDF URL</b>
				<input type="text" name="_YSP_PDF_URL_" value="" id="ysp_vessel_pdf_input" placeholder="PDF URL" />

				<p>OR Upload: <input type="button" value="Media Lib" id="upload_pdf_button" /></p>


				<script type="text/javascript">

						// Uploading files
						var file_frame;
						jQuery('#upload_pdf_button').on('click', function(e) {
							e.preventDefault();

							// If the media frame already exists, reopen it.
							if (file_frame) {
									file_frame.open();
									return;
							}

							// Create the media frame.
							file_frame = wp.media.frames.file_frame = wp.media({
									title: jQuery(this).data('uploader_title'),
									button: {
										text: jQuery(this).data('uploader_button_text'),
									},
									multiple: false // Set to true to allow multiple files to be selected
							});

							// When a file is selected, run a callback.
							file_frame.on('select', function(){
									// We set multiple to false so only get one image from the uploader
									let attachment = file_frame.state().get('selection').first().toJSON();

									let url = attachment.url;

									let field = document.getElementById("ysp_vessel_pdf_input");

									field.value = url; //set which variable you want the field to have
							});

							// Finally, open the modal
							file_frame.open();
						});

				</script>

			<?php

		}

		public function rai_yacht_save_pdf($post_id) {
			$field = "_YSP_PDF_URL_";

			if (isset($_POST[$field]) && $_POST[$field] != '') {
		        update_post_meta($post_id, 'YSP_PDF_URL', $_POST[ $field ]);
		    }
		}



	}