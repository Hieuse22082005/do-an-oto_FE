import codecs

file_path = 'components/ui/infinite-slider.tsx'

with codecs.open(file_path, 'r', 'utf-8') as f:
    content = f.read()

# Replace the motion.div wrapper and children
old_wrapper = """      <motion.div
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
      </motion.div>"""

new_wrapper = """      <motion.div
        animate={controls}
        className={cn('flex', {
          'flex-col': direction === 'vertical',
          'flex-row': direction === 'horizontal',
        })}
        style={{
          width: direction === 'horizontal' ? 'max-content' : '100%',
        }}
      >
        <div className={cn('flex gap-6', direction === 'vertical' ? 'flex-col pb-6' : 'flex-row pr-6')}>
          {children}
        </div>
        <div className={cn('flex gap-6', direction === 'vertical' ? 'flex-col pb-6' : 'flex-row pr-6')}>
          {children}
        </div>
      </motion.div>"""

content = content.replace(old_wrapper, new_wrapper)

with codecs.open(file_path, 'w', 'utf-8') as f:
    f.write(content)

print("Fixed InfiniteSlider gap jump!")
