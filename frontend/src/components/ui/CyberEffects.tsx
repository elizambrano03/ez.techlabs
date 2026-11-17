import React, { useRef, useEffect, useCallback } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/** Scanline 3D que viaja a lo largo del viewport al hacer scroll */
export const CyberScanline: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0vh', '95vh']);

  // Respeta prefers-reduced-motion
  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReduced) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 right-0 z-[9] h-[2px]"
      style={{ top: y }}
    >
      {/* Línea principal */}
      <div
        className="h-full w-full"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, #A6F20F44 20%, #A6F20F 50%, #A6F20F44 80%, transparent 100%)',
          boxShadow: '0 0 12px 2px #A6F20F66',
        }}
      />
      {/* Halo difuso */}
      <div
        className="absolute inset-x-0 -top-3 h-8"
        style={{
          background:
            'linear-gradient(180deg, transparent 0%, #A6F20F0A 50%, transparent 100%)',
        }}
      />
    </motion.div>
  );
};

/* ------------------------------------------------------------------ */
/*  Overlay de noise/grain sutil sobre toda la página                  */
/* ------------------------------------------------------------------ */
export const CyberNoise: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number>(0);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { width, height } = canvas;
    const imageData = ctx.createImageData(width, height);
    const { data } = imageData;

    for (let i = 0; i < data.length; i += 4) {
      const v = Math.random() * 20; // intensidad muy sutil
      data[i]     = v;
      data[i + 1] = v;
      data[i + 2] = v;
      data[i + 3] = 18; // alpha bajo
    }

    ctx.putImageData(imageData, 0, 0);
    frameRef.current = requestAnimationFrame(draw);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const prefersReduced =
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReduced) {
      frameRef.current = requestAnimationFrame(draw);
    }

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [draw]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[8] mix-blend-overlay"
      style={{ opacity: 0.35 }}
    />
  );
};

