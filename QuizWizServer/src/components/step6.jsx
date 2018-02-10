import React, { Component } from 'react';
import Promise from 'promise';


const Step6 = (props) => {
  const data = props.getStore();
debugger;
  const step1Score = data.stepsData[1].map((q) => q.scores[q.userAnswer]);
  const step2Score = data.stepsData[2].map((q) => q.scores[q.userAnswer]);
  const step3Score = data.stepsData[3].map((q) => q.scores[q.userAnswer]);
  const allScores = [ ...step3Score, ...step2Score, ...step3Score];
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  const totalScore = allScores.reduce(reducer);

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
                Total score : {totalScore}
            </div>            
          </form>
        </div>
      </div>
  );
}
  
export default Step6;