import React, { useState, useEffect } from 'react';
import {
  Container, Box, TextField, Button, Typography,
  Paper, Alert, CircularProgress
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.clear();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Vui lòng nhập đầy đủ Email và Mật khẩu");
      return;
    }

    try {
      setLoading(true);
      setError(null);


      const { data } = await api.post('/auth/signin', { email, password });


      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);

      navigate('/products');
    } catch (err: any) {
      console.error("Login error:", err);


      const serverMessage = err.response?.data?.message;

      if (err.response?.status === 400) {
        setError(serverMessage === "token expired" ? "Phiên làm việc cũ đã hết hạn. Hãy thử đăng nhập lại." : "Thông tin đăng nhập không hợp lệ.");
      } else if (err.response?.status === 401) {
        setError("Email hoặc Mật khẩu không chính xác.");
      } else {
        setError("Không thể kết nối đến máy chủ. Vui lòng thử lại sau.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <Paper elevation={6} sx={{ p: 4, width: '100%', borderRadius: 3, textAlign: 'center' }}>

          <Typography variant="h5" fontWeight="bold" gutterBottom>
            ĐĂNG NHẬP HỆ THỐNG
          </Typography>

          <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
            Sử dụng tài khoản quản trị để tiếp tục
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2, textAlign: 'left' }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleLogin} noValidate>
            <TextField
              margin="normal"
              fullWidth
              label="Địa chỉ Email"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) setError(null);
              }}
              disabled={loading}
            />
            <TextField
              margin="normal"
              fullWidth
              name="password"
              label="Mật khẩu"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (error) setError(null);
              }}
              disabled={loading}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{
                mt: 3,
                mb: 2,
                py: 1.5,
                textTransform: 'none',
                fontSize: '1rem',
                fontWeight: 'bold',
                borderRadius: 2
              }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Đăng nhập ngay'}
            </Button>
          </Box>
        </Paper>

        <Typography variant="body2" color="textSecondary" sx={{ mt: 4 }}>
          © {new Date().getFullYear()} Quản lý kho sản phẩm
        </Typography>
      </Box>
    </Container>
  );
};

export default Login;