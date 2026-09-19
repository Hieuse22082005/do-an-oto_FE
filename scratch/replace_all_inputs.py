import codecs
import re

filepath = r'c:\Users\Hieu\Desktop\do an oto_FE\components\tabs\FinesTab.tsx'
lines = codecs.open(filepath, 'r', 'utf-8').readlines()

glitch_component = """
const GlitchInput = ({ id, label, value, onChange, maxLength, className = "" }: any) => (
  <div className={`glitch-input-wrapper ${className}`}>
    <div className="input-container">
      <input
        type="text"
        id={id}
        className="holo-input"
        placeholder=" "
        required
        value={value}
        onChange={onChange}
        maxLength={maxLength}
      />
      <label htmlFor={id} className="input-label" data-text={label}>
        {label}
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
);

"""

# Insert component before FinesTab
for i, line in enumerate(lines):
    if 'export default function FinesTab' in line:
        lines.insert(i, glitch_component)
        break

# Now, we need to replace the manual block (lines 465 to 498 assuming it shifted)
# Let's find it again dynamically:
start_idx = -1
end_idx = -1
for i, line in enumerate(lines):
    if '<div className="glitch-input-wrapper mb-8">' in line:
        start_idx = i
    if start_idx != -1 and '</div>' in line:
        # wait, it's 34 lines
        if i - start_idx > 30 and '</div>' in line and lines[i-1].strip() == '</div>':
            end_idx = i
            break

if start_idx != -1 and end_idx != -1:
    del lines[start_idx:end_idx+1]
    lines.insert(start_idx, """<GlitchInput id="holo-plate-1" label="VD: 30G99999" value={queries.plate} onChange={(e: any) => handleInputChange('plate', e.target.value)} className="mb-8" />\n""")

# Registry Check
# 619: <input type="text" value={queries.plate} ... placeholder="Biển số xe"
# 620: <input type="text" value={queries.cert} ... placeholder="Số Tem/GCN"
for i, line in enumerate(lines):
    if 'placeholder="Bin s xe"' in line or 'placeholder="Biển số xe"' in line:
        lines[i] = """<GlitchInput id="holo-reg-plate" label="Biển số xe" value={queries.plate} onChange={(e: any) => handleInputChange('plate', e.target.value)} />\n"""
    elif 'placeholder="S Tem/GCN"' in line or 'placeholder="Số Tem/GCN"' in line:
        lines[i] = """<GlitchInput id="holo-reg-cert" label="Số Tem/GCN" value={queries.cert} onChange={(e: any) => handleInputChange('cert', e.target.value)} />\n"""
    elif 'placeholder="Nhp S Khung hoc Bin S"' in line or 'placeholder="Nhập Số Khung hoặc Biển Số"' in line:
        lines[i] = """<GlitchInput id="holo-stolen-vin" label="Nhập Số Khung hoặc Biển Số" value={queries.vin} onChange={(e: any) => handleInputChange('vin', e.target.value)} className="mb-8" />\n"""
    elif 'placeholder="Nhp 12 s GPLX (VD: 010123456789)"' in line or 'placeholder="Nhập 12 số GPLX (VD: 010123456789)"' in line:
        lines[i] = """<GlitchInput id="holo-gplx" label="Nhập 12 số GPLX (VD: 010123456789)" maxLength={12} value={queries.gplx} onChange={(e: any) => handleInputChange('gplx', e.target.value)} className="mb-8" />\n"""

codecs.open(filepath, 'w', 'utf-8').writelines(lines)
print('Replaced all inputs with GlitchInput')
