import codecs
import re

file_path = 'components/modals/CarDetailModal.tsx'
with codecs.open(file_path, 'r', 'utf-8') as f:
    content = f.read()

old_media_block = """          {/* Blurred Background Layer to avoid empty black bars */}
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
          )}"""

new_media_block = """          {car.video_url ? (
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

content = content.replace(old_media_block, new_media_block)

with codecs.open(file_path, 'w', 'utf-8') as f:
    f.write(content)
print("Changed video to object-cover!")
