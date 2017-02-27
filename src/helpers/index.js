import Localize from './Localize'
export callApi from './callApi'
export * as Schemas from './Schemas'
export * as cookies from './cookie'
export * as formats from './formats'
import zxcvbn from 'zxcvbn'
export {moment} from './formats'

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

export const scoreFn = (value) => {
    let result = zxcvbn(value);
    if (value.length == 0) {
        result.feedback.warning = 'Mật khẩu không được để trống';
    } else if (value.length < 6 || /[A-Z]/.test(value) == false || /\d/.test(value) == false) {
        result.score = 0;
        result.feedback.warning = 'Tối thiểu 6 ký tự, bao gồm chữ hoa và số';
    } else if (result.score <= 2 && !result.feedback.warning) {
        result.feedback.warning = 'Vui lòng chọn một mật khẩu mạnh hơn'
    }
    result.feedback.warning = Localize.t(result.feedback.warning);
    return result;
};

export { Localize };
export const encode = (code) => encodeURIComponent(`%${typeof code == 'string' ? code.trim() : ''}%`.replace(/\\/g, ``));

export const difference = (obj1, obj2) => {
    if(typeof obj1 !== 'object' || typeof obj2 !== 'object') {
        throw Error('difference take 2 object argument');
    }
    return Object.keys(obj2).reduce((result, key) => {
        if(obj1[key] != obj2[key]) {
            result[key] = obj2[key];
        }
        return result;
    }, {})
}