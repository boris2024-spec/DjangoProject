import { api } from './axios';

export async function fetchComments(articleId) {
    const resp = await api.get(`/articles/${articleId}/comments/`);
    return resp.data;
}

export async function addComment(articleId, text) {
    const resp = await api.post(`/articles/${articleId}/comments/`, { text });
    return resp.data;
}

export async function deleteComment(commentId) {
    const resp = await api.delete(`/comments/${commentId}/`);
    return resp.data;
}
