const calcBtn = document.querySelector('#calc');
const resetBtn = document.querySelector('#reset');
const mainForm = document.querySelector('#main-form');
const resultSum = document.querySelector('#result');
const inpElem = mainForm['inp'];  // Get the input element

const charsRegex = /[\s!\"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]/g;

function calcSum(text) {
    const cleanText = text.replace(charsRegex, ' ');
    let numbers = cleanText.split(/\s+/).map(x => parseInt(x)).filter(x => !isNaN(x));
    let sum = numbers.reduce((acc, curr) => acc + curr, 0);
    resultSum.innerText = sum;
}

mainForm.addEventListener('submit', (e) => {
    e.preventDefault();
    calcSum(inpElem.value);
})

mainForm.addEventListener('input', () => {
    calcSum(inpElem.value);
})

resetBtn.addEventListener('click', () => {
    resultSum.innerText = 0;
    inpElem.value = '';
})

calcBtn.addEventListener('click', () => {
    inpElem.value = 'Пизда!!!';  // Be cautious with this value
})
