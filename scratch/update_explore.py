import codecs

file_path = 'components/tabs/MarketplaceTab.tsx'

with codecs.open(file_path, 'r', 'utf-8') as f:
    text = f.read()

# We will replace the entire "2. EXPLORE NEW LISTINGS" section.
# First, let's find the start and end of it.
start_idx = text.find('{/* 2. EXPLORE NEW LISTINGS')
end_idx = text.find('{/* 3. PREMIUM DEALS FOOTER')

if start_idx != -1 and end_idx != -1:
    # Also, we need to add a state for activePageIndex if it doesn't exist
    state_injection = "const [activePageIndex, setActivePageIndex] = useState(0);"
    
    # Let's see where to inject the state. Let's just put it below selectedCar.
    if 'activePageIndex' not in text:
        text = text.replace('const [selectedCar, setSelectedCar] = useState<any>(null);', 
                            'const [selectedCar, setSelectedCar] = useState<any>(null);\n  const [activePageIndex, setActivePageIndex] = useState(0);')

    new_section = """{/* 2. EXPLORE NEW LISTINGS */}
      <section id="listings-section" className="w-full py-20 px-6 md:px-10 lg:px-20 bg-[#f8f9fa] dark:bg-[#121212]">
        <div className="max-w-7xl mx-auto relative">
          <h2 className="text-3xl font-bold mb-10 text-slate-800 dark:text-white">Explore New Listings</h2>
          
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="animate-spin w-8 h-8 text-amber-500" />
            </div>
          ) : (
            <div className="relative group">
              
              {/* Slider container */}
              <div 
                ref={sliderRef} 
                className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-6 scroll-smooth" 
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                onScroll={(e) => {
                  const target = e.target as HTMLDivElement;
                  const scrollLeft = target.scrollLeft;
                  const itemWidth = 350 + 24; // width + gap
                  const newIndex = Math.round(scrollLeft / itemWidth);
                  setActivePageIndex(newIndex);
                }}
              >
                {listings.filter(l => l.status === 'available').length === 0 ? (
                  <p className="text-slate-500 italic">Hiện tại chưa có xe nào đang mở bán.</p>
                ) : (
                  listings.filter(l => l.status === 'available').map((car, index) => (
                    <div 
                      key={car.id} 
                      className="w-full md:w-[350px] min-w-[300px] flex-shrink-0 snap-center md:snap-start flex flex-col"
                    >
                      {/* Image */}
                      <div className="w-full aspect-[4/3] rounded-sm overflow-hidden mb-4 bg-slate-200">
                        <img src={car.image_url} alt={car.model} className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" />
                      </div>
                      {/* Info */}
                      <h3 className="font-black text-lg text-slate-900 dark:text-white tracking-tight">{car.model}</h3>
                      <p className="text-xs text-slate-500 mt-1 mb-2 leading-relaxed min-h-[32px] line-clamp-2">{car.description}</p>
                      <p className="font-bold text-slate-900 dark:text-white mb-4">
                        {formatPrice(car.sell_price)}
                      </p>
                      <button 
                        onClick={() => setSelectedCar(car)}
                        className="self-start px-6 py-2 bg-black dark:bg-white text-white dark:text-black text-xs font-bold uppercase tracking-wider hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors"
                      >
                        View Details
                      </button>
                    </div>
                  ))
                )}
              </div>

              {/* Arrows - positioned neatly */}
              {listings.filter(l => l.status === 'available').length > 0 && (
                <>
                  <button onClick={() => scrollSlider('left')} className="absolute left-[-10px] md:left-[-20px] top-[35%] -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-white dark:bg-[#1a1a1a] border border-slate-200 dark:border-slate-800 rounded-full shadow-xl text-slate-600 dark:text-slate-300 hover:text-black dark:hover:text-white opacity-0 group-hover:opacity-100 transition-all z-10 hover:scale-110">
                    <ChevronLeft size={24} />
                  </button>
                  <button onClick={() => scrollSlider('right')} className="absolute right-[-10px] md:right-[-20px] top-[35%] -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-white dark:bg-[#1a1a1a] border border-slate-200 dark:border-slate-800 rounded-full shadow-xl text-slate-600 dark:text-slate-300 hover:text-black dark:hover:text-white opacity-0 group-hover:opacity-100 transition-all z-10 hover:scale-110">
                    <ChevronRight size={24} />
                  </button>
                  
                  {/* Pagination Dots */}
                  <div className="flex justify-center items-center gap-2 mt-8">
                    {listings.filter(l => l.status === 'available').map((_, i) => (
                      <button 
                        key={i}
                        onClick={() => {
                          if (sliderRef.current) {
                            sliderRef.current.scrollTo({ left: i * (350 + 24), behavior: 'smooth' });
                          }
                        }}
                        className={`transition-all duration-300 rounded-full ${
                          activePageIndex === i 
                            ? 'w-6 h-2 bg-black dark:bg-white' 
                            : 'w-2 h-2 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400'
                        }`}
                        aria-label={`Go to slide ${i + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </section>

      """
    
    updated_text = text[:start_idx] + new_section + text[end_idx:]
    
    with codecs.open(file_path, 'w', 'utf-8') as f:
        f.write(updated_text)
    print("Updated Explore section.")
else:
    print("Could not find section.")
