import codecs
import re

file_path = 'components/modals/CarDetailModal.tsx'
with codecs.open(file_path, 'r', 'utf-8') as f:
    content = f.read()

# Replace the Media Container
old_media_container = r'\{\/\* Left\/Top: Media occupying its exact native aspect ratio \*\/\}[\s\S]*?\{\/\* Right\/Bottom: Text and Intro taking up all remaining space \*\/\}'

new_media_container = """{/* Left/Top: Media occupying 40% width to avoid being too thin */}
        <div className="h-[50vh] lg:h-full w-full lg:w-[45%] flex-shrink-0 bg-black relative border-r border-white/5 shadow-[20px_0_30px_-15px_rgba(0,0,0,0.7)] z-20">
          {car.video_url ? (
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
          )}
        </div>

        {/* Right/Bottom: Text and Intro taking up all remaining space */}"""

content = re.sub(old_media_container, new_media_container, content)

# Adjust padding for the text container so it spans out nicely
content = content.replace(
    'className="flex-1 h-full bg-zinc-950 flex flex-col justify-center p-8 md:p-12 lg:p-16 relative overflow-y-auto"',
    'className="flex-1 h-full bg-zinc-950 flex flex-col justify-center p-8 md:p-12 lg:px-24 lg:py-16 relative overflow-y-auto"'
)

with codecs.open(file_path, 'w', 'utf-8') as f:
    f.write(content)
print("Adjusted video to 45% width!")
