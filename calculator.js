window.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById("calc-form");
  if (form) {
    setupIntialValues();
    form.addEventListener("submit", function(e) {
      e.preventDefault();
      update();
    });
  }
});

function getCurrentUIValues() {
  return {
    amount: +(document.getElementById("loan-amount").value),
    years: +(document.getElementById("loan-years").value),
    rate: +(document.getElementById("loan-rate").value),
  }
}

// Get the inputs from the DOM.
// Put some default values in the inputs
// Call a function to calculate the current monthly payment
function setupIntialValues() {
  const initialValues = {amount: 10000, years: 10, rate: 4.5};
  const loanAmount = document.getElementById("loan-amount");
  const loanRate = document.getElementById("loan-rate");
  const loanYears = document.getElementById("loan-years");
  loanAmount.value = initialValues.amount;
  loanRate.value = initialValues.rate;
  loanYears.value = initialValues.years;
  update();
}

// Get the current values from the UI
// Update the monthly payment
function update() {
  const currentValues = getCurrentUIValues();
  updateMonthly(calculateMonthlyPayment(currentValues));
}

// Given an object of values (a value has amount, years and rate ),
// calculate the monthly payment.  The output should be a string
// that always has 2 decimal places.
function calculateMonthlyPayment(values) {
  let monthlyRate = (values.rate / 100) / 12;
  let numberOfPayments = Math.floor(values.years * 12);
  let total = (values.amount * monthlyRate) / (1 - Math.pow((1 + monthlyRate), -numberOfPayments));
  total = total.toFixed(2);
  console.log(total);
  return total;
  }

// Given a string representing the monthly payment value,
// update the UI to show the value.
function updateMonthly(monthly) {
  let monthlyPayment = document.getElementById("monthly-payment");
  monthlyPayment.innerText = "$" + monthly;
}
