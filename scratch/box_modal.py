import codecs
import re

file_path = 'components/modals/CarDetailModal.tsx'
with codecs.open(file_path, 'r', 'utf-8') as f:
    content = f.read()

# 1. Change the Modal Wrapper
old_wrapper = r'<motion\.div\s*initial=\{\{ opacity: 0, y: 50 \}\}[\s\S]*?className="fixed inset-0 z-50 bg-slate-50 overflow-y-auto text-slate-800 font-sans"\s*>'

new_wrapper = """<motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm overflow-y-auto flex items-center justify-center p-4 md:p-6 lg:p-8 font-sans"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-[1400px] bg-slate-50 rounded-2xl shadow-2xl overflow-hidden relative flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >"""
content = re.sub(old_wrapper, new_wrapper, content)

# Close the new div wrapper before the last </motion.div>
content = content.replace('    </motion.div>', '      </div>\n    </motion.div>')


# 2. Change floating close button
old_close = r'\{/\* Floating Close Button \*/\}[\s\S]*?<\/button>'
new_close = """{/* Inner Close Button */}
      <button 
        onClick={onClose} 
        className="absolute top-4 right-4 z-[60] bg-white/80 backdrop-blur-md p-2.5 rounded-full text-slate-800 hover:bg-white hover:text-amber-600 border border-slate-200 transition-all shadow-md hover:scale-110"
      >
        <X size={20} />
      </button>"""
content = re.sub(old_close, new_close, content)


# 3. Change Hero Section to use object-contain and bg-black
old_hero = r'\{/\* 1\. HERO SECTION \*/\}[\s\S]*?\{/\* Mini Gallery \(UNDER the main image\)'

new_hero = """{/* 1. HERO SECTION */}
      <div 
        className="flex flex-col lg:flex-row w-full lg:h-[70vh] bg-white border-b border-slate-200 relative"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        
        {/* Left: Media Column */}
        <div className="h-[50vh] lg:h-full w-full lg:w-[45%] flex-shrink-0 bg-black flex flex-col border-r border-slate-200 shadow-[10px_0_20px_-10px_rgba(0,0,0,0.1)] z-20">
          
          {/* Main Display (Magnifier on hover) */}
          <div 
            className="flex-1 relative cursor-crosshair overflow-hidden bg-black flex items-center justify-center"
            onMouseEnter={() => setIsZooming(true)}
            onMouseLeave={() => { setIsZooming(false); setBackgroundPosition('50% 50%'); }}
            onMouseMove={handleMouseMove}
            onClick={() => setLightboxIndex(selectedIndex)}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                {allMedia[selectedIndex]?.type === 'video' ? (
                  <video 
                    src={allMedia[selectedIndex].url} 
                    className="w-full h-full object-contain contrast-[1.05] saturate-[1.1] brightness-[1.02] ease-out" 
                    style={{ 
                       transformOrigin: backgroundPosition,
                       transform: isZooming ? 'scale(1.5)' : 'scale(1)',
                       transitionDuration: isZooming ? '100ms' : '400ms'
                    }}
                    autoPlay loop muted playsInline 
                  />
                ) : (
                  <img 
                    src={allMedia[selectedIndex]?.url} 
                    alt={car.model} 
                    className="w-full h-full object-contain contrast-[1.05] saturate-[1.1] brightness-[1.02] ease-out" 
                    style={{ 
                       transformOrigin: backgroundPosition,
                       transform: isZooming ? 'scale(2)' : 'scale(1)',
                       transitionDuration: isZooming ? '100ms' : '400ms'
                    }}
                  />
                )}
              </motion.div>
            </AnimatePresence>
            
            <div className="absolute inset-0 pointer-events-none bg-black/0 transition-colors"></div>
          </div>

          {/* Mini Gallery (UNDER the main image)"""
content = re.sub(old_hero, new_hero, content)

# 4. Remove padding on bottom section to save space
content = content.replace('py-16', 'py-12')


with codecs.open(file_path, 'w', 'utf-8') as f:
    f.write(content)
print("Updated to boxed modal with object-contain")
