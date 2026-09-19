import re

file_path = r"c:\Users\Hieu\Desktop\do an oto_FE\components\tabs\FinesTab.tsx"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# Pattern for the global watermark
# It looks like:
#         <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none opacity-[0.02] overflow-hidden z-0">
#           <h1 className="text-[15vw] font-black whitespace-nowrap">PHÁP LÝ Ô TÔ</h1>
#         </div>

# Since regex is tricky with encoding, we'll just search for `text-[15vw]` and remove the block
block_pattern = re.compile(r'\s*<div className="absolute top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none opacity-\[0\.02\] overflow-hidden z-0">\s*<h1 className="text-\[15vw\] font-black whitespace-nowrap">.*?</h1>\s*</div>', re.DOTALL)

matches = block_pattern.findall(content)
if matches:
    content = content.replace(matches[0], '')
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(content)
    print("Removed global watermark!")
else:
    print("Could not find global watermark.")
