<!doctype html>
<html <?php language_attributes(); ?>>
<head>
	<title>PDF Loadding...</title>
</head>

<body>
	<div style=' margin: auto; margin-top: 49vh; text-align: center;'>
		<b>LOADDING PDF</b><br>
		Our servers are generating this document in real-time. Please wait a few seconds.
	</div>

	<script type="text/javascript">

	    var xhttp = new XMLHttpRequest();

	    new Promise(function(resolve, reject) {
	        
	        xhttp.onreadystatechange = function() {
	            if (this.readyState == 4 && this.status == 200) {

	                //var responseData = JSON.parse( this.responseText );

	                resolve();
	            }
	        };					            

	        xhttp.open("GET", "https://api.urlbox.io/v1/0FbOuhgmL1s2bINM/pdf?&url=<?= get_rest_url() ?>/raiys/yacht-pdf?yacht_post_id=<?php echo $request->get_param('yacht_post_id'); ?>", true);

	        xhttp.setRequestHeader('Content-Type', 'application/pdf');

	        xhttp.send();
	        
	    }).then(function( rData) {

	    	setTimeout(function() {
	    		window.location.href="<?= get_rest_url() ?>/raiys/yacht-pdf-download?yacht_post_id=<?php echo $request->get_param('yacht_post_id'); ?>";


	    	}, 3000);


	  	});


	</script>
</body>
</html>