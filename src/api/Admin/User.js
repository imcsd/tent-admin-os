import axios, {baseUrl} from '@/api/ApiBase';

const apiUrl = baseUrl + '/admin/user';

const api = {
    getList(params) {
        return axios.get(`${apiUrl}`, {
            params: params
        });
    },
    getItem(id) {
        return axios.get(`${apiUrl}/${id}`);
    },
    createItem(data) {
        return axios.post(`${apiUrl}`, data);
    },
    edit(id, params) {
        return axios.put(`${apiUrl}/${id}`, params);
    },
    getProfile() {
        return axios.get(`${baseUrl}/admin/profile`);
    },
    saveProfile(data) {
        return axios.post(`${baseUrl}/admin/profile`, data);
    },
}

export default api;