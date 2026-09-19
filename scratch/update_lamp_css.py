import codecs
import re

css = """
/* --- LAMP THEME TOGGLE --- */
.lamp-theme-toggle-wrapper {
  position: relative;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  transform: scale(0.4);
  transform-origin: center right;
  z-index: 50;
  margin-right: 20px;
  width: 130px;
  height: 60px; /* match switch height so it doesn't push layout */
}

#switch {
  visibility: hidden;
  clip: rect(0 0 0 0);
  position: absolute;
  left: 9999px;
}

/* The switch itself */
.switch {
  display: block;
  width: 130px;
  height: 60px;
  position: absolute;
  top: 0;
  background: #ced8da;
  background: linear-gradient(
    to left,
    #ced8da 0%,
    #d8e0e3 29%,
    #ccd4d7 34%,
    #d4dcdf 62%,
    #fff9f4 68%,
    #e1e9ec 74%,
    #b7bfc2 100%
  );
  transition: all 0.2s ease-out;
  cursor: pointer;
  border-radius: 0.35em;
  box-shadow:
    0 0 1px 2px rgba(0, 0, 0, 0.7),
    inset 0 2px 0 rgba(255, 255, 255, 0.6),
    inset 0 -1px 0 1px rgba(0, 0, 0, 0.3),
    0 8px 10px rgba(0, 0, 0, 0.15);
}

.switch:before {
  display: block;
  position: absolute;
  left: -35px;
  right: -35px;
  top: -25px;
  bottom: -25px;
  z-index: -2;
  content: "";
  border-radius: 0.4em;
  background: #d5dde0;
  background: linear-gradient(#d7dfe2, #bcc7cd);
  box-shadow:
    inset 0 2px 0 rgba(255, 255, 255, 0.6),
    inset 0 -1px 1px 1px rgba(0, 0, 0, 0.3),
    0 0 8px 2px rgba(0, 0, 0, 0.2),
    0 2px 4px 2px rgba(0, 0, 0, 0.1);
  pointer-events: none;
  transition: all 0.2s ease-out;
}

.switch:after {
  content: "";
  position: absolute;
  right: -25px;
  top: 50%;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #788b91;
  margin-top: -8px;
  z-index: -1;
  box-shadow:
    inset 0 -1px 8px rgba(0, 0, 0, 0.7),
    inset 0 -2px 2px rgba(0, 0, 0, 0.2),
    0 1px 0 white,
    0 -1px 0 rgba(0, 0, 0, 0.5),
    -47px 32px 15px 13px rgba(0, 0, 0, 0.25);
  transition: all 0.2s ease-out;
}

/* The lamp container (the light beam) */
.lamp {
  position: absolute;
  top: -50px;
  left: 50%;
  transform: translateX(-50%);
  width: 600px;
  height: 800px;
  background-color: transparent;
  clip-path: polygon(49% 1.5%, 49% 0, 51% 0, 51% 1.5%, 150% 100%, -50% 100%);
  z-index: -10;
  pointer-events: none;
  transition: all 500ms ease;
}

/* The lamp hardware */
.lamp-body {
  position: absolute;
  left: 50%;
  top: 0;
  height: 12px;
  width: 100px;
  transform: translate(-50%, 0%);
  background: linear-gradient(45deg, #ff8800, #f5d8b7);
  filter: brightness(80%);
  z-index: 10;
}

.lamp-body::before {
  content: "";
  background-color: rgb(255, 83, 16);
  position: absolute;
  top: 0;
  height: 4px;
  width: 100%;
  z-index: 1;
}

.lamp-bulb {
  position: absolute;
  top: 12px;
  left: 50%;
  transform: translate(-50%, 0);
  background-color: rgba(255, 230, 0, 0.3);
  width: 24px;
  height: 16px;
  z-index: 9;
  border-radius: 0 0 50% 50%;
}

/* Checked states */
#switch:checked ~ .switch {
  background: #b7bfc2;
  background: linear-gradient(
    to right,
    #b7bfc2 0%,
    #e1e9ec 26%,
    #fff9f4 32%,
    #d4dcdf 38%,
    #ccd4d7 66%,
    #d8e0e3 71%,
    #ced8da 100%
  );
  box-shadow:
    0 0 1px 2px rgba(0, 0, 0, 0.7),
    inset 0 2px 0 rgba(255, 255, 255, 0.6),
    inset 0 -1px 0 1px rgba(0, 0, 0, 0.3),
    0 8px 10px rgba(0, 0, 0, 0.15),
    0px 10px 10px black;
}

#switch:checked ~ .switch::before {
  box-shadow:
    inset 0 2px 0 rgba(255, 255, 255, 0.6),
    inset 0 -1px 1px 1px rgba(0, 0, 0, 0.3),
    0 0 8px 2px rgba(0, 0, 0, 0.2),
    0 2px 4px 2px rgba(0, 0, 0, 0.1),
    0px 5px 10px black;
}

#switch:checked ~ .switch:after {
  background: #b1ffff;
  box-shadow:
    inset 0 -1px 8px rgba(0, 0, 0, 0.7),
    inset 0 -2px 2px rgba(0, 0, 0, 0.2),
    0 1px 0 white,
    0 -1px 0 rgba(0, 0, 0, 0.5),
    -110px 32px 15px 13px rgba(0, 0, 0, 0.25);
}

#switch:checked ~ .lamp {
  background-color: rgba(255, 255, 255, 0.1);
}

#switch:checked ~ .lamp .lamp-body {
  filter: brightness(100%);
}

#switch:checked ~ .lamp .lamp-bulb {
  background-color: rgba(255, 230, 0, 0.7);
  box-shadow: 0 0 20px 10px rgba(255, 230, 0, 0.4);
}
"""

filepath = r'c:\Users\Hieu\Desktop\do an oto_FE\app\globals.css'
lines = codecs.open(filepath, 'r', 'utf-8').read()

# Replace old lamp CSS completely
start_idx = lines.find('/* --- LAMP THEME TOGGLE --- */')
if start_idx != -1:
    lines = lines[:start_idx]

lines += css
codecs.open(filepath, 'w', 'utf-8').write(lines)
print('Updated Lamp CSS')
