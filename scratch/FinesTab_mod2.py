import codecs
import re

file_path = 'components/tabs/FinesTab.tsx'
content = codecs.open(file_path, 'r', 'utf-8').read()

new_wrapper = '''  return (
    <div className="w-full h-screen font-sans -mt-24 pt-24 flex flex-col">
      {/* FULL SCREEN LAYOUT */}
      <div className="flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 overflow-hidden">
        {renderLeftMenu()}
        <div className="flex flex-1">
          <div className="p-4 md:p-10 rounded-tl-2xl border-t border-l border-neutral-200 dark:border-neutral-700 bg-white dark:bg-[#0a0f1c] flex flex-col lg:flex-row gap-6 flex-1 w-full h-full overflow-y-auto">
            {renderCenterMain()}
            {renderRightWidgets()}
          </div>
        </div>
      </div>'''

# Replace wrapper using regex
content = re.sub(
    r'  return \(\s*<div className="w-full relative z-10 min-h-\[700px\] font-sans pb-10 pt-4">\s*\{\/\* CENTERED CONTENT WRAPPER \*\/\}\s*<div className="w-full max-w-\[1600px\] mx-auto px-6 sm:px-8 lg:px-12 relative z-10">\s*<div className="flex flex-col lg:flex-row gap-5 items-stretch w-full">\s*\{renderLeftMenu\(\)\}\s*\{renderCenterMain\(\)\}\s*\{renderRightWidgets\(\)\}\s*</div>\s*</div>',
    new_wrapper,
    content
)

new_left_menu = '''const renderLeftMenu = () => (
    <Sidebar open={open} setOpen={setOpen}>
      <SidebarBody className="justify-between gap-10 bg-transparent">
        <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          {open ? (
            <h3 className="text-neutral-900 dark:text-white font-bold text-[11px] uppercase tracking-wider mb-8 px-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span> DỊCH VỤ PHÁP LÝ
            </h3>
          ) : (
            <div className="w-8 h-8 mb-8 flex items-center justify-center">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
            </div>
          )}
          <div className="flex flex-col gap-2">
            {menuItems.map((item) => (
              <SidebarLink
                key={item.id}
                link={{
                  label: item.title,
                  href: "#",
                  onClick: (e) => {
                    e.preventDefault();
                    setActiveMenu(item.id);
                    setResults({ fines: null, registry: null, stolen: null, license: null });
                  },
                  icon: (
                    <div className={`w-6 h-6 flex items-center justify-center transition-colors ${activeMenu === item.id ? 'text-blue-600 dark:text-blue-400' : 'text-neutral-700 dark:text-neutral-200'}`}>
                      {item.icon}
                    </div>
                  )
                }}
                className={activeMenu === item.id ? "bg-neutral-200 dark:bg-neutral-700/50 rounded-lg" : "hover:bg-neutral-200/50 dark:hover:bg-neutral-700/30 rounded-lg transition-all"}
              />
            ))}
          </div>
        </div>
      </SidebarBody>
    </Sidebar>
  );'''

content = re.sub(
    r'const renderLeftMenu = \(\) => \([\s\S]*?    </Sidebar>\n  \);',
    new_left_menu,
    content
)

# Fix div endings
# Original has 2 closing divs before qrModal
# We need to change to 3 closing divs
content = re.sub(
    r'      </div>\s*</div>\s*\{qrModal && \(',
    '''      </div>\n        </div>\n      </div>\n\n      {qrModal && (''',
    content
)

codecs.open('components/tabs/FinesTab.tsx', 'w', 'utf-8').write(content)
