import codecs

file_path = r"c:\Users\Hieu\Desktop\do an oto_FE\components\tabs\FinesTab.tsx"
with codecs.open(file_path, "r", "utf-8") as f:
    content = f.read()

# Replace the current wrapper and background to properly span the full width
target = """  return (
    <div className="w-full max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-12 relative min-h-[700px] font-sans pb-10 pt-4">
      {/* BACKGROUND HEXAGON/CIRCUIT PATTERN (Subtle) */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay pointer-events-none"></div>
      
      {/* GRADIENT ORBS */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-500/20 rounded-full blur-[120px] pointer-events-none -z-10 animate-pulse"></div>
      <div className="absolute top-40 right-10 w-72 h-72 bg-violet-500/15 rounded-full blur-[100px] pointer-events-none -z-10"></div>
      
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">"""

replacement = """  return (
    <div className="w-full relative min-h-[700px] font-sans pb-10 pt-4">
      {/* FULL-WIDTH BACKGROUND PATTERNS & ORBS */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-15 mix-blend-overlay pointer-events-none"></div>
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[40rem] h-[40rem] bg-indigo-500/20 rounded-full blur-[120px] pointer-events-none -z-10 animate-[pulse_6s_ease-in-out_infinite]"></div>
      <div className="absolute top-40 right-10 w-96 h-96 bg-violet-500/15 rounded-full blur-[100px] pointer-events-none -z-10 animate-[pulse_8s_ease-in-out_infinite_alternate-reverse]"></div>
      
      {/* CENTERED CONTENT WRAPPER */}
      <div className="w-full max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">"""

if target in content:
    content = content.replace(target, replacement)
    
    # Need to add a closing </div> at the end for the new nested structure
    # Wait, the end of FinesTab currently is:
    #     </div>
    #   );
    # }
    
    # Let's just find the last </div>
    last_div_idx = content.rfind('</div>')
    content = content[:last_div_idx] + '</div>\n      </div>' + content[last_div_idx+6:]
    
    with codecs.open(file_path, "w", "utf-8") as f:
        f.write(content)
    print("Successfully separated background to w-full and content to max-w-1600!")
else:
    print("Target not found. Let me check the exact string.")
    
