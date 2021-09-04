class calculator {
    constructor(previous_operand_text_element,current_operand_text_element ){

        //? this pointer initialise as well as assign these two properties of class calculator new value

        this.current_operand_text_element = current_operand_text_element; 
        this.previous_operand_text_element = previous_operand_text_element;
        this.previousOperand = '';
            //todo intialise CurrentOperand inside constructor itself first 

        this.CurrentOperand = '';
        // now the parameters passed gets storeed in calculator class varibales scope
    }
    //? functions needs to have on calculator

    clear(){

        this.CurrentOperand = "";// clean current
        this.previousOperand = "";// clean previous
        this.operation  == undefined;// clean operation if any
    }

    //? How slice works - 
    //?console.log(anconst animals = ['ant', 'bison', 'camel', 'duck', 'elephant'];
    //?console.log(animals.slice(2, -1));
    //? Expected output: Array ["camel", "duck"]
    delete(){

        this.CurrentOperand =this.CurrentOperand.toString().slice(0,-1);
        
        if(this.CurrentOperand === ''){
            this.previousOperand =this.previousOperand.toString().slice(0,-1);
            this.CurrentOperand = this.previousOperand;
            this.previousOperand = '';
        }
    }

    appendNumber(number){
        //todo TO allow user to enter '.' only once coz more than 1 dont make sense
        if(number === '.' && this.CurrentOperand.includes('.')){
            return;
        }

        // It gives CurrentOperand value of clicked felement using event listener 
        this.CurrentOperand = this.CurrentOperand.toString() +  number.toString();
        // it has string to be stored in parseint first
    }

    chooseOperation(operation){
        // Only if previous operand is non empty then only do compute other no computation
        
        if(this.previousOperand !== ''){
            this.compute();
        }
        if(this.CurrentOperand === '') {
           // compute expression till 
            return
        };
        this.operation = operation;// adding operation to string
        this.previousOperand = this.CurrentOperand + this.operation// whole current operand shifted to previous operand
        this.CurrentOperand = "";// current operand is now empty
        // display previous operand updated
    }

    compute(){

        var final_result ;
        var current_value = parseFloat(this.CurrentOperand);
        var previous_value = parseFloat(this.previousOperand);

        // Checking if both are numbers or not 
        if(isNaN(previous_value) || isNaN(current_value)) return 

        switch (this.operation){
            
            case '+': final_result = previous_value + current_value 
            break;

            case '-': final_result = previous_value - current_value  
            break;

            case '*': final_result = (previous_value)*(current_value)
            break;

            case '/': final_result = (previous_value)/(current_value)
            break;

            case '%': final_result = (previous_value)%(current_value)
            break;
            default: return

        }
            this.CurrentOperand = final_result;
            this.previousOperand = ''// empty string
            this.operation = undefined;
    }

    get_display_number(number){
        const string_num = number.toString()
        const integer_part = parseFloat(string_num.split('.')[0])
        //? parseFloat(string_num.split('.')[1]) its 2nd part of number after decimal

        const decimal_part = (string_num.split('.')[1]);
        let display_int
        if (isNaN(integer_part)) {
            return ""
        }
        else{
            display_int = integer_part.toLocaleString('en',{
                minimumFractionDigits : 0//todo checks if fration digits are 0 or not
            })
        }
        // decimal_part here is a string and not converted too a float coz its not necessary to show //?decimals with commas that why 
        //* thus I used != null to check if string is non-empty or not
        if (decimal_part!=null) {
            
            return `${display_int}.${decimal_part}`
        }
        else{
            return display_int
        }
    }

    update_display(){
        // *update current_operand_text_element to text element entered in Current Operand with response to click event listener
        //? Forward current operand to getdisplaynumber function as parameter
        this.current_operand_text_element.innerText = 
         
        this.get_display_number(this.CurrentOperand)

        //? if its not null then display 
        if (this.operation != null) {
            this.previous_operand_text_element.innerText = 
            `${this.previousOperand} ${this.operation}` //todo ${} are used to display variables in a string template
        }
       
           this.previous_operand_text_element.innerText = this.previousOperand;
    }
    // remove_previous_operand(){
    //     this.previous_operand_text_element.innerText = this.previousOperand;

    // }

}

const number_buttons = document.querySelectorAll('[data-number]')
const operation_buttons = document.querySelectorAll('[data-operation]')
const equal_button = document.querySelector('[data-equal]')
const all_delete_button = document.querySelector('[data-all-delete]')
const delete_button = document.querySelector('[data-delete]')
const previous_operand_text_element = document.querySelector('[data-previous-operand]')
const current_operand_text_element = document.querySelector('[data-current-operand]')

const calculator_new = new calculator(previous_operand_text_element, current_operand_text_element)

//todo Defining event listeners
number_buttons.forEach(element => {

    element.addEventListener('click', () =>{
        calculator_new.appendNumber(element.innerText);
        calculator_new.update_display();
    })
})
// for operations
operation_buttons.forEach(element => {

    element.addEventListener('click', () =>{
        calculator_new.chooseOperation(element.innerText);
        calculator_new.update_display();
    })
})

equal_button.addEventListener('click', () =>{

        calculator_new.compute();
        calculator_new.update_display();

})

all_delete_button.addEventListener('click', () => {
    calculator_new.clear();
    calculator_new.update_display();

    // calculator_new.remove_previous_operand();

})
delete_button.addEventListener("click", () => {

    calculator_new.delete();
    calculator_new.update_display();

})

