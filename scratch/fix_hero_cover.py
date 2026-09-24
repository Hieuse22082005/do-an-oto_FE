import codecs
import re

file_path = 'components/modals/CarDetailModal.tsx'
with codecs.open(file_path, 'r', 'utf-8') as f:
    content = f.read()

hero_media_cover = """
        {car.video_url ? (
          <video src={car.video_url} className="absolute inset-0 w-full h-full object-cover" autoPlay loop muted playsInline />
        ) : (
          <img src={car.image_url} alt={car.model} className="absolute inset-0 w-full h-full object-cover" />
        )}
"""

# Replace the current blur/contain logic with simple object-cover
content = re.sub(r'\{\/\* Blurred Background Layer for low-res/vertical videos \*\/\}.*?<\/video>\s*<\/>\s*\)\s*:\s*\(\s*<\>.*?\/>\s*<\/>\s*\)', hero_media_cover, content, flags=re.DOTALL)


with codecs.open(file_path, 'w', 'utf-8') as f:
    f.write(content)
print("Updated Hero to object-cover!")
