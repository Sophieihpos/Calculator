import React from 'react';
import './App.css';
import Display from './components/Display'
import Buttons from './components/Buttons'

// #26547C #EF476F #FFD166 #06D6A0 #FCFCFC
class App extends React.Component {
  constructor(){
    super();
    this.state = {
      display: 0,
      count: 0,
      currentCal: '',
      currentNum: '',
      currentNumDec: 0,
      lastButton: ''
    }
    this.clearDisplay = this.clearDisplay.bind(this);
    this.handleNumbers = this.handleNumbers.bind(this);
    this.handleDecimal = this.handleDecimal.bind(this);
    this.handleOperator = this.handleOperator.bind(this);
    this.maxDigit = this.maxDigit.bind(this);
    this.handleEvaluate = this.handleEvaluate.bind(this);
  }

  //user story 13

  //too many numbers, inconsistent character sizes...
  maxDigit(){
    this.setState({
      display: 'Too many numbers!'
    });
  }

  handleNumbers(e){
    e.persist();
    const { display, count, currentCal, currentNum, lastButton } = this.state;
    const { value } = e.target;

    if (count === 20){
      this.maxDigit();
    } else if (count === 0){
      this.setState((state, props) => {
        return {
          display: value,
          count: state.count + 1,
          currentCal: value,
          currentNum: value,
          lastButton: value
        }
      });
    } else if (currentNum.length === 1 && lastButton === '0') {
      if (value !== '0') {
        const displayStr = display;
        const currentCalStr = currentCal;
        const displayEnd = displayStr.charAt(displayStr.length-1);
        const currentCalEnd = currentCalStr.charAt(currentCalStr.length-1);
        this.setState((state, props) => {
          return {
            display: displayStr.replace(displayEnd, value),
            currentCal: currentCalStr.replace(currentCalEnd, value),
            currentNum: value,
            lastButton: value
          }
        });
      }
    } else {
      this.setState((state, props) => {
        return {
          display: state.display + value,
          count: state.count + 1,
          currentCal: state.currentCal + value,
          currentNum: state.currentNum + value,
          lastButton: value
        }
      });
    }
  }

  handleDecimal(e){
    e.persist();
    const { count } = this.state;
    const { value } = e.target;
    if (this.state.currentNumDec === 0){
      if (count === 20){
        this.maxDigit();
      } else if (count === 0){
        this.setState((state, props) => {
          return {
            display: '0' + value,
            count: state.count + 1,
            currentCal: '0.',
            currentNum: '0.',
            currentNumDec: state.currentNumDec + 1
          }
        });
      } else {
        this.setState((state, props) => {
          return {
            display: state.display + value,
            count: state.count + 1,
            currentCal: state.currentCal + value,
            currentNum: state.currentNum + value,
            currentNumDec: state.currentNumDec + 1
          }
        });
      }
    }
  }
  //user story 13
  handleOperator(e){
    e.persist();
    const regex = /[x+\-/]+$/;
    const { display, count, currentCal, lastButton } = this.state;
    const { value } = e.target;

    if (count === 20){
      this.maxDigit();
    } else if (lastButton === '='){
      this.setState((state, props) => {
        return {
          display: state.display + value,
          count: state.display.length + 1,
          currentCal: state.display + value,
          lastButton: value
        }
      });
    } else if (count === 0 && value !== '-'){
      this.setState({
        display: 'Enter number first'
      })
    } else if (count === 0 && value === '-'){
      this.setState((state, props) => {
        return {
          display: value,
          count: state.count + 1,
          currentCal: value,
          currentNum: value,
          lastButton: value
        }
      });
    } else if (regex.test(currentCal) === true && value !== '-'){
      const displayStr = display;
      const currentCalStr = currentCal;

      this.setState((state, props) => {
        return {
          display: displayStr.replace(regex, value),
          currentCal: currentCalStr.replace(regex, value),
          currentNum: '',
          currentNumDec: 0,
          lastButton: value
        }
      });
    } else if (value === '-'){
      this.setState((state, props) => {
        return {
          display: state.display + value,
          count: state.count + 1,
          currentCal: state.currentCal + value,
          currentNum: 1,
          currentNumDec: 0,
          lastButton: value
        }
      })
    } else {
      this.setState((state, props) => {
        return {
          display: state.display + value,
          count: state.count + 1,
          currentCal: state.currentCal + value,
          currentNum: '',
          currentNumDec: 0,
          lastButton: value
        }
      });
    }
  }

  handleEvaluate(e){
    let expression = this.state.currentCal;
    expression = expression.replace(/x/g, '*');
    let answer = Math.round(1000000000000 * eval(expression)) / 1000000000000;

    this.setState({
      display: answer,
      count: 0,
      currentCal: '',
      currentNum: '',
      currentNumDec: 0,
      lastButton: e.target.value
    });
  }

  clearDisplay(e){
    this.setState({
      display: 0,
      count: 0,
      currentCal: '',
      currentNum: '',
      currentNumDec: 0,
      lastButton: e.target.value
    })
  }

  render(){
    return (
      <div id="calculator">
        <Display display={this.state.display}/>
        <Buttons
          clearDisplay={this.clearDisplay}
          handleNumbers={this.handleNumbers}
          handleDecimal={this.handleDecimal}
          handleOperator={this.handleOperator}
          handleEvaluate={this.handleEvaluate}
        />
      </div>
    );
  }
}

export default App;
