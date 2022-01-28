const add = (a, b) => {
    return a + b;
}

const subtract = (a, b) => {
    return a - b;
}

const multiply = (a, b) => {
    return a * b;
}

const divide = (a, b) => {
    return a / b;
}

const operate = (a, b, operator) => {
    return operator === 'add'
        ? add(a, b)
        : operator === 'subtract'
            ? subtract(a, b)
            : operator === 'multiply'
                ? multiply(a, b)
                : operator === 'divide'
                    ? divide(a, b)
                    : null;
};

// Storage will have at most three properties,
// 2 of them are the operands and the 3rd one is the operator
let storage = {};

const display = document.querySelector('.row.input .col');

// Will return the display content (ie whatever numbers have been inputted)
const getDisplayValue = () => display.textContent;

const setDisplayValue = (value) => {
    console.log(value.toString().length);

    if (value.toString().length > 16) {
        display.textContent = (+value).toExponential(10);
    } else {
        display.textContent = value;
    }
};

const digitPressed = (event) => {
    // function to be run when a digit button or a decimal point button is pressed

    const digit = event.target.id;  // The number being pressed

    // if operator is set then reset display
    if (!storage.operatorPressChecked) {
        setDisplayValue('0');
        storage.operatorPressChecked = true;
    }

    setDisplayValue(
        getDisplayValue().length <= 16 // Cannot input more that 17 characters
            ? digit !== 'point'   // only if the pressed button is not a decimal point

                ? getDisplayValue() === '0'
                    ? digit // If the display is 0 then change to the inputted number
                    : getDisplayValue() + digit

                : getDisplayValue().includes('.')
                    ? getDisplayValue()  // if it already has a point in it, then dont do anything
                    : getDisplayValue() + '.'

            : getDisplayValue() // when the length is more than 17, dont do anything
    );
};

const clearDisplay = (event) => {
    // all-clear: clears everything that is done so far, clear, the operands and operator
    // clear-entry: clears the current display so that it can be typed again, similar to backspacing until 0

    const clearType = event.target.id; // either all-clear or clear-entry

    if (clearType === 'backspace') {
        backspaceDisplay();
        return;
    }

    setDisplayValue('0');
    if (clearType === 'all-clear') {
        // delete everything in storage
        for (let prop in storage) {
            delete storage[prop];
        }
    }
};

const backspaceDisplay = () => {
    setDisplayValue(
        getDisplayValue().length === 1
            ? '0'
            : getDisplayValue().slice(0, -1)
    );
};

const equalPressed = () => {
    if (!("operand1" in storage)) {
        setDisplayValue('0');
        return;
    }

    const operand1 = storage.operand1;

    // const operand2 = ("operator" in storage) ? +getDisplayValue() : storage.operand2;
    let operand2;
    let operatorInvolved;
    if ("operator" in storage) {
        operatorInvolved = storage.operator;
        operand2 = +getDisplayValue();
    } else if ("cachedOperator" in storage) {
        operatorInvolved = storage.cachedOperator;
        operand2 = storage.operand2;
    } else {
        return;
    }

    const result = operate(operand1, operand2, operatorInvolved);

    setDisplayValue(result.toString());

    storage.operand1 = result;
    storage.operand2 = operand2;

    storage.cachedOperator = operatorInvolved;
    delete storage.operator;
}

const operatorPressed = (event) => {
    // function that runs when an operator is pressed including equal sign

    const operatorPressed = event.target.id;

    if (operatorPressed === 'equal') {
        equalPressed();
    } else {
        storage.operand1 = +getDisplayValue();
        storage.operator = operatorPressed;
        storage.operatorPressChecked = false;
    }
};


const pressedBtnOfType = (className, func) => {
    const typeBtns = document.querySelectorAll(className);
    typeBtns.forEach(button => button.addEventListener('click', func));
};

pressedBtnOfType('.digit', digitPressed);
pressedBtnOfType('.misc', clearDisplay);
pressedBtnOfType('.operator', operatorPressed);