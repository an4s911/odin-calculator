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