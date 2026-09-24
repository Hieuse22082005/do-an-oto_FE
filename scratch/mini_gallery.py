import codecs
import re

file_path = 'components/modals/CarDetailModal.tsx'
with codecs.open(file_path, 'r', 'utf-8') as f:
    content = f.read()

# 1. Update state from `lightboxImage` to `lightboxIndex`
content = content.replace(
    'const [lightboxImage, setLightboxImage] = useState<string | null>(null);',
    'const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);'
)

# 2. Update the Lightbox UI to support arrows and use lightboxIndex
old_lightbox = r'\{\/\* Lightbox for full screen images \*\/\}[\s\S]*?<\/AnimatePresence>'
new_lightbox = """{/* Lightbox for full screen images */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 md:p-12 backdrop-blur-xl"
          >
            {/* Prev Button */}
            <button 
              onClick={(e) => { e.stopPropagation(); setLightboxIndex((prev) => (prev! - 1 + mediaList.length) % mediaList.length); }}
              className="absolute left-4 md:left-10 z-50 text-white bg-white/5 p-4 rounded-full hover:bg-white/20 transition-colors border border-white/10"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            </button>

            <img 
              src={mediaList[lightboxIndex].url} 
              className="max-w-full max-h-full object-contain drop-shadow-2xl rounded-sm" 
              onClick={(e) => e.stopPropagation()} 
            />

            {/* Next Button */}
            <button 
              onClick={(e) => { e.stopPropagation(); setLightboxIndex((prev) => (prev! + 1) % mediaList.length); }}
              className="absolute right-4 md:right-10 z-50 text-white bg-white/5 p-4 rounded-full hover:bg-white/20 transition-colors border border-white/10"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </button>

            {/* Close Button */}
            <button 
              onClick={() => setLightboxIndex(null)} 
              className="absolute top-6 right-6 z-50 text-white bg-white/10 p-3 rounded-full hover:bg-white/20 transition-colors border border-white/10 hover:text-amber-500"
            >
              <X size={24} />
            </button>
            
            {/* Counter */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white font-mono bg-black/50 px-4 py-2 rounded-full border border-white/10 backdrop-blur-md">
              {lightboxIndex + 1} / {mediaList.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>"""
content = re.sub(old_lightbox, new_lightbox, content)

# 3. Inject Mini Gallery into Hero Text Area
mini_gallery = """
            {/* Mini Gallery inside Hero */}
            {mediaList.length > 0 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="mt-8">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Thư viện ảnh ({mediaList.length})</h4>
                <div className="flex gap-3">
                  {mediaList.slice(0, 4).map((media, i) => {
                    const isLast = i === 3;
                    const remainingCount = mediaList.length - 4;
                    return (
                      <div 
                        key={i}
                        onClick={() => setLightboxIndex(i)}
                        className="relative w-20 h-20 md:w-24 md:h-24 rounded-lg overflow-hidden cursor-zoom-in border border-white/10 hover:border-amber-500/50 hover:scale-105 transition-all group"
                      >
                        <img src={media.url} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                        {isLast && remainingCount > 0 && (
                          <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px] flex items-center justify-center">
                            <span className="text-white font-bold text-lg">+{remainingCount}</span>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </motion.div>
            )}
"""
content = content.replace(
    '              </p>\n            </motion.div>\n          </div>\n        </div>',
    '              </p>\n            </motion.div>' + mini_gallery + '\n          </div>\n        </div>'
)

# 4. Remove Bento Grid Right Column completely
bento_grid_regex = r'\{\/\* Right Column: Bento Grid Gallery \(8 cols\) \*\/\}.*?<\/div>\s*<\/div>\s*<\/div>\s*<\/motion\.div>'

replacement_bottom = """
        </div>
      </div>
    </motion.div>"""
content = re.sub(bento_grid_regex, replacement_bottom, content, flags=re.DOTALL)

# Also fix the grid cols for Specs since Bento is gone. Make it single center or max-w-4xl
specs_regex = r'<div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">.*?<div className="lg:col-span-4 space-y-12">'
specs_new = '<div className="max-w-4xl mx-auto space-y-12">'
content = re.sub(specs_regex, specs_new, content, flags=re.DOTALL)


with codecs.open(file_path, 'w', 'utf-8') as f:
    f.write(content)
print("Added Mini Gallery and upgraded Lightbox with Arrows!")
