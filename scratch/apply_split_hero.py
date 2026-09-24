import codecs
import re

file_path = 'components/modals/CarDetailModal.tsx'
with codecs.open(file_path, 'r', 'utf-8') as f:
    content = f.read()

# Replace the entire HERO SECTION again
hero_section_regex = r'\{\/\* 1\. HERO SECTION.*?\{\/\* 2\. CONTENT SECTION \*\/\}'

new_hero = """{/* 1. HERO SECTION (Split Layout: Text Left 1/3, Video Right 2/3) */}
      <div className="flex flex-col-reverse lg:flex-row w-full lg:h-[70vh] bg-zinc-950">
        
        {/* Left: 1/3 Car Details */}
        <div className="w-full lg:w-1/3 h-full bg-zinc-950 flex flex-col justify-center px-8 lg:px-12 py-12 lg:py-0 relative z-20 shadow-[20px_0_30px_-15px_rgba(0,0,0,0.7)]">
          <div className="absolute inset-0 bg-gradient-to-b from-amber-900/10 to-transparent pointer-events-none"></div>
          
          <div className="relative z-10">
            <motion.h3 
              initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}
              className="text-amber-500 font-bold tracking-[0.4em] uppercase text-xs md:text-sm mb-3"
            >
              {car.brand}
            </motion.h3>
            <motion.h1 
              initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
              className="text-5xl md:text-6xl font-serif text-white mb-6 leading-tight"
            >
              {car.model}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
              className="text-4xl font-light text-slate-100 mb-8"
            >
              <span className="text-amber-500 font-medium mr-2">$</span>
              {car.sell_price?.toLocaleString()}
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}
              className="flex flex-col xl:flex-row gap-3"
            >
              <span className="px-5 py-2.5 bg-white/5 rounded-sm text-xs font-medium tracking-widest uppercase border border-white/10 text-white w-fit">
                {car.condition}
              </span>
              <span className="px-5 py-2.5 bg-amber-500/10 rounded-sm text-xs font-medium tracking-widest uppercase border border-amber-500/20 text-amber-400 w-fit">
                Sản xuất năm {car.manufacture_year}
              </span>
            </motion.div>
          </div>
        </div>

        {/* Right: 2/3 Video or Image */}
        <div className="w-full lg:w-2/3 h-[50vh] lg:h-full relative bg-black">
          {/* Blurred Background Layer to avoid empty black bars */}
          {car.video_url ? (
            <video src={car.video_url} className="absolute inset-0 w-full h-full object-cover blur-[60px] opacity-30" autoPlay loop muted playsInline />
          ) : (
            <img src={car.image_url} className="absolute inset-0 w-full h-full object-cover blur-[60px] opacity-30" />
          )}

          {/* Crisp Foreground Layer (object-contain ensures no cropping) */}
          {car.video_url ? (
            <video 
              src={car.video_url} 
              className="relative z-10 w-full h-full object-contain" 
              autoPlay loop muted playsInline 
            />
          ) : (
            <img 
              src={car.image_url} 
              alt={car.model} 
              className="relative z-10 w-full h-full object-contain" 
            />
          )}

          {/* Subtle gradient overlay to blend with the left side */}
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-zinc-950 to-transparent hidden lg:block z-10"></div>
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-zinc-950 to-transparent lg:hidden z-10"></div>
        </div>

      </div>

      {/* 2. CONTENT SECTION */}"""

content = re.sub(hero_section_regex, new_hero, content, flags=re.DOTALL)

with codecs.open(file_path, 'w', 'utf-8') as f:
    f.write(content)
print("Applied Split Layout (Text 1/3 Left, Video 2/3 Right)!")
