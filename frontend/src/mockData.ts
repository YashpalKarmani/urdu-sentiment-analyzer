import { Sentiment, Dataset, Evaluation } from './types';

export const INITIAL_HISTORY: Sentiment[] = [
  {
    _id: '1',
    user: 'u1',
    text: 'Bhai kya zabardast movie thi, maza aa gaya!',
    sentiment: 'positive',
    confidence: 0.98,
    modelVersion: 'v1.0.0',
    processingTime: 120,
    createdAt: new Date().toISOString()
  },
  {
    _id: '2',
    user: 'u1',
    text: 'Bakwas service hai inki, kabhi use nahi karunga dubara.',
    sentiment: 'negative',
    confidence: 0.95,
    modelVersion: 'v1.0.0',
    processingTime: 115,
    createdAt: new Date(Date.now() - 86400000).toISOString()
  },
  {
    _id: '3',
    user: 'u1',
    text: 'Aaj mausam theek hai, barish ho sakti hai.',
    sentiment: 'neutral',
    confidence: 0.85,
    modelVersion: 'v1.0.0',
    processingTime: 130,
    createdAt: new Date(Date.now() - 172800000).toISOString()
  }
];

export const INITIAL_DATASETS: Dataset[] = [
  {
    _id: 'd1',
    text: 'Mujhe yeh product bohot pasand aaya.',
    sentiment: 'positive',
    source: 'custom',
    usedForTraining: true,
    isActive: true,
    createdAt: new Date().toISOString()
  },
  {
    _id: 'd2',
    text: 'Customer support ne koi help nahi ki.',
    sentiment: 'negative',
    source: 'custom',
    usedForTraining: true,
    isActive: true,
    createdAt: new Date().toISOString()
  }
];

export const INITIAL_EVALUATIONS: Evaluation[] = [
  {
    _id: 'e1',
    modelVersion: 'v1.0.1',
    accuracy: 0.92,
    precision: 0.91,
    recall: 0.93,
    f1Score: 0.92,
    trainingSamples: 15000,
    evaluationSamples: 3000,
    createdAt: new Date().toISOString()
  },
  {
    _id: 'e2',
    modelVersion: 'v1.0.0',
    accuracy: 0.89,
    precision: 0.88,
    recall: 0.89,
    f1Score: 0.885,
    trainingSamples: 10000,
    evaluationSamples: 2000,
    createdAt: new Date(Date.now() - 30 * 86400000).toISOString()
  }
];
