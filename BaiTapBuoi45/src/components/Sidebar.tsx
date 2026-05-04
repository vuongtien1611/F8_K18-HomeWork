import { Box, Paper, Typography, Grid, Button } from '@mui/material';
import { type UserAnswers, type Question } from './types';

interface Props {
  questions: Question[];
  currentIdx: number;
  userAnswers: UserAnswers;
  isFinished: boolean;
  score: number;
  onJump: (idx: number) => void;
}

export const Sidebar = ({ questions, currentIdx, userAnswers, isFinished, score, onJump }: Props) => (
  <Box sx={{ position: 'sticky', top: 20 }}>
    <Paper elevation={0} sx={{ p: 3, borderRadius: 4, border: '1px solid #e0e0e0' }}>
      <Typography variant="subtitle2" sx={{ mb: 3, fontWeight: 800, color: '#9e9e9e' }}>DANH SÁCH CÂU HỎI</Typography>
      <Grid container spacing={1}>
        {questions.map((_, index) => {
          let btnColor: "success" | "error" | "primary" | "inherit" = "inherit";
          if (isFinished) btnColor = userAnswers[index] === questions[index].answer ? "success" : "error";
          else if (userAnswers[index] !== undefined) btnColor = "primary";

          return (
            <Grid item xs={2.4} key={index}>
              <Button
                fullWidth variant={currentIdx === index ? "outlined" : "contained"}
                color={btnColor} onClick={() => onJump(index)}
                sx={{
                  minWidth: 0, aspectRatio: '1/1', fontWeight: 'bold', borderRadius: 2,
                  ...(userAnswers[index] === undefined && !isFinished && { bgcolor: '#f5f5f5', color: '#757575', boxShadow: 'none' })
                }}
              >
                {index + 1}
              </Button>
            </Grid>
          );
        })}
      </Grid>
      {isFinished && (
        <Box sx={{ mt: 4, p: 2, bgcolor: '#1a237e', color: '#fff', borderRadius: 3, textAlign: 'center' }}>
          <Typography variant="h4" sx={{ fontWeight: 900 }}>{score}/{questions.length}</Typography>
          <Typography variant="body2" sx={{ opacity: 0.8 }}>Kết quả bài làm</Typography>
        </Box>
      )}
    </Paper>
  </Box>
);