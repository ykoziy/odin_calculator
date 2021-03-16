const calculatorDisplay = document.querySelector(".display");
const digitButtons = document.querySelectorAll(".btn-digit");
const operationButtons = document.querySelectorAll(".btn-oper");
const equalsButton = document.querySelector(".btn-equals");
const clearButton = document.querySelector(".btn-clear");
const deleteButton = document.querySelector(".btn-delete");
const display = document.querySelector(".display");
const dotButton = document.querySelector(".btn-dot");

let firstOperand;
let secondOperand;
let isNewInput = true;
let isEqualsRepeated = false;
let operation = null;

clearButton.addEventListener("click", clearCalculator);
deleteButton.addEventListener("click", handleDelete);
equalsButton.addEventListener("click", handleEquals);
dotButton.addEventListener("click", handleDot);
document.addEventListener("keydown", handleNumPadButtons);

digitButtons.forEach((button) => {
    button.addEventListener("click", addDigit);
})

operationButtons.forEach((button) => {
    button.addEventListener("click", handleOperation);
})

function addDigit(e, num) {
    if (isNewInput || display.textContent === "0") {
        clearDisplay();
    }
    if (num) {
        display.textContent += num;
    } else {
        display.textContent += this.dataset.digit;
    }
    
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

function handleOperation(e, op) {
    if (operation && !isEqualsRepeated) {
        compute();
    }
    firstOperand = display.textContent.trim();
    if (op) {
        operation = op;
    } else {
        operation = this.dataset.oper;
    }
    isNewInput = true;
    isEqualsRepeated = false;
}

function compute() {
    if (isNewInput) {
        return;
    }
    secondOperand = display.textContent.trim();
    display.textContent = roundNumber(operate(operation, firstOperand, secondOperand));
    operation = null;
}

function handleEquals() {
    if (operation == null) {
        return;
    }
    if (!isEqualsRepeated) {
        secondOperand = display.textContent.trim();
        isEqualsRepeated = true;
    } else {
        firstOperand = display.textContent.trim();
    }
    display.textContent = roundNumber(operate(operation, firstOperand, secondOperand));
    isNewInput = true;
}

function clearDisplay() {
    display.textContent = "";
    isNewInput = false;
}

function clearCalculator() {
    firstOperand = "";
    secondOperand = "";
    isNewInput = true;
    isEqualsRepeated = false;
    operation = null;
    display.textContent = "0";
}

function handleDelete() {
    display.textContent = display.textContent.slice(0, -1);
}

function handleNumPadButtons(event) {
    if (event.defaultPrevented) {
        return;
    }

    const operations = "/*-+";
    let key = event.key;

    if (key >= "0" && key <= "9") {
        addDigit(undefined, key);
    } else if ("/*-+".includes(key)) {
        handleOperation(undefined, key);   
    } else if (key === "Enter") {
        handleEquals();
    } else if (key === "Backspace") {
        handleDelete();
    } else if (key === ".") {
        handleDot();
    }
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

function roundNumber(num) {
    return Math.round(num*100)/100;
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