import codecs

file_path = 'components/modals/CarDetailModal.tsx'

with codecs.open(file_path, 'r', 'utf-8') as f:
    content = f.read()

# Let's add state for active media
old_hooks = """  const [buying, setBuying] = useState(false);
  
  // Prevent scrolling when modal is open
  useEffect(() => {"""

new_hooks = """  const [buying, setBuying] = useState(false);
  const [activeMedia, setActiveMedia] = useState(0);
  
  // Build media list
  const mediaList = [];
  if (car.video_url) {
    mediaList.push({ type: 'video', url: car.video_url });
  }
  if (car.image_url) {
    mediaList.push({ type: 'image', url: car.image_url });
  }
  // Fallback if neither exists
  if (mediaList.length === 0) {
    mediaList.push({ type: 'image', url: 'https://via.placeholder.com/800x600' });
  }
  
  // Prevent scrolling when modal is open
  useEffect(() => {"""

content = content.replace(old_hooks, new_hooks)

# Let's replace the Left Side
old_left_side = """        {/* Left Side: Poster Image with Magnifier */}
        <div className="w-full md:w-1/2 h-1/2 md:h-full relative bg-black flex items-center justify-center overflow-hidden group">
          <MagnifierImage src={car.image_url} alt={car.model} />
        </div>"""

new_left_side = """        {/* Left Side: Media Gallery */}
        <div className="w-full md:w-1/2 h-1/2 md:h-full relative bg-black flex flex-col items-center justify-center overflow-hidden group">
          
          {/* Main Display */}
          <div className="w-full h-full relative">
            {mediaList[activeMedia]?.type === 'video' ? (
              <video 
                src={mediaList[activeMedia].url} 
                className="w-full h-full object-cover"
                autoPlay 
                loop 
                muted 
                playsInline
              />
            ) : (
              <MagnifierImage src={mediaList[activeMedia]?.url} alt={car.model} />
            )}
          </div>

          {/* Thumbnails */}
          {mediaList.length > 1 && (
            <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-3 px-4 z-50">
              {mediaList.map((media, idx) => (
                <button 
                  key={idx}
                  onClick={() => setActiveMedia(idx)}
                  className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                    activeMedia === idx ? 'border-amber-500 scale-110 shadow-[0_0_15px_rgba(245,158,11,0.5)]' : 'border-white/20 opacity-60 hover:opacity-100 hover:scale-105'
                  }`}
                >
                  {media.type === 'video' ? (
                    <>
                      <video src={media.url} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <div className="w-6 h-6 rounded-full bg-white/30 backdrop-blur flex items-center justify-center">
                          <div className="w-0 h-0 border-t-[4px] border-t-transparent border-l-[6px] border-l-white border-b-[4px] border-b-transparent ml-0.5"></div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <img src={media.url} className="w-full h-full object-cover" alt="Thumbnail" />
                  )}
                </button>
              ))}
            </div>
          )}

        </div>"""

content = content.replace(old_left_side, new_left_side)

with codecs.open(file_path, 'w', 'utf-8') as f:
    f.write(content)

print("Updated CarDetailModal with Video + Image Gallery!")
