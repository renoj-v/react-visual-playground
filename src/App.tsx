import { useState } from 'react';
import { BlurText } from './components/BlurText';
import { TypingText } from './components/TypingText';
import { GradientText } from './components/GradientText';
import { CountUp } from './components/CountUp';
import { ShinyButton } from './components/ShinyButton';
import  Particles from './components/ParticlesBackground';
import { ContextSummary } from './components/ContextSummary';
import { useContextManager } from './context/ContextManager';
import { Textbox } from './components/Textbox';
import { BackgroundScreen } from './components/BackgroundScreen';

function App() {
  const { addEntry } = useContextManager();
  const [clickCount, setClickCount] = useState(0);
  const [showContext, setShowContext] = useState(false);

  const handleInteraction = (action: string) => {
    const newCount = clickCount + 1;
    setClickCount(newCount);

    addEntry('interaction', action, {
      action,
      clickCount: newCount,
      timestamp: new Date().toISOString(),
    });
  };

  const handleStateChange = () => {
    const newState = !showContext;
    setShowContext(newState);

    addEntry('state_change', `Context view ${newState ? 'opened' : 'closed'}`, {
      showContext: newState,
      previousClickCount: clickCount,
    });
  };

  return (
    
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      <BackgroundScreen />
    </div>
  );
}

export default App;
