import codecs

home_path = r'c:\Users\Hieu\Desktop\do an oto_FE\components\tabs\HomeTab.tsx'
content = codecs.open(home_path, 'r', 'utf-8').read()

# Mission inner
content = content.replace(
    '<div className="relative z-10 mx-auto max-w-7xl">',
    '<ScrollReveal className="relative z-10 mx-auto max-w-7xl">'
).replace(
    '          </div>\n        </div>\n      </section>',
    '          </div>\n        </ScrollReveal>\n      </section>'
)

# Technology inner
content = content.replace(
    '<div className="mx-auto max-w-7xl">\n          <div className="mb-20 text-center">',
    '<ScrollReveal className="mx-auto max-w-7xl">\n          <div className="mb-20 text-center">'
)

# Data inner
content = content.replace(
    '<div className="mx-auto max-w-7xl">\n          <div className="grid grid-cols-2 divide-x divide-y border border-slate-800 md:grid-cols-4 md:divide-y-0 text-[#00f2fe]">',
    '<ScrollReveal className="mx-auto max-w-7xl">\n          <div className="grid grid-cols-2 divide-x divide-y border border-slate-800 md:grid-cols-4 md:divide-y-0 text-[#00f2fe]">'
)

# Explore inner
content = content.replace(
    '<div className="relative z-10 mx-auto max-w-4xl text-center">',
    '<ScrollReveal className="relative z-10 mx-auto max-w-4xl text-center">'
).replace(
    '          </div>\n      </section>',
    '          </ScrollReveal>\n      </section>'
)

codecs.open(home_path, 'w', 'utf-8').write(content)
print("Updated ScrollReveal")
