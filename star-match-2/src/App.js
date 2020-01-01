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

// TODO NEXT: Resetting the state

function App() {
	const [ stars, setStars ] = useState(utils.randomBetween(1, 9));
	const [ availableNumbers, setAvailableNumbers ] = useState(utils.range(1, 9));
	const [ candidateNumbers, setCandidateNumbers ] = useState([]);

	const defineNumberState = (number) => {
		const sum = utils.sumInArray(candidateNumbers);
		if (!availableNumbers.includes(number)) {
			return NumberButtonState.CORRECT;
		}
		if (candidateNumbers.includes(number)) {
			return sum > stars ? NumberButtonState.WRONG : NumberButtonState.CANDIDATE;
		}
		return NumberButtonState.NONE;
	};

	const handleClickNumber = (number, numberState) => {
		console.log(number);
		if (numberState === NumberButtonState.CORRECT) {
			return;
		}
		const newCandidates =
			numberState === NumberButtonState.NONE
				? candidateNumbers.concat(number)
				: candidateNumbers.filter((n) => n != number);
		const sum = utils.sumInArray(newCandidates);
		if (sum !== stars) {
			setCandidateNumbers(newCandidates);
		} else {
			const newAvailableNumbers = availableNumbers.filter((n) => !newCandidates.includes(n));
			setAvailableNumbers(newAvailableNumbers);
			setCandidateNumbers([]);
			setStars(utils.pickOneInSum(newAvailableNumbers));
		}
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
