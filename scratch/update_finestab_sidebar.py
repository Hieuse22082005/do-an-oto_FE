import codecs
import re

filepath = r'c:\Users\Hieu\Desktop\do an oto_FE\components\tabs\FinesTab.tsx'
content = codecs.open(filepath, 'r', 'utf-8').read()

# 1. Add imports for Sidebar
if 'import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";' not in content:
    content = content.replace('import React, { useState } from \'react\';', 'import React, { useState } from \'react\';\nimport { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";')

# 2. Add sidebar state
if 'const [sidebarOpen, setSidebarOpen] = useState(false);' not in content:
    content = content.replace('const [qrModal, setQrModal] = useState<any>(null);', 'const [qrModal, setQrModal] = useState<any>(null);\n  const [sidebarOpen, setSidebarOpen] = useState(false);')

# 3. Replace renderLeftMenu
render_left_menu_regex = re.compile(r'const renderLeftMenu = \(\) => \(.*?\);\s*// ================= LAYOUT 2', re.DOTALL)

new_render_left_menu = """const renderLeftMenu = () => (
    <Sidebar open={sidebarOpen} setOpen={setSidebarOpen}>
      <SidebarBody className="justify-between gap-10 bg-slate-200/90 dark:bg-black/60 backdrop-blur-2xl border-r border-black/10 dark:border-white/10 rounded-tr-[2rem] rounded-br-[2rem] shadow-[8px_0_32px_rgba(0,0,0,0.1)]">
        <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          <h3 className="text-slate-900 dark:text-white font-bold text-[11px] uppercase tracking-wider mb-6 px-2 flex items-center gap-2 mt-4 whitespace-nowrap">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            {sidebarOpen ? "DỊCH VỤ PHÁP LÝ" : ""}
          </h3>
          <div className="flex flex-col gap-3">
            {menuItems.map((item) => {
              const isActive = activeMenu === item.id;
              return (
                <SidebarLink
                  key={item.id}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveMenu(item.id);
                    setResults({ fines: null, registry: null, stolen: null, license: null });
                  }}
                  link={{
                    label: item.title + (!item.isFree ? " (VIP)" : ""),
                    href: "#",
                    icon: (
                      <div className={`w-10 h-10 shrink-0 rounded-xl flex items-center justify-center text-lg transition-all duration-300 ${isActive ? item.bg + ' text-white shadow-lg scale-110' : 'bg-white dark:bg-gray-800 text-slate-500 dark:text-gray-400 group-hover/sidebar:scale-110 group-hover/sidebar:-rotate-12'}`}>
                        {item.icon}
                      </div>
                    )
                  }}
                  className={`rounded-xl px-2 py-2 transition-all duration-300 ${isActive ? 'bg-slate-300/50 dark:bg-gray-800/80 shadow-inner' : 'hover:bg-slate-300/30 dark:hover:bg-gray-800/50'}`}
                />
              );
            })}
          </div>
        </div>
      </SidebarBody>
    </Sidebar>
  );

  // ================= LAYOUT 2"""

content = render_left_menu_regex.sub(new_render_left_menu, content)

# 4. Replace main return layout
main_return_regex = re.compile(r'return \(\s*<div className="w-full relative z-10 min-h-\[700px\] font-sans pb-10 pt-4">.*?\{/\* CENTERED CONTENT WRAPPER \*/\}.*?<div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">.*?\{renderLeftMenu\(\)\}.*?\{renderCenterMain\(\)\}.*?\{renderRightWidgets\(\)\}.*?</div>.*?</div>', re.DOTALL)

new_main_return = """return (
    <div className="w-full relative z-10 h-[calc(100vh-80px)] font-sans flex overflow-hidden bg-slate-50/50 dark:bg-[#0a0a0a]/50">
      {/* ACETERNITY SIDEBAR */}
      {renderLeftMenu()}
      
      {/* MAIN CONTENT AREA */}
      <div className="flex-1 overflow-y-auto w-full p-4 sm:p-8">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 xl:grid-cols-9 gap-6 items-start">
            {/* CỘT GIỮA (MAIN CONTENT) - Chiếm 6 cột trên xl */}
            <div className="xl:col-span-6 flex flex-col gap-6">
              {renderCenterMain()}
            </div>
            
            {/* CỘT PHẢI (WIDGETS) - Chiếm 3 cột trên xl */}
            <div className="xl:col-span-3 flex flex-col gap-6">
              {renderRightWidgets()}
            </div>
          </div>
        </div>
      </div>"""

content = main_return_regex.sub(new_main_return, content)

# Also fix the inner column span of renderCenterMain since we extracted it out of the grid-cols-12
content = content.replace('className={`lg:col-span-6 bg-', 'className={`bg-')
content = content.replace('className={`lg:col-span-6 rounded-[2rem]', 'className={`rounded-[2rem]')

# Also for renderRightWidgets
content = content.replace('<div className="lg:col-span-3 flex flex-col gap-5">', '<div className="flex flex-col gap-5 w-full">')

codecs.open(filepath, 'w', 'utf-8').write(content)
print('Updated FinesTab to use Aceternity Sidebar')
