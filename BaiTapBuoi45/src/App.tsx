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













