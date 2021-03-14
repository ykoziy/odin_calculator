const calculatorDisplay = document.querySelector(".display");
const digitButtons = document.querySelectorAll(".btn-digit");
const operationButtons = document.querySelectorAll(".btn-oper");
const equalsButton = document.querySelector(".btn-equals");
const clearButton = document.querySelector(".btn-clear");
const display = document.querySelector(".display");
const dotButton = document.querySelector(".btn-dot");

let firstOperand;
let secondOperand;
let isNewInput = true;
let operation = null;

clearButton.addEventListener("click", clearDisplay);
equalsButton.addEventListener("click", compute);
dotButton.addEventListener("click", handleDot);

digitButtons.forEach((button) => {
    button.addEventListener("click", addDigit);
})

operationButtons.forEach((button) => {
    button.addEventListener("click", handleOperation);
})

function addDigit() {
    if (isNewInput) {
        clearDisplay();
    }
    display.textContent += this.dataset.digit;
}

function handleDot() {
    if (isNewInput) {
        clearDisplay();
    }
    if (display.textContent == "") {
        display.textContent = "0";
    }
    if (display.textContent.includes(".")) {
        return;
    }
    display.textContent += ".";
}

function handleOperation() {
    if (operation) {
        compute();
    }
    firstOperand = display.textContent.trim();
    operation = this.dataset.oper;
    isNewInput = true;
}

function compute() {
    secondOperand = display.textContent.trim();
    display.textContent = operate(operation, firstOperand, secondOperand);
}

function clearDisplay() {
    display.textContent = "";
    isNewInput = false;
}

function operate(operation, a, b) {
    a = Number(a);
    b = Number(b);
    switch (operation) {
        case "+":
            return add(a, b);
        case "-":
            return subtract(a, b);
        case "*":
            return multiply(a, b);
        case "/":
            try {
                return divide(a, b);
            } catch (error) {
                console.log(error);
                return null;
            }
        default:
            return null;
    }
}

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (!b) {
        throw new Error('division by zero');
    }
    return a / b;
}