import codecs

file_path = 'components/modals/CarDetailModal.tsx'

with codecs.open(file_path, 'r', 'utf-8') as f:
    content = f.read()

# 1. Update framer-motion import
content = content.replace(
    "import { motion } from 'framer-motion';",
    "import { motion, AnimatePresence } from 'framer-motion';"
)

# 2. Update useEffect for auto-slide
old_effect = """  // Auto-slide gallery
  useEffect(() => {
    if (mediaList.length <= 1 || isHoveringGallery) return;
    
    const interval = setInterval(() => {
      setActiveMedia((prev) => (prev + 1) % mediaList.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [mediaList.length, isHoveringGallery]);"""

new_effect = """  // Auto-slide gallery
  useEffect(() => {
    if (mediaList.length <= 1 || isHoveringGallery) return;
    
    // Stop sliding if it's a video so they can watch it
    if (mediaList[activeMedia]?.type === 'video') return;
    
    const interval = setInterval(() => {
      setActiveMedia((prev) => (prev + 1) % mediaList.length);
    }, 4500);

    return () => clearInterval(interval);
  }, [mediaList.length, isHoveringGallery, activeMedia]);"""

content = content.replace(old_effect, new_effect)

# 3. Update Main Display with AnimatePresence
old_main_display = """          {/* Main Display */}
          <div className="w-full h-full relative">
            {mediaList[activeMedia]?.type === 'video' ? (
              <video 
                src={mediaList[activeMedia].url} 
                className="w-full h-full object-cover"
                autoPlay 
                loop 
                muted 
                playsInline
              />
            ) : (
              <MagnifierImage src={mediaList[activeMedia]?.url} alt={car.model} />
            )}
          </div>"""

new_main_display = """          {/* Main Display */}
          <div className="w-full h-full relative overflow-hidden bg-black">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeMedia}
                initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
                transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                className="w-full h-full absolute inset-0"
              >
                {mediaList[activeMedia]?.type === 'video' ? (
                  <video 
                    src={mediaList[activeMedia].url} 
                    className="w-full h-full object-cover"
                    autoPlay 
                    loop 
                    muted 
                    playsInline
                  />
                ) : (
                  <MagnifierImage src={mediaList[activeMedia]?.url} alt={car.model} />
                )}
              </motion.div>
            </AnimatePresence>
          </div>"""

content = content.replace(old_main_display, new_main_display)

with codecs.open(file_path, 'w', 'utf-8') as f:
    f.write(content)

print("Updated auto-slide and transitions!")
