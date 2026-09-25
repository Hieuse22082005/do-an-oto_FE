with open('components/tabs/EvaluateTab.tsx', 'r', encoding='utf-8') as f:
    text = f.read()

# Replace texts
text = text.replace("Xác Nhận Web3", "Xác Nhận Định Giá")
text = text.replace("Ký giao dịch qua mạng lưới Blockchain", "Đóng dấu hợp đồng thông minh ngầm (Relayer)")
text = text.replace("Phí định giá", "Phí định giá (Token)")
text = text.replace("0.001 ETH", "1 Token")
text = text.replace("Phương thức: MetaMask (Web3)", "Phương thức: Trừ Token nội bộ")
text = text.replace("Ký & Thanh Toán →", "Định Giá Ngay →")

with open('components/tabs/EvaluateTab.tsx', 'w', encoding='utf-8') as f:
    f.write(text)
