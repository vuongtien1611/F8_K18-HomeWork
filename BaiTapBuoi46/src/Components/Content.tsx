import React from 'react';
import { Container, Paper, Typography, Divider } from '@mui/material';

const Content: React.FC = () => {
  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h4" gutterBottom color="primary">
           Giới Thiệu Về useContext
        </Typography>
        <Divider sx={{ mb: 3 }} />
        <Typography
          variant="body1"
          paragraph
          sx={{
            fontSize: '1.1rem',
            lineHeight: 1.8,
            textAlign: 'justify',
            textIndent: '2em',

          }}
        >
          useContext là một React Hook cho phép component đọc và đăng ký theo dõi dữ liệu (context) từ xa mà không cần truyền props thủ công qua từng tầng (prop drilling). Nó giúp chia sẻ dữ liệu toàn cục (như theme, user login) dễ dàng, cú pháp gọn nhẹ const value = useContext(SomeContext).Các đặc điểm chính của useContext:Truyền dữ liệu sâu: Giúp đưa dữ liệu xuống các component con nằm sâu trong cây component mà không cần thông qua các component trung gian.Chia sẻ State: useContext thường được kết hợp với useState hoặc useReducer để quản lý và chia sẻ state toàn cục trong ứng dụng.Tối ưu hóa: Có thể tối ưu hóa re-render khi truyền các đối tượng và hàm.Cách sử dụng:Tạo context bằng createContext.Bọc component cha bằng Context.Provider để cung cấp giá trị.Sử dụng useContext(Context) trong component con để lấy giá trị

        </Typography>
      </Paper>
    </Container>
  );
};

export default Content;