import codecs

home_path = r'c:\Users\Hieu\Desktop\do an oto_FE\components\tabs\HomeTab.tsx'
content = codecs.open(home_path, 'r', 'utf-8').read()

# Change video back to absolute
content = content.replace('<video autoPlay loop muted playsInline className="fixed inset-0 z-[-1] h-screen w-screen object-cover pointer-events-none">', '<video autoPlay loop muted playsInline className="absolute inset-0 z-0 h-full w-full object-cover">')

# Change overlays back to absolute and z-10 (as they were originally)
content = content.replace('<div className="fixed inset-0 z-[-1] bg-gradient-to-b from-[#030712]/50 via-[#030712]/30 to-[#030712]/80 pointer-events-none" />', '<div className="absolute inset-0 z-10 bg-gradient-to-b from-[#030712]/50 via-[#030712]/30 to-[#030712]" />')
content = content.replace('<div className="fixed inset-0 z-[-1] bg-[radial-gradient(circle_at_center,transparent_0%,#030712_100%)] opacity-70 pointer-events-none" />', '<div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_center,transparent_0%,#030712_100%)] opacity-70" />')

codecs.open(home_path, 'w', 'utf-8').write(content)
print('Restored video and overlays to absolute')
