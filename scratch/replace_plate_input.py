import codecs

filepath = r'c:\Users\Hieu\Desktop\do an oto_FE\components\tabs\FinesTab.tsx'
lines = codecs.open(filepath, 'r', 'utf-8').readlines()

new_input = """<div className="glitch-input-wrapper mb-8">
  <div className="input-container">
    <input
      type="text"
      id="holo-input"
      className="holo-input"
      placeholder=" "
      required
      value={queries.plate}
      onChange={(e) => handleInputChange('plate', e.target.value)}
    />
    <label htmlFor="holo-input" className="input-label" data-text="VD: 30G99999">
      VD: 30G99999
    </label>

    <div className="input-border"></div>
    <div className="input-scanline"></div>
    <div className="input-glow"></div>

    <div className="input-data-stream">
      <div className="stream-bar" style={{ "--i": 0 } as any}></div>
      <div className="stream-bar" style={{ "--i": 1 } as any}></div>
      <div className="stream-bar" style={{ "--i": 2 } as any}></div>
      <div className="stream-bar" style={{ "--i": 3 } as any}></div>
      <div className="stream-bar" style={{ "--i": 4 } as any}></div>
      <div className="stream-bar" style={{ "--i": 5 } as any}></div>
      <div className="stream-bar" style={{ "--i": 6 } as any}></div>
      <div className="stream-bar" style={{ "--i": 7 } as any}></div>
      <div className="stream-bar" style={{ "--i": 8 } as any}></div>
      <div className="stream-bar" style={{ "--i": 9 } as any}></div>
    </div>

    <div className="input-corners">
      <div className="corner corner-tl"></div>
      <div className="corner corner-tr"></div>
      <div className="corner corner-bl"></div>
      <div className="corner corner-br"></div>
    </div>
  </div>
</div>
"""

for i, line in enumerate(lines):
    if 'placeholder="VD: 30G99999"' in line:
        lines[i] = new_input
        break

codecs.open(filepath, 'w', 'utf-8').writelines(lines)
print('Replaced input')
