import React, { Component } from 'react';
import Promise from 'promise';

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
  
      return (
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">Step6</h1>
          </header>
          <p className="App-intro">
            
          </p>
          <div className="step step1">
          <form id="Form" className="form-horizontal">
            <div className="row">
                step6 content
            </div>
            </form>
        </div>
        </div>
      );
    }
  }
  
  export default Step2;