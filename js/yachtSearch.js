
function ysp_yacht_search_and_reader(data) {

    jQuery('#search-result-row').html('');

    // GET AND WRITE
    return rai_ysp_api.call_api("POST", "yachts", data).then(function(data_result) {

        jQuery('#total-results').text(new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(data_result.total));

        if (data_result.total > 0) {

            data_result.results.forEach(function(item) {

                if (typeof data.featured != 'undefined' && data.featured == 'on') {
                    jQuery('#search-result-row').append( ysp_templates.yacht.list(item, data) );
                }
                else {
                    jQuery('#search-result-row').append( ysp_templates.yacht.grid(item, data) );
                }
            });

            // raiys_push_history(data);

            jQuery('#yachts-pagination').pagination({
                items: data_result.total,
                itemsOnPage: 12,
                currentPage: data.page_index,
                prevText: '<',
                nextText: '>',
                hrefTextPrefix: '?page_index=',
                onPageClick: function(pageNumber, event) {
                    event.preventDefault();

                    document.querySelector('.ysp-yacht-search-form input[name=page_index]').value=pageNumber;

                    /*jQuery([document.documentElement, document.body]).animate({
                        scrollTop: (jQuery(".search-for-page").offset().top)
                    }, 250);*/

                    let formDataObject = raiys_get_form_data( document.querySelector('.ysp-yacht-search-form') );

                    ysp_yacht_search_and_reader(formDataObject);
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
    let URLREF=new URL(location.href); // maybe for a re-do

    let formInputs=document.querySelectorAll('.ysp-yacht-search-form *[name], *[name][form="ysp-yacht-search-form"]');

    formInputs.forEach((ele) => {

        let name = ele.getAttribute('name');

        let urlVal = URLREF.searchParams.get( name );

        if (urlVal != '' && urlVal != null) {
            if (input.type == 'checkbox' && input.value == urlVal ) {
                input.checked=true;
            }
            else {
                input.value = urlPARAMs[ param ];
            }
        }

    });

    // Fill options
    let FillOptions=[];
    let selectorElements = document.querySelectorAll("select[data-fill-label]");

    selectorElements.forEach((ele) => {
        FillOptions.push(ele.getAttribute('data-fill-label'));
    });
    
    rai_ysp_api.call_api('POST', 'dropdown-options', {labels: FillOptions}).then(function(rOptions) {
        console.log(rOptions);

        for (let label in rOptions) {

            let SelectorEle = document.querySelectorAll("select[data-fill-label='"+ label +"']");

            rOptions[label].forEach(function(b) {

                let option = document.createElement("OPTION");

                    option.text = b;
                    option.value = b;

                SelectorEle.forEach((ele) => {
                    ele.add(option);
                });
            });

            let URLREF = new URL(location.href);
            let UrlVal = URLREF.searchParams.get( label );
            
            if (UrlVal != '' && UrlVal != null) {
                SelectorEle.forEach((ele) => {
                    ele.value = UrlVal; 
                });
            }
        }
    }).then(function () {

        // Render Yachts For Page Load
        let params = raiys_get_form_data(document.querySelector('.ysp-yacht-search-form'));

        ysp_yacht_search_and_reader( params );

    });

    



});