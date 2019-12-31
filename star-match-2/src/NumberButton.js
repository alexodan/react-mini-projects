import React from 'react';
import './NumberButton.css';

function NumberButton({ number, currentState, handleClickNumber }) {
	return (
		<button className={`number-btn ${currentState}`} onClick={() => handleClickNumber(number)}>
			{number}
		</button>
	);
}

export default NumberButton;
