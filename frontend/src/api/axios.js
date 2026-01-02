import axios from 'axios';

import { setPendingSnackbar } from '../context/SnackbarContext';

const ACCESS_KEY = 'accessToken';
const REFRESH_KEY = 'refreshToken';

const baseURL = `${import.meta.env.VITE_API_BASE_URL}/api`;

export const api = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
});

const authClient = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use((config) => {
    const access = localStorage.getItem(ACCESS_KEY);
    if (access) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${access}`;
    }
    return config;
});

let isRefreshing = false;
let pendingQueue = [];

function resolveQueue(error, token) {
    pendingQueue.forEach(({ resolve, reject }) => {
        if (error) reject(error);
        else resolve(token);
    });
    pendingQueue = [];
}

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error?.config;
        const status = error?.response?.status;

        if (status !== 401 || !originalRequest || originalRequest._retry) {
            return Promise.reject(error);
        }

        const refresh = localStorage.getItem(REFRESH_KEY);
        if (!refresh) {
            localStorage.removeItem(ACCESS_KEY);
            setPendingSnackbar('Session expired. Please login again.', 'error');
            window.location.assign('/login');
            return Promise.reject(error);
        }

        if (isRefreshing) {
            return new Promise((resolve, reject) => {
                pendingQueue.push({ resolve, reject });
            }).then((token) => {
                originalRequest.headers.Authorization = `Bearer ${token}`;
                return api(originalRequest);
            });
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
            const resp = await authClient.post('/token/refresh/', { refresh });
            const newAccess = resp.data.access;
            localStorage.setItem(ACCESS_KEY, newAccess);

            resolveQueue(null, newAccess);
            originalRequest.headers.Authorization = `Bearer ${newAccess}`;
            return api(originalRequest);
        } catch (refreshError) {
            resolveQueue(refreshError, null);
            localStorage.removeItem(ACCESS_KEY);
            localStorage.removeItem(REFRESH_KEY);
            setPendingSnackbar('Session expired. Please login again.', 'error');
            window.location.assign('/login');
            return Promise.reject(refreshError);
        } finally {
            isRefreshing = false;
        }
    }
);
