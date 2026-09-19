import codecs
import re

filepath = r'c:\Users\Hieu\Desktop\do an oto_FE\app\globals.css'
content = codecs.open(filepath, 'r', 'utf-8').read()

new_css = """
/* Exact Uiverse.io Button (Adapted for flex/w-full) */
.btn-uiverse {
  --color: #560bad;
  position: relative;
  overflow: hidden;
  border: 2px solid var(--color);
  transition: color 0.5s;
  z-index: 1;
  color: var(--color);
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-uiverse:before {
  content: "";
  position: absolute;
  z-index: -1;
  background: var(--color);
  height: 2000px;
  width: 2000px;
  border-radius: 50%;
  top: 100%;
  left: 100%;
  transition: all 0.7s ease-out;
}

.btn-uiverse:hover {
  color: #fff !important;
}

.btn-uiverse:hover:before {
  top: -500px;
  left: -500px;
}

.btn-uiverse:active:before {
  background: #3a0ca3;
  transition: background 0s;
}
"""

content = re.sub(r'/\* Exact Uiverse\.io Button \(Adapted for flex/w-full\)\*/.*?\}', new_css, content, flags=re.DOTALL)
content = re.sub(r'\.btn-uiverse:before\s*\{[^\}]+\}', '.btn-uiverse:before {\n  content: "";\n  position: absolute;\n  z-index: -1;\n  background: var(--color);\n  height: 2000px;\n  width: 2000px;\n  border-radius: 50%;\n  top: 100%;\n  left: 100%;\n  transition: all 0.7s ease-out;\n}', content)
content = re.sub(r'\.btn-uiverse:hover:before\s*\{[^\}]+\}', '.btn-uiverse:hover:before {\n  top: -500px;\n  left: -500px;\n}', content)

codecs.open(filepath, 'w', 'utf-8').write(content)
print('Fixed large button coverage')
