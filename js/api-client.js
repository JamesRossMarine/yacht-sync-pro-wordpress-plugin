var ysp_ysp_api={};

    ysp_ysp_api.call_api=function(method, path, passing_data) {
        var xhttp = new XMLHttpRequest();

        return new Promise(function(resolve, reject) {
            
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {

                    var responseData = JSON.parse( this.responseText );

                    resolve(responseData);

                }
            };

            switch (method) {
                case 'GET':
                    var searchParams = new URLSearchParams();

                    if (passing_data.length != 0) {
                        for (const property in passing_data) {
                            searchParams.set(property, passing_data[ property ]);
                        }

                    }

                    var _questionMark=searchParams.toString();

                    xhttp.open("GET", ysp_yacht_sync.wp_rest_url+"raiys/"+ path + ((_questionMark != '')?'?'+searchParams.toString():''), true);

                    xhttp.send();

                    break;

                case 'POST':

                    xhttp.open("POST", ysp_yacht_sync.wp_rest_url+"raiys/"+ path, true);

                    xhttp.setRequestHeader('Content-Type', 'application/json');

                    xhttp.send(JSON.stringify(passing_data));

                    break;
            }
            
        });

    };