/* eslint-disable no-debugger */
import React from 'react';
import PropTypes from 'prop-types';

const Summary = (props) => {
  debugger;
  const steps1Data = props.questions.filter(q => q.step === 1);
  const steps2Data = props.questions.filter(q => q.step === 2);
  const steps3Data = props.questions.filter(q => q.step === 3);

  const step1Data = steps1Data.map(q => <li>{q.question}-{q.answers[q.userAnswer]}</li>);
  const step2Data = steps2Data.map(q => <li>{q.question}-{q.answers[q.userAnswer]}</li>);
  const step3Data = steps3Data.map(q => <li>{q.question}-{q.answers[q.userAnswer]}</li>);
  const allResponses = [...step1Data, ...step2Data, step3Data];

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title"> {props.email} : Review you answers before submission</h1>
      </header>
      <p className="App-intro" />
      <div className="step step5">
        <ul>
          {allResponses}
        </ul>
      </div>
    </div>
  );
};

Summary.propTypes = {
  questions: PropTypes.shape([
    {
      question: PropTypes.string.isRequired,
      answers: PropTypes.shape([PropTypes.string]),
      scores: PropTypes.shape([PropTypes.number]),
      userAnswer: PropTypes.string,
      id: PropTypes.string.isRequired,
      step: PropTypes.number.isRequired,
    },
  ]).isRequired,
  email: PropTypes.string.isRequired,
}

export default Summary;
