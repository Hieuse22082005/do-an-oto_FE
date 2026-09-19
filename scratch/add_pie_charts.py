import codecs
import re

file_path = r"c:\Users\Hieu\Desktop\do an oto_FE\components\tabs\AdminTab.tsx"
with codecs.open(file_path, "r", "utf-8") as f:
    content = f.read()

# 1. Update COLORS
content = content.replace(
    "const COLORS = ['#111827', '#4b5563', '#9ca3af', '#e5e7eb'];",
    "const BRAND_COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#10b981'];\nconst REVENUE_COLORS = ['#f59e0b', '#3b82f6', '#10b981'];\nconst revenueSources = [\n  { name: 'Gói VIP', value: 1.5 },\n  { name: 'Phí Gas Web3', value: 0.6 },\n  { name: 'Khác', value: 0.3 }\n];"
)

# 2. Add Pie Charts
target_anchor = """                  </div>
                </div>
              </div>
            )}

            {/* TAB: USERS & REVENUE */}"""

pie_charts_code = """                  </div>
                </div>

                {/* PIE CHARTS ROW */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  {/* Doanh thu */}
                  <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10 shadow-sm hover:shadow-md transition-shadow duration-300">
                    <h3 className="text-base font-bold text-white mb-6">Nguồn Doanh Thu (ETH)</h3>
                    <div className="h-[250px] w-full flex items-center justify-center">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={revenueSources}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                            stroke="none"
                          >
                            {revenueSources.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={REVENUE_COLORS[index % REVENUE_COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip 
                            contentStyle={{ borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', fontSize: '14px', fontWeight: 'bold', color: '#fff', backgroundColor: '#020617' }} 
                            itemStyle={{ color: '#fff' }}
                            formatter={(value) => `${value} ETH`}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="flex justify-center gap-4 mt-4">
                      {revenueSources.map((entry, index) => (
                        <div key={entry.name} className="flex items-center gap-2">
                          <span className="w-3 h-3 rounded-full shadow-[0_0_8px_rgba(255,255,255,0.2)]" style={{ backgroundColor: REVENUE_COLORS[index % REVENUE_COLORS.length] }}></span>
                          <span className="text-xs text-gray-400 font-medium">{entry.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Top Brands */}
                  <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10 shadow-sm hover:shadow-md transition-shadow duration-300">
                    <h3 className="text-base font-bold text-white mb-6">Thị Hiếu Hãng Xe (Lượt Định Giá)</h3>
                    <div className="h-[250px] w-full flex items-center justify-center">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={topBrandsData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                            stroke="none"
                          >
                            {topBrandsData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={BRAND_COLORS[index % BRAND_COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip 
                            contentStyle={{ borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', fontSize: '14px', fontWeight: 'bold', color: '#fff', backgroundColor: '#020617' }} 
                            itemStyle={{ color: '#fff' }}
                            formatter={(value) => `${value} lượt`}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="flex justify-center gap-4 mt-4">
                      {topBrandsData.map((entry, index) => (
                        <div key={entry.name} className="flex items-center gap-2">
                          <span className="w-3 h-3 rounded-full shadow-[0_0_8px_rgba(255,255,255,0.2)]" style={{ backgroundColor: BRAND_COLORS[index % BRAND_COLORS.length] }}></span>
                          <span className="text-xs text-gray-400 font-medium">{entry.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: USERS & REVENUE */}"""

if target_anchor in content:
    content = content.replace(target_anchor, pie_charts_code)
    with codecs.open(file_path, "w", "utf-8") as f:
        f.write(content)
    print("Successfully added Pie Charts!")
else:
    print("Could not find the target anchor to insert Pie Charts.")
