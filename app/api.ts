import axios from 'axios';
import { SuggestResponse, GenerateResponse, Job, ContentResponse } from './types';

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

export const api = {
  suggestSubtopics: async (mainTopic: string): Promise<SuggestResponse> => {
    const { data } = await axios.post(`${API_BASE}/research/suggest-subtopics`, { mainTopic });
    return data;
  },

  generatePaper: async (mainTopic: string, selectedSubtopics: string[]): Promise<GenerateResponse> => {
    const { data } = await axios.post(`${API_BASE}/research/generate`, { mainTopic, selectedSubtopics });
    return data;
  },

  getJobStatus: async (jobId: string): Promise<Job> => {
    const { data } = await axios.get(`${API_BASE}/research/status/${jobId}`);
    return data;
  },

  getJobHistory: async (): Promise<{ jobs: Job[] }> => {
    const { data } = await axios.get(`${API_BASE}/research/history`);
    return data;
  },

  getContent: async (jobId: string): Promise<ContentResponse> => {
    const { data } = await axios.get(`${API_BASE}/research/content/${jobId}`);
    return data;
  },

  downloadPdf: (jobId: string): string => {
    return `${API_BASE}/research/download/${jobId}`;
  }
};