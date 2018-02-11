/* eslint-disable no-debugger */
/**
 * Created by Ramm on 2/11/2018.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import actions from '../store/actions';
import UserDetails from '../components/userDetails';

class UserDetailsWrapper extends Component {
  emailChanged = (newEmail) => {
    console.log(newEmail);
    this.props.onEmailChanged(newEmail);
  };

  render() {
    return (
      <UserDetails stepId="0" email={this.props.userData.email} notifyEmailChanged={this.emailChanged} />
    );
  }
}


UserDetailsWrapper.propTypes = {
  onEmailChanged: PropTypes.func.isRequired,
  userData: PropTypes.shape({
    email: PropTypes.string,
  }).isRequired,
  stepId: PropTypes.number.isRequired,
};


const mapStateToProps = (state, ownProps) => ({
  stepId: ownProps.stepId,
  userData: state.user,
});

const mapDispatchToProps = dispatch => ({
  onEmailChanged: (newVal) => {
    dispatch(actions.emailChanged(newVal));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserDetailsWrapper);
