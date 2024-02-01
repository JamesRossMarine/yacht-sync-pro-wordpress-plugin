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
	                'key'    => 'DO00V8J83K4JJCF9D7BZ',
	                'secret' => 'hEhdK3MY/68dVUYKgGE364R1WcYayxiSGkdCdDKURj8',
	            ],
			]);

	    }

	    public function add_actions_and_filters() {

	    }

	    public function remove($filepath) {
	    	
	    	return ($this->client->deleteObject([
	    		'Bucket' => 'yspbrochures',
	            'Key' => $filepath
	    	]));

	    }

	    public function removeUseUrl($url) {
	    	
	    	$filepath = parse_url($url, PHP_URL_PATH);

	    	return ($this->client->deleteObject([
	    		'Bucket' => 'yspbrochures',
	            'Key' => $filepath
	    	]));

	    }
	}