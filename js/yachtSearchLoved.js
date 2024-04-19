function ysp_markLovedVessel( ele_card ) {

    let lovedVessels = JSON.parse(localStorage.getItem('ysp_loved_vessels'));

    let yachtId = ele_card.data('yacht-id');

    if (lovedVessels.indexOf( yachtId ) != -1) {

        ele_card.addClass('loved');

        jQuery('.love', ele_card).addClass('loved');
    }
}

function ysp_addLovedVessel( yachtId ) {

    let lovedVessels = JSON.parse(localStorage.getItem('ysp_loved_vessels'));

    
    

} 

function ysp_removeLovedVessel( yachtId ) {

    

}