'use client';
import { useState } from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  onSearch: (topic: string) => void;
  loading?: boolean;
}

export default function SearchBar({ onSearch, loading }: SearchBarProps) {
  const [topic, setTopic] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (topic.trim()) onSearch(topic.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-4 mb-8">
      <div className="flex-1 relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Enter research topic..."
          className="w-full pl-12 pr-4 py-4 glass rounded-2xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 text-lg"
          disabled={loading}
        />
      </div>
      <button
        type="submit"
        disabled={!topic.trim() || loading}
        className="px-8 py-4 bg-gradient-to-r from-pink-500 to-violet-500 text-white rounded-2xl hover:from-pink-600 hover:to-violet-600 disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
      >
        {loading ? 'Searching...' : 'Search'}
      </button>
    </form>
  );
}