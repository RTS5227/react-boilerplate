/**
 * Created by Tester-Ali on 07-09-2016.
 */
import {normalize} from 'normalizr'
import {camelizeKeys} from 'humps'
const HTTP_NO_CONTENT_CODE = 204;
const AppConfig = require('../config.json');

export default async(endpoint, config, schema) => {
    endpoint = endpoint.startsWith('/') ? endpoint : '/' + endpoint;
    const fullUrl = (endpoint.indexOf(AppConfig.apiRoot) === -1) ? AppConfig.apiRoot + endpoint : endpoint;
    let response;

    try {
        response = await fetch(fullUrl, config);
    } catch (e) {
        throw new Error('Có lỗi xảy ra, vui lòng kiểm tra kết nối mạng và thử lại!')
    }

    if (response.status === HTTP_NO_CONTENT_CODE) {
        return true;
    }

    let json = await response.json();

    if (!response.ok) {
        throw json.error;
    }

    if (schema) {
        if (json.hasOwnProperty('result') && Array.isArray(json.result)) {
            let {result, metadata} = json;
            const camelizedJson = camelizeKeys(result);
            return Object.assign({metadata},
                normalize(camelizedJson, schema),
            )
        }
        const camelizedJson = camelizeKeys(json);
        return Object.assign({},
            normalize(camelizedJson, schema),
        )
    }
    return json;

}