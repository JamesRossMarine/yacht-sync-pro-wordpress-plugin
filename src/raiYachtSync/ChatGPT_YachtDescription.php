<?php
	class ChatGPT_YachtSearch {

		public function __construct() {

			$this->options = new raiYachtSync_Options();



		}

		public function add_actions_and_filters() {


		}

		public function make_description($input, $links_to_scan) {

			$gpt_messages = [
				
			];

			foreach($links_to_scan as $sl) {
				$gpt_messages[] = ['role' => 'system', 'content' => 'Scan '.$sl];
			}

			$gpt_messages[] = ["role" => "assistant", "content" => "Write two sentences about \"". $input ."\" while using context from scanned links"];

			$gpt_headers = [
				'headers' => [
					'Authorization' => 'Bearer oXIGa^UWhJ81R$pSJ*Dj6ogs'
				],

				'timeout' => 120,

				'body' => [
					"model" => "gpt-4",
					"messages" => $gpt_messages
				]

			];

			$gpt_url = "https://api.openai.com/v1/chat/completions";

			$gpt_call = wp_remote_post($gpt_url, $gpt_headers);


			$gpt_body = json_encode(wp_remote_retrieve_body($gpt_call), true);

			var_dump($gpt_body);

		}

	}