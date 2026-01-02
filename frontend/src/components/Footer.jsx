import React from 'react';
import { Box, Container, IconButton, Stack, Typography } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TelegramIcon from '@mui/icons-material/Telegram';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';

export default function Footer() {
    return (
        <Box component="footer" sx={{ py: 2, borderTop: 1, borderColor: 'divider' }}>
            <Container>
                <Typography variant="body2" color="text.secondary" align="center">
                    Articles Portal — built with Django, DRF, React, and MUI.
                </Typography>

                <Stack direction="row" spacing={1} justifyContent="center" sx={{ mt: 1 }}>
                    <IconButton
                        component="a"
                        href="https://www.facebook.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Facebook"
                        size="small"
                        sx={{ color: 'text.secondary', '&:hover': { color: 'text.primary' } }}
                    >
                        <FacebookIcon fontSize="small" />
                    </IconButton>

                    <IconButton
                        component="a"
                        href="https://www.instagram.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Instagram"
                        size="small"
                        sx={{ color: 'text.secondary', '&:hover': { color: 'text.primary' } }}
                    >
                        <InstagramIcon fontSize="small" />
                    </IconButton>

                    <IconButton
                        component="a"
                        href="https://t.me/"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Telegram"
                        size="small"
                        sx={{ color: 'text.secondary', '&:hover': { color: 'text.primary' } }}
                    >
                        <TelegramIcon fontSize="small" />
                    </IconButton>

                    <IconButton
                        component="a"
                        href="https://github.com/boris2024-spec/DjangoProject"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub"
                        size="small"
                        sx={{ color: 'text.secondary', '&:hover': { color: 'text.primary' } }}
                    >
                        <GitHubIcon fontSize="small" />
                    </IconButton>

                    <IconButton
                        component="a"
                        href="https://x.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Twitter"
                        size="small"
                        sx={{ color: 'text.secondary', '&:hover': { color: 'text.primary' } }}
                    >
                        <TwitterIcon fontSize="small" />
                    </IconButton>
                </Stack>
            </Container>
        </Box>
    );
}
