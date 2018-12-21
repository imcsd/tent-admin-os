import axios, {baseUrl} from '@/api/ApiBase';

const apiUrl = `${baseUrl}/admin/api_list`;

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
    getAuth(api_id, group_id) {
        return axios.get(`${baseUrl}/admin/api_auth?api_id=${api_id}&group_id=${group_id}`);
    },
    setAuth(data) {
        return axios.post(`${baseUrl}/admin/api_auth`, data);
    }
}

export default api;