import codecs

file_path = 'components/tabs/MarketplaceTab.tsx'

with codecs.open(file_path, 'r', 'utf-8') as f:
    content = f.read()

# Add gallery to mock-2 (BMW)
old_mock_2 = """    {
      id: 'mock-2',
      brand: 'BMW',
      model: 'M4 COMPETITION',
      condition: 'MỚI 100%',
      manufacture_year: 2024,
      buy_price: 75000,
      sell_price: 85000,
      status: 'available',
      category: 'Thể thao',
      image_url: 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?auto=format&fit=crop&q=80&w=1200',
      video_url: 'https://cdn.coverr.co/videos/coverr-a-black-car-driving-through-a-city-at-night-5402/1080p.mp4',
      description: 'Unleash the ultimate driving machine. Precision engineering meets track-ready performance.'
    },"""

new_mock_2 = """    {
      id: 'mock-2',
      brand: 'BMW',
      model: 'M4 COMPETITION',
      condition: 'MỚI 100%',
      manufacture_year: 2024,
      buy_price: 75000,
      sell_price: 85000,
      status: 'available',
      category: 'Thể thao',
      image_url: 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?auto=format&fit=crop&q=80&w=1200',
      video_url: 'https://cdn.coverr.co/videos/coverr-a-black-car-driving-through-a-city-at-night-5402/1080p.mp4',
      gallery: [
        'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=1200',
        'https://images.unsplash.com/photo-1556189250-72ba954cfc2b?auto=format&fit=crop&q=80&w=1200'
      ],
      description: 'Unleash the ultimate driving machine. Precision engineering meets track-ready performance.'
    },"""

content = content.replace(old_mock_2, new_mock_2)

with codecs.open(file_path, 'w', 'utf-8') as f:
    f.write(content)

print("Updated mock data with gallery!")
