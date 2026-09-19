import codecs
import re

file_path = r"c:\Users\Hieu\Desktop\do an oto_FE\components\tabs\AdminTab.tsx"
with codecs.open(file_path, "r", "utf-8") as f:
    content = f.read()

# Replace all bg-white on cards to dark glass
content = content.replace('bg-white p-6 rounded-xl border border-gray-200', 'bg-white/5 backdrop-blur-md p-6 rounded-xl border border-white/10')
content = content.replace('bg-white rounded-xl p-6 border border-gray-200', 'bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10')
content = content.replace('bg-white rounded-xl border border-gray-200', 'bg-white/5 backdrop-blur-md rounded-xl border border-white/10')

# Text colors
content = content.replace('text-gray-900', 'text-white')
content = content.replace('text-gray-800', 'text-gray-200')
content = content.replace('text-gray-700', 'text-gray-300')
content = content.replace('text-gray-600', 'text-gray-400')
# hover:border-gray-300 -> hover:border-white/20
content = content.replace('hover:border-gray-300', 'hover:border-white/30')

# Table borders and divide
content = content.replace('border-gray-100', 'border-white/10')
content = content.replace('divide-gray-100', 'divide-white/10')
content = content.replace('border-gray-200', 'border-white/10')

# Tooltip in Recharts
content = content.replace("cursor={{fill: '#f3f4f6'}}", "cursor={{fill: 'rgba(255,255,255,0.05)'}}")
content = content.replace("contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: '14px', fontWeight: 'bold', color: '#000' }}", "contentStyle={{ borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', fontSize: '14px', fontWeight: 'bold', color: '#fff', backgroundColor: '#020617' }}")
# BarChart tick color
content = content.replace("tick={{fill: '#6b7280', fontSize: 12}}", "tick={{fill: '#9ca3af', fontSize: 12}}")
# Bar fill color
content = content.replace('fill="#111827"', 'fill="#3b82f6"')

# Inputs and Selects
content = content.replace('bg-white text-black', 'bg-white/5 text-white')
content = content.replace('bg-white px-3', 'bg-white/10 text-white px-3')
content = content.replace('bg-gray-50', 'bg-white/5')
content = content.replace('border-gray-300', 'border-white/20')

# Header tabs border
content = content.replace('border-gray-800/50 sticky top-0 z-40 bg-[#020617]/80', 'border-white/10 sticky top-0 z-40 bg-[#020617]/50')

# Badges and UI elements
content = content.replace('bg-gray-100 flex items-center', 'bg-white/10 flex items-center')
content = content.replace('bg-gray-100 px-3', 'bg-white/10 text-white px-3')
content = content.replace('bg-black text-white px-4', 'bg-white text-black px-4') # Invert main black button to white

with codecs.open(file_path, "w", "utf-8") as f:
    f.write(content)

print("Applied dark theme (glassmorphism) to all cards!")
