import React from 'react';

interface BackgroundScreenProps {
  className?: string;
  /** main-gradient: top stop (dark navy) — hex */
  topColor?: string;
  /** main-gradient: middle stop (royal blue) — hex */
  midColor?: string;
  /** main-gradient: bottom stop (light blue) — hex */
  bottomColor?: string;
  /** film-grain-noise: feTurbulence baseFrequency */
  noiseFreq?: number;
  /** film-grain-noise: overlay opacity ~5–10% */
  noiseOpacity?: number;
}

const DEFAULT_TOP = '#0A1133';
const DEFAULT_MID = '#2E70D9';
const DEFAULT_BOTTOM = '#B4C6E7';

/**
 * Background from Figma 20Q (node 316:11). Layers match frame exactly:
 * - main-gradient: full-canvas vertical gradient
 * - top-dark-shadow: organic, wavy lower-edge shape over top ~30–40%, heavily blurred
 * - film-grain-noise: full-area overlay on top
 */
export const BackgroundScreen: React.FC<BackgroundScreenProps> = ({
  className = '',
  topColor = DEFAULT_TOP,
  midColor = DEFAULT_MID,
  bottomColor = DEFAULT_BOTTOM,
  noiseFreq = 0.7,
  noiseOpacity = 0.08,
}) => {
  const id = React.useId().replace(/:/g, '-');
  const mainGradientId = `main-gradient-${id}`;
  const topDarkShadowBlurFilterId = `top-dark-shadow-blur-${id}`;
  const filmGrainNoiseFilterId = `film-grain-noise-${id}`;

  const w = 1440;
  const h = 900;

  // top-dark-shadow: wavy lower boundary (organic, ~top 30–40%). Path: top → right → wavy bottom → left → close.
  const topDarkShadowPath =
    'M 0 0 L 1440 0 L 1440 280 C 1200 380 960 260 720 360 C 480 460 240 300 0 380 L 0 0 Z';
  const animationName = `bg-drift-${id}`;
  const animationDuration = 10;


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
        className="block h-full w-full"
        viewBox={`0 0 ${w} ${h}`}
        preserveAspectRatio="xMidYMid slice"
        style={{
          minHeight: '100vh',
          width: '200vw',
          animation: `${animationName} ${animationDuration}s linear infinite`,
        }}
      >
        <defs>
          {/* main-gradient: full-canvas vertical gradient, dark top → royal mid → light bottom */}
          <linearGradient
            id={mainGradientId}
            x1="0%"
            y1="0%"
            x2="0%"
            y2="100%"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor={topColor} />
            <stop offset="32%" stopColor={midColor} />
            <stop offset="100%" stopColor={bottomColor} />
          </linearGradient>

          {/* top-dark-shadow: heavy gaussian blur for soft, diffused edges */}
          <filter
            id={topDarkShadowBlurFilterId}
            x="-25%"
            y="-25%"
            width="150%"
            height="150%"
            colorInterpolationFilters="sRGB"
          >
            <feGaussianBlur in="SourceGraphic" stdDeviation="80" result="blurred" />
          </filter>

          {/* film-grain-noise: monochrome fractal noise blended over SourceGraphic */}
          <filter
            id={filmGrainNoiseFilterId}
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
            <feColorMatrix in="turb" type="saturate" values="0" result="noiseMono" />
            <feComponentTransfer in="noiseMono" result="noiseLayer">
              <feFuncR type="linear" slope="0.5" intercept="0.5" />
              <feFuncG type="linear" slope="0.5" intercept="0.5" />
              <feFuncB type="linear" slope="0.5" intercept="0.5" />
              <feFuncA type="linear" slope={noiseOpacity} intercept="0" />
            </feComponentTransfer>
            <feBlend in="SourceGraphic" in2="noiseLayer" mode="overlay" result="noised" />
          </filter>
        </defs>

        {/* film-grain-noise applied over the whole stack (topmost in Figma) */}
        <g filter={`url(#${filmGrainNoiseFilterId})`}>
          {/* main-gradient: fills entire frame */}
          <rect
            x={0}
            y={0}
            width={w}
            height={h}
            fill={`url(#${mainGradientId})`}
            data-layer-name="main-gradient"
          />

          {/* top-dark-shadow: organic shape from top with wavy lower edge, covers ~top 30–40% */}
          <g filter={`url(#${topDarkShadowBlurFilterId})`} data-layer-name="top-dark-shadow">
            <path
              d={topDarkShadowPath}
              fill="#060B24"
              fillOpacity={0.92}
              data-layer-name="top-dark-shadow"
            />
          </g>
        </g>
      </svg>
    </div>
  );
};

export default BackgroundScreen;
