import {toastr} from 'shared'
import {combineReducers} from 'redux'
import {RESOURCE_NOT_FOUND_CODE, ACCESS_DENIED_CODE, ActionTypes as t} from './constants'
import {reducer as formReducer} from 'redux-form'
import { reducer as modalReducer } from 'redux-modal'
import {Localize} from 'libs'

const rootReducer = combineReducers({
    [toastr.constants.NAME]: toastr.reducer,
    form: formReducer,
    modal: modalReducer
});

export default (state, action) => {
    return rootReducer(state, action);
}