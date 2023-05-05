import React, {useState} from "react";
import Buttons from "./buttons";
import Display from "./display";
import Header from "./header";

function App() {
    const class1 = "min-w-screen min-h-screen bg-gray-100 flex items-center justify-center px-5 py-5";
    const class2 = "max-w-[300px] mx-auto";
    const class3 = "w-full rounded-xl bg-gray-100 shadow-xl text-gray-800 relative overflow-hidden";

    //Show the input and result on screen
    const [display, setDisplay] = useState("0");

    //Handle the input from Buttons
    function handleInput(inputValue) {
        setDisplay(inputValue);
      }

    return (
        <div>
            <div className={class1}>
                <div className={class2}>
                <Header />
                <div className={class3}>
                    <Display number={display}/>
                    <Buttons onInput={handleInput}/>
                </div>
                </div>
            </div>
      </div>
    );
  }

export default App;
