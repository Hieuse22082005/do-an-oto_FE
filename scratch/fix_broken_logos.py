import codecs

file_path = 'components/tabs/MarketplaceTab.tsx'

with codecs.open(file_path, 'r', 'utf-8') as f:
    content = f.read()

# Replace Porsche
content = content.replace(
    "'https://upload.wikimedia.org/wikipedia/en/d/d3/Porsche_logo.svg'", 
    "'https://cdn.worldvectorlogo.com/logos/porsche-6.svg'"
)

# Replace Lexus
content = content.replace(
    "'https://upload.wikimedia.org/wikipedia/commons/2/25/Lexus_logo.svg'", 
    "'https://cdn.worldvectorlogo.com/logos/lexus-2.svg'"
)

# Replace VinFast
content = content.replace(
    "'https://upload.wikimedia.org/wikipedia/commons/6/6c/VinFast_logo.svg'", 
    "'https://upload.wikimedia.org/wikipedia/commons/e/e0/Vinfast_logo.svg'"
)

with codecs.open(file_path, 'w', 'utf-8') as f:
    f.write(content)

print("Updated broken URLs!")
