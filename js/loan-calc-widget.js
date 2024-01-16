document.addEventListener("DOMContentLoaded", () => {
    let loanCalcForm = document.querySelector("#ysp-loan-calculator-form");

    loanCalcForm.addEventListener("submit", (e) => {
        e.preventDefault();

        let loanAmount = document.querySelector("input[name=loan_amount]").value;
        let loanTerm = document.querySelector("input[name=loan_term]").value;
        let interestRate = document.querySelector("input[name=interest_rate]").value;

        let monthlyPayment = document.querySelector("input[name=estimated_monthly_payment]");
        let totalInterest = document.querySelector("input[name=estimated_total_interest]");
        let totalPrice = document.querySelector("input[name=estimated_total_price]");

        let principal = parseFloat(loanAmount);
        let calculatedInterest = parseFloat(interestRate) / 100 / 12;
        let calculatedPayments = parseFloat(loanTerm) * 12;

        let x = Math.pow(1 + calculatedInterest, calculatedPayments);
        let monthly = (principal * x * calculatedInterest) / (x - 1);

        if (isFinite(monthly)) {
            monthlyPayment.value = monthly.toFixed(2);
            totalPrice.value = (monthly * calculatedPayments).toFixed(2);
            totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);
        } else {
            monthlyPayment.value = "";
            totalPrice.value = "";
            totalInterest.value = "";
        }
    });
});