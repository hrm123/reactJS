/* eslint-disable jsx-a11y/anchor-is-valid,no-debugger */
import React from 'react';
import PropTypes from 'prop-types';
import QuestionList from './questionList';
import Header from './header';
import QuizNavLinks from './quizNavLinks';

const Step = (props) => {
  debugger;
  const currentStepId = props.stepId;
  const quizStepIds = props.questions.map(q => q.step);
  const isfinalQuizStep = Math.max(...quizStepIds) === currentStepId;
  const isfirstQuizStep = Math.min(...quizStepIds) === currentStepId;
  const stepQues = props.questions.filter(q => q.step === currentStepId)

  if (props.questions) {
    return (
      <section style={{ background: '#efefe9' }}>
        <div className="container">
          <div className="row">
            <div className="board">
              <Header step="1" />
              <div className="tab-content">
                <div className="tab-pane fade in active">
                  <h4 className="head text-center">Quiz</h4>
                  <br />
                  <form id="Form">
                    <div className="row">
                      <div className="col-xs-offset-1 col-xs-10 col-sm-offset-2 col-sm-8">
                        <div className="form-group">
                          <QuestionList
                            questions={stepQues}
                            sid={props.stepId}
                            onUpdate={props.onAnswerChange}
                          />
                        </div>
                        <div className="form-group text-center">
                          <QuizNavLinks
                            isfinalQuizStep={isfinalQuizStep}
                            isfirstQuizStep={isfirstQuizStep}
                            currentStepId={currentStepId}
                          />
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
  return null;
};

Step.propTypes = {
  onAnswerChange: PropTypes.func.isRequired,
  stepId: PropTypes.number.isRequired,
  questions: PropTypes.arrayOf(PropTypes.shape({
    question: PropTypes.string.isRequired,
    answers: PropTypes.arrayOf(PropTypes.string),
    scores: PropTypes.arrayOf(PropTypes.number),
    userAnswer: PropTypes.string,
    id: PropTypes.string.isRequired,
    step: PropTypes.number.isRequired,
  })).isRequired,
};

export default Step;
