import codecs
import re

file_path = r"c:\Users\Hieu\Desktop\do an oto_FE\components\tabs\AdminTab.tsx"
with codecs.open(file_path, "r", "utf-8") as f:
    content = f.read()

# 1. Refactor Tabs to have cool animation and click effects
tabs_old = """      {/* HEADER TABS Ly cm hng t nh mu */}
      <div className="border-b border-white/10 sticky top-0 z-40 bg-[#020617]/50 backdrop-blur-md">
        <div className="px-8 flex gap-8 items-center h-14">
          <button onClick={() => setActiveTab('overview')} className={`h-full px-4 text-sm font-semibold border-b-2 transition-all duration-300 ease-in-out hover:bg-gray-800/50 ${activeTab === 'overview' ? 'border-white text-white' : 'border-transparent text-gray-400 hover:text-white hover:bg-white/5'}`}>Tng Quan</button>
          <button onClick={() => setActiveTab('users')} className={`h-full px-4 text-sm font-semibold border-b-2 transition-all duration-300 ease-in-out hover:bg-gray-800/50 ${activeTab === 'users' ? 'border-white text-white' : 'border-transparent text-gray-400 hover:text-white hover:bg-white/5'}`}>Ngi Dng</button>
          <button onClick={() => setActiveTab('cms')} className={`h-full px-4 text-sm font-semibold border-b-2 transition-all duration-300 ease-in-out hover:bg-gray-800/50 ${activeTab === 'cms' ? 'border-white text-white' : 'border-transparent text-gray-400 hover:text-white hover:bg-white/5'}`}>Sn Phm (CMS)</button>
          <button onClick={() => setActiveTab('logs')} className={`h-full px-4 text-sm font-semibold border-b-2 transition-all duration-300 ease-in-out hover:bg-gray-800/50 ${activeTab === 'logs' ? 'border-white text-white' : 'border-transparent text-gray-400 hover:text-white hover:bg-white/5'}`}>Logs H Thng</button>
        </div>
      </div>"""

# Match old tabs logic independently of encoding issues
match_tabs = re.search(r'<div className="px-8 flex gap-8 items-center h-14">.*?</div>\s*</div>', content, re.DOTALL)
if match_tabs:
    tabs_new = """<div className="px-8 flex gap-8 items-center h-14">
          {['overview', 'users', 'cms', 'logs'].map((tabKey) => {
            const labels: any = { overview: 'Tổng Quan', users: 'Người Dùng', cms: 'Sản Phẩm (CMS)', logs: 'Logs Hệ Thống' };
            return (
              <button
                key={tabKey}
                onClick={() => setActiveTab(tabKey as any)}
                className={`relative h-full px-4 text-sm font-bold transition-all duration-300 ease-out active:scale-95 flex items-center justify-center group overflow-hidden ${activeTab === tabKey ? 'text-blue-400' : 'text-gray-400 hover:text-white'}`}
              >
                <span className="relative z-10">{labels[tabKey]}</span>
                {activeTab === tabKey && (
                  <div className="absolute bottom-0 left-0 w-full h-[2px] bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,1)]" />
                )}
                <div className="absolute inset-0 bg-blue-500/10 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              </button>
            );
          })}
        </div>
      </div>"""
    content = content[:match_tabs.start()] + tabs_new + content[match_tabs.end():]

# 2. Add Gradient to Bar Chart
content = content.replace(
    '<BarChart data={chartData.bar} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>',
    '<BarChart data={chartData.bar} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>\n                      <defs>\n                        <linearGradient id="colorBar" x1="0" y1="0" x2="0" y2="1">\n                          <stop offset="0%" stopColor="#3b82f6" stopOpacity={1}/>\n                          <stop offset="100%" stopColor="#1e3a8a" stopOpacity={0.2}/>\n                        </linearGradient>\n                      </defs>'
)
content = content.replace(
    '<Bar dataKey="value" fill="#3b82f6"',
    '<Bar dataKey="value" fill="url(#colorBar)"'
)

# 3. Add Hover drop-shadow effect to Pie Chart Cells
# Note: In recharts, className works on Cell!
content = content.replace(
    '<Cell key={`cell-${index}`} fill={REVENUE_COLORS[index % REVENUE_COLORS.length]} />',
    '<Cell key={`cell-${index}`} fill={REVENUE_COLORS[index % REVENUE_COLORS.length]} className="hover:opacity-80 transition-opacity duration-300 drop-shadow-md cursor-pointer outline-none" />'
)
content = content.replace(
    '<Cell key={`cell-${index}`} fill={BRAND_COLORS[index % BRAND_COLORS.length]} />',
    '<Cell key={`cell-${index}`} fill={BRAND_COLORS[index % BRAND_COLORS.length]} className="hover:opacity-80 transition-opacity duration-300 drop-shadow-md cursor-pointer outline-none" />'
)

with codecs.open(file_path, "w", "utf-8") as f:
    f.write(content)

print("Successfully injected sophisticated animations and gradients!")
