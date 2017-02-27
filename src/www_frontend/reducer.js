import {routerReducer as routing} from 'react-router-redux'
import {loadingBarReducer as loadingBar} from 'react-redux-loading-bar'
import {toastr} from 'cores'
import {combineForms} from 'react-redux-form';
import {combineReducers} from 'redux'
import {RESOURCE_NOT_FOUND_CODE, ACCESS_DENIED_CODE} from './constants'
import * as t from './ActionTypes'
import {reducer as formReducer} from 'redux-form'
import * as paginate from 'cores/RePagination'
import { reducer as modalReducer } from 'redux-modal'
import {Localize} from 'helpers'

const config = (state = {}, action) => {
    switch (action.type) {
        case t.FETCH_CONFIG_SUCCESS:
            return {...action.config, ...action.response};
    }
    return state;
};

const error_message = (state = null, action) => {
    if(action.type === t.DISPLAY_ERROR) {
        return Localize.t(action.message || 'oops')
    }
    return state;
}


const isAccessDenied = (state = false, {code, type}) => {
    if (code === ACCESS_DENIED_CODE) {
        return true;
    } else if (type === t.LOCATION_CHANGE) {
        return false;
    }
    return state;
};

const isNotFound = (state = false, {code, type, request}) => {
    if (code === RESOURCE_NOT_FOUND_CODE && request.method === 'GET') {
        return true;
    } else if (type === t.LOCATION_CHANGE) {
        return false;
    }
    return state;
};


const rootReducer = combineReducers({
    routing, loadingBar,
    [paginate.NAME]: paginate.reducer,
    [toastr.constants.NAME]: toastr.reducer,
    form: formReducer,
    modal: modalReducer,
});

export default (state, action) => {
    if(action.type === t.RESET_STATE){
        state = {config: state.config};
    }
    return rootReducer(state, action)
}