import codecs

with codecs.open('app/page.tsx', 'r', 'utf-8') as f:
    text = f.read()

text = text.replace('Định Giá Xe AI', 'SmartCar')

with codecs.open('app/page.tsx', 'w', 'utf-8') as f:
    f.write(text)
