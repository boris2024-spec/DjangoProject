import React, { useMemo, useState } from 'react';
import {
    AppBar,
    Box,
    Button,
    Drawer,
    IconButton,
    List,
    ListItemButton,
    ListItemText,
    Toolbar,
    Typography,
    useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import { useAuth } from '../context/AuthContext.jsx';
import { useSnackbar } from '../context/SnackbarContext.jsx';
import { useThemeMode } from '../context/ThemeContext.jsx';

export default function Header() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const navigate = useNavigate();

    const { isAuthenticated, isAdmin, logout } = useAuth();
    const { showSnackbar } = useSnackbar();
    const { mode, toggleMode } = useThemeMode();

    const [drawerOpen, setDrawerOpen] = useState(false);

    const navItems = useMemo(() => {
        const items = [{ label: 'Home', to: '/' }];

        if (!isAuthenticated) {
            items.push({ label: 'Login', to: '/login' });
            items.push({ label: 'Register', to: '/register' });
        } else {
            items.push({ label: 'Logout', action: 'logout' });
        }

        if (isAdmin) {
            items.push({ label: 'Admin', to: '/admin' });
        }

        return items;
    }, [isAuthenticated, isAdmin]);

    const handleNavClick = (item) => {
        if (item.action === 'logout') {
            logout();
            showSnackbar('Logged out successfully.', 'success');
            setDrawerOpen(false);
            navigate('/');
            return;
        }

        if (item.to) {
            setDrawerOpen(false);
            navigate(item.to);
        }
    };

    const ThemeToggleButton = (
        <IconButton color="inherit" onClick={toggleMode} aria-label="Toggle dark mode">
            {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
    );

    return (
        <AppBar position="sticky">
            <Toolbar>
                {isMobile ? (
                    <IconButton
                        color="inherit"
                        edge="start"
                        onClick={() => setDrawerOpen(true)}
                        aria-label="Open menu"
                        sx={{ mr: 1 }}
                    >
                        <MenuIcon />
                    </IconButton>
                ) : null}

                <Typography
                    variant="h6"
                    component={RouterLink}
                    to="/"
                    color="inherit"
                    sx={{ textDecoration: 'none', flex: 1 }}
                >
                    Articles Portal
                </Typography>

                {!isMobile ? (
                    <Box display="flex" alignItems="center" gap={1}>
                        {navItems.map((item) => {
                            if (item.action === 'logout') {
                                return (
                                    <Button key={item.label} color="inherit" onClick={() => handleNavClick(item)}>
                                        {item.label}
                                    </Button>
                                );
                            }

                            return (
                                <Button
                                    key={item.label}
                                    color="inherit"
                                    component={RouterLink}
                                    to={item.to}
                                >
                                    {item.label}
                                </Button>
                            );
                        })}
                        {ThemeToggleButton}
                    </Box>
                ) : (
                    ThemeToggleButton
                )}
            </Toolbar>

            <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                <Box sx={{ width: 260 }} role="presentation">
                    <List>
                        {navItems.map((item) => (
                            <ListItemButton key={item.label} onClick={() => handleNavClick(item)}>
                                <ListItemText primary={item.label} />
                            </ListItemButton>
                        ))}
                        <ListItemButton
                            onClick={() => {
                                toggleMode();
                                setDrawerOpen(false);
                            }}
                        >
                            <ListItemText primary={mode === 'dark' ? 'Light mode' : 'Dark mode'} />
                        </ListItemButton>
                    </List>
                </Box>
            </Drawer>
        </AppBar>
    );
}
