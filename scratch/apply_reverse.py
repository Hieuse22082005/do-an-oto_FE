import codecs

file_path = 'components/tabs/MarketplaceTab.tsx'

with codecs.open(file_path, 'r', 'utf-8') as f:
    content = f.read()

# Pass reverse={true} to InfiniteSlider
content = content.replace('<InfiniteSlider direction="horizontal" speed={25} speedOnHover={50}>', '<InfiniteSlider direction="horizontal" speed={25} reverse={true}>')
content = content.replace('<InfiniteSlider direction="horizontal" speed={20} speedOnHover={40}>', '<InfiniteSlider direction="horizontal" speed={20} reverse={true}>')

with codecs.open(file_path, 'w', 'utf-8') as f:
    f.write(content)

print("Passed reverse prop to sliders!")
