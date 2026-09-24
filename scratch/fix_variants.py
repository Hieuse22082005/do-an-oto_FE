import codecs
import re

file_path = 'components/tabs/MarketplaceTab.tsx'

with codecs.open(file_path, 'r', 'utf-8') as f:
    content = f.read()

# Replace the categories section to not use variants which might be causing issues
def replace_section(content):
    # Find the CATEGORIES & COUNTRIES comment
    idx = content.find('{/* 1.5 CATEGORIES & COUNTRIES */}')
    if idx == -1:
        return content
        
    end_idx = content.find('{/* 2. CAM K', idx)
    if end_idx == -1:
        return content
        
    new_section = """{/* 1.5 CATEGORIES & COUNTRIES */}
      <section className="w-full py-20 px-6 md:px-10 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="h-[1px] w-12 bg-blue-900"></div>
              <span className="text-blue-900 font-bold uppercase tracking-wider text-sm">Bộ sưu tập</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-serif text-slate-800">Thế Giới Xe Đa Dạng</h2>
            <p className="mt-4 text-slate-500 max-w-2xl mx-auto">Từ những mẫu Sedan thanh lịch đến SUV mạnh mẽ, quy tụ các thương hiệu danh tiếng nhất toàn cầu.</p>
          </motion.div>

          <div className="mb-12">
            <h4 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
              <Car className="text-blue-600" /> Thương hiệu nổi bật
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                { name: 'Mercedes', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/90/Mercedes-Logo.svg' },
                { name: 'BMW', logo: 'https://upload.wikimedia.org/wikipedia/commons/4/44/BMW.svg' },
                { name: 'Porsche', logo: 'https://upload.wikimedia.org/wikipedia/en/d/d3/Porsche_logo.svg' },
                { name: 'Toyota', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Toyota_carlogo.svg' },
                { name: 'Honda', logo: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Honda_Logo.svg' },
                { name: 'VinFast', logo: 'https://upload.wikimedia.org/wikipedia/commons/6/6c/VinFast_logo.svg' },
              ].map((brand, i) => (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  key={brand.name} 
                  className="rounded-xl bg-white border border-slate-200 shadow-sm p-6 flex flex-col items-center justify-center group cursor-pointer transition-all hover:shadow-lg hover:border-blue-300 hover:-translate-y-1 h-32"
                >
                  <img src={brand.logo} alt={brand.name} className="h-12 w-auto object-contain mb-3 group-hover:scale-110 transition duration-300 opacity-70 group-hover:opacity-100" />
                  <h4 className="text-slate-800 font-bold text-sm">{brand.name}</h4>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
              <Globe className="text-blue-600" /> Quốc gia xuất xứ
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                { name: 'Đức', flag: 'https://flagcdn.com/w80/de.png', brands: 'Mercedes, BMW, Audi' },
                { name: 'Nhật Bản', flag: 'https://flagcdn.com/w80/jp.png', brands: 'Toyota, Lexus, Honda' },
                { name: 'Mỹ', flag: 'https://flagcdn.com/w80/us.png', brands: 'Ford, Chevrolet, Tesla' },
                { name: 'Anh Quốc', flag: 'https://flagcdn.com/w80/gb.png', brands: 'Bentley, Land Rover' },
                { name: 'Hàn Quốc', flag: 'https://flagcdn.com/w80/kr.png', brands: 'Hyundai, Kia' },
                { name: 'Việt Nam', flag: 'https://flagcdn.com/w80/vn.png', brands: 'VinFast' },
              ].map((country, i) => (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  key={country.name} 
                  className="rounded-xl bg-white border border-slate-200 shadow-sm p-6 text-center flex flex-col items-center justify-center group cursor-pointer transition-all hover:shadow-lg hover:border-blue-300 hover:-translate-y-1"
                >
                  <img src={country.flag} alt={country.name} className="w-12 h-auto shadow-sm rounded-sm mb-4 group-hover:scale-110 transition duration-300" />
                  <h4 className="text-slate-800 font-bold mb-1">{country.name}</h4>
                  <p className="text-slate-500 text-[10px] uppercase font-mono">{country.brands}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
      """
    
    return content[:idx] + new_section + content[end_idx:]

new_content = replace_section(content)

with codecs.open(file_path, 'w', 'utf-8') as f:
    f.write(new_content)

print("Fixed framer-motion variants!")
