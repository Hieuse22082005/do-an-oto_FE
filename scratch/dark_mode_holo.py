import codecs

filepath = r'c:\Users\Hieu\Desktop\do an oto_FE\app\globals.css'
lines = codecs.open(filepath, 'r', 'utf-8').readlines()

content = "".join(lines)

# 1. Add CSS variables to glitch-input-wrapper
old_vars = """.glitch-input-wrapper {
  --bg-color: #0d0d0d;
  --primary-color: #0284c7;
  --secondary-color: #a855f7;
  --text-color: #64748b;
  --font-family: "Fira Code", Consolas, "Courier New", Courier, monospace;
  --glitch-anim-duration: 0.4s;"""

new_vars = """.glitch-input-wrapper {
  --bg-color: transparent;
  --primary-color: #0284c7;
  --secondary-color: #a855f7;
  --text-color: #64748b;
  --input-bg: #e2e8f0;
  --font-family: "Fira Code", Consolas, "Courier New", Courier, monospace;
  --glitch-anim-duration: 0.4s;
}

.dark .glitch-input-wrapper {
  --primary-color: #00f2ea;
  --text-color: #94a3b8;
  --input-bg: rgba(15, 23, 42, 0.7);
"""

content = content.replace(old_vars, new_vars)

# 2. Update holo-input background
content = content.replace('background: #e2e8f0; border-radius: 8px 8px 0 0;', 'background: var(--input-bg); border-radius: 8px 8px 0 0;')

# 3. Update input-label background
content = content.replace('background-color: #e2e8f0;', 'background-color: var(--input-bg);')

codecs.open(filepath, 'w', 'utf-8').write(content)
print('Added dark mode support for holo input')
