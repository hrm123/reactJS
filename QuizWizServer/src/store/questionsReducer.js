/**
 * Created by Ramm on 2/9/2018.
 */
import initialState from './initialState';
const actionTypes = require('./actionTypes');

const questionsReducer = (state = initialState.questions, action) => {
  switch (action.type) {
    case actionTypes.LOAD_QUESTIONS:
      return {
        loading: true,
      };
    case actionTypes.LOAD_QUESTIONS_SUCCESS:
      return {
        loading: false,
        ...action.payload,
      };
    case actionTypes.LOAD_QUESTIONS_ERROR:
      return {
        loading: false,
      };
    default:
      return state;
  }
};

export default questionsReducer;