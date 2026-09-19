'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface InfiniteSliderProps {
  children: React.ReactNode;
  direction?: 'horizontal' | 'vertical';
  speed?: number; // Duration in seconds
  speedOnHover?: number; // Deprecated, kept for compatibility
  className?: string;
  reverse?: boolean; // Move opposite direction (left-to-right or bottom-to-top)
}

export function InfiniteSlider({
  children,
  direction = 'vertical',
  speed = 30,
  speedOnHover,
  className,
  reverse = false,
}: InfiniteSliderProps) {
  
  // Generate a unique ID to prevent keyframe class collisions if needed, 
  // but global keyframes are fine here since they are standard.
  const animationName = `marquee-${direction}${reverse ? '-reverse' : ''}`;

  return (
    <div
      className={cn('flex overflow-hidden relative w-full', className, {
        'flex-col h-full': direction === 'vertical',
        'flex-row': direction === 'horizontal',
      })}
    >
      <div
        className={cn('flex', {
          'flex-col': direction === 'vertical',
          'flex-row': direction === 'horizontal',
        })}
        style={{
          width: direction === 'horizontal' ? 'max-content' : '100%',
          animation: `${animationName} ${speed}s linear infinite`,
        }}
      >
        <div className={cn('flex gap-6', direction === 'vertical' ? 'flex-col pb-6' : 'flex-row pr-6')}>
          {children}
        </div>
        <div className={cn('flex gap-6', direction === 'vertical' ? 'flex-col pb-6' : 'flex-row pr-6')}>
          {children}
        </div>
      </div>
      <style>{`
        @keyframes marquee-horizontal {
          0% { transform: translate3d(0%, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        @keyframes marquee-horizontal-reverse {
          0% { transform: translate3d(-50%, 0, 0); }
          100% { transform: translate3d(0%, 0, 0); }
        }
        @keyframes marquee-vertical {
          0% { transform: translate3d(0, 0%, 0); }
          100% { transform: translate3d(0, -50%, 0); }
        }
        @keyframes marquee-vertical-reverse {
          0% { transform: translate3d(0, -50%, 0); }
          100% { transform: translate3d(0, 0%, 0); }
        }
      `}</style>
    </div>
  );
}
