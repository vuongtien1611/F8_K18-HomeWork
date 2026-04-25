import Dashboard from './Components/Dashboard';
import {type  Order } from './Components/OrderTable';


const CUSTOMERS = [
  'Nguyễn Văn An',
  'Trần Thị Bưởi',
  'Lê Văn Cừ',
  'Phạm Thị Dung',
  'Hoàng Cửu Bảo',
  'Lê Bảo Bình',
  'Đặng Văn Cường',
  'Bùi Thị Hoài'
];

const STATUSES = ['Hoàn thành', 'Đang xử lý', 'Đã hủy'];

const RandomOders: Order[] = Array.from({ length: 1000 }, (_, i) => {
  const customerName = CUSTOMERS[i % CUSTOMERS.length];

  const day = (i % 31) + 1;
  const dateStr = `2026-04-${day < 10 ? '0' + day : day}`;

  return {
    maDH: `ORD-${(i + 1).toString().padStart(3, '0')}`,
    khachHang: customerName,
    ngayTao: dateStr,
    giaTri: (Math.floor(Math.random() * 10) + 1) * 500000,
    trangThai: STATUSES[i % STATUSES.length]
  };
});

function App() {
  return (
    <div className="App">
      <Dashboard orders={RandomOders} />
    </div>
  );
}

export default App;