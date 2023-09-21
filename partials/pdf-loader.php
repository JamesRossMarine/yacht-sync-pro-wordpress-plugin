<!doctype html>
<html <?php language_attributes(); ?>>
<head>
	<title>PDF Loadding...</title>
</head>

<body>
<div style='display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100vh;'>
    <img src='<?php echo RAI_YS_PLUGIN_ASSETS; ?>images/loading-icon.gif' alt='Loading Icon'  style="height: 120px; width:120px;" />
    <div style='margin-top: 20px; text-align: center;'>
        <b>LOADING PDF</b><br>
        Our servers are generating this document in real-time. Please wait a few seconds.
    </div>
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