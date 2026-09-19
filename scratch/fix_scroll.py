import codecs

file_path = 'app/page.tsx'

with codecs.open(file_path, 'r', 'utf-8') as f:
    content = f.read()

target = "const [activeTab, setActiveTab] = useState(\"home\");"

injection = """  const [activeTab, setActiveTab] = useState("home"); 

  // Cuộn lên đầu trang mỗi khi chuyển tab
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeTab]);"""

if target in content:
    content = content.replace(target, injection)
    with codecs.open(file_path, 'w', 'utf-8') as f:
        f.write(content)
    print("Added scroll-to-top effect on tab change!")
else:
    print("Could not find the target string.")
