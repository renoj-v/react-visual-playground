import { useState, useEffect } from 'react';

interface BlurTextProps {
  text: string;
  delay?: number;
  className?: string;
}

export const BlurText = ({ text, delay = 50, className = '' }: BlurTextProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setCurrentIndex(prev => prev + 1);
      }, delay);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, delay, text]);

  return (
    <div className={`text-4xl font-bold ${className}`}>
      {text.split('').map((char, index) => (
        <span
          key={index}
          className={`inline-block transition-all duration-500 ${
            index < currentIndex
              ? 'opacity-100 blur-0'
              : 'opacity-0 blur-md'
          }`}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </div>
  );
};
