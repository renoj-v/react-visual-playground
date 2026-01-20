import { useEffect, useState } from 'react';

interface BlurTextProps {
  text: string;
  delay?: number;
  animateBy?: 'words' | 'characters';
  className?: string;
}

export const BlurText = ({
  text,
  delay = 50,
  animateBy = 'characters',
  className = ''
}: BlurTextProps) => {
  const [visibleCount, setVisibleCount] = useState(0);

  const segments = animateBy === 'words'
    ? text.split(' ')
    : text.split('');

  useEffect(() => {
    if (visibleCount < segments.length) {
      const timeout = setTimeout(() => {
        setVisibleCount(prev => prev + 1);
      }, delay);
      return () => clearTimeout(timeout);
    }
  }, [visibleCount, segments.length, delay]);

  return (
    <div className={`text-4xl font-bold ${className}`}>
      {segments.map((segment, index) => (
        <span
          key={index}
          className={`inline-block transition-all duration-500 ${
            index < visibleCount
              ? 'opacity-100 blur-0'
              : 'opacity-0 blur-md'
          }`}
        >
          {segment}
          {animateBy === 'words' && index < segments.length - 1 && '\u00A0'}
        </span>
      ))}
    </div>
  );
};
