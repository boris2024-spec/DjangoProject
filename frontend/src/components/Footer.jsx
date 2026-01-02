import React from 'react';
import { Box, Container, Typography } from '@mui/material';

export default function Footer() {
    return (
        <Box component="footer" sx={{ py: 2, borderTop: 1, borderColor: 'divider' }}>
            <Container>
                <Typography variant="body2" color="text.secondary" align="center">
                    Articles Portal — built with Django, DRF, React, and MUI.
                </Typography>
            </Container>
        </Box>
    );
}
