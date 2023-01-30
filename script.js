const numberButtons = document.querySelectorAll('.number');
const currentNumber = document.querySelector('#currentValue');
const totalValue = document.querySelector('#totalValue');

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
    return b === 0 ? 'undefined' : a/b;
}
//#endregion
function operate(operator) {
    if(totalValue.textContent === ''){
        intTotalValue = +currentNumber.textContent;
        updateNumbers(operator);
        return;
    }
    switch (operator) {
        case '+':
            intTotalValue = add(intTotalValue,+currentNumber.textContent);
            updateNumbers(operator);
            break;
        case '-':
            intTotalValue = subtract(intTotalValue,+currentNumber.textContent);
            updateNumbers(operator);
            break;
        case '/':
            intTotalValue = divide(intTotalValue,+currentNumber.textContent);
            updateNumbers(operator);
            break;
        case '*':
            intTotalValue = multiply(intTotalValue,+currentNumber.textContent);
            updateNumbers(operator);
            break;
        case '=':
            if(totalValue.textContent === '') return;
            isFinalNumber = true;
            operate(totalValue.textContent[totalValue.textContent.length - 2]);
            break;
        default:
            break;
    }
}

function updateNumbers(operation){
    if(isFinalNumber){
        totalValue.textContent = totalValue.textContent + currentNumber.textContent + ' =';
        currentNumber.textContent = intTotalValue.toString();
        totalValuePreview = true;
        return;
    }

    if(totalValue.textContent === ''){
        totalValue.textContent = currentNumber.textContent + ` ${operation} `;
    } else{
    totalValue.textContent = totalValue.textContent + currentNumber.textContent + ` ${operation} `;
    }
    currentNumber.textContent = intTotalValue.toString();
    totalValuePreview = true;
}
function insertNumber(e){
    if(currentNumber.textContent === '0' && e.target.textContent === '0') return;
    if(isFinalNumber) {
        totalValue.textContent = ''
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