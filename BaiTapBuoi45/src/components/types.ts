export interface Question {
  id: number;
  content: string;
  options: string[];
  answer: number;
}

export interface UserAnswers {
  [key: number]: number;
}