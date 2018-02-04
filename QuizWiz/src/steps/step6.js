import React, { Component } from 'react';
import Promise from 'promise';


const Step6 = (props) => {
  const data = props.getStore();

  return (
    <div className="App">
          <header className="App-header">
            <h1 className="App-title">Your final score</h1>
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
  
export default Step6;