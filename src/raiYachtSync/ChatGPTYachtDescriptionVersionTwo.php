<?php
	#[AllowDynamicProperties]
	class raiYachtSync_ChatGPTYachtDescriptionVersionTwo {

		public function __construct() {

			$this->options = new raiYachtSync_Options();

			$this->gpt_token = $this->options->get('chatgpt_api_token');

		}

		public function add_actions_and_filters() {


		}

		
		public function make_description($context) {

			$gpt_messages = [
				[
					'role' => 'system', 
					'content' => 'You are a SEO content writer with the purpose of selling yachts and boats.'
				]
			];
			
			$gpt_messages[] = [
				'role' => 'system', 
				'content' => 'Read This For Context About The Vessel. '.$context
			];

			$gpt_messages[] = [
				"role" => "assistant", 
				"content" => "Write a meta description within 160 characters from the vessel description above. Please include the vessel name in the meta description. Do not return a response with quotation marks."
			];
			
			$gpt_messages = apply_filters( 'rai_custom_gpt_for_yacht_details_v2', $gpt_messages, $context );

			$gpt_headers = [
				'headers' => [
					'Authorization' => 'Bearer '.$this->gpt_token,
					'Content-Type' => 'application/json',
				],

				'timeout' => 120,

				'body' => json_encode([
					"model" => "gpt-3.5-turbo",
					"messages" => $gpt_messages
				])
			];
			

			$gpt_url = "https://api.openai.com/v1/chat/completions";

			$gpt_call = wp_remote_post($gpt_url, $gpt_headers);

			$gpt_body = json_decode(wp_remote_retrieve_body($gpt_call), true);

			return ($gpt_body['choices'][0]['message']['content']);

		}

	}