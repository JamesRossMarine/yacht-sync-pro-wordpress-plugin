function raiys_get_form_data(form_ele) {
    var formData = new FormData( form_ele );
          
    var fd = Array.from(formData.entries()).reduce((memo, pair) => ({
        ...memo,
        [pair[0]]: pair[1],
    }), {});

    return fd;
}

function raiys_push_history( data = {}) {
    var searchParams = new URLSearchParams();
    var strpath='';

    for (const property in data) {
        var it = data[ property ];

        if (it != '' && typeof it != 'undefined' && property != 'OnFirstLoad' && typeof it != 'object') {
            searchParams.set(property, it);

            strpath=strpath+""+property+'-'+(it.toString().split(' ').join('-'))+'/';
            strpath=strpath.toLowerCase();
        }
    }
    
    //history.pushState(data, '', rai_yacht_sync.yacht_search_url+'?'+searchParams.toString());
    history.pushState(data, '', rai_yacht_sync.yacht_search_url+strpath);    
}

