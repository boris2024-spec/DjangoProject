import React, { useEffect, useState } from 'react';
import { Alert, Box, CircularProgress, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

import { fetchArticles } from '../api/articles';
import ArticleCard from '../components/ArticleCard.jsx';
import { useSnackbar } from '../context/SnackbarContext.jsx';

export default function Home() {
    const { showSnackbar } = useSnackbar();

    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [articles, setArticles] = useState([]);

    const load = async (query) => {
        setLoading(true);
        setError(null);

        try {
            const data = await fetchArticles(query);
            setArticles(Array.isArray(data) ? data : []);
        } catch (e) {
            setError('Failed to load articles.');
            showSnackbar('Failed to load articles.', 'error');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        load('');
    }, []);

    return (
        <Box>
            <Typography variant="h4" sx={{ mb: 2 }}>
                Articles
            </Typography>

            <Box
                component="form"
                onSubmit={(e) => {
                    e.preventDefault();
                    load(search.trim());
                }}
                sx={{ mb: 2 }}
            >
                <TextField
                    label="Search"
                    placeholder="Search by title, content, tags, or author"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    fullWidth
                />
            </Box>

            {loading ? (
                <Box display="flex" justifyContent="center" py={6}>
                    <CircularProgress />
                </Box>
            ) : error ? (
                <Alert severity="error">{error}</Alert>
            ) : articles.length === 0 ? (
                <Alert severity="info">No articles found.</Alert>
            ) : (
                <Grid container spacing={2}>
                    {articles.map((a) => (
                        <Grid key={a.id} xs={12} sm={6} md={4}>
                            <ArticleCard article={a} />
                        </Grid>
                    ))}
                </Grid>
            )}
        </Box>
    );
}
