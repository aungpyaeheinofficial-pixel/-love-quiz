export interface StageData {
  id: number;
  question: string;
  answer: string;
  buttonText: string;
}

export enum AnimationType {
  None,
  Explosion,
  Floating,
  Confetti
}