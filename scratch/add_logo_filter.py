import codecs
import re

file_path = 'components/tabs/MarketplaceTab.tsx'

with codecs.open(file_path, 'r', 'utf-8') as f:
    content = f.read()

# 1. Add activeBrand state
content = content.replace(
    "const [activeCategory, setActiveCategory] = useState('Tất cả');",
    "const [activeCategory, setActiveCategory] = useState('Tất cả');\n  const [activeBrand, setActiveBrand] = useState<string | null>(null);"
)
content = content.replace(
    "const [activeCategory, setActiveCategory] = useState('T\xe1\xba\xa5t c\xe1\xba\xa3');",
    "const [activeCategory, setActiveCategory] = useState('T\xe1\xba\xa5t c\xe1\xba\xa3');\n  const [activeBrand, setActiveBrand] = useState<string | null>(null);"
)

# 2. Update filteredListings logic
old_filtered_listings = """  const filteredListings = activeCategory === 'Tất cả' 
    ? listings 
    : listings.filter(car => car.category === activeCategory || (!car.category && activeCategory === 'Xe sang')); // Fallback for cars without category"""

old_filtered_listings_encoded = content[content.find("  const filteredListings ="):content.find("  return (")]

new_filtered_listings = """  let filteredListings = listings;
  if (activeCategory !== 'Tất cả' && activeCategory !== 'T\xe1\xba\xa5t c\xe1\xba\xa3') {
    filteredListings = filteredListings.filter(car => car.category === activeCategory || (!car.category && activeCategory === 'Xe sang'));
  }
  if (activeBrand) {
    filteredListings = filteredListings.filter(car => car.brand && car.brand.toLowerCase() === activeBrand.toLowerCase());
  }
"""

content = content.replace(old_filtered_listings_encoded, new_filtered_listings + "\n")

# 3. Add onClick to Brand Logos and styling
old_brand_div = """                ].map((brand) => (
                  <div 
                    key={brand.name} 
                    className="flex flex-col items-center justify-center h-24 w-32 md:w-40 mx-4\""""

new_brand_div = """                ].map((brand) => (
                  <button 
                    key={brand.name} 
                    onClick={() => {
                        setActiveBrand(activeBrand === brand.name ? null : brand.name);
                        setShowAllCars(true);
                        document.getElementById('xe-dang-ban')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className={`flex flex-col items-center justify-center h-24 w-32 md:w-40 mx-4 cursor-pointer transition-all ${activeBrand === brand.name ? 'scale-110 drop-shadow-lg opacity-100' : 'opacity-70 hover:opacity-100'}\""""

content = content.replace(old_brand_div, new_brand_div)

# Fix the closing div for brand
old_brand_end = """                    <h4 className="text-slate-700 font-bold text-sm tracking-wide">{brand.name}</h4>
                  </div>"""

new_brand_end = """                    <h4 className={`font-bold text-sm tracking-wide mt-2 ${activeBrand === brand.name ? 'text-blue-600' : 'text-slate-700'}`}>{brand.name}</h4>
                  </button>"""

content = content.replace(old_brand_end, new_brand_end)


with codecs.open(file_path, 'w', 'utf-8') as f:
    f.write(content)

print("Added activeBrand filtering!")
