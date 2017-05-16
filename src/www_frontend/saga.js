/**
 * Created by Tester-Ali on 30-11-2016.
 */
import {delay} from 'redux-saga'
import {call, put, fork, select, take, takeEvery, takeLatest} from 'redux-saga/effects'
import {toastr} from 'shared'
import {UNAUTHORIZED_CODE, RESOURCE_NOT_FOUND_CODE, ACCESS_DENIED_CODE, ActionTypes as t} from './constants'
import {parseErrors} from 'libs'
import {startSubmit, stopSubmit} from 'redux-form'
import {getToken, getSession} from './libs'
import * as api from './libs/api'
const {customer, order, transactions} = {};
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


export default function* startApp() {
    yield put({type: 'hello', message: 'world'});
    // yield fork(loadConfig);
    yield takeEvery(t.CALL_API, callWebApi);
}