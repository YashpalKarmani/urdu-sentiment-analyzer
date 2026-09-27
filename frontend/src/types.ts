export type SentimentType = 'positive' | 'negative' | 'neutral';

export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
}

export interface Sentiment {
  _id: string;
  user: string;
  text: string;
  sentiment: SentimentType;
  confidence: number;
  modelVersion: string;
  processingTime: number;
  createdAt: string;
}

export interface Dataset {
  _id: string;
  text: string;
  sentiment: SentimentType;
  source: string;
  usedForTraining: boolean;
  isActive: boolean;
  createdAt: string;
}

export interface Evaluation {
  _id: string;
  modelVersion: string;
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  trainingSamples: number;
  evaluationSamples: number;
  createdAt: string;
}
