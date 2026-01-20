import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Types for context data
export interface ContextEntry {
  id: string;
  timestamp: number;
  type: 'interaction' | 'state_change' | 'session_info';
  data: Record<string, unknown>;
  description: string;
}

interface ContextState {
  entries: ContextEntry[];
  sessionId: string;
  sessionStartTime: number;
}

interface ContextManagerContextType {
  state: ContextState;
  addEntry: (type: ContextEntry['type'], description: string, data: Record<string, unknown>) => void;
  clearContext: () => void;
  exportContext: () => void;
}

const ContextManagerContext = createContext<ContextManagerContextType | undefined>(undefined);

const STORAGE_KEY = 'react-visual-playground-context';

// Helper to generate unique IDs
const generateId = () => `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

// Helper to generate session ID
const generateSessionId = () => `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

export const ContextManagerProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<ContextState>(() => {
    // Try to load from localStorage
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        console.error('Failed to parse stored context:', e);
      }
    }

    // Initialize new session
    return {
      entries: [],
      sessionId: generateSessionId(),
      sessionStartTime: Date.now(),
    };
  });

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  // Add initial session entry
  useEffect(() => {
    if (state.entries.length === 0) {
      addEntry('session_info', 'Session started', {
        sessionId: state.sessionId,
        userAgent: navigator.userAgent,
        screenResolution: `${window.screen.width}x${window.screen.height}`,
      });
    }
  }, []);

  const addEntry = (type: ContextEntry['type'], description: string, data: Record<string, unknown>) => {
    const entry: ContextEntry = {
      id: generateId(),
      timestamp: Date.now(),
      type,
      description,
      data,
    };

    setState(prev => ({
      ...prev,
      entries: [...prev.entries, entry],
    }));
  };

  const clearContext = () => {
    const newState: ContextState = {
      entries: [],
      sessionId: generateSessionId(),
      sessionStartTime: Date.now(),
    };
    setState(newState);
    localStorage.removeItem(STORAGE_KEY);

    // Add new session entry
    setTimeout(() => {
      addEntry('session_info', 'Session started (after clear)', {
        sessionId: newState.sessionId,
        userAgent: navigator.userAgent,
      });
    }, 0);
  };

  const exportContext = () => {
    const dataStr = JSON.stringify(state, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `context-export-${state.sessionId}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <ContextManagerContext.Provider value={{ state, addEntry, clearContext, exportContext }}>
      {children}
    </ContextManagerContext.Provider>
  );
};

export const useContextManager = () => {
  const context = useContext(ContextManagerContext);
  if (!context) {
    throw new Error('useContextManager must be used within ContextManagerProvider');
  }
  return context;
};
