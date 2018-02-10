/**
 * Created by Ramm on 2/9/2018.
 */
import initState from './initialState';

const actionTypes = require('./actionTypes');
/*eslint-disable*/

const userReducer = (currentState = initState.user, action) => {
  switch (action.type) {
    case actionTypes.EMAIL_CHANGED:
      debugger;
      return Object.assign({}, currentState, {
        email: action.payload,
      });
    default:
      return currentState;
  }
};

export default userReducer;
