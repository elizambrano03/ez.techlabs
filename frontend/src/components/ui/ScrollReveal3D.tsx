import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

type Direction = 'up' | 'down' | 'left' | 'right';

interface ScrollReveal3DProps {
  children: React.ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  depth?: number; // translateZ amount in px
  className?: string;
  once?: boolean;
}

const directionMap: Record<Direction, { x: number; y: number }> = {
  up:    { x: 0,   y: 60  },
  down:  { x: 0,   y: -60 },
  left:  { x: 80,  y: 0   },
  right: { x: -80, y: 0   },
};

export const ScrollReveal3D: React.FC<ScrollReveal3DProps> = ({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.7,
  depth = 40,
  className = '',
  once = true,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: '-10% 0px' });

  const { x, y } = directionMap[direction];

  return (
    <div ref={ref} className={className} style={{ perspective: '1200px' }}>
      <motion.div
        initial={{
          opacity: 0,
          x,
          y,
          rotateX: direction === 'up' ? 20 : direction === 'down' ? -20 : 0,
          rotateY: direction === 'left' ? -15 : direction === 'right' ? 15 : 0,
          translateZ: -depth,
        }}
        animate={
          isInView
            ? { opacity: 1, x: 0, y: 0, rotateX: 0, rotateY: 0, translateZ: 0 }
            : {}
        }
        transition={{
          duration,
          delay,
          ease: [0.21, 0.47, 0.32, 0.98],
        }}
        style={{ transformStyle: 'preserve-3d', willChange: 'transform, opacity' }}
      >
        {children}
      </motion.div>
    </div>
  );
};

