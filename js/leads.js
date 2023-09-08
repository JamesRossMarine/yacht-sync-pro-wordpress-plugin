document.addEventListener('DOMContentLoaded', function() {
    let forms = document.querySelectorAll('.single-yacht-detils-lead');


    forms.forEach((fEle) => {
        fEle.addEventListener('submit', function(e) {
            e.preventDefault();

            let FormData = raiys_get_form_data(e.target);

            let successMessage = fEle.parentElement.querySelector('.success-message');

            rai_ysp_api.call_api("POST", "yacht-leads", FormData)
                .then(function(data_result) {

                    console.log('success')
                    successMessage.style.display = 'block';

                    console.log('Form should be hidden.');
                    e.target.style.display = 'none';
                })
                .catch(function(error) {
                    console.log(error);
                });
        });
    });
});
