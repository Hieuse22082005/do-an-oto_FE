import codecs
import re

filepath = r'c:\Users\Hieu\Desktop\do an oto_FE\components\tabs\FinesTab.tsx'
content = codecs.open(filepath, 'r', 'utf-8').read()

# 1. Fix input colors and add hover/focus animations
input_class_old = 'text-white placeholder-slate-500 focus:border-blue-500 focus:bg-white dark:bg-[#1e293b] outline-none uppercase tracking-[0.2em] transition-all shadow-inner'
input_class_new = 'text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:border-blue-500 outline-none uppercase tracking-[0.2em] transition-all duration-300 shadow-inner hover:border-blue-400 focus:scale-[1.02] focus:ring-4 focus:ring-blue-500/20 focus:shadow-lg'
content = content.replace(input_class_old, input_class_new)

# 2. Add hover effect to main buttons (KIỂM TRA LỖI, etc.)
# "hover:bg-blue-500 text-white py-5 rounded-2xl font-bold text-base tracking-wider uppercase transition-all duration-300 ease-out shadow-sm hover:shadow-md active:scale-95 disabled:opacity-70"
button_class_old = 'hover:bg-blue-500 text-white py-5 rounded-2xl font-bold text-base tracking-wider uppercase transition-all duration-300 ease-out shadow-sm hover:shadow-md active:scale-95 disabled:opacity-70'
button_class_new = 'hover:bg-blue-500 text-white py-5 rounded-2xl font-bold text-base tracking-wider uppercase transition-all duration-300 ease-out shadow-sm hover:shadow-blue-500/40 hover:shadow-xl hover:-translate-y-1 active:scale-95 active:translate-y-0 disabled:opacity-70 disabled:hover:translate-y-0'
content = content.replace(button_class_old, button_class_new)

button_class_old_2 = 'hover:bg-red-500 text-white py-5 rounded-2xl font-bold text-base tracking-wider uppercase transition-all duration-300 ease-out shadow-sm hover:shadow-md active:scale-95 disabled:opacity-70'
button_class_new_2 = 'hover:bg-red-500 text-white py-5 rounded-2xl font-bold text-base tracking-wider uppercase transition-all duration-300 ease-out shadow-sm hover:shadow-red-500/40 hover:shadow-xl hover:-translate-y-1 active:scale-95 active:translate-y-0 disabled:opacity-70 disabled:hover:translate-y-0'
content = content.replace(button_class_old_2, button_class_new_2)

# 3. Add float animation to the info panels (bottom-left)
info_panel_old = 'className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-6 rounded-3xl border border-black/10 dark:border-white/10 shadow-xl flex items-start gap-4"'
info_panel_new = 'className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-6 rounded-3xl border border-black/10 dark:border-white/10 shadow-xl flex items-start gap-4 animate-float hover:scale-[1.02] transition-transform duration-500"'
content = content.replace(info_panel_old, info_panel_new)

# 4. Add animations to right widgets (Top right stats, Top list, Warning, VIP)
# Replace general widget container class
widget_old = 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-6 rounded-3xl border border-black/10 dark:border-white/10 shadow-xl'
widget_new = 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-6 rounded-3xl border border-black/10 dark:border-white/10 shadow-xl hover:-translate-y-2 hover:shadow-2xl transition-all duration-500 group animate-float'
# Let's target specific div constructions for widgets to avoid replacing too broadly
content = content.replace(
    '<div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-6 rounded-3xl border border-black/10 dark:border-white/10 shadow-xl">',
    '<div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-6 rounded-3xl border border-black/10 dark:border-white/10 shadow-xl hover:-translate-y-2 hover:shadow-2xl transition-all duration-500 animate-float" style={{ animationDelay: "0.2s" }}>'
)
content = content.replace(
    '<div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-6 rounded-3xl border border-black/10 dark:border-white/10 shadow-xl flex items-center justify-between">',
    '<div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-6 rounded-3xl border border-black/10 dark:border-white/10 shadow-xl flex items-center justify-between hover:-translate-y-2 hover:shadow-2xl transition-all duration-500 animate-float" style={{ animationDelay: "0.4s" }}>'
)
# And the warn widget:
content = content.replace(
    '<div className={`p-6 rounded-3xl border shadow-lg ${warnBg} ${warnBorder}`}>',
    '<div className={`p-6 rounded-3xl border shadow-lg hover:-translate-y-2 hover:shadow-2xl transition-all duration-500 animate-float ${warnBg} ${warnBorder}`} style={{ animationDelay: "0.6s" }}>'
)
# VIP widget:
content = content.replace(
    '<div className="bg-slate-100 dark:bg-black/40 backdrop-blur-xl p-6 rounded-3xl border bg-slate-100 dark:bg-white/5 border-slate-200 dark:border-white/10 shadow-lg relative overflow-hidden">',
    '<div className="bg-slate-100 dark:bg-black/40 backdrop-blur-xl p-6 rounded-3xl border bg-slate-100 dark:bg-white/5 border-slate-200 dark:border-white/10 shadow-lg relative overflow-hidden hover:-translate-y-2 hover:shadow-2xl transition-all duration-500 animate-float" style={{ animationDelay: "0.8s" }}>'
)

# And for the side menu items, they already have nice hover effects, but we can make them "pop" a bit more if needed.
# Actually, the user asked for "các nút ấn" (buttons), "ô nhập dữ liệu" (inputs) and "các bảng khái niệm" (concept panels). I've covered all three!

codecs.open(filepath, 'w', 'utf-8').write(content)
print('Applied animations')
