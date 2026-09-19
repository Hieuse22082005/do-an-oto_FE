import codecs

file_path = r"c:\Users\Hieu\Desktop\do an oto_FE\components\tabs\AdminTab.tsx"
with codecs.open(file_path, "r", "utf-8") as f:
    content = f.read()

# Current logic
old_logic = """           const formattedTx = txData.map((tx: any) => ({
             id: tx.id,
             name: tx.user_name || 'Người dùng',
             email: tx.email || 'Unknown',
             amount: `+${tx.amount_eth} ETH`,
             avatar: (tx.user_name || 'U').charAt(0).toUpperCase()
           }));"""

new_logic = """           const formattedTx = txData.map((tx: any) => ({
             id: tx.id,
             name: tx.user_email ? tx.user_email.split('@')[0] : 'Khách',
             email: tx.user_email || 'Ẩn danh',
             amount: tx.predicted_price ? `$${tx.predicted_price.toLocaleString()}` : 'N/A',
             avatar: (tx.user_email || 'K').charAt(0).toUpperCase()
           }));"""

content = content.replace(old_logic, new_logic)

with codecs.open(file_path, "w", "utf-8") as f:
    f.write(content)

print("Updated mapping logic for transactions table!")
