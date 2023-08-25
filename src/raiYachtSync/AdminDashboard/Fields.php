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
						self::SLUG . '_boats_com_api_token',
						"Boats.com Api Token",
						array( $this, 'boats_com_api_token_field' ),
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
						self::SLUG . '_color_one',
						"Primary Color",
						array( $this, 'color_one_field' ),
						self::SLUG,
						self::SLUG . '_admin_fields',
						array( )
					);
					
					add_settings_field(
						self::SLUG . '_color_two',
						"Secondary Color",
						array( $this, 'color_two_field' ),
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

					
					
		}		

		public function section_cb() {
			echo '<p>Settings required for yacht syncing!</p>';

		}

		public function boats_com_api_token_field() {

			$nameOfField=self::SLUG.'_boats_com_api_token';
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

	}