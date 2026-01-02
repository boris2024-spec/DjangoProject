import React, { useEffect, useState } from 'react';
import { Alert, Box, CircularProgress, Divider, Paper, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useParams } from 'react-router-dom';

import { fetchArticle } from '../api/articles';
import { addComment, deleteComment, fetchComments } from '../api/comments';
import CommentForm from '../components/CommentForm.jsx';
import CommentList from '../components/CommentList.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { useSnackbar } from '../context/SnackbarContext.jsx';

export default function ArticleDetails() {
    const { id } = useParams();
    const { isAuthenticated, isAdmin } = useAuth();
    const { showSnackbar } = useSnackbar();

    const [loading, setLoading] = useState(true);
    const [article, setArticle] = useState(null);
    const [comments, setComments] = useState([]);
    const [error, setError] = useState(null);
    const [commentPosting, setCommentPosting] = useState(false);

    const load = async () => {
        setLoading(true);
        setError(null);

        try {
            const [articleData, commentsData] = await Promise.all([
                fetchArticle(id),
                fetchComments(id),
            ]);
            setArticle(articleData);
            setComments(Array.isArray(commentsData) ? commentsData : []);
        } catch {
            setError('Failed to load article.');
            showSnackbar('Failed to load article.', 'error');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        load();
    }, [id]);

    const handleAddComment = async (text) => {
        setCommentPosting(true);
        try {
            await addComment(id, text);
            showSnackbar('Comment added.', 'success');
            const updated = await fetchComments(id);
            setComments(Array.isArray(updated) ? updated : []);
        } catch {
            showSnackbar('Failed to add comment.', 'error');
        } finally {
            setCommentPosting(false);
        }
    };

    const handleDeleteComment = async (commentId) => {
        try {
            await deleteComment(commentId);
            showSnackbar('Comment deleted.', 'success');
            setComments((prev) => prev.filter((c) => c.id !== commentId));
        } catch {
            showSnackbar('Failed to delete comment.', 'error');
        }
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" py={6}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return <Alert severity="error">{error}</Alert>;
    }

    if (!article) {
        return <Alert severity="info">Article not found.</Alert>;
    }

    return (
        <Grid container spacing={2}>
            <Grid xs={12} md={7}>
                <Paper variant="outlined" sx={{ p: 2 }}>
                    <Typography variant="h4" gutterBottom>
                        {article.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        By {article.author?.username || 'Unknown'}
                    </Typography>
                    <Divider sx={{ mb: 2 }} />
                    <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
                        {article.content}
                    </Typography>
                </Paper>
            </Grid>

            <Grid xs={12} md={5}>
                <Paper variant="outlined" sx={{ p: 2 }}>
                    <Typography variant="h6" gutterBottom>
                        Comments
                    </Typography>
                    <CommentList comments={comments} canDelete={isAdmin} onDelete={handleDeleteComment} />
                    {isAuthenticated ? (
                        <CommentForm onSubmit={handleAddComment} loading={commentPosting} />
                    ) : (
                        <Alert severity="info" sx={{ mt: 2 }}>
                            Please login to add a comment.
                        </Alert>
                    )}
                </Paper>
            </Grid>
        </Grid>
    );
}
