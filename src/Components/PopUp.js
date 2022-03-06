import React, { Component } from "react";
import '../Styles/PopUp.css';

function PopUp({trigger,children}){
    return (trigger) ? (
       
            <div className="popup-container">
                    {children}
            </div>
       
    ) : "";
}

export default PopUp;

//coś