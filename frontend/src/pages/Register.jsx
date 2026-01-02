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
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import { useAuth } from '../context/AuthContext.jsx';
import { useSnackbar } from '../context/SnackbarContext.jsx';

export default function Register() {
    const { register } = useAuth();
    const { showSnackbar } = useSnackbar();
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const submit = async (e) => {
        e.preventDefault();

        if (!username.trim() || !password) {
            showSnackbar('Please fill in all fields.', 'warning');
            return;
        }

        if (password.length < 6) {
            showSnackbar('Password must be at least 6 characters.', 'warning');
            return;
        }

        setLoading(true);
        try {
            await register(username.trim(), password);
            showSnackbar('Account created successfully.', 'success');
            navigate('/', { replace: true });
        } catch {
            showSnackbar('Registration failed. Try a different username.', 'error');
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
                            Register
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
                                {loading ? <CircularProgress size={22} /> : 'Register'}
                            </Button>
                            <Button component={RouterLink} to="/login" fullWidth sx={{ mt: 1 }}>
                                Already have an account?
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
}
