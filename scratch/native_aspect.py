import codecs
import re

file_path = 'components/modals/CarDetailModal.tsx'
with codecs.open(file_path, 'r', 'utf-8') as f:
    content = f.read()

# Replace the Hero Section again
hero_section_regex = r'\{\/\* 1\. HERO SECTION.*?\{\/\* 2\. CONTENT SECTION \*\/\}'

new_hero = """{/* 1. HERO SECTION (Flexible Layout: Video exactly fits height, Text fills remainder) */}
      <div className="flex flex-col lg:flex-row w-full lg:h-[75vh] bg-zinc-950 border-b border-white/5">
        
        {/* Left/Top: Media occupying its exact native aspect ratio */}
        <div className="h-[50vh] lg:h-full w-full lg:w-auto flex-shrink-0 bg-black flex justify-center border-r border-white/5 shadow-2xl relative z-20">
          {car.video_url ? (
            <video 
              src={car.video_url} 
              className="h-full w-auto max-w-full object-contain contrast-[1.05] saturate-[1.1] brightness-[1.02]" 
              autoPlay loop muted playsInline 
            />
          ) : (
            <img 
              src={car.image_url} 
              alt={car.model} 
              className="h-full w-auto max-w-full object-contain contrast-[1.05] saturate-[1.1] brightness-[1.02]" 
            />
          )}
        </div>

        {/* Right/Bottom: Text and Intro taking up all remaining space */}
        <div className="flex-1 h-full bg-zinc-950 flex flex-col justify-center p-8 md:p-12 lg:p-16 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-900/5 to-transparent pointer-events-none"></div>
          
          <div className="relative z-10 max-w-3xl">
            <motion.h3 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="text-amber-500 font-bold tracking-[0.4em] uppercase text-xs md:text-sm mb-4"
            >
              {car.brand}
            </motion.h3>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="text-4xl md:text-6xl lg:text-7xl font-serif text-white mb-6 leading-tight"
            >
              {car.model}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              className="text-3xl lg:text-4xl font-light text-slate-100 mb-8"
            >
              <span className="text-amber-500 font-medium mr-2">$</span>
              {car.sell_price?.toLocaleString()}
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
              className="flex flex-wrap gap-4 mb-10"
            >
              <span className="px-5 py-2.5 bg-white/5 rounded-sm text-xs font-medium tracking-widest uppercase border border-white/10 text-white">
                {car.condition}
              </span>
              <span className="px-5 py-2.5 bg-amber-500/10 rounded-sm text-xs font-medium tracking-widest uppercase border border-amber-500/20 text-amber-400">
                Sản xuất năm {car.manufacture_year}
              </span>
            </motion.div>

            {/* Quick Intro snippet moved into Hero space */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
            >
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Tổng quan nhanh</h4>
              <p className="text-slate-300 leading-relaxed font-light text-sm lg:text-base text-justify">
                {car.description || 'Chiếc xe mang đến trải nghiệm đẳng cấp thương gia với không gian nội thất xa xỉ, vật liệu chế tác thủ công cao cấp cùng hàng loạt công nghệ an toàn và tiện nghi tối tân nhất thế giới hiện nay.'}
              </p>
            </motion.div>
          </div>
        </div>

      </div>

      {/* 2. CONTENT SECTION */}"""

# In the CONTENT SECTION, we can remove the Description block since we moved it to the Hero text area to fill space.
content = re.sub(hero_section_regex, new_hero, content, flags=re.DOTALL)

# Remove the old description block in Content section
desc_regex = r'\{\/\* Description \*\/\}.*?<\/div>'
content = re.sub(desc_regex, '', content, flags=re.DOTALL)

# Since we removed description, let's make the Specs cards 1 col or 2 cols nicely.
# They are currently in lg:col-span-4. Let's make it col-span-3 or 4 and it's fine.

with codecs.open(file_path, 'w', 'utf-8') as f:
    f.write(content)
print("Applied native aspect ratio layout!")
