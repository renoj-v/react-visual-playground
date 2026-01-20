# Component Examples

This document provides detailed examples of how to use each component in the React Visual Playground.

## BlurText Component

Creates an animated text reveal effect with blur transitions.

```tsx
import { BlurText } from './components/BlurText';

// Basic usage
<BlurText text="Hello World" />

// With custom delay and styling
<BlurText
  text="Welcome to React Bits"
  delay={100}
  className="text-blue-500"
/>
```

**Props:**
- `text` (string, required): The text to display
- `delay` (number, optional): Delay between each character reveal in ms (default: 50)
- `className` (string, optional): Additional CSS classes

## FadeInText Component

Simple fade-in animation for text elements.

```tsx
import { FadeInText } from './components/FadeInText';

// Basic usage
<FadeInText text="Fade in smoothly" />

// With delay
<FadeInText
  text="This appears after 1 second"
  delay={1000}
  className="text-2xl font-bold"
/>
```

**Props:**
- `text` (string, required): The text to display
- `delay` (number, optional): Animation start delay in ms (default: 0)
- `className` (string, optional): Additional CSS classes

## AnimatedButton Component

Interactive button with hover and click animations.

```tsx
import { AnimatedButton } from './components/AnimatedButton';

// Primary button
<AnimatedButton
  variant="primary"
  onClick={() => console.log('Clicked!')}
>
  Click Me
</AnimatedButton>

// Secondary button
<AnimatedButton variant="secondary">
  Secondary Action
</AnimatedButton>

// Danger button
<AnimatedButton variant="danger">
  Delete
</AnimatedButton>
```

**Props:**
- `children` (ReactNode, required): Button content
- `onClick` (function, optional): Click handler
- `variant` ('primary' | 'secondary' | 'danger', optional): Button style (default: 'primary')
- `className` (string, optional): Additional CSS classes

## GradientBackground Component

Animated gradient background with floating orbs.

```tsx
import { GradientBackground } from './components/GradientBackground';

<GradientBackground className="min-h-screen">
  <div className="p-8">
    {/* Your content here */}
    <h1>Beautiful Gradient Background</h1>
  </div>
</GradientBackground>
```

**Props:**
- `children` (ReactNode, required): Content to display over the background
- `className` (string, optional): Additional CSS classes

## Context Management System

Track user interactions and application state changes.

```tsx
import { useContextManager } from './context/ContextManager';

function MyComponent() {
  const { addEntry, state, clearContext, exportContext } = useContextManager();

  // Track an interaction
  const handleClick = () => {
    addEntry('interaction', 'Button clicked', {
      buttonId: 'submit-btn',
      timestamp: new Date().toISOString(),
    });
  };

  // Track a state change
  const handleStateChange = (newValue: boolean) => {
    addEntry('state_change', 'Toggle switched', {
      previousValue: !newValue,
      newValue,
    });
  };

  // Access context data
  console.log('Total entries:', state.entries.length);
  console.log('Session ID:', state.sessionId);

  return (
    <div>
      <button onClick={handleClick}>Track Click</button>
      <button onClick={clearContext}>Clear Context</button>
      <button onClick={exportContext}>Export to JSON</button>
    </div>
  );
}
```

## ContextSummary Component

Display and manage stored context data.

```tsx
import { ContextSummary } from './components/ContextSummary';

function App() {
  const [showSummary, setShowSummary] = useState(false);

  return (
    <div>
      <button onClick={() => setShowSummary(!showSummary)}>
        {showSummary ? 'Hide' : 'Show'} Context
      </button>

      {showSummary && <ContextSummary />}
    </div>
  );
}
```

## Complete Example

Here's a complete example combining multiple components:

```tsx
import { useState } from 'react';
import { BlurText } from './components/BlurText';
import { FadeInText } from './components/FadeInText';
import { AnimatedButton } from './components/AnimatedButton';
import { GradientBackground } from './components/GradientBackground';
import { ContextSummary } from './components/ContextSummary';
import { useContextManager } from './context/ContextManager';

function MyApp() {
  const { addEntry } = useContextManager();
  const [count, setCount] = useState(0);
  const [showContext, setShowContext] = useState(false);

  const handleIncrement = () => {
    const newCount = count + 1;
    setCount(newCount);
    addEntry('interaction', 'Counter incremented', { count: newCount });
  };

  return (
    <GradientBackground className="min-h-screen">
      <div className="container mx-auto p-8">
        <BlurText text="My Awesome App" className="text-white mb-4" />
        <FadeInText
          text="Built with React Bits"
          delay={1000}
          className="text-gray-300 mb-8"
        />

        <div className="space-y-4">
          <AnimatedButton
            variant="primary"
            onClick={handleIncrement}
          >
            Count: {count}
          </AnimatedButton>

          <AnimatedButton
            variant="secondary"
            onClick={() => setShowContext(!showContext)}
          >
            {showContext ? 'Hide' : 'Show'} Context
          </AnimatedButton>
        </div>

        {showContext && (
          <div className="mt-8">
            <ContextSummary />
          </div>
        )}
      </div>
    </GradientBackground>
  );
}

export default MyApp;
```

## Customizing Animations

All animations are defined in [src/index.css](src/index.css). You can modify the keyframes to create custom effects:

```css
@keyframes customFade {
  from {
    opacity: 0;
    transform: translateX(-100px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.animate-customFade {
  animation: customFade 1s ease-out;
}
```

Then use the custom animation in your components:

```tsx
<div className="animate-customFade">
  Custom animated content
</div>
```

## Tips for Best Results

1. **Stagger animations**: Use different delay values to create staggered effects
2. **Combine components**: Layer multiple animated components for rich effects
3. **Use context wisely**: Track meaningful interactions, not every render
4. **Test animations**: Check animation performance on different devices
5. **Customize colors**: Modify Tailwind classes to match your brand

For more inspiration, visit [reactbits.dev](https://reactbits.dev)
