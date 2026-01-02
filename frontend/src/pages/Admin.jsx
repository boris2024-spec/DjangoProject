import React, { useEffect, useMemo, useState } from 'react';
import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    TextField,
    Typography,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import { createArticle, deleteArticle, fetchArticles, updateArticle } from '../api/articles';
import { useSnackbar } from '../context/SnackbarContext.jsx';

function emptyForm() {
    return { title: '', content: '', tags: '' };
}

export default function Admin() {
    const { showSnackbar } = useSnackbar();

    const [loading, setLoading] = useState(true);
    const [articles, setArticles] = useState([]);

    const [dialogOpen, setDialogOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [form, setForm] = useState(emptyForm());
    const isEditing = useMemo(() => editingId != null, [editingId]);

    const load = async () => {
        setLoading(true);
        try {
            const data = await fetchArticles('');
            setArticles(Array.isArray(data) ? data : []);
        } catch {
            showSnackbar('Failed to load admin data.', 'error');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        load();
    }, []);

    const openCreate = () => {
        setEditingId(null);
        setForm(emptyForm());
        setDialogOpen(true);
    };

    const openEdit = (article) => {
        setEditingId(article.id);
        setForm({
            title: article.title || '',
            content: article.content || '',
            tags: article.tags || '',
        });
        setDialogOpen(true);
    };

    const closeDialog = () => {
        setDialogOpen(false);
        setEditingId(null);
    };

    const submit = async () => {
        const payload = {
            title: form.title.trim(),
            content: form.content.trim(),
            tags: form.tags.trim(),
        };

        if (!payload.title || !payload.content) {
            showSnackbar('Title and content are required.', 'warning');
            return;
        }

        try {
            if (isEditing) {
                await updateArticle(editingId, payload);
                showSnackbar('Article updated.', 'success');
            } else {
                await createArticle(payload);
                showSnackbar('Article created.', 'success');
            }
            closeDialog();
            await load();
        } catch {
            showSnackbar('Failed to save article.', 'error');
        }
    };

    const remove = async (id) => {
        try {
            await deleteArticle(id);
            showSnackbar('Article deleted.', 'success');
            setArticles((prev) => prev.filter((a) => a.id !== id));
        } catch {
            showSnackbar('Failed to delete article.', 'error');
        }
    };

    return (
        <Box>
            <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
                <Typography variant="h4">Admin</Typography>
                <Button variant="contained" onClick={openCreate}>
                    Create article
                </Button>
            </Box>

            {loading ? (
                <Box display="flex" justifyContent="center" py={6}>
                    <CircularProgress />
                </Box>
            ) : (
                <Grid container spacing={2}>
                    {articles.map((a) => (
                        <Grid key={a.id} xs={12} md={6}>
                            <Card variant="outlined">
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>
                                        {a.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Tags: {a.tags || '—'}
                                    </Typography>
                                </CardContent>
                                <CardActions sx={{ justifyContent: 'flex-end' }}>
                                    <IconButton aria-label="edit" onClick={() => openEdit(a)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton aria-label="delete" onClick={() => remove(a.id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}

            <Dialog open={dialogOpen} onClose={closeDialog} fullWidth maxWidth="sm">
                <DialogTitle>{isEditing ? 'Edit article' : 'Create article'}</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Title"
                        value={form.title}
                        onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
                        fullWidth
                        sx={{ mt: 1, mb: 2 }}
                    />
                    <TextField
                        label="Content"
                        value={form.content}
                        onChange={(e) => setForm((p) => ({ ...p, content: e.target.value }))}
                        fullWidth
                        multiline
                        minRows={4}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="Tags (comma-separated)"
                        value={form.tags}
                        onChange={(e) => setForm((p) => ({ ...p, tags: e.target.value }))}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeDialog}>Cancel</Button>
                    <Button variant="contained" onClick={submit}>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
