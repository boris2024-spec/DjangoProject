import { api } from './axios';

export async function fetchArticles(search) {
    const params = {};
    if (search) params.search = search;
    const resp = await api.get('/articles/', { params });
    return resp.data;
}

export async function fetchArticle(id) {
    const resp = await api.get(`/articles/${id}/`);
    return resp.data;
}

export async function createArticle(payload) {
    const resp = await api.post('/articles/', payload);
    return resp.data;
}

export async function updateArticle(id, payload) {
    const resp = await api.put(`/articles/${id}/`, payload);
    return resp.data;
}

export async function deleteArticle(id) {
    const resp = await api.delete(`/articles/${id}/`);
    return resp.data;
}
