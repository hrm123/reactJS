/**
 * Created by Ramm on 2/9/2018.
 */
import axios from 'axios';
import { put, call, takeEvery } from 'redux-saga/effects';
import actionTypes from './actionTypes';
import actions from './actions';

/*eslint-disable */

const getAppDataAPI = (query) => {
  const baseUrl = 'http://localhost:3004/questions';

  const fullUrl = query ? baseUrl + query.payload : baseUrl;
  console.log('getAppDataAPI');
  return axios.get(fullUrl, {
    headers: {
      Accept: 'application/json',
    },
  }).then(res => {
    return res.data;
  })
    .catch((error) => {
      debugger;
      throw error;
    });
};


export function* getAppdataSaga(query) {
  try {
    const result = yield call(getAppDataAPI, query);
    yield put(actions.loadDataSuccess(result));
  } catch (err) {
    yield put(actions.loadDataError(err));
  }
}

export function* getAnswerChangedSaga(data) {
  try {
    yield put(actions.answerChanged(data.qid, data.ans));
  } catch (err) {
    yield put(actions.loadDataError(err));
  }
}

export function* getEmailChangedSaga(data) {
  try {
    yield put(actions.emailChanged(data));
  } catch (err) {
    yield put(actions.loadDataError(err));
  }
}


export function* rootSaga() {
  yield [
    yield takeEvery(actionTypes.LOAD_QUESTIONS, getAppdataSaga),
    // yield takeEvery(actionTypes.EMAIL_CHANGED, getEmailChangedSaga),
    // yield takeEvery(actionTypes.ANSWER_CHANGED, getAnswerChangedSaga),
  ];
}
