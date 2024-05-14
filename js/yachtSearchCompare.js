var YSP_VesselCompareList=[];

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

    if (YSP_VesselCompareList.indexOf( yachtId ) != -1) {

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

	document.getElementById('ysp_compare_linkout').href=rai_yacht_sync.wp_rest_url+"raiys/compare/?postID="+YSP_VesselCompareList.join(',');

	document.getElementById('ysp_compare_linkout').innerHTML=`<button type="button">Compare ( ${YSP_VesselCompareList.length} )</button>`;

}
