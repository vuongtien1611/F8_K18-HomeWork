import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, MenuItem, Box, Typography, CircularProgress, Chip, Stack, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const BASE_URL = "https://k305jhbh09.execute-api.ap-southeast-1.amazonaws.com";
const api = axios.create({ baseURL: BASE_URL });

api.interceptors.request.use(config => {
    const token = localStorage.getItem('accessToken');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

api.interceptors.response.use(res => res, async error => {
    if (error.response?.status === 400) {
        localStorage.clear();
        window.location.reload();
    }
    return Promise.reject(error);
});

const RANKS = ['SILVER', 'GOLD', 'BRONZE'];
const getRankColor = (rank: string) => {
    if (rank === 'GOLD') return 'warning';
    if (rank === 'BRONZE') return 'error';
    return 'info';
};

const CustomerManager = () => {
    const [customers, setCustomers] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [currentCustomer, setCurrentCustomer] = useState({ id: '', name: '', email: '', phone: '', address: '', rank: 'BRONZE' });

    const fetchCustomers = async () => {
        setLoading(true);
        try { const res = await api.get('/customers'); setCustomers(res.data); } catch (e) { console.error(e); }
        setLoading(false);
    };

    useEffect(() => { fetchCustomers(); }, []);

    const handleDelete = async (id: number, name: string) => {
        if (window.confirm(`Bạn có chắc chắn muốn xóa "${name}"?`)) {
            try {
                await api.delete(`/customers/${id}`);
                setCustomers(prev => prev.filter(c => c.id !== id));
            } catch (e: any) {
                alert("Lỗi: " + (e.response?.data?.message || "Không thể xóa (có thể do khách hàng đã có đơn hàng)"));
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const { id, ...payload } = currentCustomer;

        try {
            if (isEdit && id) await api.put(`/customers/${id}`, payload);
            else await api.post('/customers', payload);
            fetchCustomers();
            setShowModal(false);
        } catch (err: any) {
            alert("Lỗi: " + (err.response?.data?.message || "Không thể lưu"));
        }
    };

    return (
        <Container sx={{ mt: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h4">Khách hàng</Typography>
                <Button variant="contained" color="success" startIcon={<AddIcon />}
                        onClick={() => { setIsEdit(false); setCurrentCustomer({ id: '', name: '', email: '', phone: '', address: '', rank: 'BRONZE' }); setShowModal(true); }}>
                    Thêm mới
                </Button>
            </Box>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow><TableCell>Họ tên</TableCell><TableCell>SĐT</TableCell><TableCell>Hạng</TableCell><TableCell align="center">Thao tác</TableCell></TableRow>
                    </TableHead>
                    <TableBody>
                        {customers.map(c => (
                            <TableRow key={c.id}>
                                <TableCell>{c.name}</TableCell>
                                <TableCell>{c.phone}</TableCell>
                                <TableCell><Chip label={c.rank} color={getRankColor(c.rank) as any} size="small" variant="outlined"/></TableCell>
                                <TableCell align="center">
                                    <IconButton onClick={() => { setCurrentCustomer(c); setIsEdit(true); setShowModal(true); }}><EditIcon color="primary"/></IconButton>
                                    <IconButton onClick={() => handleDelete(c.id, c.name)}><DeleteIcon color="error"/></IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog open={showModal} onClose={() => setShowModal(false)} fullWidth maxWidth="xs">
                <form onSubmit={handleSubmit}>
                    <DialogTitle>{isEdit ? "Sửa" : "Thêm"} khách hàng</DialogTitle>
                    <DialogContent dividers>
                        <Stack spacing={2} sx={{ mt: 1 }}>
                            <TextField fullWidth label="Họ tên" required value={currentCustomer.name} onChange={e => setCurrentCustomer({...currentCustomer, name: e.target.value})} />
                            <TextField fullWidth label="Email" required value={currentCustomer.email} onChange={e => setCurrentCustomer({...currentCustomer, email: e.target.value})} />
                            <TextField fullWidth label="Điện thoại" required value={currentCustomer.phone} onChange={e => setCurrentCustomer({...currentCustomer, phone: e.target.value})} />
                            <TextField fullWidth label="Địa chỉ" value={currentCustomer.address} onChange={e => setCurrentCustomer({...currentCustomer, address: e.target.value})} />
                            <TextField select fullWidth label="Hạng" value={currentCustomer.rank} onChange={e => setCurrentCustomer({...currentCustomer, rank: e.target.value})}>
                                {RANKS.map(r => <MenuItem key={r} value={r}>{r}</MenuItem>)}
                            </TextField>
                        </Stack>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setShowModal(false)}>Hủy</Button>
                        <Button type="submit" variant="contained">Lưu</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </Container>
    );
};
export default CustomerManager;