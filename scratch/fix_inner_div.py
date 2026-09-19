import codecs

file_path = r"c:\Users\Hieu\Desktop\do an oto_FE\components\tabs\FinesTab.tsx"
with codecs.open(file_path, "r", "utf-8") as f:
    content = f.read()

content = content.replace(
    "        {renderRightWidgets()}\n      </div>\n\n      {qrModal && (",
    "        {renderRightWidgets()}\n      </div>\n      </div>\n\n      {qrModal && ("
)

with codecs.open(file_path, "w", "utf-8") as f:
    f.write(content)

print("Fixed the missing div!")
