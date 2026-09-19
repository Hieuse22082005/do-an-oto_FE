import codecs

filepath = r'c:\Users\Hieu\Desktop\do an oto_FE\app\globals.css'
css = """
/* Exact Uiverse.io Button */
.btn-uiverse {
  --color: #560bad;
  font-family: inherit;
  display: inline-block;
  min-width: 8em;
  height: 2.6em;
  line-height: 2.5em;
  position: relative;
  cursor: pointer;
  overflow: hidden;
  border: 2px solid var(--color);
  transition: color 0.5s;
  z-index: 1;
  font-size: 17px;
  border-radius: 6px;
  font-weight: 500;
  color: var(--color);
  background: transparent;
  padding: 0 20px;
  text-align: center;
}

.btn-uiverse:before {
  content: "";
  position: absolute;
  z-index: -1;
  background: var(--color);
  height: 200px;
  width: 300px;
  border-radius: 50%;
  top: 100%;
  left: 100%;
  transition: all 0.7s;
}

.btn-uiverse:hover {
  color: #fff !important;
}

.btn-uiverse:hover:before {
  top: -50px;
  left: -50px;
}

.btn-uiverse:active:before {
  background: #3a0ca3;
  transition: background 0s;
}
"""
with codecs.open(filepath, 'a', 'utf-8') as f:
    f.write(css)
print('Added exact CSS')
