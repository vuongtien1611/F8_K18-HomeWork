import { AppBar, Toolbar, Typography, Box, Button, LinearProgress } from '@mui/material';

interface Props {
  timeLeft: number;
  progress: number;
  isFinished: boolean;
  onFinalSubmit: () => void;
  formatTime: (s: number) => string;
}

export const QuizHeader = ({ timeLeft, progress, isFinished, onFinalSubmit, formatTime }: Props) => (
  <AppBar position="static" sx={{ bgcolor: '#1a237e' }}>
    <Toolbar sx={{ justifyContent: 'space-between' }}>
      <Typography variant="h6" sx={{ fontWeight: 800 }}>ÔN THI GPLX</Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Typography sx={{ fontFamily: 'monospace', fontWeight: 'bold', bgcolor: 'rgba(255,255,255,0.1)', px: 2, py: 0.5, borderRadius: 5 }}>
          {formatTime(timeLeft)}
        </Typography>
        <Button
          variant="contained" color={isFinished ? "secondary" : "success"}
          onClick={() => isFinished ? window.location.reload() : onFinalSubmit()}
        >
          {isFinished ? "Làm lại" : "Nộp bài"}
        </Button>
      </Box>
    </Toolbar>
    <LinearProgress variant="determinate" value={progress} sx={{ height: 4, bgcolor: '#3949ab' }} />
  </AppBar>
);