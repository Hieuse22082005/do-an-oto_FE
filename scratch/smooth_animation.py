import codecs

filepath = r'c:\Users\Hieu\Desktop\do an oto_FE\components\tabs\HomeTab.tsx'
content = codecs.open(filepath, 'r', 'utf-8').read()

old_animation = '''                key={activeNewsTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}'''

new_animation = '''                key={activeNewsTab}
                initial={{ opacity: 0, x: 100, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -100, scale: 0.95 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}'''

content = content.replace(old_animation, new_animation)

# Add min-height to prevent jumping during 'wait'
content = content.replace('<AnimatePresence mode="wait">', '<div className="min-h-[500px] overflow-hidden">\n          <AnimatePresence mode="wait">')
content = content.replace('</AnimatePresence>', '</AnimatePresence>\n          </div>')

codecs.open(filepath, 'w', 'utf-8').write(content)
print('Updated animation')
