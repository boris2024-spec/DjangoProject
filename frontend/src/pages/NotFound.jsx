import React from 'react';
import { Button, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export default function NotFound() {
    return (
        <div>
            <Typography variant="h4" gutterBottom>
                Page not found
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                The page you are looking for does not exist.
            </Typography>
            <Button variant="contained" component={RouterLink} to="/">
                Go Home
            </Button>
        </div>
    );
}
