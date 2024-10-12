import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:8080/api',
    headers: {},
});

const setAuthToken = (token) => {
    if (token) {
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete apiClient.defaults.headers.common['Authorization'];
    }
};

export const apiCall = async (method, url, data = null) => {
    const token = localStorage.getItem('token');
    setAuthToken(token);

    try {
        const config = {
            method,
            url,
        };

        if (method !== 'delete' && data) {
            config.data = data;

            if (data instanceof FormData) {
                delete apiClient.defaults.headers.common['Content-Type'];
            } else {
                apiClient.defaults.headers.common['Content-Type'] = 'application/json';
            }
        }

        const response = await apiClient(config);
        return response.data;
    } catch (error) {
        console.log('API Error:', error.response.data.message);
        throw error;
    }
};

export default apiClient;
