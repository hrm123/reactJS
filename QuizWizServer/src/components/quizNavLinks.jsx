/* eslint-disable jsx-a11y/anchor-is-valid */
/**
 * Created by Ramm on 2/11/2018.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const QuizNavLinks = (props) => {
  const prevStepId = props.currentStepId-1;
  const nextStepId = props.currentStepId+1;
  if (props.isfinalQuizStep && props.isfirstQuizStep) {
    return (
      <div>
        <Link to="/">
          <button className="btn btn-success btn-outline-rounded btn-info"> Prev <span
            style={{ marginLeft: 10 }}
            className="glyphicon glyphicon-arrow-left"
          />
          </button>
        </Link>
        <Link to="/summary">
          <button className="btn btn-success btn-outline-rounded btn-info"> Next <span
            style={{ marginLeft: 10 }}
            className="glyphicon glyphicon-arrow-right"
          />
          </button>
        </Link>
      </div>
    );
  } else if (props.isfinalQuizStep) {
    return (
      <div>
        <Link to={`/step/${prevStepId}`}>
          <button className="btn btn-success btn-outline-rounded btn-info"> Prev <span
            style={{ marginLeft: 10 }}
            className="glyphicon glyphicon-arrow-left"
          />
          </button>
        </Link>
        <Link to="/summary">
          <button className="btn btn-success btn-outline-rounded btn-info"> Next <span
            style={{ marginLeft: 10 }}
            className="glyphicon glyphicon-arrow-right"
          />
          </button>
        </Link>
      </div>
    );
  } else if (props.isfirstQuizStep) {
    return (
      <div>
        <Link to="/">
          <button className="btn btn-success btn-outline-rounded btn-info"> Prev <span
            style={{ marginLeft: 10 }}
            className="glyphicon glyphicon-arrow-left"
          />
          </button>
        </Link>
        <Link to={`/step/${nextStepId}`}>
          <button className="btn btn-success btn-outline-rounded btn-info"> Next <span
            style={{ marginLeft: 10 }}
            className="glyphicon glyphicon-arrow-right"
          />
          </button>
        </Link>
      </div>
    );
  } else if (!props.isfinalQuizStep && !props.isfirstQuizStep) {
    return (
      <div>
        <Link to={`/step/${prevStepId}`}>
          <button className="btn btn-success btn-outline-rounded btn-info"> Prev <span
            style={{ marginLeft: 10 }}
            className="glyphicon glyphicon-arrow-left"
          />
          </button>
        </Link>
        <Link to={`/step/${nextStepId}`}>
          <button className="btn btn-success btn-outline-rounded btn-info"> Next <span
            style={{ marginLeft: 10 }}
            className="glyphicon glyphicon-arrow-right"
          />
          </button>
        </Link>
      </div>
    );
  }
};

QuizNavLinks.propTypes = {
  currentStepId: PropTypes.number.isRequired,
  isfinalQuizStep: PropTypes.bool.isRequired,
  isfirstQuizStep: PropTypes.bool.isRequired,
};

export default QuizNavLinks;
