# -*- coding: utf-8 -*-
import sys

with open('components/ui/orbit-delivery-hero.tsx', 'r', encoding='utf-8') as f:
    text = f.read()

start_idx = text.find('return <div className={`page ${prototype ? "prototype" : ""}`}>')
if start_idx == -1:
    print("Cannot find return statement!")
    sys.exit(1)

visual_col_idx = text.find('<div className="visual-column">', start_idx)
planet_caption_idx = text.find('<div className={`planet-caption', visual_col_idx)

# Find the start of the <div ref={interaction} ... inside visual-column
div_interaction_idx = text.find('<div', visual_col_idx + 1)
visual_col_code = text[div_interaction_idx:planet_caption_idx].strip()

cloud_bank_idx = text.find('<div className="cloud-bank"', planet_caption_idx)
end_section_idx = text.find('</section></main>', cloud_bank_idx)
cloud_bank_code = text[cloud_bank_idx:end_section_idx].strip()

new_return = f'''return <div className={{`page ${{prototype ? "prototype" : ""}}`}} style={{{{ overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", height: "100%", width: "100%" }}}}>
      <main style={{{{ width: "100%", height: "100%" }}}}>
        <section className="hero" style={{{{ width: "100%", height: "100%", margin: 0, padding: 0, display: "flex", flexDirection: "column" }}}}>
          <div className="visual-column" style={{{{ width: "100%", height: "100%", position: "relative", right: "auto", left: "auto", top: 0, margin: 0 }}}}>
            {visual_col_code}
          {cloud_bank_code}
        </section>
      </main>
    </div>;'''

story_dialog_idx = text.find('function StoryDialog')
end_of_return = text.rfind('</div>;', start_idx, story_dialog_idx) + 7

text = text[:start_idx] + new_return + text[end_of_return:]

with open('components/ui/orbit-delivery-hero.tsx', 'w', encoding='utf-8') as f:
    f.write(text)

print("Replaced!")
