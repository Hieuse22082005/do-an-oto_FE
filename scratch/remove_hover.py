import codecs

file_path = 'components/tabs/MarketplaceTab.tsx'

with codecs.open(file_path, 'r', 'utf-8') as f:
    content = f.read()

# Remove hover from brands
old_brand_div = """                <div 
                  key={brand.name} 
                  className="flex flex-col items-center justify-center group cursor-pointer transition-all hover:scale-110 hover:-translate-y-2 h-24 w-32 md:w-40 mx-4"
                >
                  <img src={brand.logo} alt={brand.name} className="h-16 w-auto object-contain mb-4 opacity-70 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-md" />
                  <h4 className="text-slate-700 font-bold text-sm tracking-wide">{brand.name}</h4>
                </div>"""

new_brand_div = """                <div 
                  key={brand.name} 
                  className="flex flex-col items-center justify-center h-24 w-32 md:w-40 mx-4"
                >
                  <img src={brand.logo} alt={brand.name} className="h-16 w-auto object-contain mb-4 opacity-90 drop-shadow-md" />
                  <h4 className="text-slate-700 font-bold text-sm tracking-wide">{brand.name}</h4>
                </div>"""

content = content.replace(old_brand_div, new_brand_div)

# Remove hover from countries
old_country_div = """                <div 
                  key={country.name} 
                  className="flex flex-col items-center justify-center group cursor-pointer transition-all hover:scale-110 hover:-translate-y-2 h-24 w-36 md:w-48 mx-4"
                >
                  <img src={country.flag} alt={country.name} className="w-14 h-auto shadow-md rounded-sm mb-4 transition-transform duration-300" />
                  <h4 className="text-slate-700 font-bold mb-1 tracking-wide">{country.name}</h4>
                  <p className="text-slate-400 text-[10px] uppercase font-mono">{country.brands}</p>
                </div>"""

new_country_div = """                <div 
                  key={country.name} 
                  className="flex flex-col items-center justify-center h-24 w-36 md:w-48 mx-4"
                >
                  <img src={country.flag} alt={country.name} className="w-14 h-auto shadow-md rounded-sm mb-4" />
                  <h4 className="text-slate-700 font-bold mb-1 tracking-wide">{country.name}</h4>
                  <p className="text-slate-400 text-[10px] uppercase font-mono">{country.brands}</p>
                </div>"""

content = content.replace(old_country_div, new_country_div)

with codecs.open(file_path, 'w', 'utf-8') as f:
    f.write(content)

print("Removed hover effects from sliders!")
