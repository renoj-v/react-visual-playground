import { ReactNode } from 'react';

interface GradientTextProps {
  children: ReactNode;
  className?: string;
  from?: string;
  via?: string;
  to?: string;
  animate?: boolean;
}

export const GradientText = ({
  children,
  className = '',
  from = 'from-purple-400',
  via = 'via-pink-500',
  to = 'to-red-500',
  animate = true
}: GradientTextProps) => {
  return (
    <span
      className={`
        bg-gradient-to-r ${from} ${via} ${to}
        ${animate ? 'bg-[length:200%_auto] animate-gradient' : ''}
        text-transparent bg-clip-text
        ${className}
      `}
    >
      {children}
    </span>
  );
};
