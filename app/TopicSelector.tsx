'use client';
import { useState } from 'react';
import { CheckCircle, Circle } from 'lucide-react';

interface TopicSelectorProps {
  mainTopic: string;
  subtopics: string[];
  onGenerate: (selectedSubtopics: string[]) => void;
  loading?: boolean;
}

export default function TopicSelector({ mainTopic, subtopics, onGenerate, loading }: TopicSelectorProps) {
  const [selected, setSelected] = useState<string[]>([]);

  const toggleTopic = (topic: string) => {
    setSelected(prev => 
      prev.includes(topic) 
        ? prev.filter(t => t !== topic)
        : [...prev, topic]
    );
  };

  const handleGenerate = () => {
    if (selected.length > 0) onGenerate(selected);
  };

  return (
    <div className="glass rounded-3xl p-8 shadow-2xl">
      <h3 className="text-2xl font-bold mb-6 text-white">Select Subtopics for: <span className="text-cyan-300">{mainTopic}</span></h3>
      <div className="space-y-3 mb-8">
        {subtopics.map((topic) => (
          <div
            key={topic}
            onClick={() => toggleTopic(topic)}
            className={`flex items-center gap-4 p-4 rounded-2xl cursor-pointer transition-all duration-300 ${
              selected.includes(topic) 
                ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/50' 
                : 'glass-dark hover:bg-white/10'
            }`}
          >
            {selected.includes(topic) ? (
              <CheckCircle className="w-6 h-6 text-cyan-400" />
            ) : (
              <Circle className="w-6 h-6 text-white/60" />
            )}
            <span className="flex-1 text-white font-medium">{topic}</span>
          </div>
        ))}
      </div>
      <button
        onClick={handleGenerate}
        disabled={selected.length === 0 || loading}
        className="w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-2xl hover:from-emerald-600 hover:to-teal-600 disabled:opacity-50 disabled:cursor-not-allowed font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
      >
        {loading ? 'Generating...' : `Generate Paper (${selected.length} topics)`}
      </button>
    </div>
  );
}