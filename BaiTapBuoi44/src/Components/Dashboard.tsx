import { useState, useMemo } from 'react';
import {
  Container, Typography, Button, Box,
  Table, TableBody, TableHead, TableRow,
  TableCell, Paper, TableContainer, Grid, Card, CardContent
} from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
import OrderRow, { type Order } from './OrderTable';

interface DashboardProps {
  orders: Order[];
}

const Dashboard = ({ orders }: DashboardProps) => {
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);

  // Lọc theo ngày + Sắp xếp ngày tăng dần
  const filteredOrders = useMemo(() => {
    const result = orders.filter((order) => {
      const orderDate = dayjs(order.ngayTao);
      const isAfterStart = startDate ? orderDate.isSame(startDate, 'day') || orderDate.isAfter(startDate, 'day') : true;
      const isBeforeEnd = endDate ? orderDate.isSame(endDate, 'day') || orderDate.isBefore(endDate, 'day') : true;
      return isAfterStart && isBeforeEnd;
    });

    return result.sort((a, b) => dayjs(a.ngayTao).unix() - dayjs(b.ngayTao).unix());
  }, [orders, startDate, endDate]);

  // Tính tổng doanh thu cho các đơn "Hoàn thành"
  const totalRevenue = useMemo(() => {
    return filteredOrders
      .filter(o => o.trangThai === 'Hoàn thành')
      .reduce((sum, o) => sum + o.giaTri, 0);
  }, [filteredOrders]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ bgcolor: '#f4f6f8', minHeight: '100vh', py: 4 }}>
        <Container maxWidth="lg">
          <Grid container spacing={3} sx={{ mb: 6, alignItems: 'stretch' }}>

            {/* Số lượng đơn hàng */}
            <Grid size={{ xs: 6 }} sx={{ display: 'flex' }}>
              <Card
                sx={{
                  borderLeft: '4px solid #1976d2',
                  borderRadius: 2,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center'
                }}
              >
                <CardContent sx={{ py: 3 }}>
                  <Typography color="textSecondary" variant="body2" sx={{ mb: 1, textAlign: 'left' }}>
                    Số lượng đơn hàng
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'baseline' }}>
                    <Typography
                      variant="h4"
                      sx={{ mr: 1, fontWeight: 'bold' }}
                    >
                      {filteredOrders.length}
                    </Typography>
                    <Typography variant="h6" color="textSecondary">đơn</Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/*Tổng doanh thu */}
            <Grid size={{ xs: 6 }} sx={{ display: 'flex' }}>
              <Card
                sx={{
                  borderLeft: '4px solid #2e7d32',
                  borderRadius: 2,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center'
                }}
              >
                <CardContent sx={{ py: 3 }}>
                  <Typography color="textSecondary" variant="body2" sx={{ mb: 1, textAlign: 'left' }}>
                    Tổng doanh thu (Hoàn thành)
                  </Typography>
                  <Typography
                    variant="h4"
                    color="success.main"
                    sx={{ fontWeight: 'bold', textAlign: 'left' }}
                  >
                    {totalRevenue.toLocaleString('vi-VN')}
                    <Typography
                      component="span"
                      variant="h4"
                      sx={{ ml: 1, textDecoration: 'underline', fontWeight: 'bold' }}
                    >
                      đ
                    </Typography>
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          {/* Bộ lọc */}
          <Card sx={{ mb: 4, p: 3, borderRadius: 2 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>Bộ lọc theo ngày</Typography>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
              <DatePicker label="Từ ngày" value={startDate} onChange={setStartDate} slotProps={{ textField: { size: 'small' } }} />
              <DatePicker label="Đến ngày" value={endDate} onChange={setEndDate} slotProps={{ textField: { size: 'small' } }} />
              <Button onClick={() => { setStartDate(null); setEndDate(null); }}>Xóa bộ lọc</Button>
            </Box>
          </Card>

          {/* Bảng danh sách */}
          <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
            <Box sx={{ p: 2, borderBottom: '1px solid #eee' }}>
              <Typography variant="h6" fontWeight="bold">Danh sách đơn hàng</Typography>
            </Box>
            <Table>
              <TableHead sx={{ bgcolor: '#f8f9fa' }}>
                <TableRow>
                  <TableCell>Mã DH</TableCell>
                  <TableCell>Khách hàng</TableCell>
                  <TableCell>Ngày tạo</TableCell>
                  <TableCell>Giá trị</TableCell>
                  <TableCell>Trạng thái</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredOrders.map((item) => (
                  <OrderRow key={item.maDH} order={item} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </Box>
    </LocalizationProvider>
  );
};

export default Dashboard;