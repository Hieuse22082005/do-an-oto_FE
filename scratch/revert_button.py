import codecs
import re

filepath = r'c:\Users\Hieu\Desktop\do an oto_FE\app\globals.css'
content = codecs.open(filepath, 'r', 'utf-8').read()

# Revert btn-uiverse to outline style
content = re.sub(
    r'\.btn-uiverse\s*\{[^}]+\}',
    """.btn-uiverse {
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
}""",
    content
)

content = re.sub(
    r'\.btn-uiverse:before\s*\{[^}]+\}',
    """.btn-uiverse:before {
  content: "";
  position: absolute;
  z-index: -1;
  background: var(--color);
  height: 1200px;
  width: 1200px;
  border-radius: 50%;
  top: 100%;
  left: 100%;
  transition: all 0.85s ease-out;
}""",
    content
)

content = re.sub(
    r'\.btn-uiverse:hover\s*\{[^}]+\}',
    """.btn-uiverse:hover {
  color: #fff !important;
}""",
    content
)

codecs.open(filepath, 'w', 'utf-8').write(content)
print('Reverted button to outline')
