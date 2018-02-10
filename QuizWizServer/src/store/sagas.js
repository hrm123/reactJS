/**
 * Created by Ramm on 2/9/2018.
 */
import ReduxSaga from 'redux-saga';
import { axios } from 'axios';
import actionTypes from './actionTypes';
import actions from './actions';

const { put, call } = ReduxSaga.effects;
const { takeEvery } = ReduxSaga;

const getAppDataAPI = (query) => {
  const baseUrl = 'http://localhost:3004/questions';

  const fullUrl = query ? baseUrl + query : baseUrl;

  return axios.get(fullUrl, {
    headers: {
      Accept: 'application/json',
    },
  }).then(res => res.data)
    .catch((error) => {
      throw error;
    });
};


export function* getAppdataSaga(query) {
  while (true) {
    try {
      yield put(actions.loadDataStarted(query));
      const result = yield call(getAppDataAPI, query);
      yield put(actions.loadDataSuccess(result));
    } catch (err) {
      yield put(actions.loadDataError(err));
    }
  }
}

export function* getAnswerChangedSaga(data) {
  while (true) {
    try {
      yield put(actions.answerChanged(data.qid, data.ans));
    } catch (err) {
      yield put(actions.loadDataError(err));
    }
  }
}

export function* getEmailChangedSaga(data) {
  while (true) {
    try {
      yield put(actions.emailChanged(data));
    } catch (err) {
      yield put(actions.loadDataError(err));
    }
  }
}


export function* rootSaga() {
  yield [
    yield takeEvery(actionTypes.LOAD_QUESTIONS, getAppdataSaga),
    yield takeEvery(actionTypes.EMAIL_CHANGED, getEmailChangedSaga),
    yield takeEvery(actionTypes.ANSWER_CHANGED, getAnswerChangedSaga),
  ];
}
