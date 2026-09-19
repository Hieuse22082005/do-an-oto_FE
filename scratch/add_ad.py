import re

file_path = r"c:\Users\Hieu\Desktop\do an oto_FE\components\tabs\FinesTab.tsx"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# Replace the inner div of left menu to add flex-1 and the ad
old_menu_end = """              </button>
            ))}
          </div>
        </div>
      </div>
    );"""

new_menu_end = """              </button>
            ))}
          </div>
          
          {/* QUẢNG CÁO VIP LẤP ĐẦY KHOẢNG TRỐNG */}
          <div className="mt-auto pt-6">
            <div className="bg-gradient-to-br from-yellow-500/10 to-amber-600/10 rounded-2xl p-5 border border-yellow-500/20 text-center relative overflow-hidden group hover:border-yellow-500/40 transition-all duration-300">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30 mix-blend-overlay"></div>
              <div className="absolute top-0 right-0 w-20 h-20 bg-yellow-400/20 blur-2xl group-hover:bg-yellow-400/40 transition-colors duration-500"></div>
              
              <div className="relative z-10">
                <div className="inline-block p-3 bg-yellow-500/20 rounded-full mb-3 shadow-[0_0_15px_rgba(234,179,8,0.3)]">
                  <span className="text-3xl block drop-shadow-lg">👑</span>
                </div>
                <h4 className="text-yellow-400 font-black text-[11px] uppercase tracking-widest mb-2 drop-shadow-md">Gói Đặc Quyền VIP</h4>
                <p className="text-[10px] text-yellow-100/60 leading-relaxed mb-4">Tra cứu không giới hạn Dữ liệu An ninh Quốc gia & Cục Đăng kiểm.</p>
                <button className="w-full bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-black py-3 rounded-xl font-black text-[10px] tracking-widest uppercase transition-all shadow-[0_0_15px_rgba(234,179,8,0.3)] hover:shadow-[0_0_25px_rgba(234,179,8,0.6)] active:scale-95">
                  Nâng Cấp Ngay
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );"""

content = content.replace(old_menu_end, new_menu_end)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)
print("Added advertisement to left sidebar!")
