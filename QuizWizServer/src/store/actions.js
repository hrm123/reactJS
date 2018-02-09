/**
 * Created by Ramm on 2/9/2018.
 */
const actionTypes = require('./actionTypes');


// action creators
const loadDataStarted = filter => ({ type: actionTypes.LOAD_QUESTIONS, filter });

const loadDataSuccess = questions => ({ type: actionTypes.LOAD_QUESTIONS_SUCCESS, questions });

const loadDataError = err => ({ type: actionTypes.LOAD_QUESTIONS_ERROR, err });

const emailChanged = newEmail => ({ type: actionTypes.EMAIL_CHANGED, newEmail });

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
