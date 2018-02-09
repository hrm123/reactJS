/**
 * Created by Ramm on 2/9/2018.
 */
const { combineReducers, applyMiddleware, createStore } = Redux;
const createSagaMiddleware = ReduxSaga.default;
const { put, call } = ReduxSaga.effects;
const { takeEvery } = ReduxSaga;
const { connect, Provider } = ReactRedux;
