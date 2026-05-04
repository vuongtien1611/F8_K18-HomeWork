import { Paper, Box, Chip, Typography, RadioGroup, FormControlLabel, Radio, Button } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { type Question, type UserAnswers } from './types';

interface Props {
  question: Question;
  currentIdx: number;
  total: number;
  userAnswers: UserAnswers;
  isFinished: boolean;
  onSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPrev: () => void;
  onNext: () => void;
}

export const QuestionCard = ({ question, currentIdx, total, userAnswers, isFinished, onSelect, onPrev, onNext }: Props) => {
  const answer = userAnswers[currentIdx];

  return (
    <Paper elevation={0} sx={{ borderRadius: 4, border: '1px solid #e0e0e0', display: 'flex', flexDirection: 'column',width: '700px', height: '600px', overflow: 'hidden' }}>
      <Box sx={{ p: 3, borderBottom: '1px solid #f0f0f0', display: 'flex', justifyContent: 'space-between' }}>
        <Chip label={`Câu hỏi ${currentIdx + 1}`} color="primary" sx={{ fontWeight: 'bold' }} />
        {isFinished && (
          <Typography variant="body2" color={answer === question.answer ? "success.main" : "error.main"} sx={{ fontWeight: 'bold' }}>
            {answer === question.answer ? "CHÍNH XÁC" : "SAI RỒI"}
          </Typography>
        )}
      </Box>

      <Box sx={{ p: 3, flexGrow: 1, overflowY: 'auto', bgcolor: '#fff' }}>
        <Typography variant="h5" sx={{ mb: 4, fontWeight: 700, color: '#1a237e', lineHeight: 1.5 }}>{question.content}</Typography>
        <RadioGroup value={answer ?? ""} onChange={onSelect} sx={{ gap: 2 }}>
          {question.options.map((option, index) => (
            <FormControlLabel
              key={index} value={index} control={<Radio disabled={isFinished} />}
              label={option}
              sx={{
                border: '2px solid', borderRadius: 3, m: 0, p: 1,
                borderColor: isFinished ? (index === question.answer ? '#4caf50' : (index === answer ? '#f44336' : '#f0f0f0')) : (index === answer ? '#1a237e' : '#f0f0f0'),
                bgcolor: isFinished ? (index === question.answer ? '#f1f8e9' : (index === answer ? '#ffebee' : 'transparent')) : (index === answer ? '#f5f6ff' : 'transparent')
              }}
            />
          ))}
        </RadioGroup>
      </Box>

      <Box sx={{ p: 2, borderTop: '1px solid #f0f0f0', display: 'flex', justifyContent: 'space-between', bgcolor: '#fafafa' }}>
        <Button disabled={currentIdx === 0} onClick={onPrev} startIcon={<ChevronLeft />}>Câu trước</Button>
        <Button disabled={currentIdx === total - 1} variant="contained" onClick={onNext} endIcon={<ChevronRight />}>Câu sau</Button>
      </Box>
    </Paper>
  );
};