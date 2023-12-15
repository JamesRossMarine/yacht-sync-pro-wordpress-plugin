jQuery(document).ready(function() {
  
  jQuery('[data-modal]').click(function(e) {
    e.preventDefault();
    
    console.log('fuck me ');

    var data_modal = jQuery(this).data('modal');

    jQuery( data_modal ).ysp_modal({
    	closeText: 'X',
      modalClass: 'ysp-modal-open',
      closeClass: 'ysp-model-close'
    });
  });
});

function copyLink() {

  var copyText = document.getElementById("copyLinkInput");

  copyText.select();
  copyText.setSelectionRange(0, 99999);

  document.execCommand("copy");

  alert("Copied the link: " + copyText.value);
}