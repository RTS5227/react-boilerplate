import Localize from './Localize'
import callApi from './callApi'
import * as cookies from './cookie'
import * as formaters from './formaters'

export const serializeJSON = (data) => {
    return Object.keys(data).map(function (keyName) {
        return encodeURIComponent(keyName) + '=' + encodeURIComponent(data[keyName])
    }).join('&');
};

export const parseErrors = errors => {
    const submitErrors = {};
    if (errors.details) {
        const {messages} = errors.details;
        Object.keys(messages).map(field => {
            submitErrors[field] = (Localize.t(messages[field][0]))
        });
    }
    if (Object.keys(submitErrors).length === 0) {
        submitErrors['_error'] = Localize.t(errors.message)
    }
    return submitErrors;
};
export const encode = (code) => encodeURIComponent(`%${typeof code == 'string' ? code.trim() : ''}%`.replace(/\\/g, ``));


export { Localize, callApi, cookies, formaters };