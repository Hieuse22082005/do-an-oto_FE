import codecs

file_path = 'components/modals/CarDetailModal.tsx'
with codecs.open(file_path, 'r', 'utf-8') as f:
    content = f.read()

content = content.replace("Key, MapPin } from 'lucide-react'", "Key, MapPin, Loader2 } from 'lucide-react'")

with codecs.open(file_path, 'w', 'utf-8') as f:
    f.write(content)
print("Fixed missing import!")
