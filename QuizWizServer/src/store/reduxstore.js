/**
 * Created by Ramm on 2/9/2018.
 */
import React, { Component, PropTypes  } from 'react';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import ReduxSaga from 'redux-saga';
import {connect, Provider} from 'react-redux';
const createSagaMiddleware = ReduxSaga.default;
const { put, call } = ReduxSaga.effects;
const { takeEvery } = ReduxSaga;
