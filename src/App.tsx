import { useState } from 'react';
import { BlurText } from './components/BlurText';
import { TypingText } from './components/TypingText';
import { GradientText } from './components/GradientText';
import { CountUp } from './components/CountUp';
import { ShinyButton } from './components/ShinyButton';
import { ParticlesBackground } from './components/ParticlesBackground';
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
    <ParticlesBackground
      particleCount={60}
      particleColor="rgba(147, 51, 234, 0.4)"
      className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900"
    >
      <div className="container mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <BlurText
            text="React Visual Playground"
            delay={50}
            animateBy="characters"
            className="text-white mb-4"
          />
          <div className="text-xl text-gray-300 mb-2">
            <TypingText
              text="Showcasing React Bits Components with Context Management"
              speed={50}
              showCursor={false}
            />
          </div>
          <div className="mt-4">
            <GradientText
              from="from-purple-400"
              via="via-pink-500"
              to="to-red-500"
              animate={true}
              className="text-2xl font-bold"
            >
              Animated • Interactive • Customizable
            </GradientText>
          </div>
        </div>

        {/* Stats Section */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 text-center">
              <div className="text-4xl font-bold text-white mb-2">
                <CountUp end={clickCount} duration={500} />
              </div>
              <p className="text-gray-300">Total Interactions</p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 text-center">
              <div className="text-4xl font-bold text-white mb-2">
                <CountUp end={6} duration={1000} suffix="+" />
              </div>
              <p className="text-gray-300">React Bits Components</p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 text-center">
              <div className="text-4xl font-bold text-white mb-2">
                <CountUp end={100} duration={1500} suffix="%" />
              </div>
              <p className="text-gray-300">TypeScript</p>
            </div>
          </div>
        </div>

        {/* Demo Section */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
            <h2 className="text-2xl font-bold text-white mb-6">Interactive Demo</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <ShinyButton
                onClick={() => handleInteraction('Primary button clicked')}
                className="bg-gradient-to-r from-blue-500 to-blue-600"
              >
                Primary Action
              </ShinyButton>

              <ShinyButton
                onClick={() => handleInteraction('Secondary button clicked')}
                className="bg-gradient-to-r from-purple-500 to-purple-600"
              >
                Secondary Action
              </ShinyButton>

              <ShinyButton
                onClick={() => handleInteraction('Success button clicked')}
                className="bg-gradient-to-r from-green-500 to-green-600"
              >
                Success Action
              </ShinyButton>

              <ShinyButton
                onClick={() => handleInteraction('Danger button clicked')}
                className="bg-gradient-to-r from-red-500 to-red-600"
              >
                Danger Action
              </ShinyButton>
            </div>

            <div className="text-center mt-8">
              <ShinyButton
                onClick={handleStateChange}
                className="bg-gradient-to-r from-indigo-500 to-purple-600"
              >
                {showContext ? 'Hide' : 'Show'} Context Summary
              </ShinyButton>
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
            <h2 className="text-2xl font-bold text-white mb-6">
              <GradientText from="from-blue-400" via="via-purple-500" to="to-pink-500">
                Featured Components
              </GradientText>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-300">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Text Animations</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>BlurText - Animated blur-to-focus reveal</li>
                  <li>TypingText - Typewriter effect</li>
                  <li>GradientText - Animated gradient text</li>
                  <li>CountUp - Number animation counter</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">UI Components</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>ShinyButton - Gradient shiny effect</li>
                  <li>ParticlesBackground - Animated particles</li>
                  <li>Context Manager - State tracking</li>
                  <li>Context Summary - Data visualization</li>
                </ul>
              </div>
            </div>
            <div className="mt-6 text-center">
              <p className="text-gray-400">
                Inspired by{' '}
                <a
                  href="https://reactbits.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 underline"
                >
                  reactbits.dev
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </ParticlesBackground>
  );
}

export default App;
