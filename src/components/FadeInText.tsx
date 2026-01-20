interface FadeInTextProps {
  text: string;
  delay?: number;
  className?: string;
}

export const FadeInText = ({ text, delay = 0, className = '' }: FadeInTextProps) => {
  return (
    <div
      className={`opacity-0 animate-fadeIn ${className}`}
      style={{
        animationDelay: `${delay}ms`,
        animationFillMode: 'forwards',
      }}
    >
      {text}
    </div>
  );
};
