import codecs

file_path = 'components/tabs/MarketplaceTab.tsx'

with codecs.open(file_path, 'r', 'utf-8') as f:
    content = f.read()

# Replace Brands
old_brands = """              {[
                { name: 'Mercedes', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/90/Mercedes-Logo.svg' },
                { name: 'BMW', logo: 'https://upload.wikimedia.org/wikipedia/commons/4/44/BMW.svg' },
                { name: 'Porsche', logo: 'https://upload.wikimedia.org/wikipedia/en/d/d3/Porsche_logo.svg' },
                { name: 'Toyota', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Toyota_carlogo.svg' },
                { name: 'Honda', logo: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Honda_Logo.svg' },
                { name: 'VinFast', logo: 'https://upload.wikimedia.org/wikipedia/commons/6/6c/VinFast_logo.svg' },
              ].map"""

new_brands = """              {[
                { name: 'Mercedes', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/90/Mercedes-Logo.svg' },
                { name: 'BMW', logo: 'https://upload.wikimedia.org/wikipedia/commons/4/44/BMW.svg' },
                { name: 'Audi', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/92/Audi-Logo_2016.svg' },
                { name: 'Porsche', logo: 'https://upload.wikimedia.org/wikipedia/en/d/d3/Porsche_logo.svg' },
                { name: 'Lexus', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/25/Lexus_logo.svg' },
                { name: 'Toyota', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Toyota_carlogo.svg' },
                { name: 'Honda', logo: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Honda_Logo.svg' },
                { name: 'Ford', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a0/Ford_Motor_Company_Logo.svg' },
                { name: 'Hyundai', logo: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Hyundai_Motor_Company_logo.svg' },
                { name: 'Kia', logo: 'https://upload.wikimedia.org/wikipedia/commons/4/47/KIA_logo2.svg' },
                { name: 'VinFast', logo: 'https://upload.wikimedia.org/wikipedia/commons/6/6c/VinFast_logo.svg' },
              ].map"""

content = content.replace(old_brands, new_brands)

# Replace Countries
old_countries = """              {[
                { name: 'Đức', flag: 'https://flagcdn.com/w80/de.png', brands: 'Mercedes, BMW, Audi' },
                { name: 'Nhật Bản', flag: 'https://flagcdn.com/w80/jp.png', brands: 'Toyota, Lexus, Honda' },
                { name: 'Mỹ', flag: 'https://flagcdn.com/w80/us.png', brands: 'Ford, Chevrolet, Tesla' },
                { name: 'Anh Quốc', flag: 'https://flagcdn.com/w80/gb.png', brands: 'Bentley, Land Rover' },
                { name: 'Hàn Quốc', flag: 'https://flagcdn.com/w80/kr.png', brands: 'Hyundai, Kia' },
                { name: 'Việt Nam', flag: 'https://flagcdn.com/w80/vn.png', brands: 'VinFast' },
              ].map"""

new_countries = """              {[
                { name: 'Đức', flag: 'https://flagcdn.com/w80/de.png', brands: 'Mercedes, BMW, Audi, Porsche' },
                { name: 'Nhật Bản', flag: 'https://flagcdn.com/w80/jp.png', brands: 'Toyota, Lexus, Honda, Mazda' },
                { name: 'Mỹ', flag: 'https://flagcdn.com/w80/us.png', brands: 'Ford, Chevrolet, Tesla, Jeep' },
                { name: 'Ý', flag: 'https://flagcdn.com/w80/it.png', brands: 'Ferrari, Lamborghini, Maserati' },
                { name: 'Anh Quốc', flag: 'https://flagcdn.com/w80/gb.png', brands: 'Bentley, Land Rover, Aston Martin' },
                { name: 'Pháp', flag: 'https://flagcdn.com/w80/fr.png', brands: 'Peugeot, Bugatti, Renault' },
                { name: 'Hàn Quốc', flag: 'https://flagcdn.com/w80/kr.png', brands: 'Hyundai, Kia, Genesis' },
                { name: 'Thụy Điển', flag: 'https://flagcdn.com/w80/se.png', brands: 'Volvo, Koenigsegg' },
                { name: 'Việt Nam', flag: 'https://flagcdn.com/w80/vn.png', brands: 'VinFast' },
              ].map"""

content = content.replace(old_countries, new_countries)

with codecs.open(file_path, 'w', 'utf-8') as f:
    f.write(content)

print("Added more brands and countries!")
