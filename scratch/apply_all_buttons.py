import codecs

filepath = r'c:\Users\Hieu\Desktop\do an oto_FE\components\tabs\FinesTab.tsx'
content = codecs.open(filepath, 'r', 'utf-8').read()

# 1. BẮT ĐẦU THI (blue)
old_1 = 'className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-10 py-2.5 rounded-2xl text-base transition-all duration-300 ease-out mt-4 hover:-translate-y-1 hover:shadow-md active:scale-95"'
new_1 = 'className="btn-uiverse font-bold px-10 py-2.5 rounded-2xl text-base transition-all duration-300 ease-out mt-4 hover:-translate-y-1 hover:shadow-md active:scale-95" style={{ "--color": "#2563eb" } as any}'
content = content.replace(old_1, new_1)

# 2. Thi Lại (slate)
old_2 = 'className="bg-slate-200 dark:bg-slate-700 text-white font-bold px-6 py-2 rounded-xl text-sm transition-all duration-300 ease-out hover:bg-slate-600 hover:shadow-lg active:scale-95 inline-flex items-center gap-2"'
new_2 = 'className="btn-uiverse font-bold px-6 py-2 rounded-xl text-sm transition-all duration-300 ease-out hover:shadow-lg active:scale-95 inline-flex items-center gap-2" style={{ "--color": "#475569" } as any}'
content = content.replace(old_2, new_2)

# 3. Tiếp tục (blue)
old_3 = 'className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 py-2.5 rounded-2xl text-sm transition-all duration-300 ease-out shadow-lg hover:shadow-sm active:scale-95 flex items-center gap-2"'
new_3 = 'className="btn-uiverse font-bold px-8 py-2.5 rounded-2xl text-sm transition-all duration-300 ease-out shadow-lg hover:shadow-sm active:scale-95 flex items-center gap-2" style={{ "--color": "#2563eb" } as any}'
content = content.replace(old_3, new_3)

# 4. QR Thanh Toán (blue)
old_4 = 'className="bg-blue-600 text-white font-bold px-5 py-2.5 rounded-xl text-xs shadow-[0_0_15px_rgba(37,99,235,0.4)] transition-all duration-300 hover:bg-blue-500 hover:shadow-[0_0_25px_rgba(37,99,235,0.6)] active:scale-95 flex items-center gap-2"'
new_4 = 'className="btn-uiverse font-bold px-5 py-2.5 rounded-xl text-xs shadow-[0_0_15px_rgba(37,99,235,0.4)] transition-all duration-300 hover:shadow-[0_0_25px_rgba(37,99,235,0.6)] active:scale-95 flex items-center gap-2" style={{ "--color": "#2563eb" } as any}'
content = content.replace(old_4, new_4)

# 5. Kiểm Tra Hồ Sơ (emerald)
old_5 = 'className="md:col-span-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white py-5 rounded-xl font-bold text-base tracking-wider uppercase transition-all duration-300 ease-out shadow-sm hover:shadow-md hover:-translate-y-1 hover:shadow-xl hover:brightness-110 active:translate-y-0 active:scale-95"'
new_5 = 'className="btn-uiverse md:col-span-2 py-5 rounded-xl font-bold text-base tracking-wider uppercase transition-all duration-300 ease-out shadow-sm hover:-translate-y-1 hover:shadow-xl hover:brightness-110 active:translate-y-0 active:scale-95" style={{ "--color": "#059669" } as any}'
content = content.replace(old_5, new_5)

# 6. Quét Tình Trạng Pháp Lý (red)
old_6 = 'className="w-full bg-red-600 hover:bg-red-500 text-white py-5 rounded-2xl font-bold text-base tracking-wider uppercase transition-all duration-300 ease-out shadow-sm hover:shadow-md hover:-translate-y-1 hover:shadow-xl hover:brightness-110 active:translate-y-0 active:scale-95"'
new_6 = 'className="btn-uiverse w-full py-5 rounded-2xl font-bold text-base tracking-wider uppercase transition-all duration-300 ease-out shadow-sm hover:-translate-y-1 hover:shadow-xl hover:brightness-110 active:translate-y-0 active:scale-95" style={{ "--color": "#dc2626" } as any}'
content = content.replace(old_6, new_6)

# 7. Truy Xuất Hồ Sơ (slate)
old_7 = 'className="w-full bg-slate-200 dark:bg-slate-700 hover:bg-slate-600 text-white py-5 rounded-2xl font-bold text-base tracking-wider uppercase transition-all duration-300 ease-out shadow-lg hover:shadow-sm hover:-translate-y-1 hover:shadow-xl hover:brightness-110 active:translate-y-0 active:scale-95"'
new_7 = 'className="btn-uiverse w-full py-5 rounded-2xl font-bold text-base tracking-wider uppercase transition-all duration-300 ease-out shadow-lg hover:shadow-sm hover:-translate-y-1 hover:shadow-xl hover:brightness-110 active:translate-y-0 active:scale-95" style={{ "--color": "#475569" } as any}'
content = content.replace(old_7, new_7)

# 8. Tải lên File Excel (.xlsx) (blue)
old_8 = 'className="w-full bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)] py-3 rounded-xl text-xs font-bold transition-all duration-300 ease-out active:scale-95 flex items-center justify-center gap-2 border border-blue-400"'
new_8 = 'className="btn-uiverse w-full shadow-[0_0_15px_rgba(37,99,235,0.4)] py-3 rounded-xl text-xs font-bold transition-all duration-300 ease-out active:scale-95 flex items-center justify-center gap-2" style={{ "--color": "#2563eb" } as any}'
content = content.replace(old_8, new_8)

# 9. Đóng modal (blue)
old_9 = 'className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl text-sm transition-all duration-300 ease-out shadow-md hover:bg-blue-700 hover:shadow-lg hover:-translate-y-1 active:scale-95 active:translate-y-0"'
new_9 = 'className="btn-uiverse w-full font-bold py-3 rounded-xl text-sm transition-all duration-300 ease-out shadow-md hover:shadow-lg hover:-translate-y-1 active:scale-95 active:translate-y-0" style={{ "--color": "#2563eb" } as any}'
content = content.replace(old_9, new_9)

codecs.open(filepath, 'w', 'utf-8').write(content)
print('Applied btn-uiverse to all buttons in FinesTab')
