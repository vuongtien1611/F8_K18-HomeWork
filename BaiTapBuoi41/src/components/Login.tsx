import React, { useState } from 'react';
import axios from 'axios';
import {
    Container,
    Card,
    CardContent,
    Typography,
    TextField,
    Button,
    Alert,
    Box
} from '@mui/material';

const AUTH_URL = "https://k305jhbh09.execute-api.ap-southeast-1.amazonaws.com/auth/signin";

const Login = ({ onLoginSuccess }: { onLoginSuccess: () => void }) => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [error, setError] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await axios.post(AUTH_URL, credentials);
            localStorage.setItem('accessToken', res.data.accessToken);
            localStorage.setItem('refreshToken', res.data.refreshToken);
            onLoginSuccess();
        } catch (err) {
            setError("Sai email hoặc mật khẩu!");
        }
    };

    return (
        <Container maxWidth="xs" sx={{ mt: 8 }}>
            <Card sx={{ p: 2, boxShadow: 3 }}>
                <CardContent>
                    <Typography variant="h5" align="center" gutterBottom>
                        Đăng Nhập
                    </Typography>

                    {error && (
                        <Alert severity="error" sx={{ mb: 2 }}>
                            {error}
                        </Alert>
                    )}

                    <Box component="form" onSubmit={handleLogin} noValidate>
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Email"
                            type="email"
                            required
                            onChange={e => setCredentials({...credentials, email: e.target.value})}
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Mật khẩu"
                            type="password"
                            required
                            onChange={e => setCredentials({...credentials, password: e.target.value})}
                        />
                        <Button
                            fullWidth
                            type="submit"
                            variant="contained"
                            sx={{ mt: 3, mb: 1, py: 1.5 }}
                        >
                            Đăng nhập
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </Container>
    );
};

export default Login;