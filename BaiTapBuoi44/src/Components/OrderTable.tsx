import React from 'react';
import { TableRow, TableCell, Chip, Typography } from '@mui/material';

export interface Order {
  maDH: string;
  khachHang: string;
  ngayTao: string;
  giaTri: number;
  trangThai: string;
}

const OrderRow = React.memo(({ order }: { order: Order }) => {
  const getStatusChip = (status: string) => {
    switch (status) {
      case 'Hoàn thành':
        return <Chip label="Hoàn thành" size="small" sx={{ bgcolor: '#e8f5e9', color: '#2e7d32', fontWeight: 'bold' }} />;
      case 'Đang xử lý':
        return <Chip label="Đang xử lý" size="small" sx={{ bgcolor: '#fff3e0', color: '#ef6c00', fontWeight: 'bold' }} />;
      case 'Đã hủy':
        return <Chip label="Đã hủy" size="small" sx={{ bgcolor: '#ffd9d9', color: '#ff0000', fontWeight: 'bold' }} />;
      default:
        return <Chip label={status} size="small" />;
    }
  };

  return (
    <TableRow sx={{ '&:hover': { bgcolor: '#fcfcfc' } }}>
      <TableCell sx={{ color: '#555' }}>{order.maDH}</TableCell>
      <TableCell sx={{ color: '#555' }}>{order.khachHang}</TableCell>
      <TableCell sx={{ color: '#555' }}>{order.ngayTao}</TableCell>
      <TableCell>
        <Typography fontWeight="bold" variant="body2">
          {order.giaTri.toLocaleString('vi-VN')} <Typography component="span" variant="body2" sx={{ textDecoration: 'underline' }}>đ</Typography>
        </Typography>
      </TableCell>
      <TableCell>{getStatusChip(order.trangThai)}</TableCell>
    </TableRow>
  );
});

OrderRow.displayName = 'OrderRow';
export default OrderRow;