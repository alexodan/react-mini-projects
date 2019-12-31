function range(start, end) {
	var ans = [];
	for (let i = start; i <= end; i++) {
		ans.push(i);
	}
	return ans;
}

function pickOneInSum(numbers) {
	const possibleSums = numbers.map((n) => n);
	numbers.map((n) => n.number);
	for (let i = 0; i < numbers.length; i++) {
		for (let j = i + 1; j < numbers.length; j++) {
			possibleSums.push(numbers[i].number + numbers[j].number);
		}
	}
	return possibleSums;
}

function random(start, end) {
	var rans = range(start, end);
	return rans[Math.floor(Math.random() * end)];
}

function sumInArray(arr) {
	return arr.reduce((accum, value) => {
		accum += value;
		return accum;
	}, 0);
}

const utils = {
	range,
	pickOneInSum,
	random,
	sumInArray
};

export default utils;
