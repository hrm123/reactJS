import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Answer from './answer';

export default class Question extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    const q = this.props.question;
    const ans = q.answers.map((a, i) =>
      (<Answer
        ans={a}
        id={i}
        qid={q.id}
        sid={q.step}
        key={i}
        groupName={q.id}
        onUpdate={this.props.onUpdate}
        ua={q.userAnswer}
      />));
    return (
      <div className="container">
        <div className="row" style={{ textAlign: 'left' }}>
          <h1 className="App-title">{q.question}</h1>
        </div>
        <div className="row">
          {ans}
        </div>
      </div>

    );
  }
}


Question.propTypes = {
  onUpdate: PropTypes.func.isRequired,
  question: PropTypes.shape({
    question: PropTypes.string.isRequired,
    answers: PropTypes.shape([PropTypes.string]),
    scores: PropTypes.shape([PropTypes.number]),
    id: PropTypes.string.isRequired,
    step: PropTypes.number.isRequired,
    userAnswer: PropTypes.string.isRequired,
  }).isRequired,
};
