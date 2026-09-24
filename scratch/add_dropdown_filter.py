import codecs

file_path = 'components/tabs/MarketplaceTab.tsx'

with codecs.open(file_path, 'r', 'utf-8') as f:
    content = f.read()

old_block = """          {/* Categories Tabs - Dark Mode */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUpVariant}
            className="flex flex-wrap gap-3 mb-10"
          >
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setShowAllCars(true);
                }}
                className={`px-6 py-2 border rounded-full transition-all font-medium text-xs tracking-wider uppercase ${
                  activeCategory === cat 
                    ? 'bg-blue-900 text-white border-blue-900 shadow-md' 
                    : 'bg-white text-slate-600 border-slate-200 hover:border-blue-900 hover:text-blue-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>"""

new_block = """          {/* Categories & Brand Filter */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUpVariant}
            className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-10"
          >
            <div className="flex flex-wrap gap-3">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveCategory(cat);
                    setActiveBrand(null);
                    setShowAllCars(true);
                  }}
                  className={`px-6 py-2 border rounded-full transition-all font-medium text-xs tracking-wider uppercase ${
                    activeCategory === cat 
                      ? 'bg-blue-900 text-white border-blue-900 shadow-md' 
                      : 'bg-white text-slate-600 border-slate-200 hover:border-blue-900 hover:text-blue-900'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Brand Filter Dropdown */}
            <div className="relative min-w-[200px]">
              <select
                value={activeBrand || ''}
                onChange={(e) => {
                  setActiveBrand(e.target.value || null);
                  setShowAllCars(true);
                }}
                className="w-full appearance-none px-6 py-2 bg-white border border-slate-200 rounded-full text-slate-700 font-bold text-xs tracking-wider uppercase outline-none focus:border-blue-900 cursor-pointer shadow-sm hover:shadow-md transition-all"
              >
                <option value="">Tất cả hãng xe</option>
                {Array.from(new Set(listings.map(car => car.brand).filter(Boolean))).sort().map(brand => (
                  <option key={brand as string} value={brand as string}>{brand as string}</option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-blue-900 text-[10px]">
                ▼
              </div>
            </div>
          </motion.div>"""

content = content.replace(old_block, new_block)

# Try replacing without spaces if it fails
if old_block not in content:
    # Use regex
    import re
    pattern = re.compile(r'\{\/\* Categories Tabs - Dark Mode \*\/\}.*?<\/motion\.div>', re.DOTALL)
    content = pattern.sub(new_block, content)

with codecs.open(file_path, 'w', 'utf-8') as f:
    f.write(content)

print("Added dropdown filter!")
