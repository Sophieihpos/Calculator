import React from 'react'

class Buttons extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
  }

  render(){
    return(
      <div id="buttons">
        <button className="wide-button" id="clear" onClick={this.props.clearDisplay} value='AC'>AC</button>
        <button id="divide" onClick={this.props.handleOperator} value='/'>/</button>
        <button id="multiply" onClick={this.props.handleOperator} value='x'>x</button>
        <button id="one" onClick={this.props.handleNumbers} value='1'>1</button>
        <button id="two" onClick={this.props.handleNumbers} value='2'>2</button>
        <button id="three" onClick={this.props.handleNumbers} value='3'>3</button>
        <button id="subtract" onClick={this.props.handleOperator} value='-'>-</button>
        <button id="four" onClick={this.props.handleNumbers} value='4'>4</button>
        <button id="five" onClick={this.props.handleNumbers} value='5'>5</button>
        <button id="six" onClick={this.props.handleNumbers} value='6'>6</button>
        <button id="add" onClick={this.props.handleOperator} value='+'>+</button>
        <button id="seven" onClick={this.props.handleNumbers} value='7'>7</button>
        <button id="eight" onClick={this.props.handleNumbers} value='8'>8</button>
        <button id="nine" onClick={this.props.handleNumbers} value='9'>9</button>
        <button id="decimal" onClick={this.props.handleDecimal} value='.'>.</button>
        <button className="wide-button" id="zero" onClick={this.props.handleNumbers} value='0'>0</button>
        <button className="wide-button" id="equals" onClick={this.props.handleEvaluate} value='='>=</button>
      </div>
    )
  }
}

export default Buttons
