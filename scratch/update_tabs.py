import codecs
import re

# 1. Update FinesTab
filepath_fines = r'c:\Users\Hieu\Desktop\do an oto_FE\components\tabs\FinesTab.tsx'
lines_fines = codecs.open(filepath_fines, 'r', 'utf-8').readlines()

# find GlitchInput
start_idx = -1
end_idx = -1
for i, line in enumerate(lines_fines):
    if 'const GlitchInput = ' in line:
        start_idx = i
    if start_idx != -1 and line.strip() == ');':
        end_idx = i
        break

if start_idx != -1 and end_idx != -1:
    del lines_fines[start_idx:end_idx+1]
    lines_fines.insert(0, "import GlitchInput from '../GlitchInput';\n")

codecs.open(filepath_fines, 'w', 'utf-8').writelines(lines_fines)
print('Updated FinesTab')

# 2. Update SearchTab
filepath_search = r'c:\Users\Hieu\Desktop\do an oto_FE\components\tabs\SearchTab.tsx'
lines_search = codecs.open(filepath_search, 'r', 'utf-8').readlines()
# insert import
lines_search.insert(0, "import GlitchInput from '../GlitchInput';\n")

# find input
start_idx = -1
end_idx = -1
for i, line in enumerate(lines_search):
    if '<input' in line and 'type="text"' in lines_search[i+1]:
        start_idx = i
        for j in range(i, i+15):
            if '/>' in lines_search[j]:
                end_idx = j
                break
        break

if start_idx != -1 and end_idx != -1:
    del lines_search[start_idx:end_idx+1]
    lines_search.insert(start_idx, """<GlitchInput id="holo-search-tx" label="Nhập mã TxHash (VD: 0x123abc...)" value={searchTx} onChange={(e: any) => setSearchTx(e.target.value)} />\n""")

# We should also remove the QrCode icon or the div holding the input if we just replaced it.
# Wait, the input was inside:
# <div className="relative flex-1 flex items-center">
# <div className="absolute left-5 ..."> <QrCode ... /> </div>
# <input ... />
# </div>
# If we replace just <input> with <GlitchInput>, the QrCode icon will sit on top of the glitch input, which is fine!
codecs.open(filepath_search, 'w', 'utf-8').writelines(lines_search)
print('Updated SearchTab')

# 3. Update EvaluateTab
filepath_eval = r'c:\Users\Hieu\Desktop\do an oto_FE\components\tabs\EvaluateTab.tsx'
lines_eval = codecs.open(filepath_eval, 'r', 'utf-8').readlines()
lines_eval.insert(0, "import GlitchInput from '../GlitchInput';\n")

for i, line in enumerate(lines_eval):
    if 'name="Mileage_km"' in line:
        lines_eval[i] = """<GlitchInput type="number" id="holo-eval-mileage" name="Mileage_km" label="Số ODO (km)" value={formData.Mileage_km} onChange={handleInputChange} />\n"""
    elif 'name="Owner_birth_year"' in line:
        lines_eval[i] = """<GlitchInput type="number" id="holo-eval-year" name="Owner_birth_year" label="Năm sinh chủ xe" value={formData.Owner_birth_year} onChange={handleInputChange} />\n"""

codecs.open(filepath_eval, 'w', 'utf-8').writelines(lines_eval)
print('Updated EvaluateTab')

