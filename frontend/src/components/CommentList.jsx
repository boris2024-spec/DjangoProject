import React from 'react';
import {
    Box,
    IconButton,
    List,
    ListItem,
    ListItemSecondaryAction,
    ListItemText,
    Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export default function CommentList({ comments, canDelete, onDelete }) {
    const formatDateTime = (value) => {
        if (!value) return null;
        const d = new Date(value);
        if (Number.isNaN(d.getTime())) return null;

        return new Intl.DateTimeFormat('ru-RU', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        }).format(d);
    };

    if (!comments?.length) {
        return (
            <Typography variant="body2" color="text.secondary">
                No comments yet.
            </Typography>
        );
    }

    return (
        <Box>
            <List disablePadding>
                {comments.map((c) => {
                    const created =
                        formatDateTime(c.created_at) ||
                        formatDateTime(c.createdAt) ||
                        null;

                    const author = c.author?.username || 'Unknown';

                    return (
                        <ListItem key={c.id} divider>
                            <ListItemText
                                primary={c.text}
                                secondary={
                                    created
                                        ? `By ${author} • ${created}`
                                        : `By ${author}`
                                }
                            />
                            {canDelete ? (
                                <ListItemSecondaryAction>
                                    <IconButton
                                        edge="end"
                                        aria-label="delete"
                                        onClick={() => onDelete(c.id)}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            ) : null}
                        </ListItem>
                    );
                })}
            </List>
        </Box>
    );
}
