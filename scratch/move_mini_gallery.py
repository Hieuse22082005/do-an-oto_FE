import codecs
import re

file_path = 'components/modals/CarDetailModal.tsx'
with codecs.open(file_path, 'r', 'utf-8') as f:
    content = f.read()

# 1. Replace the Left Column
old_left_col = r'\{\/\* Left\/Top: Main Media Display \(Swappable\) \*\/\}[\s\S]*?\{\/\* Right\/Bottom: Text and Intro \*\/\}'

new_left_col = """{/* Left: Media Column */}
        <div className="h-[60vh] lg:h-full w-full lg:w-[45%] flex-shrink-0 bg-slate-100 flex flex-col border-r border-slate-200 shadow-[20px_0_30px_-15px_rgba(0,0,0,0.1)] z-20">
          
          {/* Main Display (Zoom on hover) */}
          <div 
            className="flex-1 relative cursor-zoom-in group overflow-hidden bg-black"
            onClick={() => setLightboxIndex(selectedIndex)}
          >
            {allMedia[selectedIndex]?.type === 'video' ? (
              <video 
                key={allMedia[selectedIndex].url}
                src={allMedia[selectedIndex].url} 
                className="absolute inset-0 w-full h-full object-cover contrast-[1.05] saturate-[1.1] brightness-[1.02] group-hover:scale-105 transition-transform duration-700" 
                autoPlay loop muted playsInline 
              />
            ) : (
              <img 
                key={allMedia[selectedIndex]?.url}
                src={allMedia[selectedIndex]?.url} 
                alt={car.model} 
                className="absolute inset-0 w-full h-full object-cover contrast-[1.05] saturate-[1.1] brightness-[1.02] animate-in fade-in duration-500 group-hover:scale-110 transition-transform duration-700" 
              />
            )}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
               <div className="opacity-0 group-hover:opacity-100 bg-white/70 backdrop-blur-md text-slate-900 px-5 py-2.5 rounded-full font-bold text-sm tracking-widest uppercase transition-all shadow-lg flex items-center gap-2 translate-y-4 group-hover:translate-y-0">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/><path d="M8 11h6"/><path d="M11 8v6"/></svg>
                  Phóng to
               </div>
            </div>
          </div>

          {/* Mini Gallery (UNDER the main image) */}
          {allMedia.length > 1 && (
            <div className="h-28 bg-white border-t border-slate-200 p-4 flex gap-3 overflow-x-auto">
              {allMedia.slice(0, 6).map((media, i) => {
                const isLast = i === 5;
                const remainingCount = allMedia.length - 6;
                const isSelected = selectedIndex === i;

                return (
                  <div 
                    key={i}
                    onClick={() => setSelectedIndex(i)}
                    className={`relative w-20 h-full flex-shrink-0 rounded-md overflow-hidden cursor-pointer border-2 transition-all ${isSelected ? 'border-amber-500 shadow-md opacity-100' : 'border-transparent hover:border-amber-300 opacity-60 hover:opacity-100'}`}
                  >
                    {media.type === 'video' ? (
                       <div className="w-full h-full bg-slate-200 relative">
                          <video src={media.url} className="w-full h-full object-cover" />
                          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                             <div className="w-6 h-6 rounded-full bg-white/40 backdrop-blur-sm flex items-center justify-center">
                                <Play size={12} className="text-white ml-0.5" fill="currentColor" />
                             </div>
                          </div>
                       </div>
                    ) : (
                       <img src={media.url} className="w-full h-full object-cover" />
                    )}

                    {/* Expand full gallery button */}
                    {isLast && remainingCount > 0 && (
                      <div 
                         className="absolute inset-0 bg-slate-900/80 backdrop-blur-[2px] flex items-center justify-center cursor-zoom-in"
                         onClick={(e) => { e.stopPropagation(); setLightboxIndex(i); }}
                      >
                        <span className="text-white font-bold text-sm">+{remainingCount}</span>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}

        </div>

        {/* Right/Bottom: Text and Intro */}"""

content = re.sub(old_left_col, new_left_col, content)

# 2. Remove the Interactive Mini Gallery from the Right Column
mini_gallery_right_regex = r'\{\/\* Interactive Mini Gallery \*\/\}.*?<\/motion\.div>\s*\}\s*<\/div>\s*<\/div>\s*<\/div>\s*\{\/\* 2\. CONTENT SECTION \*\/\}'

replacement = """
          </div>
        </div>

      </div>

      {/* 2. CONTENT SECTION */}"""
content = re.sub(mini_gallery_right_regex, replacement, content, flags=re.DOTALL)

with codecs.open(file_path, 'w', 'utf-8') as f:
    f.write(content)
print("Moved Mini Gallery under image and added zoom hover!")
