import codecs

file_path = r"c:\Users\Hieu\Desktop\do an oto_FE\components\tabs\AdminTab.tsx"
with codecs.open(file_path, "r", "utf-8") as f:
    content = f.read()

# 1. CMS Badges
content = content.replace(
    'className="bg-gray-100 text-gray-400 px-3 py-1 rounded-full text-xs font-semibold"',
    'className="bg-blue-500/10 text-blue-400 border border-blue-500/30 px-3 py-1 rounded-full text-xs font-semibold shadow-[0_0_10px_rgba(37,99,235,0.2)]"'
)

# 2. Logs Table Header (glaring white bg)
content = content.replace(
    'className="border-b-2 border-white/10 sticky top-0 bg-white z-10"',
    'className="border-b-2 border-white/10 sticky top-0 bg-[#020617]/95 backdrop-blur-md z-10"'
)

# 3. Inputs and Select in Logs (missing bg, wrong focus)
content = content.replace(
    'className="border border-white/20 px-3 py-2 rounded-md text-sm text-white outline-none focus:border-black"',
    'className="border border-white/20 bg-[#0a0f1c] px-3 py-2 rounded-md text-sm text-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-300"'
)
content = content.replace(
    'className="border border-white/20 px-3 py-2 rounded-md text-sm text-white outline-none focus:border-black min-w-[150px]"',
    'className="border border-white/20 bg-[#0a0f1c] px-3 py-2 rounded-md text-sm text-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-300 min-w-[150px]"'
)
content = content.replace(
    'className="border border-white/20 px-3 py-2 rounded-md text-sm text-white outline-none focus:border-black w-64"',
    'className="border border-white/20 bg-[#0a0f1c] px-3 py-2 rounded-md text-sm text-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-300 w-64"'
)

# 4. Xuat CSV button
content = content.replace(
    'className="border border-white/20 bg-white hover:bg-gray-800/50 hover:shadow-md text-black px-4 py-2 rounded-md text-sm font-bold shadow-sm hover:-translate-y-0.5 active:scale-95 transition-all duration-200"',
    'className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 rounded-md text-sm font-bold shadow-[0_0_15px_rgba(37,99,235,0.4)] hover:shadow-[0_0_25px_rgba(37,99,235,0.7)] hover:-translate-y-0.5 active:scale-95 transition-all duration-300 border border-blue-400/50 flex items-center gap-2"'
)

# 5. Xem Data button
content = content.replace(
    'className="text-sm font-bold text-black border border-white/10 hover:border-black hover:bg-gray-800/50 bg-white/10 text-white px-3 py-1.5 rounded-md hover:-translate-y-0.5 active:scale-95 transition-all duration-200 shadow-sm hover:shadow-md"',
    'className="text-sm font-bold border border-white/20 hover:border-white/60 hover:bg-white/10 text-white px-4 py-1.5 rounded-md hover:-translate-y-0.5 active:scale-95 transition-all duration-300 shadow-sm"'
)

# 6. CMS 'Sua' and 'Xoa' buttons
content = content.replace(
    'className="text-gray-400 hover:text-black font-bold text-sm hover:underline mr-4 transition-colors"',
    'className="text-blue-400 hover:text-blue-300 font-bold text-sm hover:underline mr-4 transition-colors"'
)
content = content.replace(
    'className="text-red-500 hover:text-red-700 font-bold text-sm hover:underline transition-colors"',
    'className="text-red-400 hover:text-red-300 font-bold text-sm hover:underline transition-colors"'
)

# 7. Add icon to CSV button (since we made it flex)
content = content.replace(
    '>\n                    Xuất CSV',
    '>\n                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>\n                    Xuất CSV'
)

# 8. Check for any other table headers
content = content.replace(
    '<thead className="border-b-2 border-white/10">',
    '<thead className="border-b-2 border-white/10 bg-[#0a0f1c]/50">'
)

# 9. JSON Modal background is glaring white
content = content.replace(
    'className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden border border-white/10 flex flex-col max-h-[80vh]"',
    'className="bg-[#020617] rounded-xl shadow-[0_0_30px_rgba(0,0,0,0.8)] w-full max-w-lg overflow-hidden border border-white/10 flex flex-col max-h-[80vh]"'
)
content = content.replace(
    'className="p-4 overflow-auto bg-white/5 text-gray-200 font-mono text-xs leading-relaxed"',
    'className="p-4 overflow-auto bg-[#0a0f1c] text-green-400 font-mono text-xs leading-relaxed"'
)

# 10. Check "Thêm Bài Viết" button
content = content.replace(
    'className="bg-white text-black px-4 py-2 rounded-md text-sm font-bold shadow-sm hover:bg-gray-800 hover:shadow-lg hover:-translate-y-0.5 active:scale-95 transition-all duration-200"',
    'className="bg-white hover:bg-gray-200 text-black px-4 py-2 rounded-md text-sm font-bold shadow-[0_0_15px_rgba(255,255,255,0.3)] hover:shadow-[0_0_25px_rgba(255,255,255,0.5)] hover:-translate-y-0.5 active:scale-95 transition-all duration-300"'
)


with codecs.open(file_path, "w", "utf-8") as f:
    f.write(content)

print("Applied cyberpunk styling, glowing hover effects, and fixed white table header!")
