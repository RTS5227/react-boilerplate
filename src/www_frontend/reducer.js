import {routerReducer as routing} from 'react-router-redux'
import {toastr} from 'cores'
import {combineReducers} from 'redux'
import {RESOURCE_NOT_FOUND_CODE, ACCESS_DENIED_CODE} from './constants'
import * as t from './ActionTypes'
import {reducer as formReducer} from 'redux-form'
import { reducer as modalReducer } from 'redux-modal'
import {Localize} from 'helpers'
import {HttpCapture} from 'cores'

const rootReducer = combineReducers({
    routing,
    [toastr.constants.NAME]: toastr.reducer,
    form: formReducer,
    modal: modalReducer
});

export default (state, action) => {
    return rootReducer(state, action)
}