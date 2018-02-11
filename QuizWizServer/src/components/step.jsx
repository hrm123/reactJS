import React from 'react';
import PropTypes from 'prop-types';
import QuestionList from './questionList';
import Header from './header';

const Step = (props) => {
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
                    <QuestionList
                      questions={props.questions}
                      sid={props.stepId}
                      notifyAnswerChanged={props.onAnswerChange}
                    />
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
