import codecs

filepath = r'c:\Users\Hieu\Desktop\do an oto_FE\app\globals.css'
css = """
/* Liquid Hover Button from Uiverse.io */
.btn-liquid {
  position: relative;
  overflow: hidden;
  z-index: 1;
  transition: color 0.5s;
}

.btn-liquid::before {
  content: "";
  position: absolute;
  z-index: -1;
  background: currentColor;
  height: 300px;
  width: 300px;
  border-radius: 50%;
  top: 100%;
  left: 100%;
  transition: all 0.7s;
}

.btn-liquid:hover {
  color: #fff !important;
}

.btn-liquid:hover::before {
  top: -30px;
  left: -30px;
}

.btn-liquid:active::before {
  filter: brightness(0.7);
  transition: filter 0s;
}
"""
with codecs.open(filepath, 'a', 'utf-8') as f:
    f.write(css)
print('Added CSS')
