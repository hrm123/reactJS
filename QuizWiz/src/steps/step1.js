import React, { Component } from 'react';
import Promise from 'promise';

class Step1 extends Component {
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
            <header className="App-header">
                <h1 className="App-title">Step1</h1>
            </header>
            <p className="App-intro">
                
            </p>
            <div className="step step1">
            <form id="Form" className="form-horizontal">
                <div className="row">
                    step1 content
                </div>
                </form>
            </div>
            </div>
        );
    }
  }
  
  export default Step1;