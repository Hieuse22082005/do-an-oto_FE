import codecs

file_path = r"c:\Users\Hieu\Desktop\do an oto_FE\components\tabs\AdminTab.tsx"
with codecs.open(file_path, "r", "utf-8") as f:
    content = f.read()

target = 'className="relative z-10 w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pt-4"'
replacement = 'className="relative z-10 w-full mx-auto px-2 sm:px-4 lg:px-6 pt-4"'

if target in content:
    content = content.replace(target, replacement)
    with codecs.open(file_path, "w", "utf-8") as f:
        f.write(content)
    print("AdminTab width expanded successfully!")
else:
    print("Target not found!")
