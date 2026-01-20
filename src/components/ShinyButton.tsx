import { ReactNode } from 'react';

interface ShinyButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}

export const ShinyButton = ({
  children,
  onClick,
  className = ''
}: ShinyButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`
        relative px-6 py-3 rounded-lg font-semibold
        bg-gradient-to-r from-blue-500 via-blue-600 to-blue-500
        bg-[length:200%_100%]
        text-white
        transition-all duration-300
        hover:bg-[position:100%_0]
        hover:scale-105 hover:shadow-lg
        active:scale-95
        overflow-hidden
        group
        ${className}
      `}
    >
      <span className="relative z-10">{children}</span>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
    </button>
  );
};
