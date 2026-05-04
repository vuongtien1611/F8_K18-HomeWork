// import React, { useState, useEffect, ChangeEvent } from 'react';
// import {
//   Box, Container, Grid, Typography, Button, Radio, RadioGroup,
//   FormControlLabel, Paper, AppBar, Toolbar, LinearProgress, Chip
// } from '@mui/material';
// import {
//   ChevronLeft, ChevronRight
// } from '@mui/icons-material';
//
// interface Question {
//   id: number;
//   content: string;
//   options: string[];
//   answer: number;
// }
//
// interface UserAnswers {
//   [key: number]: number;
// }
//
// const questions: Question[] = [
//   { id: 1,
//     content: "Khái niệm 'đường bộ' được hiểu như thế nào là đúng?",
//     options: [
//       "Đường, cầu đường bộ.",
//       "Hầm đường bộ, bến phà đường bộ.",
//       "Đường, cầu đường bộ, hầm đường bộ, bến phà đường bộ và các công trình phụ trợ."
//     ],
//     answer: 2
//   },
//   { id: 2,
//     content: "Người lái xe được hiểu như thế nào là đúng?",
//     options: ["Là người điều khiển xe cơ giới.",
//       "Là người điều khiển xe thô sơ.",
//       "Là người điều khiển xe có súc vật kéo."
//     ],
//     answer: 0
//   },
//   { id: 3,
//     content: "Cuộc đua xe chỉ được thực hiện khi nào?",
//     options: ["Diễn ra trên đường phố không có người qua lại.",
//       "Được người dân ủng hộ.", "Được cơ quan có thẩm quyền cấp phép."
//     ],
//     answer: 2
//   },
//   { id: 4,
//     content: "Người điều khiển xe mô tô hai bánh, xe gắn máy có được đi xe dàn hàng ngang không?",
//     options: [
//       "Không được phép.",
//       "Được phép tùy theo tình huống giao thông.",
//       "Được phép nếu đường rộng."
//     ],
//     answer: 0 },
//   { id: 5,
//     content: "Biển báo hiệu hình tròn, có viền đỏ, nền trắng, trên nền có hình vẽ hoặc chữ số, chữ viết màu đen là loại biển gì?",
//     options: ["Biển báo nguy hiểm.",
//       "Biển báo cấm.",
//       "Biển báo hiệu lệnh.",
//       "Biển báo chỉ dẫn."
//     ],
//     answer: 1
//   },
//   { id: 6,
//     content: "Khi gặp một đoàn xe tang hay một đoàn người đi xe đạp có tổ chức, người lái xe phải xử lý như thế nào?",
//     options: ["Bóp còi, rú ga để cắt qua.",
//       "Không được cắt ngang qua đoàn người, đoàn xe.",
//       "Báo hiệu từ từ cho xe đi qua."
//     ],
//     answer: 1
//   },
//   { id: 7,
//     content: "Người đủ bao nhiêu tuổi trở lên thì được điều khiển xe mô tô từ 50 cm3 trở lên?",
//     options: [
//       "16 tuổi.",
//       "18 tuổi.",
//       "20 tuổi."
//     ],
//     answer: 1 }
// ];
//
// export default function QuizApp() {
//   const [currentIdx, setCurrentIdx] = useState<number>(0);
//   const [userAnswers, setUserAnswers] = useState<UserAnswers>({});
//   const [timeLeft, setTimeLeft] = useState<number>(600);
//   const [isFinished, setIsFinished] = useState<boolean>(false);
//
//   const score = Object.keys(userAnswers).filter(key => {
//     const idx = parseInt(key);
//     return userAnswers[idx] === questions[idx].answer;
//   }).length;
//
//   const progress = (Object.keys(userAnswers).length / questions.length) * 100;
//
//   useEffect(() => {
//     if (timeLeft > 0 && !isFinished) {
//       const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
//       return () => clearInterval(timer);
//     } else if (timeLeft === 0 && !isFinished) {
//       setIsFinished(true);
//     }
//   }, [timeLeft, isFinished]);
//
//   const formatTime = (seconds: number): string => {
//     const mins = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
//   };
//
//   const handleSelectAnswer = (event: ChangeEvent<HTMLInputElement>) => {
//     if (isFinished) return;
//     setUserAnswers({ ...userAnswers, [currentIdx]: parseInt(event.target.value) });
//   };
//
//   const handleFinalSubmit = () => {
//     const totalAnswered = Object.keys(userAnswers).length;
//     const confirmMessage = totalAnswered < questions.length
//       ? `Bạn mới làm ${totalAnswered}/${questions.length} câu. Bạn có chắc chắn muốn nộp bài?`
//       : "Bạn có chắc chắn muốn nộp bài thi?";
//
//     if (window.confirm(confirmMessage)) {
//       setIsFinished(true);
//     }
//   };
//
//   return (
//     <Box sx={{ bgcolor: '#f0f2f5', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
//       <AppBar position="static" sx={{ bgcolor: '#1a237e' }}>
//         <Toolbar sx={{ justifyContent: 'space-between' }}>
//           <Typography variant="h6" sx={{ fontWeight: 800 }}>ÔN THI GPLX</Typography>
//           <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//             <Typography sx={{ fontFamily: 'monospace', fontWeight: 'bold', bgcolor: 'rgba(255,255,255,0.1)', px: 2, py: 0.5, borderRadius: 5 }}>
//               {formatTime(timeLeft)}
//             </Typography>
//             <Button
//               variant="contained" color={isFinished ? "secondary" : "success"}
//               onClick={() => isFinished ? window.location.reload() : handleFinalSubmit()}
//             >
//               {isFinished ? "Làm lại" : "Nộp bài"}
//             </Button>
//           </Box>
//         </Toolbar>
//         <LinearProgress variant="determinate" value={progress} sx={{ height: 4, bgcolor: '#3949ab' }} />
//       </AppBar>
//
//       <Container maxWidth="lg" sx={{ mt: 3, flexGrow: 1, pb: 4 }}>
//         <Grid container spacing={3} alignItems="flex-start">
//
//           <Grid item xs={12} md={8}>
//             <Paper elevation={0} sx={{
//               borderRadius: 4, border: '1px solid #e0e0e0',
//               display: 'flex', flexDirection: 'column',
//               height: '600px',
//               width: '700px',
//               overflow: 'hidden'
//             }}>
//               <Box sx={{ p: 3, borderBottom: '1px solid #f0f0f0', display: 'flex', justifyContent: 'space-between' }}>
//                 <Chip label={`Câu hỏi ${currentIdx + 1}`} color="primary" sx={{ fontWeight: 'bold' }} />
//                 {isFinished && (
//                   <Typography variant="body2" color={userAnswers[currentIdx] === questions[currentIdx].answer ? "success.main" : "error.main"} sx={{ fontWeight: 'bold' }}>
//                     {userAnswers[currentIdx] === questions[currentIdx].answer ? "CHÍNH XÁC" : "SAI RỒI"}
//                   </Typography>
//                 )}
//               </Box>
//
//               <Box sx={{
//                 p: 3, flexGrow: 1, overflowY: 'auto', // Tự cuộn nếu nội dung quá dài
//                 bgcolor: '#fff',
//                 '&::-webkit-scrollbar': { width: '6px' },
//                 '&::-webkit-scrollbar-thumb': { bgcolor: '#ddd', borderRadius: '10px' }
//               }}>
//                 <Typography variant="h5" sx={{ mb: 4, fontWeight: 700, color: '#1a237e', lineHeight: 1.5 }}>
//                   {questions[currentIdx].content}
//                 </Typography>
//
//                 <RadioGroup value={userAnswers[currentIdx] ?? ""} onChange={handleSelectAnswer} sx={{ gap: 2 }}>
//                   {questions[currentIdx].options.map((option, index) => {
//                     const isSelected = userAnswers[currentIdx] === index;
//                     const isCorrect = questions[currentIdx].answer === index;
//
//                     const getDynamicStyle = () => {
//                       if (isFinished) {
//                         if (isCorrect) return { borderColor: '#4caf50', bgcolor: '#f1f8e9' };
//                         if (isSelected) return { borderColor: '#f44336', bgcolor: '#ffebee' };
//                       }
//                       if (isSelected) return { borderColor: '#1a237e', bgcolor: '#f5f6ff' };
//                       return { borderColor: '#f0f0f0', bgcolor: 'transparent' };
//                     };
//
//                     return (
//                       <FormControlLabel
//                         key={index} value={index} control={<Radio disabled={isFinished} />}
//                         label={option}
//                         sx={{
//                           border: '2px solid',
//                           borderRadius: 3, m: 0, p: 1,
//                           ...getDynamicStyle()
//                         }}
//                       />
//                     );
//                   })}
//                 </RadioGroup>
//               </Box>
//
//               <Box sx={{ p: 2, borderTop: '1px solid #f0f0f0', display: 'flex', justifyContent: 'space-between', bgcolor: '#fafafa' }}>
//                 <Button disabled={currentIdx === 0} onClick={() => setCurrentIdx(prev => prev - 1)} startIcon={<ChevronLeft />}>Câu trước</Button>
//                 <Button disabled={currentIdx === questions.length - 1} variant="contained" onClick={() => setCurrentIdx(prev => prev + 1)} endIcon={<ChevronRight />}>Câu sau</Button>
//               </Box>
//             </Paper>
//           </Grid>
//
//           {/* DANH SÁCH CÂU HỎI CỐ ĐỊNH */}
//           <Grid item xs={12} md={4}>
//             <Box sx={{ position: 'sticky', top: 20 }}>
//               <Paper elevation={0} sx={{ p: 3, borderRadius: 4, border: '1px solid #e0e0e0' }}>
//                 <Typography variant="subtitle2" sx={{ mb: 3, fontWeight: 800, color: '#9e9e9e' }}>DANH SÁCH CÂU HỎI</Typography>
//
//                 <Grid container spacing={1}>
//                   {questions.map((_, index) => {
//                     let btnColor: "success" | "error" | "primary" | "inherit" = "inherit";
//                     if (isFinished) {
//                       btnColor = userAnswers[index] === questions[index].answer ? "success" : "error";
//                     } else if (userAnswers[index] !== undefined) {
//                       btnColor = "primary";
//                     }
//
//                     return (
//                       <Grid item xs={2.4} key={index}>
//                         <Button
//                           fullWidth variant={currentIdx === index ? "outlined" : "contained"}
//                           color={btnColor} onClick={() => setCurrentIdx(index)}
//                           sx={{
//                             minWidth: 0, aspectRatio: '1/1', fontWeight: 'bold', borderRadius: 2,
//                             ...(userAnswers[index] === undefined && !isFinished && { bgcolor: '#f5f5f5', color: '#757575', boxShadow: 'none' })
//                           }}
//                         >
//                           {index + 1}
//                         </Button>
//                       </Grid>
//                     );
//                   })}
//                 </Grid>
//
//                 {isFinished && (
//                   <Box sx={{ mt: 4, p: 2, bgcolor: '#1a237e', color: '#fff', borderRadius: 3, textAlign: 'center' }}>
//                     <Typography variant="h4" sx={{ fontWeight: 900 }}>{score}/{questions.length}</Typography>
//                     <Typography variant="body2" sx={{ opacity: 0.8 }}>Kết quả bài làm</Typography>
//                   </Box>
//                 )}
//               </Paper>
//             </Box>
//           </Grid>
//
//         </Grid>
//       </Container>
//     </Box>
//   );
// }






import { useState, useEffect } from 'react';
import { Box, Container, Grid } from '@mui/material';
import { questions } from './components/data';
import { QuizHeader } from './components/QuizHeader';
import { QuestionCard } from './components/QuestionCard';
import { Sidebar } from './components/Sidebar';
import { type UserAnswers } from './components/types';

export default function QuizApp() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswers>({});
  const [timeLeft, setTimeLeft] = useState(600);
  const [isFinished, setIsFinished] = useState(false);

  const score = Object.keys(userAnswers).filter(key => userAnswers[parseInt(key)] === questions[parseInt(key)].answer).length;
  const progress = (Object.keys(userAnswers).length / questions.length) * 100;

  useEffect(() => {
    if (timeLeft > 0 && !isFinished) {
      const timer = setInterval(() => setTimeLeft(p => p - 1), 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) setIsFinished(true);
  }, [timeLeft, isFinished]);

  const handleFinalSubmit = () => {
    if (window.confirm("Bạn có chắc chắn muốn nộp bài?")) setIsFinished(true);
  };

  return (
    <Box sx={{ bgcolor: '#f0f2f5', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <QuizHeader
        timeLeft={timeLeft} progress={progress} isFinished={isFinished}
        onFinalSubmit={handleFinalSubmit} formatTime={(s) => `${Math.floor(s/60)}:${(s%60).toString().padStart(2,'0')}`}
      />

      <Container maxWidth="lg" sx={{ mt: 3, flexGrow: 1, pb: 4 }}>
        <Grid container spacing={3} alignItems="flex-start">
          <Grid item xs={12} md={8}>
            <QuestionCard
              question={questions[currentIdx]} currentIdx={currentIdx} total={questions.length}
              userAnswers={userAnswers} isFinished={isFinished}
              onSelect={(e) => setUserAnswers({...userAnswers, [currentIdx]: parseInt(e.target.value)})}
              onPrev={() => setCurrentIdx(p => p - 1)} onNext={() => setCurrentIdx(p => p + 1)}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Sidebar
              questions={questions} currentIdx={currentIdx} userAnswers={userAnswers}
              isFinished={isFinished} score={score} onJump={(idx) => setCurrentIdx(idx)}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}













