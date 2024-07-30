function ysp_makeSearchTags( data ) {

	let tagsEle = document.querySelectorAll('.ysp-search-tags');
        
    if (tagsEle) {
        tagsEle.forEach(function(te) {
            te.innerHTML="";
        });
        
        var ysp_tags_not_print = ['page_index', ''];

        for (let paramKey in data) {
            let label='';

            if (document.querySelector('label[for='+ paramKey +']')) {
            
                label=document.querySelector('label[for='+ paramKey +']').innerText;
            
            }
            else if (document.querySelector('*[name='+ paramKey +']') && document.querySelector('*[name='+ paramKey +']').hasAttribute('label')) {

                label=document.querySelector('*[name='+ paramKey +']').getAttribute('label');
            
            }


            tagsEle.forEach(function(te) {

                if (ysp_tags_not_print.indexOf( paramKey ) == -1) {

                    let eleInput = document.querySelector('.ysp-yacht-search-form *[name='+ paramKey +']');

                    if (eleInput) {

                        let newTagEle = document.createElement('span');
                            let tagVal = data[paramKey];

                            if (eleInput.tagName == 'SELECT') {
                                tagVal = eleInput.options[ eleInput.selectedIndex ].innerText;
                            }

                            if (paramKey.match('price')) {
                                tagVal = '$'+tagVal;
                            }

                            if (paramKey.match('length') && paramKey != 'lengthunit')  {
                              
                                let eleUnit =  document.querySelector('.ysp-yacht-search-form [name=lengthunit]:checked');
                                    if (! eleUnit) {
                                        eleUnit =  document.querySelector('.ysp-yacht-search-form [name=lengthunit]');
                                    }

                                tagVal = tagVal +' ';

                                if (eleUnit) {
                                    tagVal += eleUnit.value;
                                }
                            }
                           
                            newTagEle.className = 'btn btn-primary btn-sm ysp-tag';

                            if ( label != null && label != 'null' && label != '') {
                                newTagEle.innerHTML = ysp_templates.yacht_tag(label, tagVal);
                            }
                            else {
                                newTagEle.innerHTML = ysp_templates.yacht_tag('', tagVal);
                            }

                            newTagEle.setAttribute('key', paramKey);
                            
                            te.appendChild( newTagEle );
                            
                            console.log(document.querySelector('.ysp-tag[key="'+ paramKey +'"]'));
                            console.log(('.ysp-tag[key="'+ paramKey +'"]'));

                            document.querySelectorAll('span.ysp-tag[key="'+ paramKey +'"]').forEach(function(yspTagEle) {

                                yspTagEle.addEventListener('click', function(event) {

                                    console.log(event);

                                    let key = event.currentTarget.getAttribute('key');

                                    console.log(key);

                                    let inputEles = document.querySelectorAll('.ysp-yacht-search-form select[name='+ key +'], .ysp-yacht-search-form input[name='+ key +']');

                                    console.log(inputEles);

                                    inputEles.forEach(function(eleI) {
                                        if (typeof eleI.type != 'undefined' && (eleI.type == 'checkbox' || eleI.type == 'radio')) {
                                            eleI.checked=false;                                
                                        }
                                        else {
                                            eleI.value='';
                                        }                                
                                    });

                                    event.currentTarget.remove();

                                    inputEles[0].form.requestSubmit();

                                });
                            });
                    }

                }

            });
        
        }
    }

}