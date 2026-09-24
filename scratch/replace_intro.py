import codecs

file_path = 'components/tabs/HomeTab.tsx'

with codecs.open(file_path, 'r', 'utf-8') as f:
    content = f.read()

# We want to replace the whole <section id="mission">...</section>
# Let's find the start and end of it.
start_str = '<section id="mission"'
end_str = '      <section className="relative z-10 py-16 border-t border-slate-800/50 bg-[#060a14] font-sans">'

start_idx = content.find(start_str)
end_idx = content.find(end_str)

if start_idx != -1 and end_idx != -1:
    new_section = """<section id="categories" className="relative border-t border-slate-800/50 bg-[#030712] px-6 py-24 font-sans">
        <ScrollReveal className="relative z-10 mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="mb-4 text-sm font-mono uppercase tracking-[0.2em] text-[#00f2fe]">Bộ sưu tập</h2>
            <h3 className="text-4xl font-bold tracking-tight md:text-5xl text-white">Thế Giới Xe Đa Dạng</h3>
            <p className="mt-4 text-slate-400 max-w-2xl mx-auto">Từ những mẫu Sedan thanh lịch đến SUV mạnh mẽ, quy tụ các thương hiệu danh tiếng nhất toàn cầu.</p>
          </div>

          <div className="mb-12">
            <h4 className="text-xl font-bold text-white mb-6 flex items-center gap-2"><Icon icon="lucide:car" className="text-[#00f2fe]" /> Kiểu dáng xe</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { name: 'SUV / CUV', desc: 'Đa dụng & Mạnh mẽ', img: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=600&q=80' },
                { name: 'SEDAN', desc: 'Thanh lịch & Doanh nhân', img: 'https://images.unsplash.com/photo-1532581140115-3e355d1ed1de?auto=format&fit=crop&w=600&q=80' },
                { name: 'THỂ THAO', desc: 'Tốc độ & Đam mê', img: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=600&q=80' },
                { name: 'XE ĐIỆN', desc: 'Tương lai xanh', img: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=600&q=80' },
              ].map(cat => (
                <div key={cat.name} className="group relative h-48 overflow-hidden border border-slate-800 bg-[#0b1120] flex items-end p-5 transition-all hover:border-[#00f2fe]/50 cursor-pointer">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/50 to-transparent z-10" />
                  <img src={cat.img} alt={cat.name} className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-110 group-hover:opacity-70 transition duration-700" />
                  <div className="relative z-20">
                    <h4 className="text-white font-bold text-xl tracking-wider">{cat.name}</h4>
                    <p className="text-[#00f2fe] text-xs font-mono mt-1">{cat.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xl font-bold text-white mb-6 flex items-center gap-2"><Icon icon="lucide:globe" className="text-[#00f2fe]" /> Quốc gia xuất xứ</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                { name: 'Đức', flag: '🇩🇪', brands: 'Mercedes, BMW, Audi' },
                { name: 'Nhật Bản', flag: '🇯🇵', brands: 'Toyota, Lexus, Honda' },
                { name: 'Mỹ', flag: '🇺🇸', brands: 'Ford, Chevrolet, Tesla' },
                { name: 'Anh Quốc', flag: '🇬🇧', brands: 'Bentley, Land Rover' },
                { name: 'Hàn Quốc', flag: '🇰🇷', brands: 'Hyundai, Kia' },
                { name: 'Việt Nam', flag: '🇻🇳', brands: 'VinFast' },
              ].map(country => (
                <div key={country.name} className="tech-border bg-[#0b1120] border border-slate-800 p-6 text-center group cursor-pointer transition-colors hover:bg-[#030712]">
                  <div className="text-5xl mb-4 group-hover:scale-125 group-hover:-translate-y-2 transition duration-500">{country.flag}</div>
                  <h4 className="text-white font-bold mb-1">{country.name}</h4>
                  <p className="text-slate-500 text-[10px] uppercase font-mono">{country.brands}</p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </section>\n\n"""
    
    new_content = content[:start_idx] + new_section + content[end_idx:]
    with codecs.open(file_path, 'w', 'utf-8') as f:
        f.write(new_content)
    print("Replaced mission section with categories section!")
else:
    print("Could not find bounds.")
