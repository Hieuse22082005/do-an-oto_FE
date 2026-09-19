import codecs

file_path = 'components/tabs/MarketplaceTab.tsx'

with codecs.open(file_path, 'r', 'utf-8') as f:
    lines = f.readlines()

start_idx = -1
end_idx = -1

for i, line in enumerate(lines):
    if "{/* Support Block */}" in line:
        start_idx = i
    if "{/* DETAIL MODAL */}" in line:
        end_idx = i
        break

if start_idx != -1 and end_idx != -1:
    merged_section = [
        "      {/* 6. SUPPORT & CTA */}\n",
        "      <section className=\"w-full py-24 px-6 md:px-10 flex justify-center bg-white relative overflow-hidden\">\n",
        "        {/* Background blobs for luxury feel */}\n",
        "        <div className=\"absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none\">\n",
        "           <div className=\"absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-blue-50 rounded-full mix-blend-multiply filter blur-3xl opacity-70\"></div>\n",
        "           <div className=\"absolute bottom-[-10%] left-[-5%] w-[40%] h-[40%] bg-slate-50 rounded-full mix-blend-multiply filter blur-3xl opacity-70\"></div>\n",
        "        </div>\n",
        "\n",
        "        <div className=\"max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10\">\n",
        "          \n",
        "          {/* Left CTA Side */}\n",
        "          <motion.div \n",
        "            initial={{ opacity: 0, x: -30 }}\n",
        "            whileInView={{ opacity: 1, x: 0 }}\n",
        "            viewport={{ once: true }}\n",
        "            transition={{ duration: 0.6 }}\n",
        "            className=\"flex flex-col\"\n",
        "          >\n",
        "            <div className=\"flex items-center gap-4 mb-6\">\n",
        "              <div className=\"h-[1px] w-12 bg-blue-900\"></div>\n",
        "              <span className=\"text-blue-900 font-bold uppercase tracking-wider text-sm\">Hỗ trợ 24/7</span>\n",
        "            </div>\n",
        "            \n",
        "            <h2 className=\"text-4xl md:text-5xl font-serif text-slate-800 mb-6 leading-tight\">\n",
        "              Chưa tìm được xe ưng ý?\n",
        "            </h2>\n",
        "            \n",
        "            <p className=\"text-slate-500 text-lg mb-10 leading-relaxed max-w-lg\">\n",
        "              Đừng lo lắng! Đội ngũ chuyên gia của SmartCar luôn sẵn sàng lắng nghe nhu cầu của bạn. \n",
        "              Hãy gửi yêu cầu hỗ trợ hoặc gọi ngay Hotline để được tư vấn hoàn toàn miễn phí.\n",
        "            </p>\n",
        "            \n",
        "            <div className=\"flex flex-col sm:flex-row gap-4 w-full\">\n",
        "              <button className=\"px-8 py-4 bg-red-600 text-white rounded-md font-bold hover:bg-red-700 transition-colors shadow-lg shadow-red-600/30 whitespace-nowrap text-base flex items-center justify-center gap-2\">\n",
        "                 Gọi Hotline: 1800.8888\n",
        "              </button>\n",
        "              <button className=\"px-8 py-4 bg-blue-900 text-white rounded-md font-bold hover:bg-blue-950 transition-colors shadow-lg shadow-blue-900/30 whitespace-nowrap text-base flex items-center justify-center gap-2\">\n",
        "                Xem tất cả xe <ChevronRight size={18} />\n",
        "              </button>\n",
        "            </div>\n",
        "          </motion.div>\n",
        "\n",
        "          {/* Right Form Side */}\n",
        "          <motion.div \n",
        "            initial={{ opacity: 0, x: 30 }}\n",
        "            whileInView={{ opacity: 1, x: 0 }}\n",
        "            viewport={{ once: true }}\n",
        "            transition={{ duration: 0.6 }}\n",
        "            className=\"w-full flex justify-center lg:justify-end\"\n",
        "          >\n",
        "            <ContactSupportBlock />\n",
        "          </motion.div>\n",
        "          \n",
        "        </div>\n",
        "      </section>\n",
        "\n"
    ]
    
    lines = lines[:start_idx] + merged_section + lines[end_idx:]

with codecs.open(file_path, 'w', 'utf-8') as f:
    f.writelines(lines)
    
print("Merged CTA and Support Blocks!")
