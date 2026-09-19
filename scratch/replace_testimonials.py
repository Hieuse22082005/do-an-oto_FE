import codecs

with codecs.open('components/ui/home-testimonials.tsx', 'r', 'utf-8') as f:
    text = f.read()

text = text.replace('Định Giá Xe AI', 'SmartCar')

with codecs.open('components/ui/home-testimonials.tsx', 'w', 'utf-8') as f:
    f.write(text)
