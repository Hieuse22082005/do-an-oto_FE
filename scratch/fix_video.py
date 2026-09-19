import codecs

home_path = r'c:\Users\Hieu\Desktop\do an oto_FE\components\tabs\HomeTab.tsx'
content = codecs.open(home_path, 'r', 'utf-8').read()

# Make video fixed so it spans the entire screen and scrolls with page
content = content.replace('<video autoPlay loop muted playsInline className="absolute inset-0 z-0 h-full w-full object-cover">', '<video autoPlay loop muted playsInline className="fixed inset-0 z-[-1] h-screen w-screen object-cover pointer-events-none">')
content = content.replace('<div className="absolute inset-0 z-10 bg-gradient-to-b from-[#030712]/50 via-[#030712]/30 to-[#030712]" />', '<div className="fixed inset-0 z-[-1] bg-gradient-to-b from-[#030712]/50 via-[#030712]/30 to-[#030712]/80 pointer-events-none" />')
content = content.replace('<div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_center,transparent_0%,#030712_100%)] opacity-70" />', '<div className="fixed inset-0 z-[-1] bg-[radial-gradient(circle_at_center,transparent_0%,#030712_100%)] opacity-70 pointer-events-none" />')

# Make sections semi-transparent
content = content.replace('bg-[#030712]', 'bg-[#030712]/30 backdrop-blur-md')
content = content.replace('bg-[#060a14]', 'bg-[#060a14]/30 backdrop-blur-md')

codecs.open(home_path, 'w', 'utf-8').write(content)
print("Updated video to be fixed and sections to be transparent")
