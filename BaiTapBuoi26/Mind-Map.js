/*

HỆ THỐNG ĐẶT HÀNG
│
├── DỮ LIỆU GỐC
│   │
│   ├── products (sản phẩm)
│   │   ├── id
│   │   ├── name
│   │   ├── price
│   │   └── remaining (số lượng còn)
│   │
│   └── orders (đơn hàng)
│       ├── id (tự tăng)
│       ├── productId
│       └── quantity
│
├── BIẾN QUẢN LÝ
│   │
│   ├── orders = []          (lưu danh sách đơn)
│   └── nextOrderId = 1      (tạo id không trùng)
│
├── CHỨC NĂNG 1: createOrder
│   │
│   ├── B1: Kiểm tra input
│   │   ├── productId != null
│   │   └── orderQty != null
│   │
│   ├── B2: Kiểm tra quantity
│   │   └── orderQty > 0
│   │
│   ├── B3: Tìm product theo productId
│   │   ├── không tìm thấy → "Product not found"
│   │
│   ├── B4: Kiểm tra tồn kho
│   │   ├── remaining < orderQty → "out of stock"
│   │
│   ├── B5: Tạo order
│   │   ├── id = nextOrderId++
│   │   ├── productId
│   │   └── quantity
│   │
│   ├── B6: Lưu order
│   │   └── push vào orders
│   │
│   └── B7: Trừ kho
│       └── product.remaining -= orderQty
│
├── CHỨC NĂNG 2: updateOrder
│   │
│   ├── B1: Kiểm tra quantity mới
│   │   └── newQty > 0
│   │
│   ├── B2: Tìm order theo orderId
│   │   ├── không tìm thấy → "not found"
│   │
│   ├── B3: Tìm product liên quan
│   │
│   ├── B4: Tính chênh lệch
│   │   └── diff = newQty - oldQty
│   │
│   ├── B5: Nếu tăng số lượng
│   │   ├── diff > 0
│   │   └── remaining < diff → "out of stock"
│   │
│   ├── B6: Cập nhật kho
│   │   └── remaining -= diff
│   │
│   └── B7: Cập nhật order.quantity
│
├── CHỨC NĂNG 3: deleteOrder
│   │
│   ├── B1: Tìm order theo orderId
│   │   ├── không tìm thấy → "not found"
│   │
│   ├── B2: Tìm product liên quan
│   │
│   ├── B3: Hoàn kho
│   │   └── product.remaining += order.quantity
│   │
│   └── B4: Xoá order
│       └── splice khỏi orders
│
└── LUẬT BẤT BIẾN (QUAN TRỌNG)
    │
    ├── remaining ≥ 0
    ├── order.id không trùng
    ├── không tạo order rác
    └── update / delete phải khôi phục kho đúng

 */

