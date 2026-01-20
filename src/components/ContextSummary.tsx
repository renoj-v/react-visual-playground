import { useState } from 'react';
import { useContextManager } from '../context/ContextManager';
import { AnimatedButton } from './AnimatedButton';

export const ContextSummary = () => {
  const { state, clearContext, exportContext } = useContextManager();
  const [isExpanded, setIsExpanded] = useState(false);

  const formatTimestamp = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };

  const formatDuration = (start: number, end: number) => {
    const seconds = Math.floor((end - start) / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    if (hours > 0) return `${hours}h ${minutes % 60}m`;
    if (minutes > 0) return `${minutes}m ${seconds % 60}s`;
    return `${seconds}s`;
  };

  const typeColors = {
    interaction: 'bg-green-500/20 border-green-500',
    state_change: 'bg-blue-500/20 border-blue-500',
    session_info: 'bg-purple-500/20 border-purple-500',
  };

  const sessionDuration = formatDuration(
    state.sessionStartTime,
    Date.now()
  );

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-gray-800/50 backdrop-blur-lg rounded-xl border border-gray-700">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-white mb-2">Context Summary</h2>
        <div className="text-gray-400 space-y-1">
          <p>Session ID: <span className="text-gray-300 font-mono text-sm">{state.sessionId}</span></p>
          <p>Session Duration: <span className="text-gray-300">{sessionDuration}</span></p>
          <p>Total Entries: <span className="text-gray-300">{state.entries.length}</span></p>
        </div>
      </div>

      <div className="flex gap-3 mb-6">
        <AnimatedButton
          variant="primary"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? 'Hide Details' : 'Show Details'}
        </AnimatedButton>
        <AnimatedButton
          variant="secondary"
          onClick={exportContext}
        >
          Export JSON
        </AnimatedButton>
        <AnimatedButton
          variant="danger"
          onClick={() => {
            if (window.confirm('Are you sure you want to clear all context data?')) {
              clearContext();
            }
          }}
        >
          Clear Context
        </AnimatedButton>
      </div>

      {isExpanded && (
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {state.entries.map((entry) => (
            <div
              key={entry.id}
              className={`p-4 rounded-lg border-l-4 ${typeColors[entry.type]} transition-all duration-300 hover:scale-[1.02]`}
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-white font-semibold">{entry.description}</h3>
                <span className="text-xs text-gray-400 px-2 py-1 bg-gray-700 rounded">
                  {entry.type}
                </span>
              </div>
              <p className="text-sm text-gray-400 mb-2">
                {formatTimestamp(entry.timestamp)}
              </p>
              <details className="text-sm">
                <summary className="cursor-pointer text-gray-300 hover:text-white">
                  View Data
                </summary>
                <pre className="mt-2 p-3 bg-gray-900 rounded text-xs text-gray-300 overflow-x-auto">
                  {JSON.stringify(entry.data, null, 2)}
                </pre>
              </details>
            </div>
          ))}
        </div>
      )}

      {state.entries.length === 0 && (
        <div className="text-center py-8 text-gray-400">
          No context entries yet. Start interacting with the app!
        </div>
      )}
    </div>
  );
};
