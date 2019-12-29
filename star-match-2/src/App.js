import React from "react";
import Stars from "./Stars";
import NumberPicker from "./NumberPicker";
import "./App.css";

const NumberButtonState = {
  NONE: "none",
  CANDIDATE: "candidate",
  CORRECT: "correct",
  WRONG: "wrong"
};

class App extends React.Component {
  state = {
    currentNumber: 0,
    numberChoices: [
      { number: 1, currentState: NumberButtonState.NONE },
      { number: 2, currentState: NumberButtonState.NONE },
      { number: 3, currentState: NumberButtonState.NONE },
      { number: 4, currentState: NumberButtonState.NONE },
      { number: 5, currentState: NumberButtonState.NONE },
      { number: 6, currentState: NumberButtonState.NONE },
      { number: 7, currentState: NumberButtonState.NONE },
      { number: 8, currentState: NumberButtonState.NONE },
      { number: 9, currentState: NumberButtonState.NONE }
    ]
  };

  componentDidMount() {
    this.setState({
      currentNumber: this.selectRandomNumber()
    });
  }

  selectRandomNumber = () => {
    const remainingNumbers = this.state.numberChoices.filter(
      n => n.currentState === NumberButtonState.NONE
    );
    const possibleSums = remainingNumbers.map(n => n.number);
    for (let i = 0; i < remainingNumbers.length; i++) {
      for (let j = i + 1; j < remainingNumbers.length; j++) {
        possibleSums.push(
          remainingNumbers[i].number + remainingNumbers[j].number
        );
      }
    }
    console.log("Random: " + possibleSums);
    return possibleSums[Math.floor(Math.random() * possibleSums.length)];
  };

  currentSum = () => {
    return this.state.numberChoices.reduce((accum, current) => {
      accum +=
        current.currentState === NumberButtonState.CANDIDATE
          ? current.number
          : 0;
      return accum;
    }, 0);
  };

  handleClickNumber = numberChoice => {
    console.log(numberChoice.number + " clicked");
    console.log("Current: " + this.state.currentNumber);
    const numberState = this.state.numberChoices.find(
      n => n.number === numberChoice.number
    );
    if (numberState.currentState === NumberButtonState.CANDIDATE) {
      console.log("Its a candidate");
      this.setState({
        numberChoices: this.state.numberChoices.map(n =>
          n.number === numberChoice.number
            ? { ...numberChoice, currentState: NumberButtonState.NONE }
            : n
        )
      });
    } else if (numberState.currentState === NumberButtonState.WRONG) {
      // convert to none
      this.setState(
        {
          numberChoices: this.state.numberChoices.map(n => {
            if (n.number === numberChoice.number) {
              return { ...n, currentState: NumberButtonState.NONE };
            }
            return n;
          })
        },
        () => {
          const sum = this.currentSum();
          if (sum === this.state.currentNumber) {
            this.setState({
              numberChoices: this.state.numberChoices.map(n => ({
                ...n,
                currentState: NumberButtonState.CORRECT
              }))
            });
          }
        }
      );
    } else if (numberState.currentState === NumberButtonState.NONE) {
      const sum = this.currentSum() + numberChoice.number;
      console.log("Suma:", sum);
      if (sum === this.state.currentNumber) {
        this.setState(
          {
            numberChoices: this.state.numberChoices.map(n => {
              if (
                n.currentState === NumberButtonState.CANDIDATE ||
                n.number === numberChoice.number
              ) {
                return { ...n, currentState: NumberButtonState.CORRECT };
              }
              return n;
            })
          },
          () => {
            this.setState({
              currentNumber: this.selectRandomNumber()
            });
          }
        );
      } else if (sum > this.state.currentNumber) {
        this.setState({
          numberChoices: this.state.numberChoices.map(n => {
            if (
              n.currentState === NumberButtonState.CANDIDATE ||
              n.number === numberChoice.number
            ) {
              return { ...n, currentState: NumberButtonState.WRONG };
            }
            return n;
          })
        });
      } else {
        this.setState({
          numberChoices: this.state.numberChoices.map(n => {
            if (n.number === numberChoice.number) {
              return { ...n, currentState: NumberButtonState.CANDIDATE };
            }
            return n;
          })
        });
      }
    }
  };

  render() {
    return (
      <div className="App">
        <p>Pick one or more numbers that sum to the number of stars</p>
        <div className="dashboard">
          <Stars />
          <NumberPicker
            numberChoices={this.state.numberChoices}
            handleClick={this.handleClickNumber}
          />
        </div>
      </div>
    );
  }
}

export default App;
