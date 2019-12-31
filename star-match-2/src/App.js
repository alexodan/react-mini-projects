import React, { useState } from 'react';
import Stars from './Stars';
import NumberButton from './NumberButton';
import './App.css';
import utils from './utils';

const NumberButtonState = {
	NONE: 'none',
	CANDIDATE: 'candidate',
	CORRECT: 'correct',
	WRONG: 'wrong'
};

function App() {
	const [ stars, setStars ] = useState(utils.random(1, 9));
	const [ availableNumbers, setAvailableNumbers ] = useState(utils.range(1, 9));
	const [ usedNumbers, setUsedNumbers ] = useState([ 2, 3 ]);

	const selectRandomNumber = (numberChoices) => {
		const remainingNumbers = numberChoices.filter((n) => n.currentState === NumberButtonState.NONE);
		const possibleSums = utils.pickOneInSum(remainingNumbers);
		return possibleSums[Math.floor(Math.random() * possibleSums.length)];
	};

	const defineNumberState = (number) => {
		const sum = utils.sumInArray(usedNumbers);
		if (sum > stars) {
			if (usedNumbers.includes(number)) {
				return NumberButtonState.WRONG;
			}
		} else if (sum < stars) {
			if (usedNumbers.includes(number)) {
				return NumberButtonState.CANDIDATE;
			}
		} else {
			return NumberButtonState.CORRECT;
		}
	};

	const handleClickNumber = (number) => {
		console.log(number);

		setUsedNumbers();
	};

	return (
		<div className="App">
			<p>Pick one or more numbers that sum to the number of stars</p>
			<div className="dashboard">
				<Stars stars={stars} />
				<div className="number-picker">
					{utils
						.range(1, 9)
						.map((number) => (
							<NumberButton
								key={number}
								number={number}
								currentState={defineNumberState(number)}
								handleClickNumber={handleClickNumber}
							/>
						))}
				</div>
			</div>
		</div>
	);
}

export default App;
