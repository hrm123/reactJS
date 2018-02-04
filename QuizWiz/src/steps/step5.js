import React, { Component } from 'react';
import Promise from 'promise';


const Step5 = (props) => {
  const data = props.getStore();
  const step1Data = data.stepsData[1].map((q,i) => {
    return <li>{q.question}-{q.answers[q.userAnswer]}</li>
  });
  const step2Data = data.stepsData[2].map((q,i) => {
    return <li>{q.question}-{q.answers[q.userAnswer]}</li>
  });
  const step3Data = data.stepsData[3].map((q,i) => {
    return <li>{q.question}-{q.answers[q.userAnswer]}</li>
  });
  const allResponses = [...step1Data,...step2Data, step3Data];

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title"> {data.email} : Review you answers before submission</h1>
      </header>
      <p className="App-intro">
        
      </p>
      <div className="step step5">
          <ul>
          {allResponses}
          </ul>
      </div>
    </div>
  );
}
  
export default Step5;