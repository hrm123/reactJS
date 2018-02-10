/**
 * Created by Ramm on 2/10/2018.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import StepZilla from 'react-stepzilla-redux';
import UserDetails from './userDetails';
import Step2 from './step';
import Step5 from './summary';
import Step6 from './scores';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  handleAnswerChanged = (e) => {
    this.props.onAnswerChanged(e.q, e.a);
  }

  handleEmailChange = (e) => {
    this.props.onEmailChanged(e);
  }

  render() {
    const { questions } = this.props;
    const step1Questions = questions.filter(x => x.step === 1);
    // const step2Questions = questions.filter(x => x.step === 2);
    // const step3Questions = questions.filter(x => x.step === 3);

    const steps =
      [
        { name: 'Step 2', component: <UserDetails stepId="0" data={this.props.userData} notifyEmailChanged={this.handleEmailChange} /> },
        { name: 'Step 3', component: <Step2 stepId="2" questions={step1Questions} notifyEmailChanged={this.handleAnswerChanged} /> },
        { name: 'Step 5', component: <Step5 stepId="3" /> },
        { name: 'Step 6', component: <Step6 stepId="4" /> },
      ];

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to QuizWiz</h1>
        </header>
        <p className="App-intro">
          To get started click on Take Exam button on the screen.
        </p>
        <div className="step-progress">
          <StepZilla
            steps={steps}
            preventEnterSubmission
            nextTextOnFinalActionStep="Submit"
            startAtStep={0}
            prevBtnOnLastStep={false}
          />
        </div>
      </div>
    );
  }
}

App.propTypes = {
  onAnswerChanged: PropTypes.func.isRequired,
  onEmailChanged: PropTypes.func.isRequired,
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

export default App;
