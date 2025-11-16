'use client';
import { Job } from './types';
import { Clock, CheckCircle, XCircle, Loader } from 'lucide-react';

interface JobSidebarProps {
  jobs: Job[];
  selectedJobId?: string;
  onSelectJob: (jobId: string) => void;
}

export default function JobSidebar({ jobs, selectedJobId, onSelectJob }: JobSidebarProps) {
  const getStatusIcon = (status: Job['status']) => {
    switch (status) {
      case 'COMPLETED': return <CheckCircle className="w-5 h-5 text-emerald-400" />;
      case 'FAILED': return <XCircle className="w-5 h-5 text-red-400" />;
      case 'IN_PROGRESS': return <Loader className="w-5 h-5 text-cyan-400 animate-spin" />;
      default: return <Clock className="w-5 h-5 text-yellow-400" />;
    }
  };

  const getStatusColor = (status: Job['status']) => {
    switch (status) {
      case 'COMPLETED': return 'border-l-green-500';
      case 'FAILED': return 'border-l-red-500';
      case 'IN_PROGRESS': return 'border-l-blue-500';
      default: return 'border-l-yellow-500';
    }
  };

  return (
    <div className="w-80 glass-dark border-r border-white/10 h-screen overflow-y-auto">
      <div className="p-6 border-b border-white/10">
        <h2 className="font-bold text-xl text-white">Research Jobs</h2>
      </div>
      <div className="p-4">
        {jobs.length === 0 ? (
          <p className="text-white/60 text-center py-12">No jobs yet</p>
        ) : (
          jobs.map((job) => (
            <div
              key={job.id}
              onClick={() => onSelectJob(job.id)}
              className={`p-4 mb-3 rounded-2xl cursor-pointer transition-all duration-300 ${
                selectedJobId === job.id 
                  ? 'bg-gradient-to-r from-purple-500/30 to-pink-500/30 border border-purple-400/50 shadow-lg' 
                  : 'glass hover:bg-white/10'
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                {getStatusIcon(job.status)}
                <span className="font-semibold text-white truncate">{job.mainTopic}</span>
              </div>
              <div className="text-sm text-white/70">
                {job.status === 'IN_PROGRESS' && (
                  <div className="mb-2">
                    <div className="bg-white/20 rounded-full h-2 mb-1">
                      <div 
                        className="bg-gradient-to-r from-cyan-400 to-blue-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${job.progress}%` }}
                      />
                    </div>
                    <span className="text-cyan-300">{job.progress}% - {job.currentStep}</span>
                  </div>
                )}
                <span>{new Date(job.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}