
function ysp_yacht_search_and_reader(data) {

    jQuery('#search-result-row').html('');

    // GET AND WRITE
    return rai_ysp_api.call_api("POST", "yachts", data).then(function(data_result) {

        jQuery('#total-results').text(new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(data_result.total));

        if (data_result.total > 0) {


            data_result.results.forEach(function(item) {

                if (data.featured == 'on') {
                    jQuery('#search-result-row').append( __templates.rossy.list_result(item, data) );
                }
                else {
                    jQuery('#search-result-row').append( __templates.rossy.grid_result(item, data) );
                }
            });

            raiys_push_history(data);

            jQuery('#yachts-pagination').pagination({
                items: data_result.total,
                itemsOnPage: 12,
                currentPage: data.page_index,
                prevText: '<',
                nextText: '>',
                hrefTextPrefix: '?page_index=',
                onPageClick: function(pageNumber, event) {
                    event.preventDefault();

                    document.querySelector('#search-yacht-sec input[name=page_index]').value=pageNumber;

                    jQuery([document.documentElement, document.body]).animate({
                        scrollTop: (jQuery(".search-for-page").offset().top)
                    }, 250);

                    let formDataObject = get_params();

                    get_data_and_render(formDataObject);
                }
            });


        }
        else {
            jQuery('#yachts-pagination').html('');
            jQuery('#search-result-row').append(__templates.noResults());

        }

        return data_result;

    }).catch(function(error) {

        console.log(error);

    });
}

document.addEventListener("DOMContentLoaded", function() {
    // Restore Fields
    var urlPARAMs=decodeURI(window.location.search)
        .replace('?', '')
        .split('&')
        .map(param => param.split('='))
        .reduce((values, [ key, value ]) => {
            values[ key ] = value;
            return values;
        }, {});


    for (param in urlPARAMs) {
        if (param != '' && urlPARAMs[ param ] != '') {
            let input = document.querySelector('#search-yacht-sec *[name='+ param +']');
             
            if (input) {
            
                if (input.value==urlPARAMs[ param ] && input.type == 'checkbox') {
                    input.checked=true;
                }
                else {
                    input.value = urlPARAMs[ param ];
                }
            }
            else {
                input=document.querySelector('*[name='+ param +'][form="search-page-form"]');
                
                if (input) {
                    if (input.value == urlPARAMs[ param ] && input.type == 'checkbox') {
                        input.checked=true;
                    } 
                    else {
                        input.value = urlPARAMs[ param ];
                    }

                }
            }
        }
    }

    // Render Yachts For Page Load


});