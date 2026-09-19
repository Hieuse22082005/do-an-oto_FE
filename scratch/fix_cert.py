import codecs

filepath = r'c:\Users\Hieu\Desktop\do an oto_FE\components\ResultCertificate.tsx'
lines = codecs.open(filepath, 'r', 'utf-8').readlines()

new_content = """        {/* Signatures & TxHash Line */}
        <div className="w-full max-w-4xl flex flex-col md:flex-row justify-between items-end mt-8 border-t border-gray-200 pt-8 relative gap-4">
          
          <div className="text-center w-32 md:w-40 mb-8 md:mb-0 shrink-0">
            <p className="font-serif italic text-2xl text-[#0B192C] mb-2" style={{ fontFamily: "'Brush Script MT', cursive, serif" }}>AI.WEB3 Engine</p>
            <div className="h-px bg-gray-400 w-full mb-2"></div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Evaluator</p>
          </div>

          <div className="text-center flex-1 min-w-[200px] flex flex-col items-center group cursor-pointer" onClick={() => handleCopy(data.txhash)} title="Copy TxHash">
            <p className="text-[10px] uppercase font-bold text-gray-400 mb-2 flex items-center gap-1 group-hover:text-[#0B192C] transition-colors">
              <QrCode className="w-3 h-3" /> TxHash (Mã Khối)
            </p>
            <div className="h-px bg-gray-200 w-full mb-2"></div>
            <p className="text-[10px] font-mono text-gray-600 break-all w-full group-hover:text-[#FBBF24] transition-colors flex items-center justify-center gap-2">
              {data.txhash} {isCopied && <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-500" />}
            </p>
          </div>

          <div className="text-center w-32 md:w-40 shrink-0 flex flex-col justify-end h-full">
            {data.userSignature ? (
              <img src={data.userSignature} alt="Customer Signature" className="h-10 w-full object-contain mix-blend-multiply opacity-80 mb-2" />
            ) : (
              <p className="font-serif italic text-xl text-[#0B192C] mb-2">{data.user_email?.split('@')[0] || "Customer"}</p>
            )}
            <div className="h-px bg-gray-400 w-full mb-2"></div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Customer</p>
          </div>

          <div className="text-center w-32 md:w-40 shrink-0">
            <p className="font-serif italic text-xl text-[#0B192C] mb-2 mt-4 md:mt-0">{data.date || new Date().toLocaleDateString('vi-VN')}</p>
            <div className="h-px bg-gray-400 w-full mb-2"></div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Date Issued</p>
          </div>

        </div>
        
      </div>\n"""

new_lines = lines[:185] + [new_content] + lines[211:]
with codecs.open(filepath, 'w', 'utf-8') as f:
    f.writelines(new_lines)
print('Done replacing certificate.')
