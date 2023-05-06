import React, {useState, useEffect} from "react";

function Buttons(props) {

    // Tailwind CSS classes
    const classNumber = "w-full h-16 outline-none focus:outline-none  focus:bg-indigo-700 focus:bg-opacity-30 text-white text-xl font-light"
    const classOperator = "w-full h-16 outline-none focus:outline-none  bg-indigo-700 bg-opacity-30 focus:bg-opacity-50 text-white text-xl font-light"
    const classButton1 = "w-1/4 border-r  border-b border-indigo-400"
    const classButton2 = "w-1/3 border-r  border-b border-indigo-400"

    //Store input
    const [input, setInput] = useState("0");

    //Store operator
    const [operator, setOperator] = useState("");

    //Start status, if true, the input will be replaced by the new input, but not added to the end of the input
    const [start, setStart] = useState(true);

    const operators = ["+", "-", "⨉", "÷", "%"];

    //Reset the input, operator and start status
    function reSet() {
        setInput("0");
        setStart(true);
        setOperator("");
    }

    //Transfer the input to App.jsx
    useEffect(() => {
        props.onInput(input);
      }, [input]);

    //Handle the input from number buttons
    function numberHandler(event) {
        //Replace the input if the start status is true
        if(start) {
            setInput(event.target.value);
            setStart(false);
        }
        else{
            setInput(input + event.target.value);
        }
    }

    //Handle the input from operator buttons
    function operatorHandler(event) {
        setStart(false);
        const newOperator = event.target.value;
        let newInput;
        
        if (operators.includes(input[input.length - 1])) {
            // Replace the last operator with the new operator, if there are continuous operators
            const pre = input.substring(0, input.length - 1);
            setInput(pre);

        } else {
            // Calculate the previous result if there is an operator before
            if(operator){
                calculateResult();
                setStart(false);
            }  
        }
        
        setInput(preInput => {
            newInput = preInput + newOperator;
            return newInput;
        });
        setOperator(newOperator);
        }

    //Calculate the result
    function calculateResult() {
        let result = 0;
        let operands = input.split(operator);

        //If there is no second operand, use the first operand as the second operand
        if (!operands[1]) {
            console.log("No second operand");
            operands[1] = operands[0];
        }
      
        //Calculate
        switch (operator) {
            case "+":
                result = parseFloat(operands[0]) + parseFloat(operands[1]);
                break;
            case "-":
                result = parseFloat(operands[0]) - parseFloat(operands[1]);
                break;
            case "⨉":
                result = parseFloat(operands[0]) * parseFloat(operands[1]);
                break;
            case "÷":
                result = parseFloat(operands[0]) / parseFloat(operands[1]);
                break;
            case "%":
                result = parseFloat(operands[0]) % parseFloat(operands[1]);
                break;
          default:
        }

        //Update
        //float number will be rounded to up 6 decimal places
        result = parseFloat(result.toFixed(6));
        setInput(result.toString());
        setOperator(null);
        setStart(true);
      }

      //Handle the "+/-" button
      function negativeHandler() {
        if (input[0] === "-") {
          setInput(input.substring(1));
        } else {
            if(input !== "") {
                setInput("-" + input);
            }
        }
    }

    //Calculator UI
    return (
        <div className="w-full bg-gradient-to-b from-indigo-400 to-indigo-500">
            <div className="flex w-full">
                <div className={classButton1}>
                    <button className={classOperator} onClick={reSet} >C</button>
                </div>
                <div className={classButton1}>
                    <button className={classOperator} onClick={negativeHandler}>+/-</button>
                </div>
                <div className={classButton1}>
                    <button className={classOperator} onClick={operatorHandler} value={"%"}>%</button>
                </div>
                <div className={classButton1}>
                    <button className={classOperator} onClick={operatorHandler} value={"÷"}>÷</button>
                </div>
            </div>
            <div className="flex w-full">
                <div className={classButton1}>
                    <button className={classNumber} onClick={numberHandler} value={"7"}>7</button>
                </div>
                <div className={classButton1}>
                    <button className={classNumber} onClick={numberHandler} value={"8"}>8</button>
                </div>
                <div className={classButton1}>
                    <button className={classNumber} onClick={numberHandler} value={"9"}>9</button>
                </div>
                <div className={classButton1}>
                    <button className={classOperator} onClick={operatorHandler} value={"⨉"}>⨉</button>
                </div>
            </div>
            <div className="flex w-full">
                <div className={classButton1}>
                    <button className={classNumber} onClick={numberHandler} value={"4"}>4</button>
                </div>
                <div className={classButton1}>
                    <button className={classNumber} onClick={numberHandler} value={"5"}>5</button>
                </div>
                <div className={classButton1}>
                    <button className={classNumber} onClick={numberHandler} value={"6"}>6</button>
                </div>
                <div className={classButton1}>
                    <button className={classOperator} onClick={operatorHandler} value={"-"}>-</button>
                </div>
            </div>
        <div>
            <div className="flex">
                <div className="w-3/4">
                    <div className="flex">
                        <div className={classButton2}>
                            <button className={classNumber} onClick={numberHandler} value={"1"}>1</button>
                        </div>
                        <div className={classButton2}>
                            <button className={classNumber} onClick={numberHandler} value={"2"}>2</button>
                        </div>
                        <div className={classButton2}>
                            <button className={classNumber} onClick={numberHandler} value={"3"}>3</button>
                        </div>
                    </div>
                    <div className="flex">
                        <div className={classButton2}>
                            <button className={classNumber} onClick={numberHandler} value={"0"}>0</button>
                        </div>
                        <div className={classButton2}>
                            <button className={classNumber} onClick={numberHandler} value={"."}>.</button>
                        </div>
                        <div className={classButton2}>
                            <button className={classOperator} onClick={operatorHandler} value={"+"}>+</button>
                        </div>
                    </div>
                </div>
                <div className="w-1/4">
                    <button className="w-full h-32 outline-none focus:outline-none bg-indigo-700 bg-opacity-30 focus:bg-opacity-40 text-white text-2xl font-light" onClick={calculateResult}>=</button>
                </div>
            </div>
        </div>              
        </div>

);
}

export default Buttons;
