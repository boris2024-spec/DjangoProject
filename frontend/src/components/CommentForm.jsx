import React, { useState } from 'react';
import { Box, Button, TextField } from '@mui/material';

export default function CommentForm({ onSubmit, loading }) {
    const [text, setText] = useState('');

    const submit = async (e) => {
        e.preventDefault();
        const trimmed = text.trim();
        if (!trimmed) return;

        await onSubmit(trimmed);
        setText('');
    };

    return (
        <Box component="form" onSubmit={submit} sx={{ mt: 2 }}>
            <TextField
                label="Add a comment"
                value={text}
                onChange={(e) => setText(e.target.value)}
                fullWidth
                multiline
                minRows={2}
            />
            <Box sx={{ mt: 1, display: 'flex', justifyContent: 'flex-end' }}>
                <Button type="submit" variant="contained" disabled={loading}>
                    Post comment
                </Button>
            </Box>
        </Box>
    );
}
