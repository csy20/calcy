document.addEventListener("DOMContentLoaded", function () {
    const display = document.getElementById("display");
    const historyDisplay = document.getElementById("history"); // New history display
    const numberButtons = document.querySelectorAll(".number");
    const operatorButtons = document.querySelectorAll(".operator");
    const clearButton = document.getElementById("clear");
    const equalsButton = document.getElementById("equals");

    let currentInput = "";
    let firstOperand = null;
    let operator = null;
    let history = []; // Store calculation history

    numberButtons.forEach(button => {
        button.addEventListener("click", () => {
            currentInput += button.textContent;
            updateDisplay(); // Update display dynamically
        });
    });

    operatorButtons.forEach(button => {
        button.addEventListener("click", () => {
            if (currentInput !== "") {
                if (firstOperand === null) {
                    firstOperand = parseFloat(currentInput);
                } else if (operator) {
                    firstOperand = calculate(firstOperand, parseFloat(currentInput), operator);
                }
                operator = button.textContent;
                currentInput = "";
                updateDisplay(); // Update display with operator
            }
        });
    });

    equalsButton.addEventListener("click", () => {
        if (operator && currentInput !== "") {
            const secondOperand = parseFloat(currentInput);
            const result = calculate(firstOperand, secondOperand, operator);
            history.push(`${firstOperand} ${operator} ${secondOperand} = ${result}`); // Add to history
            updateHistory(); // Update history display
            firstOperand = result;
            display.value = result; // Show result
            operator = null;
            currentInput = "";
        }
    });

    clearButton.addEventListener("click", () => {
        currentInput = "";
        firstOperand = null;
        operator = null;
        display.value = ""; // Clear display
        history = []; // Clear history
        updateHistory(); // Clear history display
    });

    function calculate(operand1, operand2, operator) {
        switch (operator) {
            case "+":
                return operand1 + operand2;
            case "-":
                return operand1 - operand2;
            case "*":
                return operand1 * operand2;
            case "/":
                if (operand2 === 0) {
                    alert("Cannot divide by zero");
                    return operand1;
                }
                return operand1 / operand2;
            default:
                return operand2;
        }
    }

    function updateDisplay() {
        display.value = `${firstOperand !== null ? firstOperand : ""} ${operator || ""} ${currentInput}`.trim();
    }

    function updateHistory() {
        historyDisplay.innerHTML = history.map(entry => `<div>${entry}</div>`).join("");
    }
});