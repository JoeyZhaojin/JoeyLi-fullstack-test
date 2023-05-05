import React from "react";

function Display(props) {

    //Screen of calculator
    return (
        <div className="w-full h-40 bg-gradient-to-b from-gray-800 to-gray-700 flex items-end text-right">
            <div className="w-full py-5 px-6 text-5xl text-white font-thin">{props.number}</div>
        </div>
    );
}

export default Display;