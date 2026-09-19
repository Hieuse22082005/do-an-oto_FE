import codecs

filepath = r'c:\Users\Hieu\Desktop\do an oto_FE\app\layout.tsx'
content = codecs.open(filepath, 'r', 'utf-8').read()

if 'dangerouslySetInnerHTML' not in content:
    content = content.replace(
        '<head>',
        '<head>\n        <script dangerouslySetInnerHTML={{ __html: `try{let t=localStorage.getItem("theme")||"dark";document.documentElement.setAttribute("data-theme",t)}catch(e){}` }} />'
    )
    codecs.open(filepath, 'w', 'utf-8').write(content)
    print('Added FOUC prevention script')
