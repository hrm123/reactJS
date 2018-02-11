/* eslint-disable no-debugger */
/**
 * Created by Ramm on 2/11/2018.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import actions from '../store/actions';
import Step from '../components/step';

class StepWrapper extends Component {
  handleAnswerChanged = (qid, ans) => {
    console.log('handleAnswerChanged');
    this.props.onAnswerChanged(qid, ans);
  };

  render() {
    debugger;
    return (
      <Step
        stepId={this.props.stepId}
        questions={this.props.ques}
        notifyAnswerChanged={this.handleAnswerChanged}
      />
    );
  }
}

StepWrapper.defaultProps = {
  stepId: 1,
};

StepWrapper.propTypes = {
  onAnswerChanged: PropTypes.func.isRequired,
  stepId: PropTypes.number,
  ques: PropTypes.arrayOf(PropTypes.shape({
    question: PropTypes.string.isRequired,
    answers: PropTypes.shape([PropTypes.string]),
    scores: PropTypes.shape([PropTypes.number]),
    userAnswer: PropTypes.string,
    id: PropTypes.string.isRequired,
    step: PropTypes.number.isRequired,
  })).isRequired,
};


const mapStateToProps = (state, ownProps) => {
  debugger;
  return {
    stepId: ownProps.match.params.stepId ? (ownProps.match.params.stepId + '') - 0 : 1,
    ques: state.questions.loading ? [{}] :
      state.questions.questions,
  }
};

const mapDispatchToProps = dispatch => ({
  onAnswerChanged: (qid, ans) => {
    dispatch(actions.answerChanged(qid, ans));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StepWrapper);
