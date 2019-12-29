import React from "react";
import NumberButton from "./NumberButton";
import "./NumberPicker.css";

function NumberPicker({ numberChoices, handleClick }) {
  return (
    <div className="row">
      {numberChoices.map(numberChoice => (
        <NumberButton
          key={numberChoice.number}
          numberButton={numberChoice}
          handleClick={handleClick}
        />
      ))}
    </div>
  );
}

export default NumberPicker;
