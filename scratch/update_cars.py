import codecs
import re

file_path = 'components/tabs/MarketplaceTab.tsx'

with codecs.open(file_path, 'r', 'utf-8') as f:
    text = f.read()

# Update mockListings
new_mock_listings = """const mockListings = [
  {
    id: 'mock-1',
    brand: 'HONDA',
    model: 'CIVIC 11TH GEN',
    condition: 'Xe lướt',
    manufacture_year: 2023,
    sell_price: 35000,
    image_url: 'https://images.unsplash.com/photo-1605515298946-d062f2e9da53?q=80&w=2072&auto=format&fit=crop',
    description: 'A balance of innovation and heritage. Engineered for those who appreciate performance, design, and purpose.',
    status: 'available'
  },
  {
    id: 'mock-2',
    brand: 'BMW',
    model: 'M4 COMPETITION',
    condition: 'Mới 100%',
    manufacture_year: 2024,
    sell_price: 85000,
    image_url: 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?q=80&w=2115&auto=format&fit=crop',
    description: 'Sleek design meets innovation for a luxury driving experience.',
    status: 'available'
  },
  {
    id: 'mock-3',
    brand: 'MERCEDES',
    model: 'AMG GT',
    condition: 'Xe cũ',
    manufacture_year: 2021,
    sell_price: 75000,
    image_url: 'https://images.unsplash.com/photo-1542282088-fe8426682b8f?q=80&w=2070&auto=format&fit=crop',
    description: 'Bold performance cars crafted for thrilling adventures.',
    status: 'available'
  },
  {
    id: 'mock-4',
    brand: 'PORSCHE',
    model: '911 GT3 RS',
    condition: 'Mới 100%',
    manufacture_year: 2024,
    sell_price: 250000,
    image_url: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=2070&auto=format&fit=crop',
    description: 'Born from racing. The ultimate track tool for the road.',
    status: 'available'
  },
  {
    id: 'mock-5',
    brand: 'AUDI',
    model: 'R8 V10 PERFORMANCE',
    condition: 'Xe lướt',
    manufacture_year: 2022,
    sell_price: 150000,
    image_url: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?q=80&w=2069&auto=format&fit=crop',
    description: 'Breathtaking performance meets everyday usability.',
    status: 'available'
  },
  {
    id: 'mock-6',
    brand: 'MCLAREN',
    model: '720S SPIDER',
    condition: 'Xe lướt',
    manufacture_year: 2023,
    sell_price: 315000,
    image_url: 'https://images.unsplash.com/photo-1621245648589-915006b5d92e?q=80&w=2070&auto=format&fit=crop',
    description: 'Fiercely elegant. A supercar that redefines limits.',
    status: 'available'
  }
];"""

# Replace mockListings
start_mock = text.find('const mockListings = [')
end_mock = text.find('];', start_mock) + 2
if start_mock != -1:
    text = text[:start_mock] + new_mock_listings + text[end_mock:]

# Fix Arrow CSS
# Current left arrow: className="absolute left-[-10px] md:left-[-20px] top-[35%]
# Replace with: className="absolute left-[-20px] md:left-[-60px] top-[35%]
text = text.replace('left-[-10px] md:left-[-20px]', 'left-[-20px] md:left-[-60px]')

# Current right arrow: className="absolute right-[-10px] md:right-[-20px] top-[35%]
# Replace with: className="absolute right-[-20px] md:right-[-60px] top-[35%]
text = text.replace('right-[-10px] md:right-[-20px]', 'right-[-20px] md:right-[-60px]')


with codecs.open(file_path, 'w', 'utf-8') as f:
    f.write(text)

print("Updated mock listings and arrow CSS.")
