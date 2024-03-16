<?php

	//use Aws\Resource\Aws;
	use Aws\S3\S3Client;
	
	class raiYachtSync_BrochureCleanUp {
  	
  	  	public function __construct() {
	  		require __DIR__.'/../../vendor/autoload.php';

	  		$this->options = new raiYachtSync_Options();

	  		$this->pdf_s3_bucket = $this->options->get('pdf_s3_bucket');
	  		$this->pdf_s3_endpoint = $this->options->get('pdf_s3_endpoint');
	  		$this->pdf_s3_key = $this->options->get('pdf_s3_key');
	  		$this->pdf_s3_secret = $this->options->get('pdf_s3_secret');

	  		if (! empty($this->pdf_s3_endpoint)) {

				$this->client = new Aws\S3\S3Client([
			        'version' => 'latest',
			        'region'  => 'us-east-1',
			        'endpoint' => $this->pdf_s3_endpoint,
			        'use_path_style_endpoint' => false, // Configures to use subdomain/virtual calling format.
			        'credentials' => [
		                'key'    => $this->pdf_s3_key,
		                'secret' => $this->pdf_s3_secret,
		            ],
				]);
	  			
	  		}

	    }

	    public function add_actions_and_filters() {

	    }

	    public function remove($filepath) {

	    	if (! empty($url) && ! is_null($url)) {
	    	
		    	if ($filepath[0] == '/') {
		    		$filepath = substr($filepath, 1);
		    	}

		    	return ($this->client->deleteObject([
		    		'Bucket' => $this->pdf_s3_bucket,
		            'Key' => $filepath
		    	]));
		  	}
		  	else {
		  		return 'error - no url';
		  	}

	    }

	    public function removeUseUrl($url) {
	    	
	    	if (! empty($url) && ! is_null($url)) {
		    	$filepath = parse_url($url, PHP_URL_PATH);

		    	if ($filepath[0] == '/') {
		    		$filepath = substr($filepath, 1);
		    	}

		    	return ($this->client->deleteObject([
		    		'Bucket' => $this->pdf_s3_bucket,
		            'Key' => $filepath
		    	]));
		    }	
		    else {
		  		return 'error - no url';
		  	}
		  	
	    }
	}