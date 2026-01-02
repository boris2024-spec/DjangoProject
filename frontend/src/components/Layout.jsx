import React from 'react';
import { Box, Container } from '@mui/material';
import { Outlet } from 'react-router-dom';

import Header from './Header.jsx';
import Footer from './Footer.jsx';

export default function Layout() {
    return (
        <Box minHeight="100vh" display="flex" flexDirection="column">
            <Header />
            <Container component="main" sx={{ py: 3, flex: 1 }}>
                <Outlet />
            </Container>
            <Footer />
        </Box>
    );
}
