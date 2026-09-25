import os
import re

with open('components/tabs/EvaluateTab.tsx', 'r', encoding='utf-8') as f:
    text = f.read()

# Replace the payAndEvaluate function entirely
pattern = re.compile(r'const payAndEvaluate = async \(\) => \{.*?\n  \};\n', re.DOTALL)

replacement = """const payAndEvaluate = async () => {
    if (!user || !user.id) {
      alert("Vui lòng đăng nhập để định giá!");
      return;
    }
    
    if (!hasSignature || !signatureData) {
      alert("Vui lòng ký xác nhận trước khi thanh toán!");
      return;
    }
    
    setLoading(true);
    setLoadingText("AI đang phân tích và gửi lệnh ký ngầm...");
    
    try {
      const payloadData = { 
          ...formData, 
          user_email: user?.email,
          user_signature: signatureData
      };
      
      const reqBody = {
          user_id: user.id,
          vehicle_data: payloadData
      };

      const res = await fetch("http://127.0.0.1:8080/api/v1/transactions/evaluate/sponsored", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reqBody),
      });

      if (!res.ok) {
        const error = await res.json();
        const errorMsg = typeof error.detail === 'object' ? JSON.stringify(error.detail) : error.detail;
        throw new Error(errorMsg || "Lỗi hoặc không đủ số dư Token!");
      }

      const data = await res.json();
      
      // Thành công, sang bước kết quả
      setResult({ ...data, ...formData, userSignature: signatureData });
      setStep(4);
      
    } catch (e: any) {
      console.error(e);
      alert(e.message || "Có lỗi xảy ra");
    } finally {
      setLoading(false);
    }
  };
"""

text = pattern.sub(replacement, text)

with open('components/tabs/EvaluateTab.tsx', 'w', encoding='utf-8') as f:
    f.write(text)

print("Replaced payAndEvaluate in FE")
