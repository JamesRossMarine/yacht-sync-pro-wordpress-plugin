var YSP_VesselCompareList=[];


function ysp_restoreCompares() {
    let URLREF=new URL(location.href); // maybe for a re-do
    let compare_post_ids = URLREF.searchParams.get( 'restore_to_compare' ); 

    console.log(typeof compare_post_ids);
    console.log(compare_post_ids);

    if (typeof compare_post_ids == 'string') {
        YSP_VesselCompareList = compare_post_ids.split(',');
    

        ysp_makeCompareLinkout();
    }



}


function ysp_makeCompareVessel(ele_card) {
	 
	 jQuery('.compare_toggle', ele_card).change(function(e) {
	 	console.log('howdy');

        e.preventDefault();
    
        jQuery(this).toggleClass('armed');

        let yachtId = ele_card.data('post-id');
    
        if ( jQuery(this).hasClass('armed') ) {
            ysp_addVesselToCompareList(yachtId);
        }
        else {
            ysp_removeVesselToCompareList(yachtId);
        }

    });

    let yachtId = ele_card.data('post-id');

    if (YSP_VesselCompareList.indexOf( yachtId ) != -1  || YSP_VesselCompareList.indexOf( yachtId.toString() ) != -1 ) {

        console.log('hello world restored');

        ele_card.addClass('armed');

        jQuery('.compare_toggle', ele_card).addClass('armed').prop('checked', true);

    }

}

function ysp_addVesselToCompareList(yachtId) {

    if (YSP_VesselCompareList.indexOf( yachtId ) == -1) {

    	YSP_VesselCompareList.push(yachtId);
        
    }
    
    ysp_makeCompareLinkout();
}
    
function ysp_removeVesselToCompareList(yachtId) {
	let indexed = YSP_VesselCompareList.indexOf( yachtId )

	if ( indexed != -1) {

    	delete YSP_VesselCompareList[indexed];        
        YSP_VesselCompareList.splice(indexed, 1);
  		
    }

    ysp_makeCompareLinkout();
}

function ysp_makeCompareLinkout() {

    if (YSP_VesselCompareList.length >= 2) {
    	document.getElementById('ysp_compare_linkout').href=rai_yacht_sync.wp_rest_url+"raiys/compare/?postID="+YSP_VesselCompareList.join(',');

    	document.getElementById('ysp_compare_linkout').innerHTML=`<button type="button">Compare ( ${YSP_VesselCompareList.length} )</button>`;
        
        let params = {
            'post__in': YSP_VesselCompareList,
        };

        return rai_ysp_api.call_api("POST", "yachts", params).then(function(data_result) {

            data_result.results.forEach(function(item) {
                jQuery('#ysp-compare-previews').append( ysp_templates.yacht.compare_preview(item, params) );

                let ele_preview = jQuery('#ysp-compare-previews [data-post-id='+ item._postID +']');
                
                jQuery('.remove-from-compare', ele_preview).click(function() {
                    console.log('hello');
                    
                    let ele_card = jQuery('#search-result-row [data-post-id='+ item._postID +']');

                    jQuery('.compare_toggle', ele_card).prop('checked', false).removeClass('armed');

                    ysp_removeVesselToCompareList(item._postID);
                
                    ysp_makeCompareLinkout();


                });

            });

        });
    }
    else {
        jQuery('#ysp-compare-previews').html('');
        jQuery('#ysp_compare_linkout').html('');
    }




}
