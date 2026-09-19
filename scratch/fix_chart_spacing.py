import codecs
import re

file_path = r"c:\Users\Hieu\Desktop\do an oto_FE\components\tabs\AdminTab.tsx"
with codecs.open(file_path, "r", "utf-8") as f:
    content = f.read()

# 1. Fix BarChart empty space (Stretching to fill height)
content = content.replace(
    'className="lg:col-span-4 bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10 shadow-[0_0_15px_rgba(0,0,0,0.5)] hover:shadow-[0_0_25px_rgba(59,130,246,0.2)] hover:-translate-y-1 hover:scale-[1.01] transition-all duration-500"',
    'className="lg:col-span-4 bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10 shadow-[0_0_15px_rgba(0,0,0,0.5)] hover:shadow-[0_0_25px_rgba(59,130,246,0.2)] hover:-translate-y-1 hover:scale-[1.01] transition-all duration-500 flex flex-col"'
)

content = content.replace(
    '<div className="h-[300px] w-full">',
    '<div className="flex-1 w-full min-h-[300px]">'
)

# Fix Bar width
content = content.replace(
    'barSize={40}',
    'maxBarSize={80}'
)

# 2. Fix PieChart empty space (Make them larger)
content = content.replace(
    'innerRadius={60}',
    'innerRadius={90}'
)
content = content.replace(
    'outerRadius={80}',
    'outerRadius={130}'
)

# Increase the height of PieChart containers from 250px to 300px for better fit
content = content.replace(
    '<div className="h-[250px] w-full flex items-center justify-center">',
    '<div className="h-[300px] w-full flex items-center justify-center">'
)

with codecs.open(file_path, "w", "utf-8") as f:
    f.write(content)

print("Successfully updated chart sizing to fill empty spaces!")
