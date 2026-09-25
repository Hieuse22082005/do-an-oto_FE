with open('components/tabs/EvaluateTab.tsx', 'r', encoding='utf-8') as f:
    text = f.read()

text = text.replace("Thẩm Định & Ký Web3 →", "Thẩm Định Bằng Token →")

with open('components/tabs/EvaluateTab.tsx', 'w', encoding='utf-8') as f:
    f.write(text)
