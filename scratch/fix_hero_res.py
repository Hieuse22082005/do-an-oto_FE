import codecs

file_path = 'components/modals/CarDetailModal.tsx'
with codecs.open(file_path, 'r', 'utf-8') as f:
    content = f.read()

# Replace the inner part of AnimatePresence to add a blurred background and object-contain foreground
old_hero = """            {mediaList[activeMedia]?.type === 'video' ? (
              <video 
                src={mediaList[activeMedia].url} 
                className="w-full h-full object-cover"
                autoPlay 
                loop 
                muted 
                playsInline
              />
            ) : (
              <img src={mediaList[activeMedia]?.url} alt={car.model} className="w-full h-full object-cover" />
            )}"""

new_hero = """            {mediaList[activeMedia]?.type === 'video' ? (
              <>
                {/* Blurred Background Layer for low-res/vertical videos */}
                <video 
                  src={mediaList[activeMedia].url} 
                  className="absolute inset-0 w-full h-full object-cover blur-[100px] opacity-40 scale-125"
                  autoPlay loop muted playsInline
                />
                {/* Crisp Foreground Layer */}
                <video 
                  src={mediaList[activeMedia].url} 
                  className="relative z-10 w-full h-full object-contain"
                  autoPlay loop muted playsInline
                />
              </>
            ) : (
              <>
                {/* Blurred Background Layer for low-res/vertical images */}
                <img src={mediaList[activeMedia]?.url} className="absolute inset-0 w-full h-full object-cover blur-[100px] opacity-40 scale-125" />
                {/* Crisp Foreground Layer */}
                <img src={mediaList[activeMedia]?.url} alt={car.model} className="relative z-10 w-full h-full object-contain drop-shadow-2xl" />
              </>
            )}"""

content = content.replace(old_hero, new_hero)

# Fix missing import Loader2 just in case it wasn't fixed
content = content.replace("Key, MapPin } from 'lucide-react'", "Key, MapPin, Loader2 } from 'lucide-react'")

with codecs.open(file_path, 'w', 'utf-8') as f:
    f.write(content)
print("Applied object-contain and blur background!")
