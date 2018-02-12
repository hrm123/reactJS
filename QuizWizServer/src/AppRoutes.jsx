/* eslint-disable no-debugger */
/**
 * Created by Ramm on 2/10/2018.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  BrowserRouter,
  Route,
} from 'react-router-dom';
import { connect } from 'react-redux';
import actions from '../src/store/actions';

import UserDetailsWrapper from './containers/userDetails';
import StepWrapper from './containers/step';
import Summarywrapper from './containers/summary';
import ScoresWrapper from './containers/scores';

class AppRoutes extends Component {
  componentDidMount() {
    this.props.fetchAppData('');
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Route
            name="home"
            path="/"
            exact
            component={() =>
              <UserDetailsWrapper stepId={0} userData={this.props.userData} />}
          />
          <Route name="step" path="/step/:stepId?" component={ StepWrapper } />
          <Route name="summary" path="/summary" component={Summarywrapper} />
          <Route name="results" path="/results" component={ScoresWrapper} />
        </div>
      </BrowserRouter>
    );
  }
}

AppRoutes.propTypes = {
  fetchAppData: PropTypes.func.isRequired,
  userData: PropTypes.shape({
    email: PropTypes.string,
  }).isRequired,
};


const mapDispatchToProps = dispatch => ({
  fetchAppData: (qry) => {
    dispatch(actions.loadDataStarted(qry));
  },
});

const mapStateToProps = state => ({
  userData: state.user,
  questions: state.questions.loading ? [{}] : state.questions.questions,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AppRoutes);
