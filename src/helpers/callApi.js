/**
 * Created by Tester-Ali on 07-09-2016.
 */
const HTTP_NO_CONTENT_CODE = 204;
const AppConfig = require('../config.json');

export default async(endpoint, config) => {
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
    return json;

}