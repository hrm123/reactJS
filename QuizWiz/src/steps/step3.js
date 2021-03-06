import React, { Component } from 'react';
import Promise from 'promise';
import QuestionList from './questionList';

const Step3 = (props) => {
  const data = props.getStore();
  const stepData = data.stepsData[props.stepId];
  return (
      <div className="App">
          <div className="step step3 container">
              <form id="Form" className="form-horizontal">
                  <QuestionList questions={stepData} sid={props.stepId} onUpdate={props.updateStore}/>
              </form>
          </div>
      </div>
  );

}
  
  export default Step3;