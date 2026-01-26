import React from 'react';

interface BackgroundScreenProps {
  className?: string;
  /** Gradient stop at top (dark) — hex */
  topColor?: string;
  /** Gradient stop in middle — hex */
  midColor?: string;
  /** Gradient stop at bottom (light) — hex */
  bottomColor?: string;
  /** Blur radius for gradient softening (SVG stdDeviation) */
  blurAmount?: number;
  /** Noise intensity (feTurbulence baseFrequency, higher = finer) */
  noiseFreq?: number;
  /** Noise opacity 0–1 */
  noiseOpacity?: number;
  /** Animation duration in seconds for the ambient drift */
  animationDuration?: number;
}

const DEFAULT_TOP = '#1C2956';
const DEFAULT_MID = '#3D6BE0';
const DEFAULT_BOTTOM = '#95BFEE';

/**
 * Full-screen background from Figma (node 316:11): vertical gradient with
 * blur, noise, and dark top shadow, implemented entirely in SVG.
 */
export const BackgroundScreen: React.FC<BackgroundScreenProps> = ({
  className = '',
  topColor = DEFAULT_TOP,
  midColor = DEFAULT_MID,
  bottomColor = DEFAULT_BOTTOM,
  blurAmount = 0.6,
  noiseFreq = 0.7,
  noiseOpacity = 0.08,
  animationDuration = 60,
}) => {
  const id = React.useId().replace(/:/g, '-');
  const gradId = `bg-grad-${id}`;
  const shadowGradId = `bg-shadow-${id}`;
  const shadowBlurId = `bg-shadowblur-${id}`;
  const compositeId = `bg-composite-${id}`;
  const animationName = `bg-drift-${id}`;

  return (
    <div
      className={`absolute inset-0 overflow-hidden ${className}`}
      style={{ minHeight: '100vh', minWidth: '100vw' }}
    >
      <style>
        {`
          @keyframes ${animationName} {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}
      </style>
      <svg
        aria-hidden
        className="block h-full"
        viewBox="0 0 2880 900"
        preserveAspectRatio="xMidYMid slice"
        style={{
          minHeight: '100vh',
          width: '100vw',
          animation: `${animationName} ${animationDuration}s linear infinite`,
        }}
      >
      <defs>
        {/* Base gradient: dark top → mid blue → light bottom */}
        <linearGradient
          id={gradId}
          x1="0%"
          y1="0%"
          x2="0%"
          y2="100%"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(0, 0)"
        >
          <stop offset="0%" stopColor={topColor} />
          <stop offset="35%" stopColor={midColor} />
          <stop offset="100%" stopColor={bottomColor} />
        </linearGradient>

        {/* Dark atmospheric shadow overlay (top) */}
        <linearGradient
          id={shadowGradId}
          x1="0%"
          y1="0%"
          x2="0%"
          y2="100%"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#0d1220" stopOpacity="0.85" />
          <stop offset="25%" stopColor="#0d1220" stopOpacity="0.4" />
          <stop offset="55%" stopColor="transparent" stopOpacity="0" />
        </linearGradient>

        {/* Blur for gradient layer */}
        <filter
          id={shadowBlurId}
          x="-20%"
          y="-20%"
          width="140%"
          height="140%"
          colorInterpolationFilters="sRGB"
        >
          <feGaussianBlur in="SourceGraphic" stdDeviation={blurAmount} result="blurred" />
        </filter>

        {/* Blur for shadow layer (softer shadow edge) */}
        <filter
          id={shadowBlurId}
          x="-10%"
          y="-10%"
          width="120%"
          height="120%"
          colorInterpolationFilters="sRGB"
        >
          <feGaussianBlur in="SourceGraphic" stdDeviation="40" result="shadowBlurred" />
        </filter>

        {/* Noise texture — fractalNoise for film-grain look */}
        <filter
          id={compositeId}
          x="0%"
          y="0%"
          width="100%"
          height="100%"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency={noiseFreq}
            numOctaves="3"
            result="turb"
          />
          <feColorMatrix
            in="turb"
            type="saturate"
            values="0"
            result="noiseMono"
          />
          <feComponentTransfer in="noiseMono" result="noiseAdj">
            <feFuncA type="linear" slope={noiseOpacity} intercept="0" />
          </feComponentTransfer>
          <feBlend in="SourceGraphic" in2="noiseAdj" mode="overlay" result="noised" />
        </filter>

        {/* Composite: gradient + blur, then noise overlay */}
        <filter
          id={compositeId}
          x="-20%"
          y="-20%"
          width="140%"
          height="140%"
          colorInterpolationFilters="sRGB"
        >
          <feGaussianBlur in="SourceGraphic" stdDeviation={blurAmount} result="blurred" />
          <feTurbulence
            type="fractalNoise"
            baseFrequency={noiseFreq}
            numOctaves="3"
            result="turb"
          />
          <feColorMatrix in="turb" type="saturate" values="0" result="noiseMono" />
          <feComponentTransfer in="noiseMono" result="noiseLayer">
            <feFuncR type="linear" slope="0.5" intercept="0.5" />
            <feFuncG type="linear" slope="0.5" intercept="0.5" />
            <feFuncB type="linear" slope="0.5" intercept="0.5" />
            <feFuncA type="linear" slope={noiseOpacity} intercept="0" />
          </feComponentTransfer>
          <feBlend in="blurred" in2="noiseLayer" mode="overlay" result="gradNoised" />
        </filter>
      </defs>

      {/* Layer 1: gradient with blur + noise (single filter) - first tile */}
      <rect
        x="0"
        y="0"
        width="1440"
        height="900"
        fill={`url(#${gradId})`}
        filter={`url(#${compositeId})`}
      />
      {/* Layer 1: gradient - second tile for seamless loop */}
      <rect
        x="1440"
        y="0"
        width="1440"
        height="900"
        fill={`url(#${gradId})`}
        filter={`url(#${compositeId})`}
      />

      {/* Layer 2: dark top shadow (blurred for soft edge) - first tile */}
      <rect
        x="0"
        y="0"
        width="1440"
        height="900"
        fill={`url(#${shadowGradId})`}
        filter={`url(#${shadowBlurId})`}
      />
      {/* Layer 2: shadow - second tile for seamless loop */}
      <rect
        x="1440"
        y="0"
        width="1440"
        height="900"
        fill={`url(#${shadowGradId})`}
        filter={`url(#${shadowBlurId})`}
      />
    </svg>
    </div>
  );
};

export default BackgroundScreen;
