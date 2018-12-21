import axios, {baseUrl} from '@/api/ApiBase';

const apiUrl = baseUrl + '/oauth/token';

const api = {
    login(username, password) {
        return axios.post(`${apiUrl}`, {
            "client_id": "tent_admin",
            "grant_type": "password",
            "scope": "read",
            "username": username,
            "password": password
        });
    },
    logout() {
        return axios.post(`${baseUrl}/oauth/logout`);
    },
    passwd(data) {
        return axios.post(`${baseUrl}/oauth/password`, data);
    }
}

export default api;