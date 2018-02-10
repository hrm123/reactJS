/**
 * Created by Ramm on 2/10/2018.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import actions from '../store/actions';
import App from '../components/app';

class Root extends Component {
  componentDidMount() {
    console.log('componentDidMount');
    this.props.fetchAppData('');
  }

  answerChanged = (qid, answer) => {
    this.props.onAnswerChange(qid, answer);
  };

  emailChanged = (newEmail) => {
    this.props.onEmailChanged(newEmail);
  };

  render() {
    return (
      <App onEmailChanged={this.emailChanged} onAnswerChanged={this.answerChanged} />
    );
  }
}


Root.propTypes = {
  onAnswerChange: PropTypes.func.isRequired,
  onEmailChanged: PropTypes.func.isRequired,
  fetchAppData: PropTypes.func.isRequired,
};


const mapStateToProps = state => ({
  questions: state.questions,
  userData: state.user,
});

const mapDispatchToProps = dispatch => ({
  onAnswerChange: (qid, answer) => {
    dispatch(actions.answerChanged(qid, answer));
  },
  onEmailChanged: (newVal) => {
    dispatch(actions.emailChanged(newVal));
  },
  fetchAppData: (qry) => {
    dispatch(actions.loadDataStarted(qry));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Root);
