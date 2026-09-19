import re

file_path = r"c:\Users\Hieu\Desktop\do an oto_FE\tailwind.config.ts"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

scan_kf = """          scan: {
            '0%, 100%': { transform: 'translateY(0)' },
            '50%': { transform: 'translateY(96px)' },
          },
          shimmer: {"""

content = content.replace("          shimmer: {", scan_kf)

scan_anim = """          'fadeInUp': 'fadeInUp 0.6s ease-out forwards',
          'scan': 'scan 2.5s ease-in-out infinite',"""

content = content.replace("'fadeInUp': 'fadeInUp 0.6s ease-out forwards',", scan_anim)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)
print("Updated tailwind.config.ts!")
