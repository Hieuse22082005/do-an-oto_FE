import codecs
import re

file_path = r"c:\Users\Hieu\Desktop\do an oto_FE\components\tabs\AdminTab.tsx"
with codecs.open(file_path, "r", "utf-8") as f:
    content = f.read()

# Fix missing defs
target = '<BarChart data={chartData.bar} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>'
replacement = """<BarChart data={chartData.bar} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                          <defs>
                            <linearGradient id="colorBar" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#3b82f6" stopOpacity={1}/>
                              <stop offset="100%" stopColor="#1e3a8a" stopOpacity={0.2}/>
                            </linearGradient>
                          </defs>"""
                          
if target in content:
    content = content.replace(target, replacement)
    print("Injected defs successfully.")
else:
    print("Could not find target string.")

with codecs.open(file_path, "w", "utf-8") as f:
    f.write(content)
