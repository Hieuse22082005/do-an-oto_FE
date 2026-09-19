import codecs

filepath = r'c:\Users\Hieu\Desktop\do an oto_FE\components\ui\sidebar.tsx'
content = codecs.open(filepath, 'r', 'utf-8').read()

# Change collapsed width from 80px to 90px
content = content.replace('animate={{\n        width: animate ? (open ? "300px" : "80px") : "300px",\n      }}', 'animate={{\n        width: animate ? (open ? "300px" : "90px") : "300px",\n      }}')

codecs.open(filepath, 'w', 'utf-8').write(content)
print('Fixed sidebar width')
