import React from "react";
import "../index.css";

export default function Square(props) {
  let buttonId = props.isCurrent ? "current" : "";
  if (props.isWinner) {
    buttonId = "win";
  }
  let classNameNameValue = props.value == "O" ? "square-o" : "square";
  return (
    <button
      className={classNameNameValue}
      id={buttonId}
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
}