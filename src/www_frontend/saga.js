/**
 * Created by Tester-Ali on 30-11-2016.
 */
import {takeEvery, takeLatest, delay} from 'redux-saga'
import {call, put, fork, select, take} from 'redux-saga/effects'
import {toastr} from 'cores'
import {UNAUTHORIZED_CODE, RESOURCE_NOT_FOUND_CODE, ACCESS_DENIED_CODE} from './constants'
import {parseErrors} from 'helpers'
import {startSubmit, stopSubmit} from 'redux-form'
import {getToken, getSession} from './helpers'
import {push} from 'react-router-redux'
import {customer, order, transactions} from './components'
import * as t from './ActionTypes'
import * as api from './api'

function* resetToast(action) {
    yield call(delay, 3000);
    yield put(toastr.actions.clean());
}

export function* callWebApi(action) {
    const {types, endpoint, schema, body, method = 'GET', headers, form, ...rest} = action.payload;
    const [ requestType, successType, failureType ] = types || [];
    const config = {method, endpoint, body, headers};
    
    try {
        yield put({type: requestType});
        if (form) {
            yield put(startSubmit(form))
        }
        const response = yield call(api.fetch, endpoint, config, schema);
        yield put({type: successType, response, ...rest});
        if (form) {
            yield put(stopSubmit(form))
        }
    } catch (error) {
        const statusCode = error['code'] || error['statusCode'];
        yield put({type: failureType, ajax: false, error});
        if (isRedirectToErrorPage(statusCode)) {
            yield put(push(`/error/${statusCode}`));
        } else if([UNAUTHORIZED_CODE].includes(statusCode)){
            yield put(customer.actions.logoutSaga());
        }
        if (form) {
            yield put(stopSubmit(form, parseErrors(error)))
        }
    }
}

const isRedirectToErrorPage = (method, statusCode) => {
    return (method == 'GET' && [RESOURCE_NOT_FOUND_CODE, ACCESS_DENIED_CODE].includes(statusCode));
};

function* loadConfig() {
    yield put({type: t.FETCH_CONFIG_REQUEST});
    try {
        const response = {};
        const config = require('../config.json');
        yield put({type: t.FETCH_CONFIG_SUCCESS, response, config});
    } catch (error){
        yield put({type: t.FETCH_CONFIG_FAILURE, error});
        yield put({type: t.DISPLAY_ERROR, message: error.message || 'load config failed'})
    }
}

function* main() {
    while(true) {
        const profile = yield take([customer.ActionTypes.AUTH_PROFILE_SUCCESS])
        //sau khi user lay duoc profile moi cho phep thuc hien cac thao tac khac
        yield fork(order.saga);
        yield fork(transactions.saga);
    }
}

export default function* startApp() {
    yield fork(loadConfig);
    yield takeLatest(t.LOCATION_CHANGE, resetToast);
    yield takeEvery(t.CALL_API, callWebApi);
    yield fork(customer.saga);
    yield fork(main);
}