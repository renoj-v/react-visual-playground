# React Visual Playground

A modern React application built with Vite, featuring animated React Bits components and a comprehensive context management system.

## Features

### React Bits Components
This project showcases several animated and interactive components inspired by [React Bits](https://reactbits.dev):

- **BlurText** - Animated text reveal with blur effect
- **FadeInText** - Smooth fade-in animation for text
- **AnimatedButton** - Interactive buttons with hover and click animations
- **GradientBackground** - Dynamic animated gradient backgrounds with floating orbs

### Context Management System
A robust context tracking system that captures and stores application state:

- **Interaction Tracking** - Records all user interactions with timestamps
- **State Change Monitoring** - Tracks component state changes
- **Session Management** - Maintains session information and duration
- **Local Storage** - Persists context data across browser sessions
- **Export to JSON** - Download complete context history
- **Context Summary View** - Interactive UI to view and manage stored context
- **Clear/Reset** - Easy context data cleanup

## Prerequisites

- Node.js (v18 or higher recommended)
- npm (v9 or higher)

## Installation

1. Clone or navigate to the repository:
```bash
cd react-visual-playground
```

2. Install dependencies:
```bash
npm install
```

## Running the Application

Start the development server:
```bash
npm run dev
```

The application will start on `http://localhost:5173` (or another port if 5173 is in use).

## Building for Production

To create a production build:
```bash
npm run build
```

To preview the production build locally:
```bash
npm run preview
```

## Project Structure

```
react-visual-playground/
├── public/
│   └── vite.svg              # Favicon
├── src/
│   ├── components/
│   │   ├── AnimatedButton.tsx    # Interactive button component
│   │   ├── BlurText.tsx          # Animated blur text effect
│   │   ├── FadeInText.tsx        # Fade-in animation component
│   │   ├── GradientBackground.tsx # Animated gradient background
│   │   └── ContextSummary.tsx    # Context viewer component
│   ├── context/
│   │   └── ContextManager.tsx    # Context management system
│   ├── App.tsx               # Main application component
│   ├── main.tsx              # Application entry point
│   └── index.css             # Global styles and animations
├── index.html                # HTML template
├── package.json              # Dependencies and scripts
├── vite.config.ts            # Vite configuration
├── tailwind.config.js        # Tailwind CSS configuration
├── tsconfig.json             # TypeScript configuration
└── README.md                 # This file
```

## Usage

### Interacting with the App

1. **Try the Animated Components**: Click the different action buttons to see animations and track interactions
2. **View Context**: Click "Show Context Summary" to see all tracked interactions and state changes
3. **Export Data**: Use the "Export JSON" button to download your complete context history
4. **Clear Context**: Reset all tracked data using the "Clear Context" button

### Context Data Structure

Each context entry includes:
- **ID**: Unique identifier
- **Timestamp**: When the event occurred
- **Type**: `interaction`, `state_change`, or `session_info`
- **Description**: Human-readable description
- **Data**: Additional metadata about the event

### Customizing Components

All React Bits components are implemented locally and can be customized:

- Modify animation timing in component props
- Adjust colors and styles using Tailwind classes
- Extend functionality by editing component files in `src/components/`

## Technologies Used

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Bits** - Animated component patterns

## About React Bits

React Bits is an open-source collection of high-quality, animated, interactive, and fully customizable React components. This project implements several components inspired by React Bits patterns, adapted for TypeScript and Tailwind CSS.

Learn more at [reactbits.dev](https://reactbits.dev)

## License

MIT

## Contributing

Feel free to submit issues or pull requests to improve the project!
