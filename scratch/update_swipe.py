import codecs

file_path = 'components/modals/CarDetailModal.tsx'

with codecs.open(file_path, 'r', 'utf-8') as f:
    content = f.read()

old_motion = """              <motion.div
                key={activeMedia}
                initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
                transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                className="w-full h-full absolute inset-0\""""

new_motion = """              <motion.div
                key={activeMedia}
                initial={{ opacity: 0, x: 150 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -150 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="w-full h-full absolute inset-0 flex items-center justify-center\""""

content = content.replace(old_motion, new_motion)

with codecs.open(file_path, 'w', 'utf-8') as f:
    f.write(content)

print("Updated transition to swipe!")
