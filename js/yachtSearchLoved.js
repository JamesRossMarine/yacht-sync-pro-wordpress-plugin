function ysp_markLovedVessel( ele_card ) {

    jQuery('.love', ele_card).click(function(e) {
        e.preventDefault();
    
        jQuery(this).toggleClass('loved');

        let yachtId = jQuery(this).data('yacht-id');
    
        if ( jQuery(this).hasClass('loved') ) {
            ysp_addLovedVessel(yachtId);
        }
        else {
            ysp_removeLovedVessel(yachtId);
        }

    });

    if (localStorage.getItem('ysp_loved_vessels') != "") {

        let lovedVessels = JSON.parse(localStorage.getItem('ysp_loved_vessels'));

        if (lovedVessels == null) {
            lovedVessels = [];
        }

        let yachtId = ele_card.data('yacht-id');

        if (lovedVessels.indexOf( yachtId ) != -1) {

            ele_card.addClass('loved');

            jQuery('.love', ele_card).addClass('loved');
        }

    }
}

function ysp_addLovedVessel( yachtId ) {

    let lovedVessels = JSON.parse(localStorage.getItem('ysp_loved_vessels'));


        if (lovedVessels == null) {
            lovedVessels = [];
        }

    if (lovedVessels.indexOf( yachtId ) == -1) {

        lovedVessels.push(yachtId);

    }
    else {
        // already added
    }

    console.log(lovedVessels );
    
    localStorage.setItem("ysp_loved_vessels", JSON.stringify(lovedVessels));

} 

function ysp_removeLovedVessel( yachtId ) {

    let lovedVessels = JSON.parse(localStorage.getItem('ysp_loved_vessels'));


        if (lovedVessels == null) {
            lovedVessels = [];
        }

    let indexed = lovedVessels.indexOf( yachtId );

    console.log(indexed);

    if (indexed != -1) {

        delete lovedVessels[indexed];        
        lovedVessels.splice(indexed, 1);

    }
    else {
        // already added
    }

    console.log(lovedVessels );
    
    localStorage.setItem("ysp_loved_vessels", JSON.stringify(lovedVessels));

}