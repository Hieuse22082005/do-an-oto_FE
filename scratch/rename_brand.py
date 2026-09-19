import codecs

# Header.tsx
with codecs.open('components/Header.tsx', 'r', 'utf-8') as f:
    text = f.read()
text = text.replace('Định Giá Xe AI', 'SmartCar')
text = text.replace('Định Giá AI', 'Định Giá SmartCar')
with codecs.open('components/Header.tsx', 'w', 'utf-8') as f:
    f.write(text)

# HomeTab.tsx
with codecs.open('components/tabs/HomeTab.tsx', 'r', 'utf-8') as f:
    text = f.read()
text = text.replace('Định Giá Xe AI', 'SmartCar')
with codecs.open('components/tabs/HomeTab.tsx', 'w', 'utf-8') as f:
    f.write(text)

# layout.tsx (maybe)
with codecs.open('app/layout.tsx', 'r', 'utf-8') as f:
    text = f.read()
text = text.replace('Định Giá Xe AI', 'SmartCar')
with codecs.open('app/layout.tsx', 'w', 'utf-8') as f:
    f.write(text)

