
function ysp_yacht_search_and_reader(data) {

    jQuery('#search-result-row').html('');

    document.querySelector('#search-result-section').classList.remove('loaded');
    document.querySelector('#search-result-section').classList.add('loading');

    
    
    // GET AND WRITE
    return rai_ysp_api.call_api("POST", "yachts", data).then(function(data_result) {

        document.querySelector('#search-result-section').classList.remove('loading');
        document.querySelector('#search-result-section').classList.add('loaded');

        jQuery('#ysp-search-heading').text(data_result.SEO.heading);
        jQuery('#ysp-search-paragraph').text(data_result.SEO.p);

        jQuery('#total-results').text(new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(data_result.total));

        raiys_push_history( data );

        jQuery('#yachts-pagination').html('');

        if (data_result.total > 0) {

            data_result.results.forEach(function(item) {
                if (typeof data.view != 'undefined' && data.view == 'list') {
                    jQuery('#search-result-row').append( ysp_templates.yacht.list(item, data) );
                }
                else {
                    jQuery('#search-result-row').append( ysp_templates.yacht.grid(item, data) );
                }
            });

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

                    let formDataObject = raiys_get_form_data( document.querySelector('.ysp-yacht-search-form') );

                    ysp_yacht_search_and_reader(formDataObject);
                }
            });
        } 
        else {
            jQuery('#search-result-row').append(ysp_templates.noResults());

        }

        jQuery([document.documentElement, document.body]).animate({
            scrollTop: (jQuery(".scroll-to-here-on-yacht-search").offset().top)
        }, 250);

        return data_result;

    }).catch(function(error) {

        console.log(error);

    });
}

document.addEventListener("DOMContentLoaded", function() {

    // Fill List Options
    let FillLists=[];
    let listElements = document.querySelectorAll("datalist[data-fill-list]");

    listElements.forEach((ele) => {
        FillLists.push(ele.getAttribute('data-fill-list'));
    });
    
    rai_ysp_api.call_api('POST', 'list-options', {labels: FillLists}).then(function(rOptions) {
        for (let label in rOptions) {

            let SelectorEle = document.querySelectorAll("datalist[data-fill-list='"+ label +"']");

            rOptions[label].forEach(function(b) {

                let option = document.createElement("OPTION");

                    option.text = b;
                    option.value = b;

                SelectorEle.forEach((ele) => {
                    ele.append(option);
                });
            });
        }
    });

    let yachtSearchAndResults=document.querySelector('.ysp-yacht-search-form');

    if (yachtSearchAndResults) {
        yachtSearchAndResults.addEventListener('submit', function(e) {
            e.preventDefault();

            console.log('joshie!!!');

            e.target.querySelector('input[name=page_index]').value=1;

            let params = raiys_get_form_data(e.target);

            ysp_yacht_search_and_reader( params );

        }); 

        yachtSearchAndResults.querySelectorAll('input.submit-on-change').forEach((eeee) => {
            eeee.addEventListener('change', function(e) {
                e.target.form.querySelector('input[name=page_index]').value=1;

                let params = raiys_get_form_data( e.target.form );

                ysp_yacht_search_and_reader( params );

            });
        });

        yachtSearchAndResults.querySelectorAll('input[type=reset]').forEach((eeee) => {
            eeee.addEventListener('click', function(e) {
                console.log('hel');

                event.target.form.querySelector('input[name=page_index]').value=1;

                let params = raiys_get_form_data( e.target.form );

                ysp_yacht_search_and_reader( params );

            });
        });

        if (document.querySelector('input[name="ys_company_only"]')) {
            document.querySelector('input[name="ys_company_only"]').addEventListener('change', function(e) {
                event.target.form.querySelector('input[name=page_index]').value=1;

                let params = raiys_get_form_data( e.target.form );

                ysp_yacht_search_and_reader( params );

            });            
        }

        document.querySelectorAll('input[name=view][form=ysp-yacht-search-form], select[name=sortBy][form=ysp-yacht-search-form]').forEach((eeee) => {
            eeee.addEventListener('change', function(e) {
                e.target.form.querySelector('input[name=page_index]').value=1;

                let params = raiys_get_form_data( e.target.form );

                ysp_yacht_search_and_reader( params );

            });

        });

        document.querySelectorAll('.pick-all').forEach(function(ele) {
            ele.addEventListener('click', function(e) {

                let input_name = e.target.getAttribute('name');

                document.querySelectorAll('input[name="'+ input_name +'"]').forEach((iEle) => {
                    iEle.checked=false;
                })

            });
        });

        // PRETTY URL
        let strpaths=window.location.href;

        strpaths=strpaths.replace(rai_yacht_sync.yacht_search_page_id, '');

        let paths = strpaths.split("/");

        let pretty_url_path_params={};

        paths.forEach(function(path) {

            if (path != '') {
                let phase_path = path.split('-');
                let only_vals=phase_path.slice(1);

                only_vals=only_vals.join(' ').eachWordCapitalize();
                
                let only_vals_array=(only_vals.split('+'));

                if (typeof only_vals_array[1] != 'undefined') {
                    only_vals = only_vals_array.map((ov) => {
                        return ov.eachWordCapitalize();
                    });

                    console.log(only_vals);
                }

                pretty_url_path_params[phase_path[0]]=only_vals;
            }

        });

        console.log(pretty_url_path_params);

        // Restore Fields

        let URLREF=new URL(location.href); // maybe for a re-do

        let formInputs=document.querySelectorAll('.ysp-yacht-search-form *[name], *[name][form="ysp-yacht-search-form"]');

        formInputs.forEach((ele) => {
            let input = ele;

            let name = ele.getAttribute('name');

            let urlVal = URLREF.searchParams.get( name );

            let hasPretty = pretty_url_path_params[ name ];

            if (typeof hasPretty != 'null' && typeof hasPretty != 'undefined') {

                if (Array.isArray(hasPretty)) {
                    console.log(hasPretty);

                    hasPretty.forEach((hP) => {

                        if (typeof input.type != 'undefined' && input.type == 'checkbox' && input.getAttribute('value') == hP ) {
                            input.checked=true;
                        }
                   

                    });

                }
                else {

                    if (typeof input.type != 'undefined' && input.type == 'checkbox' && input.getAttribute('value') == hasPretty ) {
                        input.checked=true;
                    }
                    else if (input.type != 'checkbox') {
                        input.value = hasPretty;
                    }

                }

            }

            if (urlVal != '' && urlVal != null) {
                if (typeof input.type != 'undefined' && input.type == 'checkbox' && input.getAttribute('value') == urlVal ) {
                    input.checked=true;
                }
                else if (input.type != 'checkbox') {
                    input.value = urlVal;
                }
            }
        });

        // Fill options
        let FillOptions=[];
        let selectorElements = document.querySelectorAll("select[data-fill-options]");

        selectorElements.forEach((ele) => {
            FillOptions.push(ele.getAttribute('data-fill-options'));
        });
        
        rai_ysp_api.call_api('POST', 'dropdown-options', {labels: FillOptions}).then(function(rOptions) {
            for (let label in rOptions) {

                let SelectorEle = document.querySelectorAll("select[data-fill-options='"+ label +"']");
                let name = SelectorEle[0].getAttribute('name');

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

                let strpaths=window.location.href;

                strpaths=strpaths.replace(rai_yacht_sync.yacht_search_page_id, '');

                let paths = strpaths.split("/");

                let pretty_url_path_params={};

                paths.forEach(function(path) {

                    if (path != '') {
                        let phase_path = path.split('-');
                        let only_vals=phase_path.slice(1);

                        pretty_url_path_params[phase_path[0]]=only_vals.join(' ');

                        if (typeof pretty_url_path_params[phase_path[0]] == 'string') {
                           pretty_url_path_params[phase_path[0]] = pretty_url_path_params[phase_path[0]].eachWordCapitalize();
                        }
                    }

                });
                
                if (UrlVal != '' && UrlVal != null) {
                    SelectorEle.forEach((ele) => {
                        ele.value = UrlVal; 
                    });

                }


                let hasPretty = pretty_url_path_params[ name ];

                console.log( pretty_url_path_params[ name ]);

                if (hasPretty != '' && hasPretty != null) {
                    SelectorEle.forEach((ele) => {
                        ele.value = hasPretty; 
                    });

                }
            }
        }).then(function () {
            // Render Yachts For Page Load
            let params = raiys_get_form_data(document.querySelector('.ysp-yacht-search-form'));

            ysp_yacht_search_and_reader( params );       
        });

    }

});