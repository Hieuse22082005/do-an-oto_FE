import codecs

file_path = 'components/ui/infinite-slider.tsx'

with codecs.open(file_path, 'r', 'utf-8') as f:
    content = f.read()

# Add reverse prop
old_props = """interface InfiniteSliderProps {
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
}: InfiniteSliderProps) {"""

new_props = """interface InfiniteSliderProps {
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
  speedOnHover = 15,
  className,
  reverse = false,
}: InfiniteSliderProps) {"""

content = content.replace(old_props, new_props)

# Fix useEffect and remove hover handlers
old_effect = """  React.useEffect(() => {
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
    >"""

new_effect = """  React.useEffect(() => {
    controls.start({
      y: direction === 'vertical' ? (reverse ? ['-50%', '0%'] : ['0%', '-50%']) : 0,
      x: direction === 'horizontal' ? (reverse ? ['-50%', '0%'] : ['0%', '-50%']) : 0,
      transition: {
        ease: 'linear',
        duration: speed,
        repeat: Infinity,
      },
    });
  }, [controls, direction, speed, reverse]);

  return (
    <div
      className={cn('flex overflow-hidden relative', className, {
        'flex-col h-full': direction === 'vertical',
        'flex-row w-full': direction === 'horizontal',
      })}
      {...{}} 
    >"""

content = content.replace(old_effect, new_effect)

with codecs.open(file_path, 'w', 'utf-8') as f:
    f.write(content)

print("Updated InfiniteSlider with reverse prop and removed hover jump!")
