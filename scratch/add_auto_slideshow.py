import codecs
import re

file_path = 'components/modals/CarDetailModal.tsx'

with codecs.open(file_path, 'r', 'utf-8') as f:
    content = f.read()

# 1. Add state and effect
old_state = """  const [activeMedia, setActiveMedia] = useState(0);"""
new_state = """  const [activeMedia, setActiveMedia] = useState(0);
  const [isHoveringGallery, setIsHoveringGallery] = useState(false);"""

content = content.replace(old_state, new_state)

old_effect = """  // Prevent scrolling when modal is open
  useEffect(() => {"""
new_effect = """  // Auto-slide gallery
  useEffect(() => {
    if (mediaList.length <= 1 || isHoveringGallery) return;
    
    const interval = setInterval(() => {
      setActiveMedia((prev) => (prev + 1) % mediaList.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [mediaList.length, isHoveringGallery]);

  // Prevent scrolling when modal is open
  useEffect(() => {"""

content = content.replace(old_effect, new_effect)

# 2. Add hover listeners to the left side container
old_left_container = """        {/* Left Side: Media Gallery */}
        <div className="w-full md:w-1/2 h-1/2 md:h-full relative bg-black flex flex-col items-center justify-center overflow-hidden group">"""

new_left_container = """        {/* Left Side: Media Gallery */}
        <div 
          className="w-full md:w-1/2 h-1/2 md:h-full relative bg-black flex flex-col items-center justify-center overflow-hidden group"
          onMouseEnter={() => setIsHoveringGallery(true)}
          onMouseLeave={() => setIsHoveringGallery(false)}
        >"""

content = content.replace(old_left_container, new_left_container)

with codecs.open(file_path, 'w', 'utf-8') as f:
    f.write(content)

print("Added slideshow auto-play!")
