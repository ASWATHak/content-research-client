'use client';
import { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import TopicSelector from './TopicSelector';
import JobSidebar from './JobSidebar';
import MarkdownViewer from './MarkdownViewer';
import { api } from './api';
import { Job, SuggestResponse } from './types';

export default function Home() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedJobId, setSelectedJobId] = useState<string>();
  const [suggestions, setSuggestions] = useState<SuggestResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    loadJobs();
    const interval = setInterval(loadJobs, 30000);
    return () => clearInterval(interval);
  }, []);

  const loadJobs = async () => {
    try {
      const { jobs } = await api.getJobHistory();
      setJobs(jobs);
    } catch (error) {
      console.error('Failed to load jobs:', error);
    }
  };

  const handleSearch = async (topic: string) => {
    setLoading(true);
    try {
      const response = await api.suggestSubtopics(topic);
      setSuggestions(response);
    } catch (error) {
      console.error('Failed to get suggestions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerate = async (selectedSubtopics: string[]) => {
    if (!suggestions) return;
    setGenerating(true);
    try {
      const response = await api.generatePaper(suggestions.MainTopic, selectedSubtopics);
      setSuggestions(null);
      setSelectedJobId(response.jobId);
      await loadJobs();
    } catch (error) {
      console.error('Failed to generate paper:', error);
    } finally {
      setGenerating(false);
    }
  };

  const selectedJob = jobs.find(job => job.id === selectedJobId);

  return (
    <div className="flex h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500">
      <JobSidebar 
        jobs={jobs} 
        selectedJobId={selectedJobId} 
        onSelectJob={setSelectedJobId} 
      />
      <div className="flex-1 flex flex-col">
        {!selectedJob ? (
          <div className="flex-1 p-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-white mb-2">Research Paper Generator</h1>
                <p className="text-white/80 text-lg">AI-powered research paper generation</p>
              </div>
              <SearchBar onSearch={handleSearch} loading={loading} />
              {suggestions && (
                <TopicSelector
                  mainTopic={suggestions.MainTopic}
                  subtopics={suggestions.SuggestedHeadings}
                  onGenerate={handleGenerate}
                  loading={generating}
                />
              )}
            </div>
          </div>
        ) : (
          <MarkdownViewer job={selectedJob} />
        )}
      </div>
    </div>
  );
}
