function get_form_data(form_ele) {
    console.log(form_ele);

    var formData = new FormData( form_ele );
          
    var fd = Array.from(formData.entries()).reduce((memo, pair) => ({
        ...memo,
        [pair[0]]: pair[1],
    }), {});

    return fd;
}


