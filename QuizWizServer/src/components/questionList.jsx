import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Question from './question';

class QuestionList extends Component {
  render() {
    const qs = this.props.questions.map((q, i) => (<Question
      key={q.id}
      id={i}
      sid={this.props.sid}
      question={q}
      onUpdate={this.props.onUpdate}
      userAnswer={q.userAnswer}
    />));
    return (
      <div className="container">
        <div className="row">
          {qs}
        </div>
      </div>
    );
  }
}

QuestionList.propTypes = {
  onUpdate: PropTypes.func.isRequired,
  sid: PropTypes.number.isRequired,
  questions: PropTypes.arrayOf(PropTypes.shape({
    question: PropTypes.string.isRequired,
    answers: PropTypes.arrayOf(PropTypes.string),
    scores: PropTypes.arrayOf(PropTypes.number),
    userAnswer: PropTypes.string,
    id: PropTypes.string.isRequired,
    step: PropTypes.number.isRequired,
  })).isRequired,
};

export default QuestionList;
