const numberButtons = document.querySelectorAll('[number]');
const operatorButtons = document.querySelectorAll('[operator]');
const deleteButton = document.querySelector('[delete]');
const clearButton = document.querySelector('[clear]');
const equalsButton = document.querySelector('[equals]');
const previousDisplayText = document.querySelector('[previous]');
const currentDisplayText = document.querySelector('[current]');

class Calculator{
    constructor(previousDisplayText, currentDisplayText){
        this.previousDisplayText = previousDisplayText;
        this.currentDisplayText = currentDisplayText;
        this.clear()
    }
    delete(){
        this.currentValue = this.currentValue.toString().slice(0, -1)
    }
    clear(){
        this.currentValue = '';
        this.previousValue = '';
        this.operator = '';

    }
    addNumber(number){
        if(number === '.' && this.currentValue.includes('.'))return
        this.currentValue += number;
    }
    chooseOperator(operator){
        if(this.currentValue === '')return
        if(this.previousValue !== ''){
            this.compute();
        }
        this.operator = operator;
        this.previousValue = this.currentValue;
        this.currentValue = '';
    }
    compute(){
        let computeValue;
        let preVal = parseFloat(this.previousValue);
        let curVal = parseFloat(this.currentValue);
        if (isNaN(preVal) || isNaN(curVal)) return
        switch(this.operator){
            case'*':
              computeValue = preVal * curVal
              break
            case'+':
              computeValue = preVal + curVal
              break
            case'-':
              computeValue = preVal - curVal
              break
            case'/':
              computeValue = preVal / curVal
              break
            case'%':
              computeValue = preVal % curVal
              break
            default:
              return
        }
        this.currentValue = computeValue;
        this.operator = '';
        this.previousValue = '';
    }
    updatedDisplay(){
        this.currentDisplayText.innerText = this.currentValue;
        if(this.operator !== null){
            this.previousDisplayText.innerText = `${this.previousValue} ${this.operator}`;
        }
    }
}

const calculator = new Calculator(previousDisplayText, currentDisplayText)

numberButtons.forEach((button) => {
    button.addEventListener('click', ()=>{
        calculator.addNumber(button.innerText);
        calculator.updatedDisplay();
    })
})

clearButton.addEventListener('click', ()=>{
    calculator.clear();
    calculator.updatedDisplay();
})
deleteButton.addEventListener('click', ()=>{
    calculator.delete();
    calculator.updatedDisplay();
})

operatorButtons.forEach((button)=>{
    button.addEventListener('click', ()=>{
        calculator.chooseOperator(button.innerText);
        calculator.updatedDisplay();
    })
})

equalsButton.addEventListener('click', (button)=>{
    calculator.compute();
    calculator.updatedDisplay();
})