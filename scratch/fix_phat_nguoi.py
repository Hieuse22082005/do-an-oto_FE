import re

file_path = r"c:\Users\Hieu\Desktop\do an oto_FE\components\tabs\FinesTab.tsx"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# Fix phat-nguoi
# Currently it looks like:
#         <div key={activeMenu} className={`lg:col-span-6 flex flex-col gap-6 ${animationClass}`}>          <div className="bg-[#0f172a]/90 backdrop-blur-xl p-8 rounded-[2rem] shadow-2xl text-white relative overflow-hidden border border-blue-500/30">
# We want it to look like:
#         <div key={activeMenu} className={`lg:col-span-6 flex flex-col gap-6 ${animationClass}`}>
#           <div className="text-center mb-10 relative">
#             ... title block ...
#           </div>
#           <div className="bg-[#0f172a]/90 backdrop-blur-xl p-8 rounded-[2rem] shadow-2xl text-white relative overflow-hidden border border-blue-500/30">

def generate_title_block_hardcoded(badge_text, title_text, gradient_class, badge_bg, badge_border, badge_text_color, icon_emoji):
    return (
        '          <div className="text-center mb-10 relative">\n'
        '            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-5xl md:text-[6rem] font-black text-white/[0.03] whitespace-nowrap pointer-events-none select-none tracking-tighter w-full overflow-hidden">\n'
        '              ' + title_text.upper() + '\n'
        '            </div>\n'
        '            <div className="flex justify-center items-center gap-2 mb-4 relative z-10">\n'
        '              <div className="flex items-center gap-2 ' + badge_bg + ' border ' + badge_border + ' px-4 py-1.5 rounded-full backdrop-blur-md shadow-sm">\n'
        '                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest ' + badge_text_color + '">' + icon_emoji + ' ' + badge_text + '</span>\n'
        '              </div>\n'
        '            </div>\n'
        '            <h1 className="text-4xl sm:text-5xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r ' + gradient_class + ' tracking-tight mb-4 drop-shadow-sm py-1 relative z-10">\n'
        '              ' + title_text + '\n'
        '            </h1>\n'
        '            <p className="text-gray-400 text-sm sm:text-base relative z-10">\n'
        '              Xin chào <span className="font-bold bg-white/5 text-gray-200 px-3 py-1 rounded-full border border-white/10 ml-1">{user?.user_metadata?.display_name || user?.email || \'Khách\'}</span>\n'
        '            </p>\n'
        '          </div>\n'
    )

new_phat_nguoi_title = generate_title_block_hardcoded(
    "HỆ THỐNG CSDL CSGT TOÀN QUỐC", "Tra Cứu Phạt Nguội", "from-blue-400 via-indigo-400 to-cyan-400",
    "bg-blue-500/10", "border-blue-500/20", "text-blue-300", "🚔"
)

# Search for the merged line
merged_line = r'        <div key=\{activeMenu\} className=\{\`lg:col-span-6 flex flex-col gap-6 \$\{animationClass\}\`\}>          <div className="bg-\[#0f172a\]/90 backdrop-blur-xl p-8 rounded-\[2rem\] shadow-2xl text-white relative overflow-hidden border border-blue-500/30">'
fixed_lines = (
    '        <div key={activeMenu} className={`lg:col-span-6 flex flex-col gap-6 ${animationClass}`}>\n'
    + new_phat_nguoi_title +
    '          <div className="bg-[#0f172a]/90 backdrop-blur-xl p-8 rounded-[2rem] shadow-2xl text-white relative overflow-hidden border border-blue-500/30">'
)

content = re.sub(merged_line, fixed_lines, content)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Fixed phat-nguoi!")
