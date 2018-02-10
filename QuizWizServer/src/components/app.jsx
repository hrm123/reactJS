/**
 * Created by Ramm on 2/10/2018.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      answer: '',
      qid: '2aaf0b0d-109a-431b-86a1-7a83ff44fce5',
    };
  }

  answerChanged = () => {
    this.props.onAnswerChanged(this.state.answer);
  }

  emailChanged = () => {
    this.props.onEmailChanged(this.state.qid, this.state.answer);
  }

  render() {
    return (
      <div>
        <input
          type="text"
          placeholder="john.smith@example.com"
          value={this.state.email}
          onBlur={this.emailChanged}
        />
        <input
          type="text"
          value={this.state.answer}
          onBlur={this.answerChanged}
        />
      </div>
    );
  }
}

App.propTypes = {
  onAnswerChanged: PropTypes.func.isRequired,
  onEmailChanged: PropTypes.func.isRequired,
};

export default App;
