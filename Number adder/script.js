const calcBtn = document.querySelector("#calc");
const resetBtn = document.querySelector("#reset");
const mainForm = document.querySelector("#main-form");
const resultSum = document.querySelector("#result");
const inpElem = mainForm["inp"]; // Get the input element

function isNumeric(str) {
    if (typeof str != "string") return false; // we only process strings!
    return (
        !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
        !isNaN(parseFloat(str))
    ); // ...and ensure strings of whitespace fail
}

function calcSum() {
    let sum = 0;
    const words = inpElem.value.replaceAll(",", ".").split(/\s+/);
    for (let word of words) {
        if (isNumeric(word)) {
            sum += Number(word);
        }
    }
    if (sum % 1 !== 0) {
        const decimalPlaces = words
            .filter((elem) => elem.includes("."))
            .map((elem) => elem.slice(elem.indexOf(".") + 1).length);
        const maxDecimalPlaces = Math.max(...decimalPlaces);
        sum = sum.toFixed(maxDecimalPlaces); // returns a string!
    }
    resultSum.innerText = sum;
}

function reset() {
    resultSum.innerText = "0";
    inpElem.value = "";
}

mainForm.addEventListener("submit", (e) => {
    e.preventDefault();
});

mainForm.addEventListener("input", calcSum);

resetBtn.addEventListener("click", reset);

calcBtn.addEventListener("click", () => {
    reset();
    alert("This button's functionality is in development currently...");
});
