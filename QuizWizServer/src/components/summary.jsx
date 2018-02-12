/* eslint-disable no-debugger */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Header from './header';

const Summary = (props) => {
  const steps1Data = props.questions.filter(q => q.step === 1);
  const steps2Data = props.questions.filter(q => q.step === 2);
  const steps3Data = props.questions.filter(q => q.step === 3);

  const step1Data = steps1Data.map(q => <li>{q.question}-{q.userAnswer}</li>);
  const step2Data = steps2Data.map(q => <li>{q.question}-{q.userAnswer}</li>);
  const step3Data = steps3Data.map(q => <li>{q.question}-{q.userAnswer}</li>);
  const allResponses = [...step1Data, ...step2Data, step3Data];

  return (
    <section style={{ background: '#efefe9' }}>
      <div className="container">
        <div className="row">
          <div className="board">
            <Header step="1" />
            <div className="tab-content">
              <div className="tab-pane fade in active">
                <h4 className="head text-center">Summary of answers for {props.email}</h4>
                <br />
                <form id="Form">
                  <div className="row">
                    <div className="col-xs-offset-1 col-xs-10 col-sm-offset-2 col-sm-8">
                      <div className="form-group">

        <ul>
          {allResponses}
        </ul>
                      </div>
                      <div className="form-group text-center">
                        <Link to="results">
                          <button className="btn btn-success btn-outline-rounded btn-info"> Next <span style={{ marginLeft: 10 }} className="glyphicon glyphicon-arrow-right" /></button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

Summary.propTypes = {
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
  email: PropTypes.string.isRequired,
}

export default Summary;
