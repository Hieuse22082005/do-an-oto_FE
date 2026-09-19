import codecs
import re

file_path = r"c:\Users\Hieu\Desktop\do an oto_FE\components\tabs\AdminTab.tsx"
with codecs.open(file_path, "r", "utf-8") as f:
    content = f.read()

# 1. Import PieChart
content = content.replace(
    "import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';",
    "import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, PieChart, Pie, Cell } from 'recharts';"
)

# 2. Add Top Brands Mock Data
brand_data = """
// Mock Data for Top Brands
const topBrandsData = [
  { name: 'Toyota', value: 450 },
  { name: 'Honda', value: 320 },
  { name: 'Ford', value: 210 },
  { name: 'Hyundai', value: 180 },
];
const COLORS = ['#111827', '#4b5563', '#9ca3af', '#e5e7eb'];
"""
content = content.replace("// Mock Data for Main Bar Chart (Monthly)", brand_data + "\n// Mock Data for Main Bar Chart (Monthly)")

# 3. Add Market Analytics & Alerts to Overview
# Find the end of the charts/sales grid
charts_row = """                  {/* Cột Danh sách Giao dịch Gần đây */}
                  <div className="lg:col-span-3 bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
                    <div className="mb-6">
                      <h3 className="text-base font-bold text-gray-900">Giao dịch Gần đây</h3>
                      <p className="text-sm text-gray-500 mt-1">Hệ thống có {stats.searchHash} giao dịch trong tháng này.</p>
                    </div>
                    
                    <div className="space-y-6">
                      {transactions.map(tx => (
                        <div key={tx.id} className="flex justify-between items-center group">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-600 border border-gray-200">
                              {tx.avatar}
                            </div>
                            <div>
                              <p className="text-sm font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{tx.name}</p>
                              <p className="text-xs text-gray-500">{tx.email}</p>
                            </div>
                          </div>
                          <div className="flex flex-col items-end gap-1">
                            <span className="text-sm font-bold text-gray-900">{tx.amount}</span>
                            <button className="text-[10px] bg-red-50 text-red-600 px-2 py-0.5 rounded border border-red-200 font-bold hover:bg-red-600 hover:text-white transition-colors opacity-0 group-hover:opacity-100">Refund</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* HÀNG 3: PHÂN TÍCH THỊ TRƯỜNG & CẢNH BÁO */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                  {/* Market Analytics */}
                  <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
                    <h3 className="text-base font-bold text-gray-900 mb-2">Thị hiếu Thị Trường (Top Định Giá)</h3>
                    <p className="text-sm text-gray-500 mb-4">Các dòng xe đang được tìm kiếm và định giá nhiều nhất.</p>
                    <div className="flex items-center">
                      <div className="w-1/2 h-[200px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie data={topBrandsData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                              {topBrandsData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip contentStyle={{ borderRadius: '8px', fontSize: '12px', fontWeight: 'bold' }} />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="w-1/2 space-y-3">
                        {topBrandsData.map((brand, i) => (
                          <div key={i} className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i] }}></span>
                              <span className="text-sm font-bold text-gray-700">{brand.name}</span>
                            </div>
                            <span className="text-sm font-bold text-gray-900">{brand.value} xe</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Command Center Alerts */}
                  <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col">
                    <h3 className="text-base font-bold text-gray-900 mb-2 flex justify-between items-center">
                      Trung Tâm Xử Lý
                      <span className="bg-red-100 text-red-600 px-2 py-0.5 rounded text-xs font-bold animate-pulse">1 Lỗi Mạng</span>
                    </h3>
                    <p className="text-sm text-gray-500 mb-4">Theo dõi sức khỏe hệ thống AI và Blockchain.</p>
                    
                    <div className="flex-1 space-y-3">
                      <div className="p-3 border border-red-200 bg-red-50 rounded-lg flex justify-between items-start">
                        <div>
                          <h4 className="text-xs font-bold text-red-700 uppercase tracking-wider">RPC_TIMEOUT</h4>
                          <p className="text-xs text-red-600 mt-1">Mất kết nối với Sepolia Testnet lúc 14:30. Các giao dịch đang bị treo.</p>
                        </div>
                        <button className="bg-white text-red-600 border border-red-200 px-3 py-1 rounded text-xs font-bold hover:bg-red-600 hover:text-white transition-colors shadow-sm">Restart Node</button>
                      </div>

                      <div className="p-3 border border-gray-200 bg-gray-50 rounded-lg flex justify-between items-start">
                        <div>
                          <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider">AI_MODEL_READY</h4>
                          <p className="text-xs text-gray-500 mt-1">Mô hình định giá v2.0 đang hoạt động ổn định. Độ trễ: 120ms.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>"""

# Replace the transactions column and add the new rows
content = re.sub(
    r'\{/\* Cột Danh sách Giao dịch Gần đây \*/\}.*?</div>\s*</div>\s*</div>\s*</div>\s*\}\)',
    charts_row + "\n              </div>\n            )}",
    content,
    flags=re.DOTALL
)

# 4. Add Ban/Unban Buttons to Users Tab
user_th = """<tr><th className="py-4 font-bold text-gray-500 text-sm">Tài Khoản</th><th className="py-4 font-bold text-gray-500 text-sm text-center">Gói Sử Dụng</th><th className="py-4 font-bold text-gray-500 text-sm text-center">Trạng Thái</th><th className="py-4 font-bold text-gray-500 text-sm text-right">Quản Trị</th></tr>"""
content = re.sub(r'<tr><th className="py-4 font-bold text-gray-500 text-sm">Tài Khoản.*?</tr>', user_th, content)

user_td = """                          <td className="py-4 text-center">
                            <div className="inline-flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-green-500"></span><span className="text-sm font-medium text-gray-600">Đang hoạt động</span></div>
                          </td>
                          <td className="py-4 text-right">
                            <button className="text-xs font-bold text-red-500 bg-red-50 border border-red-100 hover:bg-red-500 hover:text-white px-3 py-1.5 rounded transition-all shadow-sm">Khóa (Ban)</button>
                          </td>"""
content = re.sub(
    r'<td className="py-4 text-center">\s*<div className="inline-flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-green-500"></span><span className="text-sm font-medium text-gray-600">Đang hoạt động</span></div>\s*</td>',
    user_td,
    content
)

with codecs.open(file_path, "w", "utf-8") as f:
    f.write(content)

print("Advanced Command Center features injected!")
