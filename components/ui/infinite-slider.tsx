'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { motion, useAnimationControls } from 'framer-motion';

interface InfiniteSliderProps {
  children: React.ReactNode;
  direction?: 'horizontal' | 'vertical';
  speed?: number; // Duration in seconds
  speedOnHover?: number;
  className?: string;
}

export function InfiniteSlider({
  children,
  direction = 'vertical',
  speed = 30,
  speedOnHover = 15,
  className,
}: InfiniteSliderProps) {
  const controls = useAnimationControls();

  React.useEffect(() => {
    controls.start({
      y: direction === 'vertical' ? ['0%', '-50%'] : 0,
      x: direction === 'horizontal' ? ['0%', '-50%'] : 0,
      transition: {
        ease: 'linear',
        duration: speed,
        repeat: Infinity,
      },
    });
  }, [controls, direction, speed]);

  return (
    <div
      className={cn('flex overflow-hidden relative', className, {
        'flex-col h-full': direction === 'vertical',
        'flex-row w-full': direction === 'horizontal',
      })}
      onMouseEnter={() => {
        controls.start({
          y: direction === 'vertical' ? ['0%', '-50%'] : 0,
          x: direction === 'horizontal' ? ['0%', '-50%'] : 0,
          transition: {
            ease: 'linear',
            duration: speedOnHover,
            repeat: Infinity,
          },
        });
      }}
      onMouseLeave={() => {
        controls.start({
          y: direction === 'vertical' ? ['0%', '-50%'] : 0,
          x: direction === 'horizontal' ? ['0%', '-50%'] : 0,
          transition: {
            ease: 'linear',
            duration: speed,
            repeat: Infinity,
          },
        });
      }}
    >
      <motion.div
        animate={controls}
        className={cn('flex gap-6', {
          'flex-col': direction === 'vertical',
          'flex-row': direction === 'horizontal',
        })}
        style={{
          width: direction === 'horizontal' ? 'max-content' : '100%',
        }}
      >
        <div className={cn('flex gap-6', direction === 'vertical' ? 'flex-col' : 'flex-row')}>
          {children}
        </div>
        <div className={cn('flex gap-6', direction === 'vertical' ? 'flex-col' : 'flex-row')}>
          {children}
        </div>
      </motion.div>
    </div>
  );
}
