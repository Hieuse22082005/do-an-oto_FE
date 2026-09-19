import codecs

file_path = 'components/tabs/MarketplaceTab.tsx'

with codecs.open(file_path, 'r', 'utf-8') as f:
    lines = f.readlines()

# add imports
import_line_index = -1
for i, line in enumerate(lines):
    if "import { ChevronRight" in line:
        import_line_index = i
        break

if import_line_index != -1:
    lines[import_line_index] = lines[import_line_index].replace(
        "import { ChevronRight",
        "import { ChevronRight, Settings, Gauge, Users, Heart, ArrowRight"
    )

new_section_3 = """      {/* 3. BỘ SƯU TẬP - XE NỔI BẬT */}
      <section id="collection-section" className="w-full py-24 px-6 md:px-10 lg:px-20 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto relative">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUpVariant}
            className="flex flex-col mb-12 gap-2"
          >
            <div className="flex items-center justify-between">
              <div>
                <span className="text-amber-500 font-bold uppercase tracking-[0.2em] text-xs mb-4 block">Our Collection</span>
                <h2 className="text-4xl md:text-5xl font-serif text-white">Featured Luxury Cars</h2>
              </div>
              
              <button 
                onClick={() => setShowAllCars(!showAllCars)}
                className="text-amber-500 hover:text-amber-400 font-bold tracking-widest uppercase text-xs transition-colors flex items-center gap-2"
              >
                {showAllCars ? 'Lesser Inventory' : 'View All Inventory'} 
                <ArrowRight size={14} className={showAllCars ? 'rotate-90 transition-transform' : 'transition-transform'} />
              </button>
            </div>
          </motion.div>

          {/* Categories Tabs - Dark Mode */}
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
                    ? 'bg-amber-500 text-black border-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.3)]' 
                    : 'bg-transparent text-white/70 border-white/20 hover:border-amber-500 hover:text-amber-500'
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>
          
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="animate-spin w-8 h-8 text-amber-500" />
            </div>
          ) : (
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <AnimatePresence mode='popLayout'>
                {filteredListings.length === 0 ? (
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-white/50 italic col-span-full py-10"
                  >
                    Không tìm thấy xe nào trong danh mục này.
                  </motion.p>
                ) : (
                  (showAllCars ? filteredListings : filteredListings.slice(0, 3)).map((car) => {
                    const isSold = car.status === 'sold';
                    return (
                      <motion.div 
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                        key={car.id} 
                        className="bg-[#141414] rounded-xl overflow-hidden border border-white/5 hover:border-amber-500/30 transition-all group flex flex-col relative"
                      >
                        {/* Heart Icon */}
                        <button className="absolute top-4 left-4 z-20 text-white/50 hover:text-amber-500 transition-colors">
                          <Heart size={20} strokeWidth={1.5} />
                        </button>

                        {/* Image */}
                        <div className="w-full aspect-[16/10] bg-black relative overflow-hidden">
                          <img 
                            src={car.image_url} 
                            alt={car.model} 
                            className={`w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 ${isSold ? 'grayscale opacity-50' : 'opacity-90'}`}
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80';
                            }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent opacity-80 pointer-events-none"></div>
                          
                          {/* Sold Badge */}
                          {isSold && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/60 z-10 backdrop-blur-[2px]">
                              <div className="px-6 py-2 bg-red-600/90 text-white font-black text-xl tracking-widest uppercase -rotate-12 border border-red-500 shadow-2xl">
                                Đã Bán
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Info */}
                        <div className="p-6 flex flex-col flex-grow relative z-10 -mt-6">
                          <div className="flex justify-between items-end mb-4">
                            <div>
                              <h3 className="font-bold text-xl text-white tracking-wide">{car.brand} {car.model}</h3>
                            </div>
                            <p className="font-bold text-amber-500 text-lg">
                              {formatPrice(car.sell_price)}
                            </p>
                          </div>
                          
                          {/* Specs Row */}
                          <div className="flex items-center justify-between text-white/60 text-[11px] font-medium uppercase tracking-wider py-4 border-b border-white/10">
                            <div className="flex items-center gap-2">
                              <Settings size={14} className="text-amber-500"/>
                              <span>{car.brand.toLowerCase() === 'porsche' ? 'Flat-6 4.0L' : car.brand.toLowerCase() === 'audi' ? 'Electric' : 'V8 4.0L'}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Gauge size={14} className="text-amber-500"/>
                              <span>{car.brand.toLowerCase() === 'porsche' ? '520 HP' : '600 HP'}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Users size={14} className="text-amber-500"/>
                              <span>4 Seats</span>
                            </div>
                          </div>
                          
                          <button 
                            onClick={() => !isSold && setSelectedCar(car)}
                            disabled={isSold}
                            className={`w-full pt-6 text-[10px] font-bold uppercase tracking-[0.2em] transition-colors flex justify-between items-center ${
                              isSold 
                                ? 'text-white/30 cursor-not-allowed'
                                : 'text-amber-500 hover:text-amber-400 group-hover:text-amber-400'
                            }`}
                          >
                            {isSold ? 'Out of Stock' : 'View Details'}
                            <ArrowRight size={14} className={isSold ? 'opacity-30' : 'group-hover:translate-x-1 transition-transform'} />
                          </button>
                        </div>
                      </motion.div>
                    );
                  })
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </section>
"""

new_lines = lines[:259] + [new_section_3] + lines[415:]

with codecs.open(file_path, 'w', 'utf-8') as f:
    f.writelines(new_lines)
