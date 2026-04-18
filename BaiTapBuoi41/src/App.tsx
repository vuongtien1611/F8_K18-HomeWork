import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography, Button, Box, CssBaseline } from "@mui/material";
import Login from "./components/Login.tsx";
import CustomerManager from "./components/CustomerManager.tsx";

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (token) setIsLoggedIn(true);
    }, []);

    const handleLoginSuccess = () => setIsLoggedIn(true);

    const handleLogout = () => {
        localStorage.clear();
        setIsLoggedIn(false);
    };

    if (!isLoggedIn) {
        return <Login onLoginSuccess={handleLoginSuccess} />;
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: '#f4f6f8' }}>
            <CssBaseline />

            <AppBar position="static" elevation={1} sx={{ bgcolor: '#ffffff', color: '#1a1a1a' }}>
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="h6" component="div" fontWeight="bold" sx={{ letterSpacing: 0.5 }}>
                        HỆ THỐNG QUẢN LÝ
                    </Typography>
                    <Button
                        variant="outlined"
                        color="error"
                        onClick={handleLogout}
                        sx={{ textTransform: 'none', borderRadius: 2 }}
                    >
                        Đăng xuất
                    </Button>
                </Toolbar>
            </AppBar>

            <Box component="main" sx={{ flexGrow: 1 }}>
                <CustomerManager />
            </Box>
        </Box>
    );
};

export default App;