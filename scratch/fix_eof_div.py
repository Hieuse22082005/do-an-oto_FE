import codecs

file_path = r"c:\Users\Hieu\Desktop\do an oto_FE\components\tabs\FinesTab.tsx"
with codecs.open(file_path, "r", "utf-8") as f:
    content = f.read()

# Fix the unbalanced </div> tags by replacing the end of the file
content = content.replace(
    "      )}\n    </div>\n  );\n}",
    "      )}\n      </div>\n    </div>\n  );\n}"
)

with codecs.open(file_path, "w", "utf-8") as f:
    f.write(content)

print("Fixed closing div!")
