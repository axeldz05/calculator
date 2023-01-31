const numberButtons = document.querySelectorAll('.number');
const currentNumber = document.querySelector('#currentValue');
const previousOperations = document.querySelector('#previousOperations');

let intTotalValue = 0;
let totalValuePreview = false;
let isFinalNumber = false;
numberButtons.forEach((number) => number.addEventListener('click', insertNumber));
document.querySelector('#sign').addEventListener('click', changeSign);
document.querySelector('#decimal').addEventListener('click', addDecimal);
document.querySelectorAll('.operation').forEach((operation) => operation.addEventListener('click', (e) => operate(e.target.textContent)))
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
    if(b === 0){
        isFinalNumber = true;
        return 'undefined';
    }
    return a/b;
}
//#endregion
function operate(operator) {
    if(previousOperations.textContent === ''){
        intTotalValue = +currentNumber.textContent;
        updateScreen(operator);
        return;
    }
    if(totalValuePreview){
        previousOperations.textContent = previousOperations.textContent.slice(0,previousOperations.textContent.length - 3) + ` ${operator} `;
        return;
    }
    calculateLastOperation();
    updateScreen(operator);
}

function calculateLastOperation() {
    let lastOperator = previousOperations.textContent[previousOperations.textContent.length - 2];
    switch (lastOperator) {
        case '+':
            intTotalValue = add(intTotalValue, +currentNumber.textContent);
            break;
        case '-':
            intTotalValue = subtract(intTotalValue, +currentNumber.textContent);
            break;
        case '/':
            intTotalValue = divide(intTotalValue, +currentNumber.textContent);
            break;
        case '*':
            intTotalValue = multiply(intTotalValue, +currentNumber.textContent);
            break;
        case '=':
            isFinalNumber = true;
            calculateLastOperation(lastOperator);
            break;
        default:
            console.log('operator not defined');
            break;
    }
}

function updateScreen(operation){
    totalValuePreview = true;
    if(isFinalNumber){
        previousOperations.textContent = previousOperations.textContent + currentNumber.textContent + ' =';
        currentNumber.textContent = intTotalValue.toString();
        return;
    }
    if(operation === '*' || operation === '/'){
        previousOperations.textContent = '(' + previousOperations.textContent + currentNumber.textContent + ')' + ` ${operation} `;
    }else{
    previousOperations.textContent = previousOperations.textContent + currentNumber.textContent + ` ${operation} `;
    }
    currentNumber.textContent = intTotalValue.toString();
}

function insertNumber(e){
    if(currentNumber.textContent === '0' && e.target.textContent === '0') return;
    if(isFinalNumber) {
        previousOperations.textContent = ''
        intTotalValue = 0;
        isFinalNumber = false;
    }
    if(totalValuePreview) {
        currentNumber.textContent = '';
        totalValuePreview = false;
    }
    currentNumber.textContent += e.target.textContent;
}
function changeSign() {
    if(currentNumber.textContent[0] != '-'){
        currentNumber.textContent = '-' + currentNumber.textContent;
    } else{
        currentNumber.textContent = currentNumber.textContent.split('-')[1];
    }
}
function addDecimal() {
    if(currentNumber.textContent.includes('.')) return;
    currentNumber.textContent += '.';
}