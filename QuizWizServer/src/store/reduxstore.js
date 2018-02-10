/**
 * Created by Ramm on 2/9/2018.
 */
import { createStore, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga'
import { rootSaga } from './sagas';
import questionsReducer from './questionsReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  questions: questionsReducer,
  user: userReducer,
});

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);
export default store;