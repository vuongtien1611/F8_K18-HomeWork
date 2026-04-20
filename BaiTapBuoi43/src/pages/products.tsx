import React, { useState, useEffect, useCallback } from 'react';
import {
  Container, Typography, Box, TextField, Button, Paper,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Autocomplete, CircularProgress, Avatar, Alert
} from '@mui/material';
import api from '../services/api';

interface Category {
  id: number;
  name: string;
}

interface Product {
  id: number;
  name: string;
  sku: string;
  price: number;
  remaining: number;
  imageUrl: string;
  category: Category;
}

const ProductPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get('/products');
      if (response.data) {
        const data = Array.isArray(response.data) ? response.data : response.data.products || [];
        setProducts(data);
      }
    } catch (err: any) {
      console.error("Fetch error details:", err);
      const status = err.response?.status;
      const message = err.response?.data?.message;

      if (status === 401 || status === 403 || (status === 400 && message === "token expired")) {
        localStorage.clear();
        alert("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại!");
        window.location.replace('/login');
        return;
      }
      setError(message || "Lỗi kết nối API AWS");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleLogout = () => {
    localStorage.clear();
    window.location.replace('/login');
  };

  const filteredProducts = selectedProduct
    ? products.filter(p => p.id === selectedProduct.id)
    : products;

  return (
    <Container maxWidth="xl" sx={{ mt: 5, mb: 5 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4, alignItems: 'center' }}>
        <Typography variant="h4" fontWeight="bold" color="primary">
          Quản Lý Sản Phẩm
        </Typography>
        <Button
          variant="contained"
          color="error"
          onClick={handleLogout}
          sx={{ textTransform: 'none', fontWeight: 'bold', borderRadius: 2 }}
        >
          Đăng xuất
        </Button>
      </Box>

      <Paper elevation={2} sx={{ p: 2, mb: 3, display: 'flex', alignItems: 'center', gap: 2, borderRadius: 2 }}>
        <Typography variant="body1" fontWeight="bold">Tìm kiếm:</Typography>
        <Autocomplete
          options={products}
          getOptionLabel={(option) => `${option.name} (${option.sku})`}
          sx={{ width: 450 }}
          value={selectedProduct}
          onChange={(_, newValue) => setSelectedProduct(newValue)}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          renderInput={(params) => (
            <TextField {...params} label="Tìm theo tên hoặc mã SKU..." size="small" />
          )}
        />
        {selectedProduct && (
          <Button size="small" onClick={() => setSelectedProduct(null)} sx={{ textTransform: 'none' }}>
            Hiển thị tất cả
          </Button>
        )}
      </Paper>

      {error && <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>{error}</Alert>}

      <TableContainer component={Paper} elevation={4} sx={{ borderRadius: 3, overflow: 'hidden' }}>
        <Table sx={{ minWidth: 800 }}>
          <TableHead sx={{ bgcolor: '#f8f9fa' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Sản phẩm</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>SKU</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Danh mục</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Giá bán</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Tồn kho</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 10 }}>
                  <CircularProgress size={40} />
                  <Typography sx={{ mt: 2, color: 'text.secondary' }}>Đang kết nối AWS...</Typography>
                </TableCell>
              </TableRow>
            ) : filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <TableRow key={product.id} hover>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar
                        variant="rounded"
                        src={product.imageUrl}
                        sx={{ width: 48, height: 48, border: '1px solid #f0f0f0' }}
                      >
                        {product.name?.[0] || 'P'}
                      </Avatar>
                      <Typography variant="subtitle2" fontWeight="600">
                        {product.name}
                      </Typography>
                    </Box>
                  </TableCell>

                  <TableCell>
                    <Typography variant="caption" sx={{ bgcolor: '#eee', px: 1, py: 0.5, borderRadius: 1, fontWeight: 'bold' }}>
                      {product.sku}
                    </Typography>
                  </TableCell>

                  <TableCell>{product.category?.name || 'N/A'}</TableCell>

                  <TableCell sx={{ color: 'primary.main', fontWeight: 'bold' }}>
                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}
                  </TableCell>

                  <TableCell>
                    <Typography
                      variant="body2"
                      sx={{fontWeight: 'bold'}}
                      color={Number(product.remaining) < 5 ? 'error' : 'success'}
                    >
                      {product.remaining} {product.category?.name?.toLowerCase().includes('phụ kiện') ? 'cái' : 'máy'}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 8 }}>
                  <Typography color="text.secondary">Không tìm thấy dữ liệu phù hợp.</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
        <Button
          variant="outlined"
          onClick={loadData}
          disabled={loading}
          sx={{ textTransform: 'none', px: 6, borderRadius: 2 }}
        >
          Làm mới bảng
        </Button>
      </Box>
    </Container>
  );
};

export default ProductPage;