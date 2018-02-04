import React, { Component } from 'react';
import Promise from 'promise';
import QuestionList from './questionList';

class Step2 extends Component {
    constructor(props) {
        super(props);
    
        this.state = {};
      }

    componentDidMount() {}

    componentWillUnmount() {}
    
    
    isValidated = () => { 
        return new Promise((resolve, reject) => {
            resolve();
            /*
                this.props.validate((error) => {
                resolve();
            }) 
            */
        });
    }

    render() {
        const data = this.props.getStore();
        const stepData = data.stepsData[this.props.stepId];
        console.log(stepData);

      return (
        <div className="App">
            <div className="step step1 container">
                <form id="Form" className="form-horizontal">
                    <QuestionList questions={stepData} sid={this.props.stepId} onUpdate={this.props.updateStore}/>
                </form>
            </div>
        </div>
      );
    }
  }
  
  export default Step2;