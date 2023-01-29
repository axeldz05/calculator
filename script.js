const numberButtons = document.querySelector('#numbers');
const numberBottomButtons = document.querySelector('#bottom');
const currentNumber = document.querySelector('#currentValue');
const totalValue = document.querySelector('#totalValue');

for (let i = 1; i < 10; i++) {
    let button = document.createElement('div');
    button.classList.add('number');
    button.textContent = `${i}`;
    button.addEventListener('mousedown', (e) => insertNumber(e));
    numberButtons.appendChild(button);
}

let sign = document.createElement('div');
sign.classList.add('number');
sign.textContent = '+/-';
numberBottomButtons.appendChild(sign);

let zero = document.createElement('div');
zero.classList.add('number');
zero.textContent = '0';
numberBottomButtons.appendChild(zero);

let decimal = document.createElement('div');
decimal.classList.add('number');
decimal.textContent = '.';
numberBottomButtons.appendChild(decimal);

//#region Basic Functions
function add(a,b) {
    return a + b;
}
function subtract(a,b) {
    return a - b;
}
function multiply(a,b) {
    return a*b;
}
function divide(a,b) {
    return b === 0 ? 'undefined' : a/b;
}
//#endregion
function operate(operator,a,b) {
    operator(a,b);
}
function insertNumber(e){
    currentNumber.textContent += e.target.textContent;
}