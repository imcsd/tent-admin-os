/**
 * apiBase
 * @export string baseUrl
 * @export object instance - Axios instance
 */

import axios from 'axios';
import ElementUI from 'element-ui';
import store from '../store/index';
import System from '../common/module/System'

// Tip for error.
const tip = msg => {
    ElementUI.Message.warning({
        message: msg,
        duration: 5000,
        forbidClick: true
    });
}

/** 
 * Error Handle, handle the response with status code isn't 2XX.
 * @param {Number} status  - response status code
 * @param {String} errMsg  - response.data.errMsg of axios request response.
 * @param {response} status  - Axios request response.
 */
const errorHandle = (status, errMsg, response) => {
    switch (status) {
        case 401:
            tip('登录过期，请正在重新登录...');
            System.toLogin();
            break;
        case 403:
            tip(errMsg || '403：您请求的资源...');
            break;
        case 404:
            tip(errMsg || '您访问的资源不存在...');
            break;
        default:
            console.log(response);
            tip(errMsg || `请求失败, CODE: ${response.status}, Error: ${response.statusText}`);
            break;
    }
}

// create an axios instance
var instance = axios.create({ timeout: 1000 * 12 });

/** 
 * Request Interceptor
 * Set Authorization Header
 */
instance.interceptors.request.use(
    config => {
        let token = store.state.accessToken;
        token && (config.headers.Authorization = token);
        return config;
    },
    error => Promise.error(error))

// Response Interceptor
instance.interceptors.response.use(
    // Success
    res => res.status === 200 ? Promise.resolve(res) : Promise.reject(res),
    // Error
    error => {
        const { response } = error;
        if (response) {
            // Reutrn response with not 200 status code.
            errorHandle(response.status, response.data.errMsg, response);
            return Promise.reject(response);
        } else {
            // Network connect fail
            //store.commit('changeNetwork', false);
            tip('网络连接失败...');
        }
    });

export const baseUrl = "/api/v3";
export default instance;