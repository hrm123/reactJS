/**
 * Created by Ramm on 2/9/2018.
 */
const actionTypes = require('./actionTypes');


// action creators
const loadDataStarted = filter => ({ type: actionTypes.LOAD_QUESTIONS, payload: filter });

const loadDataSuccess = questions => ({
  type: actionTypes.LOAD_QUESTIONS_SUCCESS, payload: questions,
});

const loadDataError = err => ({ type: actionTypes.LOAD_QUESTIONS_ERROR, payload: err });

const emailChanged = newEmail => ({ type: actionTypes.EMAIL_CHANGED, payload: newEmail });

const answerChanged = (qid, ans) => ({
  type: actionTypes.ANSWER_CHANGED,
  payload: { q: qid, a: ans },
});

module.exports = {
  loadDataStarted,
  loadDataSuccess,
  loadDataError,
  emailChanged,
  answerChanged,
};
