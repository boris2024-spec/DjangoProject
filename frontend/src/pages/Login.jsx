import React, { useState } from 'react';
import {
    Box,
    Button,
    Card,
    CardContent,
    CircularProgress,
    TextField,
    Typography,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';

import { useAuth } from '../context/AuthContext.jsx';
import { useSnackbar } from '../context/SnackbarContext.jsx';

export default function Login() {
    const { login } = useAuth();
    const { showSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const location = useLocation();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const from = location.state?.from?.pathname || '/';

    const submit = async (e) => {
        e.preventDefault();
        if (!username.trim() || !password) {
            showSnackbar('Please fill in all fields.', 'warning');
            return;
        }

        setLoading(true);
        try {
            await login(username.trim(), password);
            showSnackbar('Logged in successfully.', 'success');
            navigate(from, { replace: true });
        } catch {
            showSnackbar('Login failed. Please check your credentials.', 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Grid container justifyContent="center">
            <Grid xs={12} sm={8} md={5} lg={4}>
                <Card variant="outlined">
                    <CardContent>
                        <Typography variant="h5" gutterBottom>
                            Login
                        </Typography>
                        <Box component="form" onSubmit={submit}>
                            <TextField
                                label="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                fullWidth
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                label="Password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                fullWidth
                                sx={{ mb: 2 }}
                            />
                            <Button type="submit" variant="contained" fullWidth disabled={loading}>
                                {loading ? <CircularProgress size={22} /> : 'Login'}
                            </Button>
                            <Button
                                component={RouterLink}
                                to="/register"
                                fullWidth
                                sx={{ mt: 1 }}
                            >
                                Create an account
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
}
