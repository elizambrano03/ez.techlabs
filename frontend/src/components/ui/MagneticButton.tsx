import React, { useRef, useState } from 'react';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  onClick?: () => void;
  href?: string;
  target?: string;
  rel?: string;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className = '',
  strength = 15,
  onClick,
  href,
  target,
  rel,
}) => {
  const btnRef = useRef<HTMLDivElement | null>(null);
  const [transform, setTransform] = useState<string>('translate3d(0px, 0px, 0px)');

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || window.innerWidth < 768) {
      return;
    }

    const btn = btnRef.current;
    if (!btn) return;

    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const moveX = (x / (rect.width / 2)) * strength;
    const moveY = (y / (rect.height / 2)) * strength;

    setTransform(`translate3d(${moveX.toFixed(1)}px, ${moveY.toFixed(1)}px, 0px)`);
  };

  const handleMouseLeave = () => {
    setTransform('translate3d(0px, 0px, 0px)');
  };

  const content = (
    <div
      ref={btnRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform,
        transition: transform === 'translate3d(0px, 0px, 0px)' ? 'transform 0.3s ease-out' : 'transform 0.08s ease-out',
      }}
      className={`inline-block will-change-transform ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );

  if (href) {
    return (
      <a href={href} target={target} rel={rel} className="inline-block">
        {content}
      </a>
    );
  }

  return content;
};

