/**
 * Created by Ramm on 2/11/2018.
 */
/* eslint-disable no-debugger */
/**
 * Created by Ramm on 2/11/2018.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Summary from '../components/summary';

class SummaryWrapper extends Component {
  render() {
    debugger;
    return (
      <Summary
        questions={this.props.ques}
        email={this.props.email}
      />
    );
  }
}

SummaryWrapper.propTypes = {
  ques: PropTypes.arrayOf(PropTypes.shape({
    question: PropTypes.string.isRequired,
    answers: PropTypes.shape([PropTypes.string]),
    scores: PropTypes.shape([PropTypes.number]),
    userAnswer: PropTypes.string,
    id: PropTypes.string.isRequired,
    step: PropTypes.number.isRequired,
  })).isRequired,
  email: PropTypes.string.isRequired,
};


const mapStateToProps = (state) => {
  debugger;
  return {
    ques: state.questions.loading ? [{}] :
      state.questions.questions,
    email: state.user.email,
  };
};

export default connect(mapStateToProps)(SummaryWrapper);
