import re

file_path = r"c:\Users\Hieu\Desktop\do an oto_FE\tailwind.config.ts"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# Add keyframes
keyframes_str = """
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
        scanVertical: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' }
        },
        glitch: {
          '0%, 100%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' }
        },
        pulseNeon: {
          '0%, 100%': { opacity: '1', filter: 'drop-shadow(0 0 2px #22c55e)' },
          '50%': { opacity: '0.7', filter: 'drop-shadow(0 0 10px #22c55e)' }
        }
"""
content = re.sub(r"shimmer:\s*\{\s*'100%':\s*\{\s*transform:\s*'translateX\(100%\)'\s*\},\s*\}", keyframes_str, content)

# Add animations
animations_str = """
        'shimmer': 'shimmer 1.5s infinite',
        'scan-vertical': 'scanVertical 3s linear infinite',
        'glitch': 'glitch 0.2s ease-in-out infinite',
        'pulse-neon': 'pulseNeon 2s ease-in-out infinite',
"""
content = re.sub(r"'shimmer':\s*'shimmer 1.5s infinite',", animations_str, content)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("tailwind.config.ts updated with hacker animations!")
