import codecs
import os

# 1. Rename HomeTab to AnalyticsTab
old_home_path = r'c:\Users\Hieu\Desktop\do an oto_FE\components\tabs\HomeTab.tsx'
analytics_path = r'c:\Users\Hieu\Desktop\do an oto_FE\components\tabs\AnalyticsTab.tsx'

if os.path.exists(old_home_path):
    content = codecs.open(old_home_path, 'r', 'utf-8').read()
    content = content.replace('export default function HomeTab', 'export default function AnalyticsTab')
    codecs.open(analytics_path, 'w', 'utf-8').write(content)

# 2. Update Header.tsx to include AnalyticsTab (if not already there)
header_path = r'c:\Users\Hieu\Desktop\do an oto_FE\components\Header.tsx'
header_content = codecs.open(header_path, 'r', 'utf-8').read()
if "id: 'analytics'" not in header_content:
    header_content = header_content.replace(
        "{ id: 'home', label: 'Trang chủ' },",
        "{ id: 'home', label: 'Trang chủ' },\n      { id: 'analytics', label: 'Trang chủ cũ (Tin tức & Thống kê)' },"
    )
    codecs.open(header_path, 'w', 'utf-8').write(header_content)

# 3. Update page.tsx to include AnalyticsTab and Hide Header on home
page_path = r'c:\Users\Hieu\Desktop\do an oto_FE\app\page.tsx'
page_lines = codecs.open(page_path, 'r', 'utf-8').readlines()
new_page_lines = []

has_imported_analytics = any('import AnalyticsTab' in line for line in page_lines)

for i, line in enumerate(page_lines):
    if 'import HomeTab' in line and not has_imported_analytics:
        new_page_lines.append(line)
        new_page_lines.append("import AnalyticsTab from \"@/components/tabs/AnalyticsTab\";\n")
        continue
    
    if '<Header user={user}' in line:
        new_page_lines.append("        {activeTab !== 'home' && (\n")
        new_page_lines.append(line)
        new_page_lines.append("        )}\n")
        continue

    if '{activeTab === "home" && <HomeTab' in line:
        new_page_lines.append(line)
        new_page_lines.append("          {activeTab === \"analytics\" && <AnalyticsTab onTryNow={() => handleTabChange(\"evaluate\")} />}\n")
        continue

    new_page_lines.append(line)

codecs.open(page_path, 'w', 'utf-8').writelines(new_page_lines)


# 4. Create NEW HomeTab.tsx
new_home_content = """\"use client\";

import { useEffect, useRef } from "react";
import { Icon } from "@iconify/react";

export default function HomeTab({ onTryNow }: { onTryNow: () => void }) {
  const navRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const nav = navRef.current;
      if (!nav) return;

      if (window.scrollY > 50) {
        nav.classList.add("nav-scrolled", "py-3");
        nav.classList.remove("py-4");
      } else {
        nav.classList.remove("nav-scrolled", "py-3");
        nav.classList.add("py-4");
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#030712] text-slate-50 antialiased selection:bg-[#00f2fe] selection:text-[#030712] w-full absolute top-0 left-0">
      <style jsx>{`
        .nav-scrolled {
          background: rgba(3, 7, 18, 0.85);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        .tech-border {
          position: relative;
        }

        .tech-border::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 10px;
          height: 10px;
          border-top: 2px solid #00f2fe;
          border-left: 2px solid #00f2fe;
          transition: all 0.3s ease;
          pointer-events: none;
        }

        .tech-border::after {
          content: "";
          position: absolute;
          bottom: 0;
          right: 0;
          width: 10px;
          height: 10px;
          border-bottom: 2px solid #00f2fe;
          border-right: 2px solid #00f2fe;
          transition: all 0.3s ease;
          pointer-events: none;
        }

        .group:hover .tech-border::before,
        .group:hover .tech-border::after {
          width: 100%;
          height: 100%;
          opacity: 0.3;
        }

        .text-glow {
          text-shadow: 0 0 30px rgba(0, 242, 254, 0.5);
        }

        .grid-bg {
          background-size: 40px 40px;
          background-image: linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
        }
      `}</style>

      <nav ref={navRef} id="navbar" className="fixed top-0 z-50 w-full py-4 transition-all duration-500 font-sans">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
          <a href="#" className="flex items-center gap-3">
            <Icon icon="lucide:shield-check" className="text-3xl text-[#00f2fe]" />
            <span className="text-2xl font-black uppercase tracking-tighter">OTOCHECK</span>
          </a>

          <div className="hidden items-center gap-10 text-xs font-bold uppercase tracking-widest text-slate-400 md:flex">
            <a href="#mission" className="transition-colors hover:text-[#00f2fe]">Tầm Nhìn</a>
            <a href="#technology" className="transition-colors hover:text-[#00f2fe]">Công Nghệ</a>
            <a href="#data" className="transition-colors hover:text-[#00f2fe]">Thống Kê</a>
            <a href="#explore" className="transition-colors hover:text-[#00f2fe]">Tra Cứu</a>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono uppercase tracking-widest">
            <a href="#" className="hidden text-slate-400 transition-colors hover:text-white lg:block">
              Hệ Sinh Thái
            </a>
            <button onClick={onTryNow} className="bg-white px-5 py-2.5 font-bold uppercase tracking-widest text-[#030712] shadow-[0_0_15px_rgba(0,242,254,0.3)] transition-colors hover:bg-[#00f2fe] hover:text-[#030712]">
              Bắt Đầu Trải Nghiệm
            </button>
          </div>
        </div>
      </nav>

      <header className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden font-sans">
        <video autoPlay loop muted playsInline className="absolute inset-0 z-0 h-full w-full object-cover">
          <source src="/video.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#030712]/50 via-[#030712]/30 to-[#030712]" />
        <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_center,transparent_0%,#030712_100%)] opacity-70" />

        <div className="relative z-20 mx-auto max-w-5xl px-4 text-center">
          <h1 className="mb-6 bg-gradient-to-b from-white to-slate-500 bg-clip-text text-5xl font-black uppercase tracking-tighter text-transparent md:text-7xl lg:text-8xl">
            Khai Phá <br /> <span className="text-white text-glow">Dữ Liệu Số</span>
          </h1>

          <p className="mx-auto mb-12 max-w-2xl text-lg font-light leading-relaxed text-slate-300 md:text-xl">
            Nền tảng tra cứu phương tiện toàn diện. Tích hợp AI và Blockchain để mang lại sự minh bạch tuyệt đối cho thị trường ô tô Việt Nam.
          </p>

          <div className="flex flex-col items-center justify-center gap-6 sm:flex-row">
            <button onClick={onTryNow} className="flex w-full items-center justify-center gap-2 bg-[#00f2fe] px-8 py-4 text-sm font-bold uppercase tracking-widest text-[#030712] transition-colors hover:bg-white sm:w-auto">
              Truy Cập Hệ Thống <Icon icon="lucide:arrow-right" />
            </button>
            <a href="#mission" className="flex w-full items-center justify-center gap-2 border border-slate-700 bg-[#0b1120]/50 px-8 py-4 text-xs font-mono uppercase tracking-widest text-white backdrop-blur-sm transition-colors hover:border-[#00f2fe] hover:text-[#00f2fe] sm:w-auto">
              <Icon icon="lucide:satellite" /> Xem Tính Năng
            </a>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 z-20 flex -translate-x-1/2 animate-bounce flex-col items-center gap-2">
          <span className="text-[10px] font-mono uppercase tracking-widest text-slate-300">Cuộn xuống</span>
          <Icon icon="lucide:chevron-down" className="text-xl text-[#00f2fe]" />
        </div>
      </header>

      <section id="mission" className="relative border-t border-slate-800/50 bg-[#030712] px-6 py-32 font-sans">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="pointer-events-none absolute right-0 top-0 h-[800px] w-[800px] rounded-full bg-[#00f2fe]/5 blur-[150px]" />

        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <div>
              <h2 className="mb-4 text-sm font-mono uppercase tracking-[0.2em] text-[#00f2fe]">Giai Đoạn 01 / Tổng Quan</h2>
              <h3 className="mb-8 text-4xl font-bold tracking-tight md:text-6xl">
                Tầm Nhìn <br />Vĩ Mô.
              </h3>
              <p className="mb-8 text-lg leading-relaxed text-slate-400">
                Để hiểu rõ về sự minh bạch của thị trường, chúng ta cần một bước lùi. OTOCHECK cung cấp dữ liệu chính xác, tức thời từ hệ thống CSGT và Cục Đăng kiểm, kết hợp công nghệ Blockchain để tạo ra một hồ sơ kỹ thuật số sống động cho mọi phương tiện.
              </p>
              <ul className="space-y-6 text-sm text-slate-300 font-mono">
                <li className="flex items-start gap-4">
                  <span className="mt-1 text-[#00f2fe]"><Icon icon="lucide:scan" /></span>
                  <span>Tra cứu Phạt nguội với độ trễ gần như bằng 0.</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="mt-1 text-[#00f2fe]"><Icon icon="lucide:waves" /></span>
                  <span>Định giá xe cũ theo thời gian thực bằng mô hình AI lượng tử.</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="mt-1 text-[#00f2fe]"><Icon icon="lucide:cpu" /></span>
                  <span>Mã hóa lịch sử tra cứu vĩnh viễn trên chuỗi khối.</span>
                </li>
              </ul>
            </div>

            <div className="group relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-[#00f2fe]/20 to-[#4facfe]/20 opacity-50 blur-xl transition duration-1000 group-hover:opacity-100" />
              <div className="tech-border relative aspect-square overflow-hidden border border-slate-700 bg-[#0b1120] p-2">
                <img src="https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80&w=1000" alt="Supercar" className="h-full w-full object-cover opacity-70 grayscale transition duration-700 group-hover:grayscale-0 group-hover:opacity-100" />
                <div className="absolute right-6 top-6 border border-[#00f2fe]/30 bg-[#030712]/80 px-2 py-1 text-[10px] uppercase text-[#00f2fe] font-mono">
                  Live Feed :: Sector 7G
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="technology" className="relative border-t border-slate-800/50 bg-[#060a14] px-6 py-32 font-sans">
        <div className="mx-auto max-w-7xl">
          <div className="mb-20 flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <h2 className="mb-4 text-sm font-mono uppercase tracking-[0.2em] text-[#00f2fe]">Kiến trúc hệ thống</h2>
              <h3 className="text-3xl font-bold tracking-tight md:text-5xl">Được thiết kế cho tính minh bạch tuyệt đối.</h3>
            </div>
            <a href="#" className="flex items-center gap-2 border-b border-slate-800 pb-2 text-sm text-slate-400 transition-colors hover:border-[#00f2fe] hover:text-[#00f2fe] font-mono">
              Xem Thông Số Kỹ Thuật <Icon icon="lucide:arrow-right" />
            </a>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="group relative overflow-hidden border border-slate-800 bg-[#030712] p-10 transition-colors hover:border-[#00f2fe]/50">
              <div className="absolute inset-0 bg-gradient-to-br from-[#00f2fe]/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <Icon icon="lucide:radar" className="mb-8 block text-4xl text-[#00f2fe]" />
              <h4 className="mb-4 text-xl font-bold">AI Định Giá</h4>
              <p className="text-sm leading-relaxed text-slate-400">Phân tích ODO, lịch sử bảo dưỡng và sự hao mòn theo thời gian thực để xuất ra báo cáo định giá chuẩn xác nhất thị trường.</p>
            </div>

            <div className="group relative overflow-hidden border border-slate-800 bg-[#030712] p-10 transition-colors hover:border-[#00f2fe]/50">
              <div className="absolute inset-0 bg-gradient-to-br from-[#00f2fe]/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <Icon icon="lucide:globe-2" className="mb-8 block text-4xl text-[#00f2fe]" />
              <h4 className="mb-4 text-xl font-bold">Dữ Liệu Đăng Kiểm</h4>
              <p className="text-sm leading-relaxed text-slate-400">Kết nối trực tiếp vào cơ sở dữ liệu quốc gia, rà soát thông số kỹ thuật và phát hiện xe đang bị phạt nguội chưa nộp phạt.</p>
            </div>

            <div className="group relative overflow-hidden border border-slate-800 bg-[#030712] p-10 transition-colors hover:border-[#00f2fe]/50">
              <div className="absolute inset-0 bg-gradient-to-br from-[#00f2fe]/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <Icon icon="lucide:zap" className="mb-8 block text-4xl text-[#00f2fe]" />
              <h4 className="mb-4 text-xl font-bold">Bảo Mật Blockchain</h4>
              <p className="text-sm leading-relaxed text-slate-400">Phát hiện và ngăn chặn giả mạo thông tin. Mỗi truy vấn đều được băm (hash) và lưu lại vĩnh viễn trên chuỗi phi tập trung.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="data" className="border-t border-slate-800/50 bg-[#030712] px-6 py-24 font-sans">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-2 divide-x divide-y border border-slate-800 md:grid-cols-4 md:divide-y-0 text-[#00f2fe]">
            <div className="bg-[#0b1120]/30 p-8 text-center">
              <p className="mb-2 text-xs uppercase tracking-widest font-mono">Lượt Truy Cập</p>
              <p className="font-mono text-4xl font-black md:text-5xl text-white">1,402</p>
            </div>
            <div className="bg-[#0b1120]/30 p-8 text-center">
              <p className="mb-2 text-xs uppercase tracking-widest font-mono">Tốc Độ Xử Lý</p>
              <p className="font-mono text-4xl font-black md:text-5xl text-white">0.5<span className="text-2xl text-slate-500">s</span></p>
            </div>
            <div className="bg-[#0b1120]/30 p-8 text-center">
              <p className="mb-2 text-xs uppercase tracking-widest font-mono">Độ Chính Xác</p>
              <p className="font-mono text-4xl font-black md:text-5xl text-white">99.9<span className="text-2xl text-slate-500">%</span></p>
            </div>
            <div className="bg-[#0b1120]/30 p-8 text-center">
              <p className="mb-2 text-xs uppercase tracking-widest font-mono">Uptime Hệ Thống</p>
              <p className="font-mono text-4xl font-black md:text-5xl text-white">100<span className="text-2xl text-slate-500">%</span></p>
            </div>
          </div>
        </div>
      </section>

      <section id="explore" className="relative overflow-hidden px-6 py-40 font-sans">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000&auto=format&fit=crop" alt="Deep Space Background" className="h-full w-full object-cover opacity-30 mix-blend-screen" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-[#030712]" />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <Icon icon="lucide:hexagon" className="mx-auto mb-6 block text-6xl text-[#00f2fe]" />
          <h2 className="mb-8 text-4xl font-black uppercase tracking-tighter md:text-6xl">Truy Cập Lưu Trữ</h2>
          <p className="mb-10 text-lg font-light text-slate-300">Nhập biển số để bắt đầu quét dữ liệu toàn diện hệ thống an ninh giao thông quốc gia.</p>

          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <input type="text" placeholder="NHẬP BIỂN SỐ XE (VD: 30A12345)" className="w-full border border-slate-700 bg-[#0b1120]/80 px-6 py-4 text-center font-mono text-sm uppercase tracking-widest text-white placeholder-slate-500 backdrop-blur-md focus:border-[#00f2fe] focus:outline-none sm:w-96 sm:text-left" />
            <button onClick={onTryNow} className="bg-[#00f2fe] px-8 py-4 text-sm font-bold uppercase tracking-widest text-[#030712] transition-colors hover:bg-white">
              Tra Cứu Ngay
            </button>
          </div>
          <p className="mt-6 text-[10px] uppercase tracking-widest text-slate-500 font-mono">Yêu cầu quyền truy cập cấp 4. Tiêu chuẩn mã hóa AES-256 đã kích hoạt.</p>
        </div>
      </section>

      <footer className="border-t border-slate-800 bg-[#03050a] px-6 pb-10 pt-20 text-sm font-mono">
        <div className="mx-auto mb-16 grid max-w-7xl grid-cols-1 gap-12 md:grid-cols-4">
          <div className="md:col-span-1">
            <a href="#" className="mb-6 flex items-center gap-3">
              <Icon icon="lucide:shield-check" className="text-2xl text-[#00f2fe]" />
              <span className="text-xl font-bold tracking-tighter uppercase font-sans text-white">OTOCHECK</span>
            </a>
            <p className="mb-6 text-xs leading-relaxed text-slate-500">Giám sát rủi ro phương tiện. Dữ liệu thuộc về cộng đồng.</p>
          </div>

          <div>
            <h4 className="mb-6 uppercase tracking-widest text-white">Sản Phẩm</h4>
            <ul className="space-y-3 text-xs text-slate-500">
              <li><button onClick={onTryNow} className="transition-colors hover:text-[#00f2fe]">Định giá AI</button></li>
              <li><button onClick={onTryNow} className="transition-colors hover:text-[#00f2fe]">Tra Phạt nguội</button></li>
              <li><button onClick={onTryNow} className="transition-colors hover:text-[#00f2fe]">Đăng kiểm</button></li>
              <li><button onClick={onTryNow} className="transition-colors hover:text-[#00f2fe]">Hồ sơ Blockchain</button></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-6 uppercase tracking-widest text-white">Hoạt Động</h4>
            <ul className="space-y-3 text-xs text-slate-500">
              <li><a href="#" className="transition-colors hover:text-[#00f2fe]">Trung tâm chỉ huy</a></li>
              <li><a href="#" className="transition-colors hover:text-[#00f2fe]">Bảo mật hệ thống</a></li>
              <li><a href="#" className="transition-colors hover:text-[#00f2fe]">Kho lưu trữ dữ liệu</a></li>
              <li><a href="#" className="transition-colors hover:text-[#00f2fe]">API Endpoint</a></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-6 uppercase tracking-widest text-white">Truyền Thông</h4>
            <div className="flex gap-4">
              <a href="#" className="flex h-10 w-10 items-center justify-center border border-slate-800 bg-[#030712] text-slate-400 transition-all hover:border-[#00f2fe] hover:text-[#00f2fe]"><Icon icon="lucide:twitter" /></a>
              <a href="#" className="flex h-10 w-10 items-center justify-center border border-slate-800 bg-[#030712] text-slate-400 transition-all hover:border-[#00f2fe] hover:text-[#00f2fe]"><Icon icon="lucide:github" /></a>
              <a href="#" className="flex h-10 w-10 items-center justify-center border border-slate-800 bg-[#030712] text-slate-400 transition-all hover:border-[#00f2fe] hover:text-[#00f2fe]"><Icon icon="lucide:globe" /></a>
            </div>
          </div>
        </div>

        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 border-t border-slate-800 pt-8 text-xs text-slate-600 md:flex-row">
          <p>OTOCHECK GLOBAL DIRECTIVE &copy; 2026</p>
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#00f2fe]" />
            SYSTEMS NOMINAL
          </div>
        </div>
      </footer>
    </div>
  );
}
"""

codecs.open(old_home_path, 'w', 'utf-8').write(new_home_content)
print("Updated page.tsx, Header.tsx, and applied user's Celestia design to HomeTab.tsx")
