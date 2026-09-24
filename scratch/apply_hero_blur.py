import codecs
import re

file_path = 'components/modals/CarDetailModal.tsx'
with codecs.open(file_path, 'r', 'utf-8') as f:
    content = f.read()

# Replace the entire HERO SECTION
hero_section_regex = r'\{\/\* 1\. HERO SECTION \(Split Layout\) \*\/\}.*?\{\/\* 2\. CONTENT SECTION \*\/\}'

new_hero = """{/* 1. HERO SECTION (Full-Screen Cinematic) */}
      <div className="relative w-full h-[70vh] md:h-[85vh] bg-black overflow-hidden flex items-center justify-center">
        
        {/* Background Blur */}
        {car.video_url ? (
          <video src={car.video_url} className="absolute inset-0 w-full h-full object-cover blur-[80px] opacity-40 scale-125" autoPlay loop muted playsInline />
        ) : (
          <img src={car.image_url} className="absolute inset-0 w-full h-full object-cover blur-[80px] opacity-40 scale-125" />
        )}

        {/* Foreground Sharp (Object Contain ensures no crop) */}
        {car.video_url ? (
          <video src={car.video_url} className="relative z-10 w-full h-full object-contain" autoPlay loop muted playsInline />
        ) : (
          <img src={car.image_url} alt={car.model} className="relative z-10 w-full h-full object-contain drop-shadow-2xl" />
        )}

        {/* Gradient overlays to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/60 to-transparent z-10 w-full md:w-3/4"></div>
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-zinc-950 to-transparent z-10"></div>

        {/* Car Details Overlay - Positioned on the left in the "empty" space */}
        <div className="absolute inset-0 z-20 flex flex-col justify-end md:justify-center px-6 md:px-12 lg:px-24 pb-12 md:pb-0 pointer-events-none">
          <div className="max-w-2xl">
            <motion.h3 
              initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}
              className="text-amber-500 font-bold tracking-[0.4em] uppercase text-xs md:text-sm mb-3 drop-shadow-md"
            >
              {car.brand}
            </motion.h3>
            <motion.h1 
              initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
              className="text-5xl md:text-7xl lg:text-8xl font-serif text-white mb-6 leading-tight drop-shadow-2xl"
            >
              {car.model}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
              className="text-4xl lg:text-5xl font-light text-slate-100 mb-8 drop-shadow-lg"
            >
              <span className="text-amber-500 font-medium mr-2">$</span>
              {car.sell_price?.toLocaleString()}
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 pointer-events-auto"
            >
              <span className="px-6 py-3 bg-white/10 backdrop-blur-md rounded-sm text-xs md:text-sm font-medium tracking-widest uppercase border border-white/20 text-white w-fit shadow-xl">
                {car.condition}
              </span>
              <span className="px-6 py-3 bg-amber-500/20 backdrop-blur-md rounded-sm text-xs md:text-sm font-medium tracking-widest uppercase border border-amber-500/30 text-amber-400 w-fit shadow-xl">
                Năm {car.manufacture_year}
              </span>
            </motion.div>
          </div>
        </div>
      </div>

      {/* 2. CONTENT SECTION */}"""

content = re.sub(hero_section_regex, new_hero, content, flags=re.DOTALL)

with codecs.open(file_path, 'w', 'utf-8') as f:
    f.write(content)
print("Applied Apple-style Hero section!")
