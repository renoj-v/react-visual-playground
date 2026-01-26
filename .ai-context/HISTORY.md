# React Visual Playground - AI Context History

**Last Updated:** 2026-01-23
**Session ID:** Current Development Session

---

## Project Overview

A modern React application built with Vite featuring animated React Bits components and a context management system for tracking user interactions.

---

## Current Project State

### Tech Stack
- **Framework:** React 18.3.1
- **Build Tool:** Vite 6.0.5
- **Language:** TypeScript 5.6.2
- **Styling:** Tailwind CSS 3.4.17
- **3D Graphics:** OGL 1.0.11 (WebGL library for particles)

### Dependencies (package.json)
```json
{
  "dependencies": {
    "ogl": "^1.0.11",
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.4",
    "tailwindcss": "^3.4.17",
    "typescript": "~5.6.2",
    "vite": "^6.0.5"
  }
}
```

---

## File Structure

```
src/
├── App.tsx                    # Main application component
├── main.tsx                   # Entry point with ContextManagerProvider
├── index.css                  # Global styles + Tailwind
├── vite-env.d.ts              # Vite type declarations
├── components/
│   ├── BlurText.tsx           # Blur-to-focus text animation
│   ├── CountUp.tsx            # Number counter animation
│   ├── ShinyButton.tsx        # Gradient button with shine effect
│   ├── GradientText.tsx       # Animated gradient text
│   ├── TypingText.tsx         # Typewriter effect
│   ├── ContextSummary.tsx     # Context data viewer UI
│   ├── ParticlesBackground.tsx # WebGL particle system (OGL-based)
│   └── Textbox.tsx            # Custom input component with send button
└── context/
    └── ContextManager.tsx     # Context tracking system with localStorage
```

---

## Component Details

### ParticlesBackground.tsx
**Purpose:** WebGL-based animated particle background using OGL library
**Key Features:**
- Uses OGL (WebGL library) for GPU-accelerated particle rendering
- GLSL vertex/fragment shaders for particle animation
- Supports `children` prop for overlaying content on top
- Configurable: particleCount, particleSpread, speed, particleColors, etc.
- Mouse interaction support (moveParticlesOnHover)
- Alpha transparency support (alphaParticles)

**Props Interface:**
```typescript
interface ParticlesProps {
  children?: ReactNode;           // Content to render on top
  particleCount?: number;         // Default: 200
  particleSpread?: number;        // Default: 10
  speed?: number;                 // Default: 0.1
  particleColors?: string[];      // Hex colors array
  moveParticlesOnHover?: boolean; // Default: false
  particleHoverFactor?: number;   // Default: 1
  alphaParticles?: boolean;       // Default: false
  particleBaseSize?: number;      // Default: 100
  sizeRandomness?: number;        // Default: 1
  cameraDistance?: number;        // Default: 20
  disableRotation?: boolean;      // Default: false
  pixelRatio?: number;            // Default: 1
  className?: string;
}
```

**Usage Example:**
```tsx
<Particles
  particleColors={["#ffffff"]}
  particleCount={180}
  particleSpread={8}
  speed={0.2}
  alphaParticles={true}
>
  <div className="flex items-center justify-center h-full">
    <YourContentHere />
  </div>
</Particles>
```

### Textbox.tsx
**Purpose:** Custom styled input field with send button
**Key Features:**
- Controlled/uncontrolled input support
- Blinking cursor animation
- Submit on Enter key
- Custom styling with glowing effect
- Uses external SVG assets for send button icon

**Props Interface:**
```typescript
interface TextboxProps {
  value?: string;
  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}
```

**Note:** Currently uses localhost URLs for SVG assets:
- `http://localhost:3845/assets/...` - These need to be replaced with actual asset paths

### ContextManager.tsx
**Purpose:** Global state management for tracking user interactions
**Key Features:**
- Persists to localStorage under key `react-visual-playground-context`
- Tracks: interactions, state_change, session_info
- Session management with unique IDs
- Export context to JSON file
- Clear/reset functionality

**Exported API:**
```typescript
const { state, addEntry, clearContext, exportContext } = useContextManager();

// Add an entry
addEntry('interaction', 'Button clicked', { buttonId: 'submit' });

// Entry types: 'interaction' | 'state_change' | 'session_info'
```

---

## Current App.tsx Layout

The main App component currently:
1. Renders a full-viewport container with Particles background
2. Centers a Textbox component over the particles
3. Below particles: demo sections with BlurText, TypingText, GradientText, CountUp
4. Interactive demo with ShinyButtons that track interactions
5. ContextSummary toggle to view tracked data
6. Features list section

**Current Structure:**
```tsx
<div style={{ width: '100vw', height: '100vh' }}>
  <Particles {...particleProps}>
    <div className="absolute inset-0 flex items-center justify-center">
      <Textbox />
    </div>
  </Particles>

  <div className="container mx-auto">
    {/* Header with BlurText, TypingText, GradientText */}
    {/* Stats section with CountUp */}
    {/* Interactive demo with ShinyButtons */}
    {/* ContextSummary toggle */}
    {/* Features list */}
  </div>
</div>
```

---

## Recent Changes Log

### Session: 2026-01-23

1. **ParticlesBackground.tsx Updated**
   - Added `children` prop support
   - Restructured render to allow overlay content
   - Canvas now renders in absolute positioned container
   - Children render in z-10 layer on top

2. **Textbox.tsx Added**
   - New custom input component
   - Integrated from external design (Figma MCP)
   - Features glowing input box effect
   - Send button with paper plane icon

3. **App.tsx Restructured**
   - Particles now wraps Textbox as children
   - Full viewport layout with overlay pattern
   - Textbox centered over particle background

4. **package.json Updated**
   - Added `ogl` dependency (^1.0.11) for WebGL particles

---

## Known Issues / TODOs

1. **Textbox SVG Assets:** Currently pointing to `localhost:3845` - need to be replaced with local/bundled assets
2. **Layout:** Content below particles may need adjustment for proper scrolling
3. **Mobile:** Particle performance on mobile devices not optimized

---

## Commands

```bash
# Development
npm run dev        # Start Vite dev server (localhost:5173)

# Build
npm run build      # TypeScript check + Vite build

# Preview
npm run preview    # Preview production build
```

---

## For AI Continuation

When continuing work on this project:

1. **ParticlesBackground** is WebGL-based using OGL library, not canvas 2D
2. **Textbox** needs asset URLs fixed before production
3. **ContextManager** persists to localStorage - clear browser storage to reset
4. **Styling** uses Tailwind CSS - check tailwind.config.js for customizations
5. The project uses React Bits-inspired component patterns from https://reactbits.dev

---

*This file is auto-generated for AI context. Update after significant changes.*
