'use client';
import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Download, Loader } from 'lucide-react';
import { Job, ContentResponse } from './types';
import { api } from './api';

interface MarkdownViewerProps {
  job: Job;
}

export default function MarkdownViewer({ job }: MarkdownViewerProps) {
  const [content, setContent] = useState<ContentResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (job.status === 'COMPLETED') {
      loadContent();
    }
  }, [job.id, job.status]);

  const loadContent = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.getContent(job.id);
      setContent(response);
    } catch (error) {
      console.error('Failed to load content:', error);
      setError('Failed to load paper content');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    const url = api.downloadPdf(job.id);
    window.open(url, '_blank');
  };

  if (job.status !== 'COMPLETED') {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center glass rounded-3xl p-8">
          <p className="text-white text-xl mb-4">
            {job.status === 'FAILED' ? 'Generation failed' : 'Paper not ready yet'}
          </p>
          {job.errorMessage && (
            <p className="text-red-400 text-sm">{job.errorMessage}</p>
          )}
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center glass rounded-3xl p-8">
          <Loader className="w-8 h-8 text-cyan-400 animate-spin mx-auto mb-4" />
          <p className="text-white text-xl">Loading paper content...</p>
        </div>
      </div>
    );
  }

  if (error || !content) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center glass rounded-3xl p-8">
          <p className="text-red-400 text-xl mb-4">{error || 'Paper content not found'}</p>
          <button
            onClick={loadContent}
            className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl hover:from-cyan-600 hover:to-blue-600 transition-all duration-300"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex items-center justify-between p-6 glass-dark border-b border-white/10">
        <h1 className="text-2xl font-bold text-white">{content.mainTopic}</h1>
        <button
          onClick={handleDownload}
          className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-2xl hover:from-orange-600 hover:to-red-600 font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <Download className="w-5 h-5" />
          Download PDF
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-4xl mx-auto glass rounded-3xl p-8">
          <div className="prose prose-lg max-w-none">
            <ReactMarkdown>{content.content}</ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
}