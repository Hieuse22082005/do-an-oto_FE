import codecs

file_path = r"c:\Users\Hieu\Desktop\do an oto_FE\components\tabs\FinesTab.tsx"
with codecs.open(file_path, "r", "utf-8") as f:
    content = f.read()

# Make the layout wider
content = content.replace('max-w-7xl mx-auto px-4 sm:px-6 lg:px-8', 'max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-12')

# Fix grid if needed (3 - 6 - 3 is fine for 1600px, it gives 400px - 800px - 400px)

# Add some sharp contrast (e.g., border-slate-700 instead of 800 for better visibility, and slightly lighter cards)
content = content.replace('bg-[#0f172a]', 'bg-slate-900')
content = content.replace('border-slate-800', 'border-slate-700/60')
content = content.replace('bg-slate-900/90', 'bg-slate-900')

# Ensure the ghost text is GONE (sometimes there are empty spans with huge text)
content = content.replace('text-[8rem]', 'text-xs')
content = content.replace('text-[12rem]', 'text-xs')

# Fix wrapping in Left Menu by reducing gap and text size slightly if needed, or allowing flex-shrink
content = content.replace('gap-5 px-5', 'gap-4 px-4')
content = content.replace('text-xs uppercase tracking-wide', 'text-[11px] uppercase tracking-wider')

with codecs.open(file_path, "w", "utf-8") as f:
    f.write(content)

print("Widened layout and sharpened contrast!")
