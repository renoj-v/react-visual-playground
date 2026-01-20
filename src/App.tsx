import { useState } from 'react';
import { BlurText } from './components/BlurText';
import { FadeInText } from './components/FadeInText';
import { AnimatedButton } from './components/AnimatedButton';
import { GradientBackground } from './components/GradientBackground';
import { ContextSummary } from './components/ContextSummary';
import { useContextManager } from './context/ContextManager';

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
    <GradientBackground className="min-h-screen">
      <div className="container mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <BlurText
            text="React Visual Playground"
            delay={50}
            className="text-white mb-4"
          />
          <FadeInText
            text="Showcasing React Bits Components with Context Management"
            delay={1500}
            className="text-xl text-gray-300"
          />
        </div>

        {/* Demo Section */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
            <h2 className="text-2xl font-bold text-white mb-6">Interactive Demo</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <AnimatedButton
                variant="primary"
                onClick={() => handleInteraction('Primary button clicked')}
              >
                Primary Action
              </AnimatedButton>

              <AnimatedButton
                variant="secondary"
                onClick={() => handleInteraction('Secondary button clicked')}
              >
                Secondary Action
              </AnimatedButton>

              <AnimatedButton
                variant="danger"
                onClick={() => handleInteraction('Danger button clicked')}
              >
                Danger Action
              </AnimatedButton>
            </div>

            <div className="text-center">
              <p className="text-white text-lg mb-4">
                Total Interactions: <span className="font-bold text-blue-400">{clickCount}</span>
              </p>

              <AnimatedButton
                variant="primary"
                onClick={handleStateChange}
              >
                {showContext ? 'Hide' : 'Show'} Context Summary
              </AnimatedButton>
            </div>
          </div>
        </div>

        {/* Context Summary Section */}
        {showContext && (
          <div className="animate-fadeIn">
            <ContextSummary />
          </div>
        )}

        {/* Features Section */}
        <div className="max-w-4xl mx-auto mt-12">
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-6">Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-300">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">React Bits Components</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>BlurText - Animated text reveal</li>
                  <li>FadeInText - Smooth fade in animation</li>
                  <li>AnimatedButton - Interactive buttons</li>
                  <li>GradientBackground - Dynamic gradients</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Context Management</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>Track user interactions</li>
                  <li>Monitor state changes</li>
                  <li>Session information storage</li>
                  <li>Export to JSON</li>
                  <li>Clear context data</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </GradientBackground>
  );
}

export default App;
