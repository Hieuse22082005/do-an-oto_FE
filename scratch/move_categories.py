import codecs

file_path = 'components/tabs/MarketplaceTab.tsx'

with codecs.open(file_path, 'r', 'utf-8') as f:
    content = f.read()

# Add Car and Globe to lucide-react imports if they aren't there
if "Car," not in content and "Car " not in content:
    content = content.replace("import { ChevronRight,", "import { ChevronRight, Car, Globe,")

# Find the spot to insert: right after HERO SECTION (which ends with </section>) and before CAM KẾT CỦA CHÚNG TÔI
start_str = "{/* 2. CAM K" # might be encoded as "CAM K_T" or whatever, let's just find "{/* 2. CAM"
idx = content.find("{/* 2. CAM")

if idx != -1:
    new_section = """
      {/* 1.5 CATEGORIES & COUNTRIES */}
      <section className="w-full py-20 px-6 md:px-10 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUpVariant}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="h-[1px] w-12 bg-blue-900"></div>
              <span className="text-blue-900 font-bold uppercase tracking-wider text-sm">Bộ sưu tập</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-serif text-slate-800">Thế Giới Xe Đa Dạng</h2>
            <p className="mt-4 text-slate-500 max-w-2xl mx-auto">Từ những mẫu Sedan thanh lịch đến SUV mạnh mẽ, quy tụ các thương hiệu danh tiếng nhất toàn cầu.</p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="mb-12"
          >
            <h4 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
              <Car className="text-blue-600" /> Kiểu dáng xe
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { name: 'SUV / CUV', desc: 'Đa dụng & Mạnh mẽ', img: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=600&q=80' },
                { name: 'SEDAN', desc: 'Thanh lịch & Doanh nhân', img: 'https://images.unsplash.com/photo-1532581140115-3e355d1ed1de?auto=format&fit=crop&w=600&q=80' },
                { name: 'THỂ THAO', desc: 'Tốc độ & Đam mê', img: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=600&q=80' },
                { name: 'XE ĐIỆN', desc: 'Tương lai xanh', img: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=600&q=80' },
              ].map(cat => (
                <motion.div variants={fadeUpVariant} key={cat.name} className="group relative h-48 overflow-hidden rounded-xl border border-slate-200 bg-white flex items-end p-5 transition-all hover:shadow-xl hover:border-blue-300 cursor-pointer">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
                  <img src={cat.img} alt={cat.name} className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-110 group-hover:opacity-100 transition duration-700" />
                  <div className="relative z-20">
                    <h4 className="text-white font-bold text-xl tracking-wider">{cat.name}</h4>
                    <p className="text-blue-300 text-xs font-mono mt-1">{cat.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <h4 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
              <Globe className="text-blue-600" /> Quốc gia xuất xứ
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                { name: 'Đức', flag: '🇩🇪', brands: 'Mercedes, BMW, Audi' },
                { name: 'Nhật Bản', flag: '🇯🇵', brands: 'Toyota, Lexus, Honda' },
                { name: 'Mỹ', flag: '🇺🇸', brands: 'Ford, Chevrolet, Tesla' },
                { name: 'Anh Quốc', flag: '🇬🇧', brands: 'Bentley, Land Rover' },
                { name: 'Hàn Quốc', flag: '🇰🇷', brands: 'Hyundai, Kia' },
                { name: 'Việt Nam', flag: '🇻🇳', brands: 'VinFast' },
              ].map(country => (
                <motion.div variants={fadeUpVariant} key={country.name} className="rounded-xl bg-white border border-slate-200 shadow-sm p-6 text-center group cursor-pointer transition-all hover:shadow-lg hover:border-blue-300 hover:-translate-y-1">
                  <div className="text-5xl mb-4 group-hover:scale-110 transition duration-300 drop-shadow-md">{country.flag}</div>
                  <h4 className="text-slate-800 font-bold mb-1">{country.name}</h4>
                  <p className="text-slate-500 text-[10px] uppercase font-mono">{country.brands}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

"""
    new_content = content[:idx] + new_section + content[idx:]
    with codecs.open(file_path, 'w', 'utf-8') as f:
        f.write(new_content)
    print("Added categories to MarketplaceTab!")
else:
    print("Could not find start idx")
