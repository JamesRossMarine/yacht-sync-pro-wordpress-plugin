Object.defineProperty(String.prototype, 'eachWordCapitalize', {
  value: function() {
    return this.toLowerCase()
    .split(' ')
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    .join(' ');
  },
  enumerable: false
});

function raiys_get_form_data(form_ele) {
    var formData = new FormData( form_ele );
          
    var fd = Array.from(formData.entries()).reduce((memo, pair) => ({
        ...memo,
        [pair[0]]: formData.getAll(pair[0]), //pair[1]
    }), {});

    console.log(fd);
    
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

    console.log(strpath);
    
    //history.pushState(data, '', rai_yacht_sync.yacht_search_url+'?'+searchParams.toString());
    history.pushState(data, '', rai_yacht_sync.yacht_search_url+strpath);    
}

