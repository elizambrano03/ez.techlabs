import React, { useRef, useState, useCallback } from 'react';

interface TiltCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  glareIntensity?: number; // 0-1
  scale?: number;
}

export const TiltCard: React.FC<TiltCardProps> = ({
  children,
  className = '',
  maxTilt = 10,
  glareIntensity = 0.18,
  scale = 1.025,
  ...props
}) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [tiltStyle, setTiltStyle] = useState<React.CSSProperties>({});
  const [glareStyle, setGlareStyle] = useState<React.CSSProperties>({ opacity: 0 });

  const isDisabled = useCallback(() => {
    return (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      window.innerWidth < 768
    );
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isDisabled()) return;
      const card = cardRef.current;
      if (!card) return;

      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const cx = rect.width  / 2;
      const cy = rect.height / 2;

      const rotateX = ((y - cy) / cy) * -maxTilt;
      const rotateY = ((x - cx) / cx) *  maxTilt;

      const glareX = (x / rect.width)  * 100;
      const glareY = (y / rect.height) * 100;

      setTiltStyle({
        transform: `perspective(900px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(${scale}, ${scale}, ${scale})`,
        transition: 'transform 0.08s linear',
      });

      setGlareStyle({
        opacity: glareIntensity,
        background: `radial-gradient(circle at ${glareX}% ${glareY}%, #A6F20F55 0%, transparent 65%)`,
        transition: 'opacity 0.1s ease',
      });
    },
    [isDisabled, maxTilt, scale, glareIntensity]
  );

  const handleMouseLeave = useCallback(() => {
    setTiltStyle({
      transform: `perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`,
      transition: 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)',
    });
    setGlareStyle({ opacity: 0, transition: 'opacity 0.4s ease' });
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ ...tiltStyle, transformStyle: 'preserve-3d', willChange: 'transform' }}
      className={`relative overflow-hidden ${className}`}
      {...props}
    >
      {/* Glare overlay neon */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 rounded-[inherit]"
        style={glareStyle}
      />
      {children}
    </div>
  );
};
