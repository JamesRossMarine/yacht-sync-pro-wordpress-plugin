<?php
	class raiYachtSync_AdminDashboard_Fields {

		const SLUG = 'rai_ys';

		public function __construct() {

			$this->options = new raiYachtSync_Options();

		}

		public function set_fields() {
			
			add_settings_section(
					self::SLUG . '_admin_fields',
					'Settings',
					[$this, 'section_cb'],
					self::SLUG
				);
					add_settings_field(
						self::SLUG . '_is_in_sync',
						"Is Syncing Runing?",
						array( $this, 'is_in_sync_field' ),
						self::SLUG,
						self::SLUG . '_admin_fields',
						array( )
					);

					add_settings_field(
						self::SLUG . '_boats_com_api_global_key',
						"Boats.com Api Global Key",
						array( $this, 'boats_com_api_global_key_field' ),
						self::SLUG,
						self::SLUG . '_admin_fields',
						array( )
					);

					add_settings_field(
						self::SLUG . '_boats_com_api_brokerage_key',
						"Boats.com Api Brokerage Key",
						array( $this, 'boats_com_api_brokerage_key_field' ),
						self::SLUG,
						self::SLUG . '_admin_fields',
						array( )
					);

					add_settings_field(
						self::SLUG . '_yacht_broker_org_api_token',
						"YachtBroker.org Api Token",
						array( $this, 'yacht_broker_org_api_token_field' ),
						self::SLUG,
						self::SLUG . '_admin_fields',
						array( )
					);

					add_settings_field(
						self::SLUG . '_yacht_broker_org_id',
						"YachtBroker.org Company ID",
						array( $this, 'yacht_broker_org_id_field' ),
						self::SLUG,
						self::SLUG . '_admin_fields',
						array( )
					);
					
					add_settings_field(
						self::SLUG . '_is_euro_site',
						"Make Site Display Meter And Euros",
						array( $this, 'is_euro_field' ),
						self::SLUG,
						self::SLUG . '_admin_fields',
						array( )
					);

					add_settings_field(
						self::SLUG . '_prerender_brochures',
						"Prerender Brochures (Cost Extra)",
						array( $this, 'prerender_brochure_field' ),
						self::SLUG,
						self::SLUG . '_admin_fields',
						array( )
					);
					
					add_settings_field(
						self::SLUG . '_color_one',
						"Main Text Color",
						array( $this, 'color_one_field' ),
						self::SLUG,
						self::SLUG . '_admin_fields',
						array( )
					);
					
					add_settings_field(
						self::SLUG . '_color_two',
						"Main Background Color",
						array( $this, 'color_two_field' ),
						self::SLUG,
						self::SLUG . '_admin_fields',
						array( )
					);

					add_settings_field(
						self::SLUG . '_color_three',
						"Secondary Text Color",
						array( $this, 'color_three_field' ),
						self::SLUG,
						self::SLUG . '_admin_fields',
						array( )
					);
					
					add_settings_field(
						self::SLUG . '_color_four',
						"Secondary Background Color",
						array( $this, 'color_four_field' ),
						self::SLUG,
						self::SLUG . '_admin_fields',
						array( )
					);
					
					add_settings_field(
						self::SLUG . '_is_euro_site',
						"Make Site Display Meter And Euros",
						array( $this, 'is_euro_field' ),
						self::SLUG,
						self::SLUG . '_admin_fields',
						array( )
					);

					add_settings_field(
						self::SLUG . '_send_lead_to_this_email',
						"Email Address To Receive Leads At",
						array( $this, 'send_lead_to_this_email_field' ),
						self::SLUG,
						self::SLUG . '_admin_fields',
						array( )
					);

					add_settings_field(
						self::SLUG . '_yacht_search_page_id',
						"Yacht Search Page",
						array( $this, 'yacht_search_page_id_field' ),
						self::SLUG,
						self::SLUG . '_admin_fields',
						array( )
					);
					add_settings_field(
						self::SLUG . '_company_name',
						"Company Name",
						array( $this, 'company_name' ),
						self::SLUG,
						self::SLUG . '_admin_fields',
						array( )
					);
					add_settings_field(
						self::SLUG . '_company_logo',
						"Company Logo",
						array( $this, 'company_logo_id_field' ),
						self::SLUG,
						self::SLUG . '_admin_fields',
						array( )
					);
					add_settings_field(
						self::SLUG . '_company_number',
						"Company Phone Number",
						array( $this, 'company_number' ),
						self::SLUG,
						self::SLUG . '_admin_fields',
						array( )
					);

					
					
		}		

		public function section_cb() {
			echo '<p>Settings required for yacht syncing!</p>';

		}

		public function is_in_sync_field() {
			global $wpdb;

			$numberOfSyncing = $wpdb->get_var( "SELECT COUNT(*) FROM $wpdb->posts p WHERE p.post_type = 'syncing_rai_yacht'" );
			$numberOfLastSynced = $wpdb->get_var( "SELECT COUNT(*) FROM $wpdb->posts p WHERE p.post_type = 'rai_yacht'" );

			if ($numberOfSyncing > 0) {
				echo "Yes we syncing, current count is $numberOfSyncing ... last sync was ".$numberOfLastSynced;
			}
			else {
				echo 'Doesnt Appear to be in a sync.';
			}

		}

		public function boats_com_api_global_key_field() {

			$nameOfField=self::SLUG.'_boats_com_api_global_key';
			$valOfField=get_option($nameOfField);

			?>

			<input type="text" name="<?= $nameOfField ?>" value="<?= $valOfField ?>" autocomplete="off"><?php 

		}

		public function boats_com_api_brokerage_key_field() {

			$nameOfField=self::SLUG.'_boats_com_api_brokerage_key';
			$valOfField=get_option($nameOfField);

			?>

			<input type="text" name="<?= $nameOfField ?>" value="<?= $valOfField ?>" autocomplete="off"><?php 

		}
		
		public function yacht_broker_org_api_token_field() {

			$nameOfField=self::SLUG.'_yacht_broker_org_api_token';
			$valOfField=get_option($nameOfField);

			?>

			<input type="text" name="<?= $nameOfField ?>" value="<?= $valOfField ?>" autocomplete="off"><?php 

		}

		public function yacht_broker_org_id_field() {
			$nameOfField=self::SLUG.'_yacht_broker_org_id';
			$valOfField=get_option($nameOfField);

			?>

			<input type="text" name="<?= $nameOfField ?>" value="<?= $valOfField ?>" autocomplete="off"><?php 

		}

		public function is_euro_field() {
			$options=[
				'' => '---- Not Picked Yet ----',
				'yes' => 'YES',
				'no' => 'NO',
			];

			$nameOfField=self::SLUG.'_is_euro_site';
			$valOfField=get_option($nameOfField);

			?>

			<select name="<?= $nameOfField ?>"> 
				<?php 
					foreach ( $options as $opt_value => $opt_label ) {
						$option = '<option value="' . $opt_value . '" '. selected($opt_value, $valOfField, false) .'>';

						$option .= $opt_label;
						
						$option .= '</option>';

						echo $option;
					}
				?>
			</select><?php 
		}

		public function prerender_brochure_field() {
			$options=[
				'' => '---- Not Picked Yet ----',
				'yes' => 'YES',
				'no' => 'NO',
			];

			$nameOfField=self::SLUG.'_prerender_brochures';
			$valOfField=get_option($nameOfField);

			?>

			<select name="<?= $nameOfField ?>"> 
				<?php 
					foreach ( $options as $opt_value => $opt_label ) {
						$option = '<option value="' . $opt_value . '" '. selected($opt_value, $valOfField, false) .'>';

						$option .= $opt_label;
						
						$option .= '</option>';

						echo $option;
					}
				?>
			</select><?php 
		}

		public function color_one_field() {
			$nameOfField=self::SLUG.'_color_one';
			$valOfField=get_option($nameOfField);

			?>

			<input type="color" name="<?= $nameOfField ?>" value="<?= $valOfField ?>" autocomplete="off"><?php 

		}

		public function color_two_field() {
			$nameOfField=self::SLUG.'_color_two';
			$valOfField=get_option($nameOfField);

			?>

			<input type="color" name="<?= $nameOfField ?>" value="<?= $valOfField ?>" autocomplete="off"><?php 

		}

		public function color_three_field() {
			$nameOfField=self::SLUG.'_color_three';
			$valOfField=get_option($nameOfField);

			?>

			<input type="color" name="<?= $nameOfField ?>" value="<?= $valOfField ?>" autocomplete="off"><?php 

		}

		public function color_four_field() {
			$nameOfField=self::SLUG.'_color_four';
			$valOfField=get_option($nameOfField);

			?>

			<input type="color" name="<?= $nameOfField ?>" value="<?= $valOfField ?>" autocomplete="off"><?php 

		}

		public function send_lead_to_this_email_field() {
			$nameOfField=self::SLUG.'_send_lead_to_this_email';
			$valOfField=get_option($nameOfField);

			?>

			<input type="email" name="<?= $nameOfField ?>" value="<?= $valOfField ?>" autocomplete="off"><?php 

		}

		public function yacht_search_page_id_field() {
			$pages=get_posts([
				'post_type' => 'page', 
				'posts_per_page' => -1, 
				'post_status' => ['draft', 'publish'], 
				'orderby' => 'title',
				'order' => 'ASC'
			]);

			$options=[
				'' => '---- Not Picked Yet ----',
			];

			foreach ($pages as $pg) {
				$options[$pg->ID]=$pg->post_title;
			}

			$nameOfField=self::SLUG.'_yacht_search_page_id';
			$valOfField=get_option($nameOfField);

			?>

			<select name="<?= $nameOfField ?>"> 
				<?php 
					foreach ( $options as $opt_value => $opt_label ) {
						$option = '<option value="' . $opt_value . '" '. selected($opt_value, $valOfField, false) .'>';

						$option .= $opt_label;
						
						$option .= '</option>';

						echo $option;
					}
				?>
			</select><?php 

		}

		public function company_name() {
			$nameOfField=self::SLUG.'_company_name';
			$valOfField=get_option($nameOfField);

			?>

			<input type="text" name="<?= $nameOfField ?>" value="<?= $valOfField ?>" autocomplete="off"><?php 

		}

		public function company_number() {
			$nameOfField=self::SLUG.'_company_number';
			$valOfField=get_option($nameOfField);

			?>

			<input type="tel" name="<?= $nameOfField ?>" value="<?= $valOfField ?>" autocomplete="off"><?php 

		}
		public function company_logo_id_field() {
			$image_id = get_option(self::SLUG . '_company_logo');
			$image_url = wp_get_attachment_image_url($image_id, 'small');
			?>
			<?php if ($image = wp_get_attachment_image_url($image_id, 'small')) : ?>
				<a href="#" class="rudr-upload">
					<img src="<?php echo esc_url($image) ?>" />
				</a>
				<a href="#" class="rudr-remove">Remove image</a>
				<input type="hidden" name="<?php echo self::SLUG; ?>_company_logo" value="<?php echo esc_url($image_url); ?>">
			<?php else : ?>
				<a href="#" class="button rudr-upload">Upload image</a>
				<a href="#" class="rudr-remove" style="display:none">Remove image</a>
				<input type="hidden" name="<?php echo self::SLUG; ?>_company_logo" value="">
			<?php endif;
		}
		
		

	}