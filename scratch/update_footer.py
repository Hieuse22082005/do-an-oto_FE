import codecs
import re

filepath = r'c:\Users\Hieu\Desktop\do an oto_FE\app\page.tsx'
with codecs.open(filepath, 'r', 'utf-8') as f:
    content = f.read()

# Define the old footer pattern (Regex matching the old footer)
# Using re.DOTALL to match across lines
old_footer_pattern = re.compile(r'<footer className=\{`no-print border-t mt-auto w-\[100vw\] relative left-1/2 -translate-x-1/2 bg-transparent border-gray-200 dark:border-white/10`\}>.*?</footer>', re.DOTALL)

new_footer = """<footer className="no-print border-t mt-auto w-[100vw] relative left-1/2 -translate-x-1/2 bg-transparent border-black/10 dark:border-white/10 text-slate-800 dark:text-gray-300">
        <div className="max-w-[1400px] mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Cột 1 */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 font-black text-2xl text-slate-900 dark:text-white">
              <img src="/images/logo.png" alt="Logo" className="w-8 h-8 object-contain" />
              ĐịnhGiáXe.AI
            </div>
            <p className="text-sm leading-relaxed opacity-80">
              Nền tảng định giá xe hơi và tra cứu pháp lý tiên phong tại Việt Nam, ứng dụng Trí tuệ nhân tạo (AI) và công nghệ Web3 Blockchain để mang lại sự minh bạch tuyệt đối cho thị trường xe cũ.
            </p>
            <div className="mt-2 inline-flex items-center gap-2 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 px-3 py-1.5 rounded-lg text-xs font-semibold w-fit">
              <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
              Secured by Supabase & Web3
            </div>
          </div>

          {/* Cột 2 */}
          <div className="flex flex-col gap-4">
            <h3 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-sm mb-2">Sản phẩm & Dịch vụ</h3>
            <button onClick={() => handleTabChange('evaluate')} className="text-left text-sm hover:text-blue-600 dark:hover:text-blue-400 transition-colors w-fit">Định giá xe AI</button>
            <button onClick={() => handleTabChange('search')} className="text-left text-sm hover:text-blue-600 dark:hover:text-blue-400 transition-colors w-fit">Kiểm chứng lịch sử xe (TxHash)</button>
            <button onClick={() => handleTabChange('fines')} className="text-left text-sm hover:text-blue-600 dark:hover:text-blue-400 transition-colors w-fit">Tra cứu phạt nguội</button>
            <button onClick={() => setShowPricingModal(true)} className="text-left text-sm hover:text-blue-600 dark:hover:text-blue-400 transition-colors w-fit">Gói tài khoản VIP Dealer</button>
          </div>

          {/* Cột 3 */}
          <div className="flex flex-col gap-4">
            <h3 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-sm mb-2">Hỗ trợ & Pháp lý</h3>
            <button onClick={() => handleTabChange('penalty')} className="text-left text-sm hover:text-blue-600 dark:hover:text-blue-400 transition-colors w-fit">Cẩm nang & Luật giao thông</button>
            <a href="#" className="text-sm hover:text-blue-600 dark:hover:text-blue-400 transition-colors w-fit">Hướng dẫn thanh toán Crypto</a>
            <a href="#" className="text-sm hover:text-blue-600 dark:hover:text-blue-400 transition-colors w-fit">Điều khoản Dịch vụ (Terms of Service)</a>
            <a href="#" className="text-sm hover:text-blue-600 dark:hover:text-blue-400 transition-colors w-fit">Chính sách Bảo mật (Privacy Policy)</a>
            
            <div className="mt-4 p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg">
              <p className="text-[10px] text-amber-700 dark:text-amber-400 leading-relaxed font-mono">
                <strong className="block mb-1">Tuyên bố miễn trừ trách nhiệm (Disclaimer):</strong>
                Các giao dịch bằng tiền mã hóa (Crypto) trên hệ thống là không thể hoàn ngang (irreversible). Vui lòng kiểm tra kỹ mạng lưới và địa chỉ ví trước khi chuyển.
              </p>
            </div>
          </div>

          {/* Cột 4 */}
          <div className="flex flex-col gap-4">
            <h3 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-sm mb-2">Thông tin liên hệ</h3>
            <div className="flex flex-col gap-3 text-sm">
              <a href="tel:0972188166" className="flex items-center gap-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                0972 188 166
              </a>
              <a href="mailto:duongxuanhieu22082005@gmail.com" className="flex items-center gap-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors break-all">
                <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                duongxuanhieu22082005@gmail.com
              </a>
              <div className="flex items-start gap-2">
                <svg className="w-4 h-4 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                <span></span>
              </div>
            </div>
            
            {/* Social Icons */}
            <div className="flex items-center gap-4 mt-2">
              <a href="#" className="w-8 h-8 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:text-blue-600 transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center hover:bg-slate-200 dark:hover:bg-white/10 hover:text-slate-900 dark:hover:text-white transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center hover:bg-sky-100 dark:hover:bg-sky-900/30 hover:text-sky-500 transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0a12 12 0 00-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.888-.662 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-black/5 dark:border-white/5 py-6 mt-4">
          <div className="max-w-[1400px] mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono text-slate-500 dark:text-gray-500">
            <p>© 2026 DinhGiaXe AI. All rights reserved.</p>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Version 1.0.0 - Mainnet
            </div>
          </div>
        </div>
      </footer>"""

if old_footer_pattern.search(content):
    content = old_footer_pattern.sub(new_footer, content)
    with codecs.open(filepath, 'w', 'utf-8') as f:
        f.write(content)
    print("Updated successfully!")
else:
    print("Pattern not found!")
