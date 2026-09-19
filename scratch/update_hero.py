import codecs
import re

file_path = 'components/tabs/MarketplaceTab.tsx'

with codecs.open(file_path, 'r', 'utf-8') as f:
    text = f.read()

hero_start = text.find('{/* 1. HERO SECTION')
hero_end = text.find('{/* 2. EXPLORE NEW LISTINGS')

if hero_start != -1 and hero_end != -1:
    new_hero = """{/* 1. HERO SECTION (Video Background) */}
      <section className="relative w-full h-[85vh] flex items-center justify-start overflow-hidden">
        
        {/* Background Video */}
        <div className="absolute inset-0 z-0">
          <video 
            src="/13795917-uhd_3840_2160_30fps.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
          {/* Overlay to darken video so text is readable */}
          <div className="absolute inset-0 bg-black/40 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
        </div>

        {/* Foreground Content */}
        <div className="w-full md:w-[60%] px-10 md:px-20 z-10 relative">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-white text-5xl md:text-7xl font-light leading-tight mb-2 drop-shadow-lg">
              Modern <br />
              <span className="font-serif italic text-amber-500">Luxurious</span> <br />
              <span className="font-bold drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">Yours</span>
            </h1>
            <div className="flex gap-4 mt-8">
              <button 
                onClick={() => {
                  document.getElementById('listings-section')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-8 py-3 border-2 border-white/60 text-white hover:bg-white hover:text-black transition-all rounded-sm text-sm tracking-widest font-bold uppercase backdrop-blur-sm"
              >
                Khám Phá Ngay
              </button>
            </div>
          </motion.div>
        </div>
        
        {/* Bottom Fade to blend with next section */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#f8f9fa] dark:from-[#121212] to-transparent z-10 pointer-events-none"></div>
      </section>

      """
    
    updated_text = text[:hero_start] + new_hero + text[hero_end:]
    
    with codecs.open(file_path, 'w', 'utf-8') as f:
        f.write(updated_text)
    print("Updated Hero Section successfully.")
else:
    print("Could not find hero section boundaries.")
