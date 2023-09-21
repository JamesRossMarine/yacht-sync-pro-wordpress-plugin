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
        }
    }
    
    history.pushState(data, '', '/all-yacht-search?'+searchParams.toString());
}

