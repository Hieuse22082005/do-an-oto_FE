import re
import codecs

file_path = r"c:\Users\Hieu\Desktop\do an oto_FE\components\tabs\AdminTab.tsx"
with codecs.open(file_path, "r", "utf-8") as f:
    content = f.read()

# 1. Remove the DatePicker and Download buttons
buttons_to_remove = """<div className="flex items-center gap-4">
            <button className="border border-gray-300 bg-white text-sm font-semibold px-4 py-2 rounded-md flex items-center gap-2 shadow-sm">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              Jan 20, 2024 - Feb 09, 2024
            </button>
            <button className="bg-black text-white text-sm font-semibold px-4 py-2 rounded-md shadow-sm">
              Download
            </button>
          </div>"""
content = content.replace(buttons_to_remove, "")

# 2. Convert recentTransactions to state
mock_trans_decl = """// Mock Data for Recent Transactions
const recentTransactions = [
  { id: 1, name: 'Nguyễn Văn A', email: 'nguyenvana@email.com', amount: '+0.15 ETH', avatar: 'N' },
  { id: 2, name: 'Trần Thị B', email: 'tranthib@email.com', amount: '+0.05 ETH', avatar: 'T' },
  { id: 3, name: 'Lê Hoàng C', email: 'lehoangc@email.com', amount: '+0.20 ETH', avatar: 'L' },
  { id: 4, name: 'Phạm Minh D', email: 'phamminhd@email.com', amount: '+0.05 ETH', avatar: 'P' },
  { id: 5, name: 'Dương Xuân H', email: 'duongxuanhieu22082005@gmail.com', amount: '+0.50 ETH', avatar: 'D' },
];"""
content = content.replace(mock_trans_decl, "")

state_add = """  const [transactions, setTransactions] = useState<any[]>([
    { id: 1, name: 'Nguyễn Văn A', email: 'nguyenvana@email.com', amount: '+0.15 ETH', avatar: 'N' },
    { id: 2, name: 'Trần Thị B', email: 'tranthib@email.com', amount: '+0.05 ETH', avatar: 'T' },
    { id: 3, name: 'Lê Hoàng C', email: 'lehoangc@email.com', amount: '+0.20 ETH', avatar: 'L' },
    { id: 4, name: 'Phạm Minh D', email: 'phamminhd@email.com', amount: '+0.05 ETH', avatar: 'P' },
    { id: 5, name: 'Dương Xuân H', email: 'duongxuanhieu22082005@gmail.com', amount: '+0.50 ETH', avatar: 'D' },
  ]);
"""
content = content.replace("const [loading, setLoading] = useState(true);", "const [loading, setLoading] = useState(true);\n" + state_add)

content = content.replace("recentTransactions.map", "transactions.map")
content = content.replace("{recentTransactions", "{transactions")

# 3. Add logic to try fetching real transactions and merge/overwrite
fetch_tx_logic = """
      // Thử đồng bộ dữ liệu giao dịch thật từ bảng (nếu có)
      // Ví dụ: bảng 'transactions' hoặc 'vip_upgrades'
      try {
        const { data: txData, error: txError } = await supabase
          .from('transactions') // Thay tên bảng thực tế vào đây
          .select('*')
          .order('created_at', { ascending: false })
          .limit(10);
          
        if (!txError && txData && txData.length > 0) {
           const formattedTx = txData.map((tx: any) => ({
             id: tx.id,
             name: tx.user_name || 'Người dùng',
             email: tx.email || 'Unknown',
             amount: `+${tx.amount_eth} ETH`,
             avatar: (tx.user_name || 'U').charAt(0).toUpperCase()
           }));
           // Nếu có dữ liệu thật thì ghi đè dữ liệu mẫu
           setTransactions(formattedTx);
        }
      } catch (err) {
        console.log("Chưa có bảng transactions, dùng dữ liệu mẫu.");
      }
"""
content = content.replace("setRealUsers(usersData);", "setRealUsers(usersData);\n" + fetch_tx_logic)

with codecs.open(file_path, "w", "utf-8") as f:
    f.write(content)

print("Removed buttons and added sync logic for transactions!")
