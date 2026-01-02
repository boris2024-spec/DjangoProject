import { api } from './axios';

export async function loginRequest(username, password) {
    const resp = await api.post('/token/', { username, password });
    return resp.data;
}

export async function registerRequest(username, password) {
    const resp = await api.post('/register/', { username, password });
    return resp.data;
}
