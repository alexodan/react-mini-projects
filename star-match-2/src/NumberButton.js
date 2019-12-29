import React from "react";
import "./NumberButton.css";

function NumberButton({ numberButton, handleClick }) {
  return (
    <button
      className={`number-btn ${numberButton.currentState}`}
      onClick={() => handleClick(numberButton)}
    >
      {numberButton.number}
    </button>
  );
}

export default NumberButton;
