import codecs

file_path = 'components/tabs/MarketplaceTab.tsx'

with codecs.open(file_path, 'r', 'utf-8') as f:
    content = f.read()

# Add InfiniteSlider import
if "InfiniteSlider" not in content:
    content = content.replace("import ContactSupportBlock from '../ui/contact-support-block';", "import ContactSupportBlock from '../ui/contact-support-block';\nimport { InfiniteSlider } from '../ui/infinite-slider';")

# Find the start and end of the block we injected earlier
idx = content.find('{/* 1.5 CATEGORIES & COUNTRIES */}')
end_idx = content.find('{/* 2. CAM K', idx)

if idx != -1 and end_idx != -1:
    new_section = """{/* 1.5 CATEGORIES & COUNTRIES */}
      <section className="w-full py-16 px-6 md:px-10 bg-slate-50 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="h-[1px] w-12 bg-blue-900"></div>
              <span className="text-blue-900 font-bold uppercase tracking-wider text-sm">Bộ sưu tập</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-serif text-slate-800">Thế Giới Xe Đa Dạng</h2>
            <p className="mt-4 text-slate-500 max-w-2xl mx-auto">Từ những mẫu Sedan thanh lịch đến SUV mạnh mẽ, quy tụ các thương hiệu danh tiếng nhất toàn cầu.</p>
          </motion.div>

          <div className="mb-16">
            <h4 className="text-xl font-bold text-slate-800 mb-8 flex items-center gap-2 justify-center">
              <Car className="text-blue-600" /> Thương hiệu nổi bật
            </h4>
            
            <InfiniteSlider direction="horizontal" speed={25} speedOnHover={50}>
              {[
                { name: 'Mercedes', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/90/Mercedes-Logo.svg' },
                { name: 'BMW', logo: 'https://upload.wikimedia.org/wikipedia/commons/4/44/BMW.svg' },
                { name: 'Porsche', logo: 'https://upload.wikimedia.org/wikipedia/en/d/d3/Porsche_logo.svg' },
                { name: 'Toyota', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Toyota_carlogo.svg' },
                { name: 'Honda', logo: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Honda_Logo.svg' },
                { name: 'VinFast', logo: 'https://upload.wikimedia.org/wikipedia/commons/6/6c/VinFast_logo.svg' },
              ].map((brand) => (
                <div 
                  key={brand.name} 
                  className="flex flex-col items-center justify-center group cursor-pointer transition-all hover:scale-110 hover:-translate-y-2 h-24 w-32 md:w-40 mx-4"
                >
                  <img src={brand.logo} alt={brand.name} className="h-16 w-auto object-contain mb-4 opacity-70 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-md" />
                  <h4 className="text-slate-700 font-bold text-sm tracking-wide">{brand.name}</h4>
                </div>
              ))}
            </InfiniteSlider>
          </div>

          <div>
            <h4 className="text-xl font-bold text-slate-800 mb-8 flex items-center gap-2 justify-center">
              <Globe className="text-blue-600" /> Quốc gia xuất xứ
            </h4>
            
            <InfiniteSlider direction="horizontal" speed={20} speedOnHover={40}>
              {[
                { name: 'Đức', flag: 'https://flagcdn.com/w80/de.png', brands: 'Mercedes, BMW, Audi' },
                { name: 'Nhật Bản', flag: 'https://flagcdn.com/w80/jp.png', brands: 'Toyota, Lexus, Honda' },
                { name: 'Mỹ', flag: 'https://flagcdn.com/w80/us.png', brands: 'Ford, Chevrolet, Tesla' },
                { name: 'Anh Quốc', flag: 'https://flagcdn.com/w80/gb.png', brands: 'Bentley, Land Rover' },
                { name: 'Hàn Quốc', flag: 'https://flagcdn.com/w80/kr.png', brands: 'Hyundai, Kia' },
                { name: 'Việt Nam', flag: 'https://flagcdn.com/w80/vn.png', brands: 'VinFast' },
              ].map((country) => (
                <div 
                  key={country.name} 
                  className="flex flex-col items-center justify-center group cursor-pointer transition-all hover:scale-110 hover:-translate-y-2 h-24 w-36 md:w-48 mx-4"
                >
                  <img src={country.flag} alt={country.name} className="w-14 h-auto shadow-md rounded-sm mb-4 transition-transform duration-300" />
                  <h4 className="text-slate-700 font-bold mb-1 tracking-wide">{country.name}</h4>
                  <p className="text-slate-400 text-[10px] uppercase font-mono">{country.brands}</p>
                </div>
              ))}
            </InfiniteSlider>
          </div>
        </div>
      </section>
      """
    
    new_content = content[:idx] + new_section + content[end_idx:]
    
    with codecs.open(file_path, 'w', 'utf-8') as f:
        f.write(new_content)
    
    print("Replaced grid with InfiniteSlider!")
else:
    print("Could not find section.")
