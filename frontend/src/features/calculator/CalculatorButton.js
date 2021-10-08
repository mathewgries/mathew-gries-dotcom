import React from "react";
import "./style.css";

export const CalculatorButton = (props) => {
  const onClickHandler = (e) => {
		if(!props.disabled){
			props.onClickHandler(e);
		}
    
  };
  return (
    <div className={`button-container ${props.wrapperClass ? props.wrapperClass : ''}`}>
      <div
        id={props.id}
        className={`button ${props.className}`}
        onClick={(e) => onClickHandler(e)}
      >
        {props.text}
      </div>
    </div>
  );
};