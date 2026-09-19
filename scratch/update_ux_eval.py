import codecs
import re

filepath = r'c:\Users\Hieu\Desktop\do an oto_FE\components\tabs\EvaluateTab.tsx'
content = codecs.open(filepath, 'r', 'utf-8').read()

pattern = r'const \[loading, setLoading\] = useState\(false\);'
replacement = """const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("Đang xử lý...");"""
content = re.sub(pattern, replacement, content)

pattern2 = r'const signer = await provider\.getSigner\(\);'
replacement2 = """setLoadingText("Vui lòng mở MetaMask để xác nhận...");
      const signer = await provider.getSigner();"""
content = re.sub(pattern2, replacement2, content)

pattern3 = r'const tx = await contract\.payForValuation\(carHash, \{\n\s+value: fee\n\s+\}\);\n\s+await tx\.wait\(\);'
replacement3 = """const tx = await contract.payForValuation(carHash, {
        value: fee
      });
      setLoadingText("Đang chờ Blockchain xác nhận...");
      await tx.wait();
      setLoadingText("Đang lưu lịch sử...");"""
content = re.sub(pattern3, replacement3, content)

pattern4 = r'\{loading \? \(\n\s+<>\n\s+<svg className="animate-spin.*?</svg>\n\s+Đang gọi Ví\.\.\.\n\s+</>\n\s+\) : \'Ký & Thanh Toán →\'\}'
replacement4 = """{loading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white shrink-0" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                <span className="text-sm">{loadingText}</span>
              </>
            ) : 'Ký & Thanh Toán →'}"""
content = re.sub(pattern4, replacement4, content, flags=re.DOTALL)

with codecs.open(filepath, 'w', 'utf-8') as f:
    f.write(content)
print("Updated EvaluateTab.tsx")
