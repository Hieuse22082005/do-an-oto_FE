import codecs
import re

file_path = 'components/modals/CarDetailModal.tsx'

with codecs.open(file_path, 'r', 'utf-8') as f:
    content = f.read()

magnifier_component = """
function MagnifierImage({ src, alt }: { src: string; alt: string }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [showMagnifier, setShowMagnifier] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  return (
    <div 
      className="relative w-full h-full cursor-zoom-in overflow-hidden"
      onMouseEnter={() => setShowMagnifier(true)}
      onMouseLeave={() => setShowMagnifier(false)}
      onMouseMove={(e) => {
        const { top, left, width, height } = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - left) / width) * 100;
        const y = ((e.clientY - top) / height) * 100;
        setPosition({ x, y });
        setCursorPosition({ x: e.clientX - left, y: e.clientY - top });
      }}
    >
      <img src={src} alt={alt} className="w-full h-full object-cover" />

      {showMagnifier && (
        <div 
          className="absolute pointer-events-none rounded-full"
          style={{
            display: "block",
            width: "300px",
            height: "300px",
            left: `${cursorPosition.x - 150}px`,
            top: `${cursorPosition.y - 150}px`,
            backgroundImage: `url('${src}')`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "250%", 
            backgroundPosition: `${position.x}% ${position.y}%`,
            zIndex: 50,
            boxShadow: "0 0 0 7px rgba(255,255,255,0.1), 0 0 20px rgba(0,0,0,0.5), inset 0 0 20px rgba(0,0,0,0.5)",
            backdropFilter: "blur(4px)"
          }}
        />
      )}
    </div>
  );
}

export default function CarDetailModal({ car, onClose, onBuy }: CarDetailModalProps) {
"""

# Replace export default function with our Magnifier + export default function
content = content.replace("export default function CarDetailModal({ car, onClose, onBuy }: CarDetailModalProps) {", magnifier_component)

old_img_block = """        {/* Left Side: Poster Image */}
        <div className="w-full md:w-1/2 h-1/2 md:h-full relative bg-black flex items-center justify-center overflow-hidden">
          <img 
            src={car.image_url} 
            alt={car.model} 
            className="w-full h-full object-cover"
          />
        </div>"""

new_img_block = """        {/* Left Side: Poster Image with Magnifier */}
        <div className="w-full md:w-1/2 h-1/2 md:h-full relative bg-black flex items-center justify-center overflow-hidden group">
          <MagnifierImage src={car.image_url} alt={car.model} />
        </div>"""

content = content.replace(old_img_block, new_img_block)

with codecs.open(file_path, 'w', 'utf-8') as f:
    f.write(content)

print("Added MagnifierImage to CarDetailModal.tsx!")
