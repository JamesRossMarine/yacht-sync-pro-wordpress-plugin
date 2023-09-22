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
    let formData = new FormData( form_ele );

    let fd=Object.fromEntries(formData.entries());

    for (const [fIndex, field] of Object.entries(fd)) {

        let ValArray = formData.getAll(fIndex);

        if (typeof ValArray[1] != 'undefined') {
            fd[ fIndex ] = ValArray;
        }

        if (fd[ fIndex ] == '') {
            delete fd[fIndex];
        }
    }

    return fd;
}

function raiys_push_history( data = {} ) {
    let searchParams = new URLSearchParams();
    let strpath='';

    for (const property in data) {
        let it = data[ property ];


        if (it != '' && typeof it != 'undefined' && typeof it == 'string' && property != 'OnFirstLoad' && typeof it != 'object') {
            searchParams.set(property, it);

            strpath=strpath+""+property+'-'+(it.toString().split(' ').join('-'))+'/';
            strpath=strpath.toLowerCase();
        }
        else if (Array.isArray(it)) {
            searchParams.set(property, it);

            it = it.map((prop) => { return prop.toString().split(' ').join('-'); });

            strpath=strpath+""+property+'-'+( it.join("+") )+'/';
            strpath=strpath.toLowerCase();  
        }
    }

    console.log(strpath);
    
    //history.pushState(data, '', rai_yacht_sync.yacht_search_url+'?'+searchParams.toString());
    history.pushState(data, '', rai_yacht_sync.yacht_search_url+strpath);    
}

