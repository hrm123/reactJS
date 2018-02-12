/**
 * Created by Ramm on 2/9/2018.
 */
import axios from 'axios';
import { put, call, takeEvery } from 'redux-saga/effects';
import actionTypes from './actionTypes';
import actions from './actions';

const getAppDataAPI = (query) => {
  const baseUrl = 'http://localhost:3004/questions';

  const fullUrl = query ? (baseUrl + query.payload) : baseUrl;
  return axios.get(fullUrl, {
    headers: {
      Accept: 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
  }).then((res) => {
    return res.data;
  })
    .catch((error) => {
      console.log(error);
      throw error;
    });
};


export function* getAppdataSaga(query) {
  try {
    const result = yield call(getAppDataAPI, query);
    yield put(actions.loadDataSuccess(result));
  } catch (err) {
    console.log(err);
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
