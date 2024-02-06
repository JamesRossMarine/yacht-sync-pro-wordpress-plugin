<?php

	//use Aws\Resource\Aws;
	use Aws\S3\S3Client;
	
	class raiYachtSync_BrochureCleanUp {
  	
  	  	public function __construct() {
	  		require __DIR__.'/../../vendor/autoload.php';

			$this->client = new Aws\S3\S3Client([
		        'version' => 'latest',
		        'region'  => 'us-east-1',
		        'endpoint' => 'https://nyc3.digitaloceanspaces.com',
		        'use_path_style_endpoint' => false, // Configures to use subdomain/virtual calling format.
		        'credentials' => [
	                'key'    => 'DO00ND3AZGE2E3Z4XFDQ',
	                'secret' => 'mVy+V67cFxmePbictLcJTbAorcp5nwpjbZjgLqmhNlM',
	            ],
			]);

	    }

	    public function add_actions_and_filters() {

	    }

	    public function remove($filepath) {
	    	
	    	if ($filepath[0] == '/') {
	    		$filepath = substr($filepath, 1);
	    	}

	    	return ($this->client->deleteObject([
	    		'Bucket' => 'yspbrochures',
	            'Key' => $filepath
	    	]));

	    }

	    public function removeUseUrl($url) {
	    	
	    	$filepath = parse_url($url, PHP_URL_PATH);

	    	if ($filepath[0] == '/') {
	    		$filepath = substr($filepath, 1);
	    	}

	    	return ($this->client->deleteObject([
	    		'Bucket' => 'yspbrochures',
	            'Key' => $filepath
	    	]));
	    }
	}