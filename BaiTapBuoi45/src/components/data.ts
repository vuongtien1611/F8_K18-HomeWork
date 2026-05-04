export interface Question {
  id: number;
  content: string;
  options: string[];
  answer: number;
}

export const questions: Question[] = [
  { id: 1,
    content: "Khái niệm 'đường bộ' được hiểu như thế nào là đúng?",
    options: [
      "Đường, cầu đường bộ.",
      "Hầm đường bộ, bến phà đường bộ.",
      "Đường, cầu đường bộ, hầm đường bộ, bến phà đường bộ và các công trình phụ trợ."
    ],
    answer: 2
  },
  { id: 2,
    content: "Người lái xe được hiểu như thế nào là đúng?",
    options: ["Là người điều khiển xe cơ giới.",
      "Là người điều khiển xe thô sơ.",
      "Là người điều khiển xe có súc vật kéo."
    ],
    answer: 0
  },
  { id: 3,
    content: "Cuộc đua xe chỉ được thực hiện khi nào?",
    options: ["Diễn ra trên đường phố không có người qua lại.",
      "Được người dân ủng hộ.", "Được cơ quan có thẩm quyền cấp phép."
    ],
    answer: 2
  },
  { id: 4,
    content: "Người điều khiển xe mô tô hai bánh, xe gắn máy có được đi xe dàn hàng ngang không?",
    options: [
      "Không được phép.",
      "Được phép tùy theo tình huống giao thông.",
      "Được phép nếu đường rộng."
    ],
    answer: 0 },
  { id: 5,
    content: "Biển báo hiệu hình tròn, có viền đỏ, nền trắng, trên nền có hình vẽ hoặc chữ số, chữ viết màu đen là loại biển gì?",
    options: ["Biển báo nguy hiểm.",
      "Biển báo cấm.",
      "Biển báo hiệu lệnh.",
      "Biển báo chỉ dẫn."
    ],
    answer: 1
  },
  { id: 6,
    content: "Khi gặp một đoàn xe tang hay một đoàn người đi xe đạp có tổ chức, người lái xe phải xử lý như thế nào?",
    options: ["Bóp còi, rú ga để cắt qua.",
      "Không được cắt ngang qua đoàn người, đoàn xe.",
      "Báo hiệu từ từ cho xe đi qua."
    ],
    answer: 1
  },
  { id: 7,
    content: "Người đủ bao nhiêu tuổi trở lên thì được điều khiển xe mô tô từ 50 cm3 trở lên?",
    options: [
      "16 tuổi.",
      "18 tuổi.",
      "20 tuổi."
    ],
    answer: 1 }
];