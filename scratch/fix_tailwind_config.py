import codecs

file_path = r"c:\Users\Hieu\Desktop\do an oto_FE\tailwind.config.ts"
with codecs.open(file_path, "r", "utf-8") as f:
    content = f.read()

content = content.replace(
    "darkMode: ['class', '[data-theme=\"dark\"], [data-theme=\"mystic\"]'],",
    "darkMode: ['class', ':is([data-theme=\"dark\"], [data-theme=\"mystic\"])'],"
)

with codecs.open(file_path, "w", "utf-8") as f:
    f.write(content)
