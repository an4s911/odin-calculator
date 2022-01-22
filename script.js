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
}

const display = document.querySelector('.row.input .col');
let displayValue = display.textContent;

const digitBtns = document.querySelectorAll('button.digit');

digitBtns.forEach(button => {
    button.addEventListener('click', (event) => {
        const value = event.target.id;
        display.textContent = displayValue.length <= 16
            ? value !== 'point'
                ? displayValue === '0'
                    ? value
                    : displayValue + value
                : displayValue.includes('.')
                    ? displayValue
                    : displayValue + '.'
            : displayValue;
        displayValue = display.textContent;
    })
})

const allClearBtn = document.querySelector('#all-clear');
allClearBtn.addEventListener('click', () => {
    display.textContent = '0';
    displayValue = display.textContent;
})

const clearEntryBtn = document.querySelector('#clear-entry');
clearEntryBtn.addEventListener('click', () => {
    display.textContent = '0';
    displayValue = display.textContent;
})

const backspaceBtn = document.querySelector('#backspace');
backspaceBtn.addEventListener('click', () => {
    display.textContent = displayValue.length === 1
        ? '0'
        : displayValue.slice(0, -1);
    displayValue = display.textContent;
})