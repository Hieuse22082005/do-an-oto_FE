import codecs
import re

file_path = 'components/modals/CarDetailModal.tsx'
with codecs.open(file_path, 'r', 'utf-8') as f:
    content = f.read()

# Add arbitrary Tailwind filters to make the video colors pop
old_media = """          {car.video_url ? (
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

new_media = """          {car.video_url ? (
            <video 
              src={car.video_url} 
              className="absolute inset-0 w-full h-full object-cover contrast-[1.05] saturate-[1.1] brightness-[1.02]" 
              autoPlay loop muted playsInline 
            />
          ) : (
            <img 
              src={car.image_url} 
              alt={car.model} 
              className="absolute inset-0 w-full h-full object-cover contrast-[1.05] saturate-[1.1] brightness-[1.02]" 
            />
          )}"""

content = content.replace(old_media, new_media)

with codecs.open(file_path, 'w', 'utf-8') as f:
    f.write(content)
print("Added CSS filters to video!")
