import codecs

with codecs.open('components/ResultCertificate.tsx', 'r', 'utf-8') as f:
    text = f.read()

text = text.replace('Khách Hàng Định Giá AI', 'Khách Hàng SmartCar')

with codecs.open('components/ResultCertificate.tsx', 'w', 'utf-8') as f:
    f.write(text)
