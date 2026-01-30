import React from 'react';
import backgroundSvg from '../assets/backgroundscreen.svg';

interface BackgroundScreenProps {
  className?: string;
}

export const BackgroundScreen: React.FC<BackgroundScreenProps> = ({
  className = '',
}) => {
  return (
    <div className="fixed w-full h-full" style={{ backgroundColor: '#151539'}}>
      <div
        className={`inset-0 overflow-visible ${className}`}
      >
        <style>{`
          @keyframes bg-rotate {
            from { transform: translate(-50%, 250%) rotate(0deg) scale(7); }
            to { transform: translate(-50%, 250%) rotate(360deg) scale(7); }
          }
        `}</style>
        <img
          src={backgroundSvg}
          alt="background text"
          aria-hidden
          style={{
            position: 'absolute',
            left: '50%',
            bottom: '0',
            transform: 'translate(0, 0) rotate(0deg) scale(4)',
            animation: 'bg-rotate 60s linear infinite',
            width: '100vw',
            height: '100vh',
          }}
        />
      </div>
    </div>
  );
};

export default BackgroundScreen;
