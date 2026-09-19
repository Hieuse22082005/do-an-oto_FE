import codecs

filepath = r'c:\Users\Hieu\Desktop\do an oto_FE\components\tabs\FinesTab.tsx'
content = codecs.open(filepath, 'r', 'utf-8').read()

# The VIP button inside renderCenterMain (if locked)
old_vip_button = 'button className="btn-liquid relative z-10 bg-yellow-500 hover:bg-yellow-600 text-slate-900 px-6 py-2 rounded-xl font-bold tracking-wider shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-md active:scale-95"'
new_vip_button = 'button className="btn-uiverse shadow-xl hover:-translate-y-1"'

content = content.replace(old_vip_button, new_vip_button)

# The "Đăng Ký Ngay" button inside renderAds
old_ads_button = 'button className="btn-liquid w-full bg-white hover:bg-yellow-400 text-blue-900 font-bold py-3 rounded-xl text-sm transition-all duration-300 shadow-lg hover:shadow-yellow-400/50 hover:-translate-y-1 active:scale-95"'
new_ads_button = 'button className="btn-uiverse w-full shadow-lg hover:-translate-y-1"'

content = content.replace(old_ads_button, new_ads_button)

codecs.open(filepath, 'w', 'utf-8').write(content)
print('Applied exact CSS to FinesTab buttons')
