import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import StepZilla from 'react-stepzilla';
import Step1 from './steps/step1';
import Step2 from './steps/step2';
import Step3 from './steps/step3';
import Step4 from './steps/step4';
import Step5 from './steps/step5';
require('./css/main.css');
const uuidv4 = require('uuid/v4');

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {};

    const data = {
      "1" : [
          {
            question: 'q1',
            answers: ['a1', 'a2', 'a3', 'a4'],
            scores: [1,0,0,0],
            userAnswer: '',
            id: uuidv4()
          },
          {
            question: 'q2',
            answers: ['a5', 'a6', 'a7', 'a8'],
            scores: [0,0,1,0],
            userAnswer: '',
            id: uuidv4()
          }
        ],
      "2" : [
        {
          question: 'q3',
          answers: ['a9', 'a10', 'a11', 'a12'],
          scores: [1,0,0,0],
          userAnswer: '',
          id: uuidv4()
        },
        {
          question: 'q4',
          answers: ['a13', 'a14', 'a15', 'a16'],
          scores: [0,0,1,0],
          userAnswer: '',
          id: uuidv4()
        }
      ],
      "3" : [
        {
          question: 'q1',
          answers: ['a1', 'a2', 'a3', 'a4'],
          scores: [1,0,0,0],
          userAnswer: '',
          id: uuidv4()
        },
        {
          question: 'q2',
          answers: ['a5', 'a6', 'a7', 'a8'],
          scores: [0,0,1,0],
          userAnswer: '',
          id: uuidv4()
        }
      ],
    "4" : [
      {
        question: 'q3',
        answers: ['a9', 'a10', 'a11', 'a12'],
        scores: [1,0,0,0],
        userAnswer: '',
        id: uuidv4()
      },
      {
        question: 'q4',
        answers: ['a13', 'a14', 'a15', 'a16'],
        scores: [0,0,1,0],
        userAnswer: '',
        id: uuidv4()
      }
    ]      
    };

    this.sampleStore = {
      email: '',
      stepsData: data
    };
  }

  getStore() {
    return this.sampleStore;
  }

  updateStore(update) {
    this.sampleStore = {
      ...this.sampleStore,
      ...update,
    }
  }

  render() {

    const steps =
    [
      {name: 'Step 1', component: <Step1 dontValidate={true} stepId="1" getStore={() => (this.getStore())} updateStore={(u) => {this.updateStore(u)}} />},
      {name: 'Step 2', component: <Step2 dontValidate={true} stepId="2" getStore={() => (this.getStore())} updateStore={(u) => {this.updateStore(u)}} />},
      {name: 'Step 3', component: <Step3 dontValidate={true} stepId="3" getStore={() => (this.getStore())} updateStore={(u) => {this.updateStore(u)}} />},
      {name: 'Step 4', component: <Step4 dontValidate={true} stepId="4" getStore={() => (this.getStore())} updateStore={(u) => {this.updateStore(u)}} />},
      {name: 'Step 5', component: <Step5 dontValidate={true} stepId="5" getStore={() => (this.getStore())} updateStore={(u) => {this.updateStore(u)}} />}
    ];

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to QuizWiz</h1>
        </header>
        <p className="App-intro">
          To get started click on Take Exam button on the screen.
        </p>
        <div className='step-progress'>
          <StepZilla steps={steps}
          preventEnterSubmission={true}
          nextTextOnFinalActionStep={"Save"}

          />
        </div>
      </div>
    );
  }
}

export default App;
