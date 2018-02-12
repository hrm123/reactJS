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
    answers: PropTypes.arrayOf(PropTypes.string),
    scores: PropTypes.arrayOf(PropTypes.number),
    userAnswer: PropTypes.string,
    id: PropTypes.string.isRequired,
    step: PropTypes.number.isRequired,
  })).isRequired,
  email: PropTypes.string.isRequired,
};


const mapStateToProps = (state) => {
  return {
    ques: state.questions.loading ? [{}] :
      state.questions.questions,
    email: state.user.email,
  };
};

export default connect(mapStateToProps)(SummaryWrapper);
