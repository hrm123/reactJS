/* eslint-disable no-debugger */
/**
 * Created by Ramm on 2/10/2018.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  HashRouter,
  Route,
} from 'react-router-dom';
import { connect } from 'react-redux';
import actions from '../src/store/actions';

import UserDetailsWrapper from './containers/userDetails';
import Step from './components/step';
import Summary from './components/summary';
import Scores from './components/scores';

class AppRoutes extends Component {
  componentDidMount() {
    console.log('routes - componentDidMount');
    this.props.fetchAppData('');
  }

  render() {
    return (
      <HashRouter>
        <div>
          <Route path="/" component={() => <UserDetailsWrapper userData={this.props.userData} />} />
          <Route path="/step" component={Step} ques={this.props.questions} />
          <Route path="/summary" component={Summary} />
          <Route path="/scores" component={Scores} />
        </div>
      </HashRouter>
    );
  }
}


AppRoutes.propTypes = {
  fetchAppData: PropTypes.func.isRequired,
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
  userData: PropTypes.shape({
    email: PropTypes.string,
  }).isRequired,
};


const mapDispatchToProps = dispatch => ({
  fetchAppData: (qry) => {
    dispatch(actions.loadDataStarted(qry));
  },
});

const mapStateToProps = (state) => {
  return {
    userData: state.user,
    questions: state.questions.loading ? [] : state.questions.questions,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AppRoutes);
