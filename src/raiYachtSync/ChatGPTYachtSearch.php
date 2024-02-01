<?php
	class raiYachtSync_ChatGPTYachtSearch {

		public function __construct() {

			$this->options = new raiYachtSync_Options();



		}

		public function add_actions_and_filters() {


		}

		public function make_description($input, $links_to_scan) {

			$gpt_messages = [
				['role' => 'system', 'content' => 'You are a SEO content writer with the purpose of selling yachts and boats.']
			];

			foreach($links_to_scan as $sl) {
				$gpt_messages[] = ['role' => 'system', 'content' => 'Scan '.$sl];
			}

			$gpt_messages[] = ["role" => "assistant", "content" => "Write one sentences about \"". $input ."\" while using context from scanned links. Do not return a response with quotation marks."];

			$gpt_headers = [
				'headers' => [
					'Authorization' => 'Bearer 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',
					'Content-Type' => 'application/json',
				],

				'timeout' => 120,

				'body' => json_encode([
					"model" => "gpt-4",
					"messages" => $gpt_messages
				])

			];

			$gpt_url = "https://api.openai.com/v1/chat/completions";

			$gpt_call = wp_remote_post($gpt_url, $gpt_headers);

			$gpt_body = json_decode(wp_remote_retrieve_body($gpt_call), true);

			return ($gpt_body['choices'][0]['message']['content']);

		}

	}