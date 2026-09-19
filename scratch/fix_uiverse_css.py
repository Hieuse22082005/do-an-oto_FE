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
  height: 400px;
  width: 500px;
  border-radius: 50%;
  top: 100%;
  left: 100%;
  transition: all 0.7s;
}

.btn-uiverse:hover {
  color: #fff !important;
}

.btn-uiverse:hover:before {
  top: -100px;
  left: -100px;
}

.btn-uiverse:active:before {
  background: #3a0ca3;
  transition: background 0s;
}
"""

content = re.sub(r'/\* Exact Uiverse\.io Button \*/.*?\}', new_css, content, flags=re.DOTALL)
codecs.open(filepath, 'w', 'utf-8').write(content)
print('Fixed generic button CSS')
