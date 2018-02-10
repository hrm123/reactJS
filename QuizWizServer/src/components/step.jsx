import React from 'react';
import PropTypes from 'prop-types';
import QuestionList from './questionList';

const Step = props => (
  <div className="App">
    <div className="step step2 container">
      <form id="Form" className="form-horizontal">
        <QuestionList
          questions={props.questions}
          sid={props.stepId}
          notifyAnswerChanged={props.onAnswerChange}
        />
      </form>
    </div>
  </div>
);

Step.propTypes = {
  onAnswerChange: PropTypes.func.isRequired,
  stepId: PropTypes.number.isRequired,
  questions: PropTypes.shape([
    {
      question: PropTypes.string.isRequired,
      answers: PropTypes.shape([PropTypes.string]),
      scores: PropTypes.shape([PropTypes.number]),
      userAnswer: PropTypes.string,
      id: PropTypes.string.isRequired,
      step: PropTypes.number.isRequired,
    }]).isRequired,
};

export default Step;
