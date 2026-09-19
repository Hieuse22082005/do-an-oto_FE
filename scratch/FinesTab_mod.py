import codecs

file_path = 'components/tabs/FinesTab.tsx'
content = codecs.open(file_path, 'r', 'utf-8').read()

# Add imports
imports = '''import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import { Search, ShieldAlert, FileText, CreditCard, PenTool, Car } from "lucide-react";
'''
content = content.replace("import { supabase } from '../../supabaseClient';", "import { supabase } from '../../supabaseClient';\n" + imports)

# Update menuItems to use Lucide icons
content = content.replace(
    "icon: '🚨', bg: 'bg-emerald-500', isFree: true",
    "icon: <Search className=\"w-5 h-5\" />, bg: 'bg-emerald-500', isFree: true"
).replace(
    "icon: '🔍', bg: 'bg-red-500', isFree: false",
    "icon: <ShieldAlert className=\"w-5 h-5\" />, bg: 'bg-red-500', isFree: false"
).replace(
    "icon: '📋', bg: 'bg-blue-500', isFree: false",
    "icon: <FileText className=\"w-5 h-5\" />, bg: 'bg-blue-500', isFree: false"
).replace(
    "icon: '🪪', bg: 'bg-indigo-500', isFree: false",
    "icon: <CreditCard className=\"w-5 h-5\" />, bg: 'bg-indigo-500', isFree: false"
).replace(
    "icon: '📝', bg: 'bg-amber-500', isFree: false",
    "icon: <PenTool className=\"w-5 h-5\" />, bg: 'bg-amber-500', isFree: false"
)

# Add open state
content = content.replace('const [qrModal, setQrModal] = useState<any>(null);', 'const [qrModal, setQrModal] = useState<any>(null);\n  const [open, setOpen] = useState(false);')

# We need to change renderLeftMenu to use the new Sidebar component
# Instead of searching for the exact huge block which might have spacing differences, I'll extract it dynamically or use a regex
import re

content = re.sub(
    r'const renderLeftMenu = \(\) => \([\s\S]*?\n  \);',
    '''const renderLeftMenu = () => (
    <Sidebar open={open} setOpen={setOpen}>
      <SidebarBody className="justify-between gap-10 bg-white/90 dark:bg-black/60 backdrop-blur-xl border border-slate-200 dark:border-slate-800 rounded-[2rem] shadow-[0_8px_32px_rgba(0,0,0,0.1)] min-h-[600px]">
        <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          {open ? (
            <h3 className="text-slate-900 dark:text-white font-bold text-[11px] uppercase tracking-wider mb-8 px-2 flex items-center gap-2">
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
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${activeMenu === item.id ? item.bg + ' text-white shadow-md scale-105' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 group-hover:scale-105'}`}>
                      {item.icon}
                    </div>
                  )
                }}
                className={activeMenu === item.id ? "bg-slate-100 dark:bg-slate-800/50 rounded-2xl" : "hover:bg-slate-50 dark:hover:bg-slate-800/30 rounded-2xl transition-all"}
              />
            ))}
          </div>
        </div>
      </SidebarBody>
    </Sidebar>
  );''',
    content
)

# Update layout classes
content = content.replace(
    'className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch"',
    'className="flex flex-col lg:flex-row gap-5 items-stretch w-full"'
)

content = content.replace('lg:col-span-6 flex flex-col', 'flex-[2] w-full flex flex-col')
content = content.replace('lg:col-span-6 bg-slate-900', 'flex-[2] w-full bg-slate-900')
content = content.replace('lg:col-span-6 space-y-6', 'flex-[2] w-full space-y-6')
content = content.replace('lg:col-span-6 bg-white', 'flex-[2] w-full bg-white')
content = content.replace('lg:col-span-3 space-y-6', 'flex-[1] w-full space-y-6')

# Replace the input box
content = re.sub(
    r'<div className="bg-white dark:bg-slate-900 backdrop-blur-xl p-8 rounded-xl shadow-lg text-white relative overflow-hidden border border-blue-500/30">[\s\S]*?</form>\s*</div>',
    '''<div className="bg-white dark:bg-slate-900 backdrop-blur-xl p-8 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-white relative overflow-hidden">
            <form onSubmit={handleSearchFines} className="relative z-10 flex flex-col gap-4 max-w-md mx-auto">
              <div className="relative">
                <input type="text" value={queries.plate} onChange={(e) => handleInputChange('plate', e.target.value)} placeholder="Nhập biển số (Thử: 30G99999)" className="w-full px-6 py-4 bg-slate-50 dark:bg-[#1e293b]/50 border border-slate-200 dark:border-slate-700 rounded-xl text-center text-lg font-bold focus:border-blue-500 outline-none uppercase tracking-widest transition-all" required/>
              </div>
              <button type="submit" disabled={isLoading === 'phat-nguoi'} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold text-sm uppercase transition-all duration-300 ease-out shadow-md hover:shadow-lg active:scale-95 disabled:opacity-70">
                {isLoading ? 'Đang kết nối...' : 'Tra Cứu'}
              </button>
            </form>
          </div>''',
    content
)

codecs.open('components/tabs/FinesTab.tsx', 'w', 'utf-8').write(content)
