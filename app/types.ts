export interface Job {
  id: string;
  mainTopic: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'FAILED';
  progress: number;
  currentStep?: string;
  errorMessage?: string;
  completedAt?: string;
  createdAt: string;
  finalMarkdown?: string;
}

export interface SuggestResponse {
  MainTopic: string;
  SuggestedHeadings: string[];
}

export interface GenerateResponse {
  jobId: string;
  status: string;
  message: string;
}

export interface ContentResponse {
  jobId: string;
  mainTopic: string;
  content: string;
  completedAt: string;
}