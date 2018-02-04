import React, { Component } from 'react';
import Promise from 'promise';


const Step5 = (props) => {
  const data = props.getStore();
  const stepData = data.stepsData[props.stepId];
  return (
    <div className="App">
          <header className="App-header">
            <h1 className="App-title">Review you answers</h1>
          </header>
          <p className="App-intro">
            
          </p>
          <div className="step step1">
          <form id="Form" className="form-horizontal">
            <div className="row">
                step5 content
            </div>
            </form>
        </div>
      </div>
  );
}
  
export default Step5;