import React from 'react';
import { Button, Card, CardActions, CardContent, Chip, Stack, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

function splitTags(tags) {
    if (!tags) return [];
    return tags
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean)
        .slice(0, 6);
}

function formatDate(value) {
    if (!value) return '';
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return '';
    return new Intl.DateTimeFormat('ru-RU', {
        year: 'numeric',
        month: 'long',
        day: '2-digit',
    }).format(d);
}

export default function ArticleCard({ article }) {
    const tags = splitTags(article.tags);

    const publishedRaw = article.published_at || article.created_at || article.date;
    const publishedLabel = formatDate(publishedRaw);

    return (
        <Card variant="outlined" sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flex: 1 }}>
                <Typography variant="h6" gutterBottom>
                    {article.title}
                </Typography>

                <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                    By {article.author?.username || 'Unknown'}
                </Typography>

                {publishedLabel ? (
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
                        Reported: {publishedLabel}
                    </Typography>
                ) : (
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
                    </Typography>
                )}

                {tags.length ? (
                    <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                        {tags.map((t) => (
                            <Chip key={t} label={t} size="small" />
                        ))}
                    </Stack>
                ) : null}
            </CardContent>
            <CardActions>
                <Button size="small" component={RouterLink} to={`/articles/${article.id}`}>
                    Read
                </Button>
            </CardActions>
        </Card>
    );
}
