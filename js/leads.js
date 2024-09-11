document.addEventListener('DOMContentLoaded', function() {
    function handleSubmit(e, apiEndpoint) {
        e.preventDefault();

        let formData = raiys_get_form_data(e.target);
        let successMessage = e.target.parentElement.querySelector('.success-message');
        console.log(formData)
        ysp_ysp_api.call_api("POST", apiEndpoint, formData)
            .then(function(data_result) {
                successMessage.style.display = 'block';
                e.target.style.display = 'none';
            })
            .catch(function(error) {
                console.log(error);
            });
    }

    let yachtForms = document.querySelectorAll('.single-yacht-detils-lead');
    yachtForms.forEach((fEle) => {
        fEle.addEventListener('submit', function(e) {
            handleSubmit(e, "yacht-leads");
        });
    });

    let brokerForms = document.querySelectorAll('.single-broker-detils-lead');
    brokerForms.forEach((fEle) => {
        fEle.addEventListener('submit', function(e) {
            handleSubmit(e, "broker-leads");
        });
    });
});
