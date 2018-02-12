/**
 * Created by Ramm on 2/9/2018.
 */
/* eslint-disable */

import initState from './initialState';
const actionTypes = require('./actionTypes');

const questionsReducer = (currentState = initState.questions, action) => {
  switch (action.type) {
    case actionTypes.LOAD_QUESTIONS:
      return Object.assign({}, currentState, {
        loading: true,
      });
    case actionTypes.LOAD_QUESTIONS_SUCCESS:
      return Object.assign({}, currentState, {
        loading: false,
        questions : action.payload
      });
    case actionTypes.LOAD_QUESTIONS_ERROR:
      return Object.assign({}, currentState, {
        loading: false,
      });
    case actionTypes.ANSWER_CHANGED:
      var editedIndex = currentState.questions.map(x => x.id).indexOf(action.payload.q);
      var targetQuestion = currentState.questions.filter(x => x.id === action.payload.q);
      var editedQuestion = Object.assign({}, targetQuestion[0], {userAnswer: action.payload.a });
      var clonedArray = JSON.parse(JSON.stringify(currentState.questions));
      clonedArray.splice(editedIndex, 1, editedQuestion );
      return Object.assign({}, currentState, { "questions": clonedArray });
    default:
      return currentState;
  }
};

export default questionsReducer;
