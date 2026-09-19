import codecs
import re

filepath = r'c:\Users\Hieu\Desktop\do an oto_FE\components\tabs\EvaluateTab.tsx'
lines = codecs.open(filepath, 'r', 'utf-8').readlines()

for i, line in enumerate(lines):
    if 'id="holo-eval-mileage"' in line:
        lines[i] = """<input type="number" name="Mileage_km" value={formData.Mileage_km} onChange={handleInputChange} className="w-full bg-white/60 dark:bg-black/40 border border-black/10 dark:border-white/10 text-slate-900 dark:text-white pl-12 pr-4 py-4 rounded-xl font-bold focus:border-cyan-500 focus:shadow-[0_0_15px_rgba(6,182,212,0.3)] outline-none transition-all backdrop-blur-md" autoComplete="off" />\n"""
    elif 'id="holo-eval-year"' in line:
        lines[i] = """<input type="number" name="Owner_birth_year" value={formData.Owner_birth_year} onChange={handleInputChange} className="w-full bg-white/60 dark:bg-black/40 border border-black/10 dark:border-white/10 text-slate-900 dark:text-white pl-12 pr-4 py-4 rounded-xl font-bold focus:border-cyan-500 focus:shadow-[0_0_15px_rgba(6,182,212,0.3)] outline-none transition-all backdrop-blur-md" autoComplete="off" />\n"""

codecs.open(filepath, 'w', 'utf-8').writelines(lines)
print('Reverted EvaluateTab inputs')
