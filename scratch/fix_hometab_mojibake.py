import codecs

path = r'c:\Users\Hieu\Desktop\do an oto_FE\components\tabs\HomeTab.tsx'
content = codecs.open(path, 'r', 'utf-8').read()

# Fix HomeTab mojibake
replacements = {
    'Trang ch  cc (Tin tcc & Th
g kA)': 'Trang chủ các (Tin tức & Thống kê)',
    'Trang ch ': 'Trang chủ',
    'TRUY C-P LU TR...': 'TRUY CẬP LƯU TRỮ...',
    'H? th"ng ng kAt n"i v>i mng l>i v? tinh OTOCHECK ? truy xut d li?u mt...': 'Hệ thống đang kết nối với mạng lưới vệ tinh OTOCHECK để truy xuất dữ liệu mật...',
    'Nh-p bicn s" xe (VD: 59A12345)': 'Nhập biển số xe (VD: 59A12345)',
    'Nh-p txHash...': 'Nhập txHash...',
    'Tra Ccu Ngay': 'Tra Cứu Ngay',
    'YAu c u quy?n truy c-p cp 4. TiAu chucn mA hA3a AES-256 A kA-ch hot.': 'Yêu cầu quyền truy cập cấp 4. Tiêu chuẩn mã hóa AES-256 đã kích hoạt.',
    'L"?t Truy C-p': 'Lượt Truy Cập',
    'T"c ? X LA': 'Tốc Độ Xử Lý',
    '? ChA-nh XA1c': 'Độ Chính Xác',
    'Uptime H? Th"ng': 'Uptime Hệ Thống'
}

for k, v in replacements.items():
    content = content.replace(k, v)

codecs.open(path, 'w', 'utf-8').write(content)
