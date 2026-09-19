import codecs
import re

filepath = r'c:\Users\Hieu\Desktop\do an oto_FE\app\page.tsx'
content = codecs.open(filepath, 'r', 'utf-8').read()

pattern = r'const \[isProcessingPayment, setIsProcessingPayment\] = useState\(false\);'
replacement = """const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentStatusText, setPaymentStatusText] = useState("Đang xử lý...");"""

content = re.sub(pattern, replacement, content)

pattern2 = r'setIsProcessingPayment\(true\);\n\s+try \{'
replacement2 = """setIsProcessingPayment(true);
    setPaymentStatusText("Vui lòng mở MetaMask để xác nhận...");
    try {"""

content = re.sub(pattern2, replacement2, content)

pattern3 = r'const tx = await contract\.buyVIP\(\{ \n\s+value: ethers\.parseEther\("0\.05"\) \n\s+\}\);\n\s+await tx\.wait\(\);'
replacement3 = """const tx = await contract.buyVIP({ 
        value: ethers.parseEther("0.05") 
      });
      setPaymentStatusText("Đang chờ Blockchain xác nhận...");
      await tx.wait(); 
      setPaymentStatusText("Đang cập nhật dữ liệu...");"""

content = re.sub(pattern3, replacement3, content)

pattern4 = r'\{isProcessingPayment \? "Đang xử lý\.\.\." : "Thanh Toán bằng Crypto"\}'
replacement4 = '{isProcessingPayment ? paymentStatusText : "Thanh Toán bằng Crypto"}'

content = re.sub(pattern4, replacement4, content)

with codecs.open(filepath, 'w', 'utf-8') as f:
    f.write(content)
print("Updated page.tsx")
