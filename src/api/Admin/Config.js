/**
 * Config API
 */

import axios, {baseUrl} from '@/api/ApiBase';

const apiUrl = baseUrl + '/admin/config';

const api = {
    getList(params) {
        return axios.get(`${apiUrl}`, {
            params: params
        });
    },
    getItem(name) {
        return axios.get(`${apiUrl}/${name}`);
    },
    edit(name, params) {
        return axios.put(`${apiUrl}/${name}`, params);
    },
    getAuthMenu() {
        return axios.get(`${baseUrl}/admin/sidemenu`);
    }
}

export default api;