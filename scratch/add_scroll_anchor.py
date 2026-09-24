import codecs
import re

file_path = 'components/tabs/MarketplaceTab.tsx'

with codecs.open(file_path, 'r', 'utf-8') as f:
    content = f.read()

# Add ID to the section containing the cars
old_section = """        {/* 3. FEATURED CARS */}
        <section className="w-full py-20 px-6 md:px-10 lg:px-20 bg-slate-50 relative overflow-hidden">"""

new_section = """        {/* 3. FEATURED CARS */}
        <section id="xe-dang-ban" className="w-full py-20 px-6 md:px-10 lg:px-20 bg-slate-50 relative overflow-hidden">"""

content = content.replace(old_section, new_section)

# Also clear activeBrand when they click a category so they can see all cars of that category
old_cat_btn = """                <button
                  key={cat}
                  onClick={() => {
                    setActiveCategory(cat);
                    setShowAllCars(true);
                  }}"""

new_cat_btn = """                <button
                  key={cat}
                  onClick={() => {
                    setActiveCategory(cat);
                    setActiveBrand(null);
                    setShowAllCars(true);
                  }}"""

content = content.replace(old_cat_btn, new_cat_btn)


with codecs.open(file_path, 'w', 'utf-8') as f:
    f.write(content)

print("Added scroll anchor and reset logic!")
