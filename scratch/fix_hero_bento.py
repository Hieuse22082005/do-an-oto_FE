import codecs
import re

file_path = 'components/modals/CarDetailModal.tsx'
with codecs.open(file_path, 'r', 'utf-8') as f:
    content = f.read()

# 1. Remove the slideshow logic from Hero
# We'll just hardcode the hero media to video_url or image_url.
# And we will put ALL gallery images in the Bento grid.

hero_media = """
        {/* Blurred Background Layer for low-res/vertical videos */}
        {car.video_url ? (
          <>
            <video src={car.video_url} className="absolute inset-0 w-full h-full object-cover blur-[80px] opacity-30 scale-110" autoPlay loop muted playsInline />
            <video src={car.video_url} className="relative z-10 w-full h-full object-contain" autoPlay loop muted playsInline />
          </>
        ) : (
          <>
            <img src={car.image_url} className="absolute inset-0 w-full h-full object-cover blur-[80px] opacity-30 scale-110" />
            <img src={car.image_url} alt={car.model} className="relative z-10 w-full h-full object-contain drop-shadow-2xl" />
          </>
        )}
"""

# Replace the AnimatePresence block with this static block
content = re.sub(r'<AnimatePresence>.*?</AnimatePresence>', hero_media, content, flags=re.DOTALL)

# Remove the dot indicators
content = re.sub(r'\{\/\* Slideshow Progress Indicators \*\/.*?</div>\s*\}', '', content, flags=re.DOTALL)

# Adjust Hero height from h-[70vh] md:h-[80vh] to h-[50vh] md:h-[65vh] so it's not too tall and empty
content = content.replace("h-[70vh] md:h-[80vh]", "h-[50vh] md:h-[65vh]")


# 2. Re-configure the Bento Grid to use ONLY images (gallery + main image if needed)
# The old code used `mediaList.slice(0, 5)` which included the video. 
# We want to use `car.gallery` directly, or a custom list of images.
bento_logic_old = r'\{mediaList\.slice\(0, 5\)\.map\(\(media, i\) => \{.*?\n\s*\}\)\}'

# We will build an image-only list in the component. Let's just do it directly in the map.
# But wait, `mediaList` is constructed at the top. We can just filter out videos.
new_bento = """{mediaList.filter(m => m.type === 'image').slice(0, 6).map((media, i) => {
                  let spanClass = "";
                  if (i === 0) spanClass = "col-span-2 row-span-2"; 
                  else if (i === 1 || i === 2) spanClass = "col-span-1 row-span-1";
                  else if (i === 3) spanClass = "col-span-1 md:col-span-2 row-span-1";
                  else spanClass = "col-span-1 row-span-1";

                  return (
                    <div 
                      key={i} 
                      className={`rounded-xl overflow-hidden relative group bg-zinc-900 border border-white/5 cursor-pointer hover:border-amber-500/30 transition-colors ${spanClass}`}
                      onClick={() => window.open(media.url, '_blank')}
                    >
                      <img src={media.url} alt={`Gallery ${i}`} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                        <span className="text-xs font-bold uppercase tracking-widest text-amber-500 border border-amber-500/50 px-2 py-1 rounded backdrop-blur-md bg-black/30">
                          Phóng to
                        </span>
                      </div>
                    </div>
                  );
                })}"""

content = re.sub(bento_logic_old, new_bento, content, flags=re.DOTALL)

with codecs.open(file_path, 'w', 'utf-8') as f:
    f.write(content)
print("Updated Hero and Bento grid!")
