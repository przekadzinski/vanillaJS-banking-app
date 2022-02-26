const installmentsRange = document.querySelector('#credit_installment-range');
const installmentsInput = document.querySelector('#credit_instllment-input');
const amountRange = document.querySelector('#credit_amount-range');
const amountInput = document.querySelector('#credit_amount-input');

const rrsoValue = document.querySelector('.calculator__summary-txt-sm');
const installmentValue = document.querySelector('.calculator__summary-txt');

const interestRate = 10; //%
const brokerage = 4.5; //%

const loan = function (amount, installments) {
  console.log(amount);
  const payments = parseFloat(installments);
  const interest = parseFloat(interestRate / 100 / 12);
  const provision = parseFloat((brokerage / 100) * amount);
  const principal = parseFloat(parseFloat(provision) + parseFloat(amount));

  const pow = Math.pow(1 + interest, payments);
  const monthly = (principal * pow * interest) / (pow - 1);
  const rrso = interestRate / 100 + (brokerage / 100) * (12 / installments);

  rrsoValue.innerHTML = `${(rrso * 100).toFixed(2)}%`;
  installmentValue.innerHTML = monthly.toFixed(2);
};

let installmentVal = 12;
let amountVal = 10000;

const updateInputs = function (e) {
  installmentVal = 12;
  amountVal = 10000;
  if (e.target.classList.contains('installment-input')) {
    installmentVal = e.target.value;
    installmentsRange.value = installmentVal;
    installmentsInput.value = installmentVal;
  }
  if (e.target.classList.contains('amount-input')) {
    amountVal = e.target.value;
    amountRange.value = amountVal;
    amountInput.value = amountVal;
  }

  loan(amountVal, installmentVal);
};

amountRange.addEventListener('input', updateInputs);
amountInput.addEventListener('input', updateInputs);
installmentsRange.addEventListener('input', updateInputs);
installmentsInput.addEventListener('input', updateInputs);

loan(amountVal, installmentVal);
