import React from 'react';
import PropTypes from 'prop-types';


const Scores = (props) => {
  const steps1Data = props.questions.filter(q => q.step === 1);
  const steps2Data = props.questions.filter(q => q.step === 2);
  const steps3Data = props.questions.filter(q => q.step === 3);

  const step1Score = steps1Data.map(q => q.scores[q.userAnswer]);
  const step2Score = steps2Data.map(q => q.scores[q.userAnswer]);
  const step3Score = steps3Data.map(q => q.scores[q.userAnswer]);
  const allScores = [...step1Score, ...step2Score, ...step3Score];
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  const totalScore = allScores.reduce(reducer);

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">Your final score</h1>
      </header>
      <p className="App-intro" />
      <div className="step step1">
        <form id="Form" className="form-horizontal">
          <div className="row">
                Total score for {props.email} is: {totalScore}
          </div>
        </form>
      </div>
    </div>
  );
};


Scores.propTypes = {
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
};

export default Scores;
