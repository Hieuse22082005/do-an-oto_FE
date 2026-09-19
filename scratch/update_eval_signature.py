import codecs
import re

filepath = r'c:\Users\Hieu\Desktop\do an oto_FE\components\tabs\EvaluateTab.tsx'
content = codecs.open(filepath, 'r', 'utf-8').read()

# 1. Imports
content = re.sub(
    r'import \{ Car, ScanLine, Calendar, Gauge, User, CreditCard, Tag \} from \'lucide-react\';',
    "import { Car, ScanLine, Calendar, Gauge, User, CreditCard, Tag, Receipt } from 'lucide-react';\nimport { SignaturePad } from \"@ark-ui/react/signature-pad\";",
    content
)

# 2. State
pattern_state = r'const \[loadingText, setLoadingText\] = useState\("Đang xử lý\.\.\."\);\n\s+const \[result, setResult\] = useState<any>\(null\);'
replacement_state = """const [loadingText, setLoadingText] = useState("Đang xử lý...");
  const [result, setResult] = useState<any>(null);
  const [hasSignature, setHasSignature] = useState(false);
  const [signatureData, setSignatureData] = useState<string | null>(null);"""
content = re.sub(pattern_state, replacement_state, content)

# 3. payAndEvaluate validation
pattern_pay = r'setLoading\(true\);'
replacement_pay = """if (!hasSignature || !signatureData) {
      alert("Vui lòng ký xác nhận trước khi thanh toán!");
      return;
    }
    setLoading(true);"""
content = re.sub(pattern_pay, replacement_pay, content)

# 4. Result set
pattern_result = r'setResult\(\{ \.\.\.finalResult\.data, \.\.\.formData \}\);'
replacement_result = 'setResult({ ...finalResult.data, ...formData, userSignature: signatureData });'
content = re.sub(pattern_result, replacement_result, content)

# 5. JSX Step 3
pattern_step3 = r'if \(step === 3\) \{.*?return \(\n\s+<div className="max-w-lg mx-auto bg-white dark:bg-\[#0a0a0c\].*?</button>\n\s+</div>\n\s+</div>\n\s+\);\n\s+\}'
replacement_step3 = """if (step === 3) {
    return (
      <div className="max-w-md mx-auto w-full animate-[fadeInUp_0.3s_ease-out]">
        <div className="bg-white dark:bg-gray-900 border border-black/10 dark:border-white/10 rounded-xl shadow-2xl relative overflow-hidden">
          {/* Top Line */}
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-orange-400 to-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.5)]"></div>
          
          {/* Receipt Header */}
          <div className="border-b border-black/10 dark:border-white/10 p-5 mt-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Receipt className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <span className="font-semibold text-slate-900 dark:text-white">
                  Xác Nhận Web3
                </span>
              </div>
              <span className="text-sm text-gray-500 font-mono">
                #{Math.floor(10000 + Math.random() * 90000)}
              </span>
            </div>
            <div className="mt-2 text-xs text-gray-500">
              Ký giao dịch qua mạng lưới Blockchain để lưu trữ vĩnh viễn.
            </div>
          </div>

          {/* Receipt Items */}
          <div className="p-5 space-y-3 font-mono text-sm">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">Hãng xe</span>
              <span className="text-slate-900 dark:text-gray-100 font-bold">{formData.Vehicle_brand}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">Biển số</span>
              <span className="text-slate-900 dark:text-gray-100 font-bold tracking-wider">{formData.license_plate}</span>
            </div>
            <div className="border-t border-black/10 dark:border-white/10 pt-3 flex justify-between items-center font-black">
              <span className="text-slate-900 dark:text-gray-100 font-sans">Phí định giá</span>
              <span className="text-orange-600 dark:text-orange-400 text-lg">
                {user?.tier === 'vip' ? '0 ETH' : '0.001 ETH'}
              </span>
            </div>
          </div>

          {/* Payment Info */}
          <div className="border-t border-black/10 dark:border-white/10 p-5 space-y-3 bg-slate-50 dark:bg-[#111]">
            <div className="flex items-center space-x-3">
              <CreditCard className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600 dark:text-gray-400 font-mono">
                Phương thức: MetaMask (Web3)
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <User className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600 dark:text-gray-400 font-mono truncate">
                Khách hàng: {user?.email || "Khách"}
              </span>
            </div>
          </div>

          {/* Signature Section */}
          <div className="border-t border-black/10 dark:border-white/10 p-5 space-y-3">
            <div className="text-center mb-2">
              <span className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Chữ ký Khách Hàng
              </span>
            </div>

            <SignaturePad.Root 
              onDrawEnd={(details) => {
                setHasSignature(true);
                details.getDataUrl("image/png").then((url) => setSignatureData(url));
              }}
            >
              <SignaturePad.Control className="relative w-full h-32 bg-white dark:bg-black rounded-lg border border-gray-300 dark:border-gray-600 shadow-inner">
                <SignaturePad.Segment className="w-full h-full stroke-slate-900 dark:stroke-white fill-slate-900 dark:fill-white" />
                <SignaturePad.ClearTrigger 
                  onClick={() => { setHasSignature(false); setSignatureData(null); }}
                  className="absolute top-2 right-2 px-2 py-1 bg-black/5 dark:bg-white/5 rounded text-gray-500 hover:text-red-500 text-xs font-bold transition-colors"
                >
                  Xóa (Clear)
                </SignaturePad.ClearTrigger>
                <SignaturePad.Guide className="absolute bottom-6 left-4 right-4 border-b-2 border-dashed border-gray-300 dark:border-gray-700" />
              </SignaturePad.Control>
            </SignaturePad.Root>

            <div className="text-center mt-2">
              <span className={`text-xs font-bold ${hasSignature ? 'text-emerald-600 dark:text-emerald-400' : 'text-orange-500'}`}>
                {hasSignature ? "✓ Đã ký hợp lệ" : "Vui lòng ký vào ô trên để tiếp tục"}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="p-5 flex gap-3 border-t border-black/10 dark:border-white/10 bg-slate-50 dark:bg-[#111]">
            <button 
              onClick={() => setStep(2)} 
              disabled={loading} 
              className="px-4 py-3 rounded-lg font-bold bg-white dark:bg-black border border-black/10 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/5 text-slate-700 dark:text-gray-300 transition-colors"
            >
              Hủy
            </button>
            <button 
              onClick={payAndEvaluate} 
              disabled={loading} 
              className={`flex-1 font-extrabold rounded-lg shadow-lg transition-all flex justify-center items-center gap-2 ${
                hasSignature && !loading
                  ? 'bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-white shadow-orange-500/20' 
                  : 'bg-gray-300 dark:bg-gray-800 text-gray-500 cursor-not-allowed border border-black/5 dark:border-white/5'
              }`}
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white shrink-0" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  <span className="text-sm">{loadingText}</span>
                </>
              ) : 'Ký & Thanh Toán →'}
            </button>
          </div>
        </div>
      </div>
    );
  }"""

content = re.sub(pattern_step3, replacement_step3, content, flags=re.DOTALL)

with codecs.open(filepath, 'w', 'utf-8') as f:
    f.write(content)
print("Updated EvaluateTab.tsx")
