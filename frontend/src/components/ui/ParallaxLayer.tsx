import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

interface ParallaxLayerProps {
  children: React.ReactNode;
  speed?: number;      // 0.1 (slow) to 1.5 (fast)
  direction?: 'vertical' | 'horizontal';
  className?: string;
}

export const ParallaxLayer: React.FC<ParallaxLayerProps> = ({
  children,
  speed = 0.3,
  direction = 'vertical',
  className = '',
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const movement = useTransform(
    scrollYProgress,
    [0, 1],
    direction === 'vertical'
      ? [`${-50 * speed}px`, `${50 * speed}px`]
      : [`${-30 * speed}px`, `${30 * speed}px`]
  );

  const smoothMovement = useSpring(movement, {
    stiffness: 60,
    damping: 20,
    restDelta: 0.001,
  });

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div
        style={
          direction === 'vertical'
            ? { y: smoothMovement }
            : { x: smoothMovement }
        }
      >
        {children}
      </motion.div>
    </div>
  );
};

