import codecs
import re

file_path = 'components/modals/CarDetailModal.tsx'
with codecs.open(file_path, 'r', 'utf-8') as f:
    content = f.read()

# 1. Fix the Hero Video cropping (change object-cover to object-contain with blur background for the 2/3 container)
old_hero_media = """          {car.video_url ? (
            <video 
              src={car.video_url} 
              className="absolute inset-0 w-full h-full object-cover" 
              autoPlay loop muted playsInline 
            />
          ) : (
            <img 
              src={car.image_url} 
              alt={car.model} 
              className="absolute inset-0 w-full h-full object-cover" 
            />
          )}"""

new_hero_media = """          {car.video_url ? (
            <>
              <video src={car.video_url} className="absolute inset-0 w-full h-full object-cover blur-[60px] opacity-30" autoPlay loop muted playsInline />
              <video src={car.video_url} className="relative z-10 w-full h-full object-contain" autoPlay loop muted playsInline />
            </>
          ) : (
            <>
              <img src={car.image_url} className="absolute inset-0 w-full h-full object-cover blur-[60px] opacity-30" />
              <img src={car.image_url} alt={car.model} className="relative z-10 w-full h-full object-contain" />
            </>
          )}"""

content = content.replace(old_hero_media, new_hero_media)

# 2. Show ALL images (remove slice(0, 7))
content = content.replace("mediaList.slice(0, 7).map(", "mediaList.map(")

# Update the count in the heading
content = content.replace("Thư viện ảnh ({mediaList.length})", "Thư viện ảnh ({mediaList.length} ảnh)")

with codecs.open(file_path, 'w', 'utf-8') as f:
    f.write(content)
print("Fixed cropping and Bento slice!")
