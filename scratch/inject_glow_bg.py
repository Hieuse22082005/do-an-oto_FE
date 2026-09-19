import codecs
import re

file_path = r"c:\Users\Hieu\Desktop\do an oto_FE\components\tabs\AdminTab.tsx"
with codecs.open(file_path, "r", "utf-8") as f:
    content = f.read()

# 1. We need to add mouse tracking state and handler
state_inject = """  const [transactions, setTransactions] = useState<any[]>([
"""
new_state = """  const [mousePos, setMousePos] = useState({ x: 50, y: 200 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });
  };

  const [transactions, setTransactions] = useState<any[]>([
"""
content = content.replace(state_inject, new_state)

# 2. Modify the root div to have the dark background and mouse move handler
old_root = '<div className="w-full mx-auto relative min-h-screen bg-white font-sans text-gray-900 pb-12">'
new_root = """<div 
      className="w-full mx-auto relative min-h-screen bg-[#020617] font-sans text-gray-900 pb-12 overflow-hidden transition-colors duration-500"
      onMouseMove={handleMouseMove}
    >
      {/* Animated Radial Glow Background */}
      <div
        className="absolute inset-0 z-0 pointer-events-none transition-all duration-300 ease-out"
        style={{
          background: `radial-gradient(circle 600px at ${mousePos.x}px ${mousePos.y}px, rgba(62, 62, 62, 0.4), transparent 80%)`,
        }}
      />
      
      {/* Content wrapper to ensure it sits above the background */}
      <div className="relative z-10">"""
content = content.replace(old_root, new_root)

# 3. Modify the Header to match the dark background
old_header = '<div className="border-b border-gray-200 sticky top-0 z-40 bg-white">'
new_header = '<div className="border-b border-gray-800/50 sticky top-0 z-40 bg-[#020617]/80 backdrop-blur-md">'
content = content.replace(old_header, new_header)

# Make tabs white/gray text instead of black/gray to contrast the dark header
content = content.replace(
    "? 'border-black text-black'",
    "? 'border-white text-white'"
)
content = content.replace(
    "border-transparent text-gray-500 hover:text-gray-800'",
    "border-transparent text-gray-400 hover:text-white hover:bg-white/5'"
)
content = content.replace(
    "hover:bg-gray-50",
    "hover:bg-gray-800/50"
)

# 4. We must close the new Content wrapper at the very end
# Find the last `</div>` before `);`
content = re.sub(r'(\s*</div>\s*)\);\s*\}', r'\1      </div>\n\1);\n}', content)


with codecs.open(file_path, "w", "utf-8") as f:
    f.write(content)

print("Injected Animated Radial Glow Background!")
