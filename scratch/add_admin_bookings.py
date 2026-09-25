import os

filepath = r'C:\Users\Hieu\Desktop\do an oto_FE\components\tabs\AdminTab.tsx'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

jsx = """
              {/* TAB: BOOKINGS */}
              {activeTab === 'bookings' && (
                <div className="bg-white/60 dark:bg-black/40 backdrop-blur-2xl rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col h-[700px]">
                  <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white">Quản Lý Đặt Lịch Xem Xe</h3>
                      <p className="text-sm text-gray-700 dark:text-gray-500 mt-1">Danh sách khách hàng yêu cầu xem xe và trạng thái xử lý.</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                        Tổng cộng: {bookings.length}
                      </span>
                    </div>
                  </div>
                  <div className="flex-1 overflow-auto p-0">
                    <table className="w-full text-left border-collapse">
                      <thead className="bg-slate-50 dark:bg-slate-900/50 sticky top-0 z-10">
                        <tr>
                          <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">Khách Hàng</th>
                          <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">Liên Hệ</th>
                          <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">Mẫu Xe</th>
                          <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">Lịch Hẹn</th>
                          <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">Trạng Thái</th>
                          <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">Ngày Đặt</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
                        {bookings.map((b: any) => (
                          <tr key={b.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors">
                            <td className="p-4">
                              <p className="text-sm font-bold text-slate-900 dark:text-white">{b.customer_name}</p>
                            </td>
                            <td className="p-4">
                              <p className="text-sm text-slate-900 dark:text-slate-300">{b.phone}</p>
                              <p className="text-xs text-slate-500">{b.email}</p>
                            </td>
                            <td className="p-4">
                              <span className="px-2 py-1 bg-amber-100 text-amber-700 rounded-md text-xs font-semibold">{b.car_model}</span>
                            </td>
                            <td className="p-4">
                              <p className="text-sm text-slate-900 dark:text-white">{b.booking_date}</p>
                            </td>
                            <td className="p-4">
                              <span className={`px-2 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${b.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>
                                {b.status}
                              </span>
                            </td>
                            <td className="p-4">
                              <p className="text-sm text-slate-500">{new Date(b.created_at).toLocaleDateString('vi-VN')}</p>
                            </td>
                          </tr>
                        ))}
                        {bookings.length === 0 && (
                          <tr>
                            <td colSpan={6} className="p-8 text-center text-slate-500">Không có dữ liệu đặt lịch.</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
"""

content = content.replace('{/* TAB: LOGS */}', jsx + '\n              {/* TAB: LOGS */}')

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)
print("done")
