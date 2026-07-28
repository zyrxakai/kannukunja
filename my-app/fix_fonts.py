import re

css_path = 'd:/kannumon/my-app/app/globals.css'

with open(css_path, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace("font-family:'Inter',sans-serif", "font-family:var(--font-inter),sans-serif")
content = content.replace("font-family:'Playfair Display',serif", "font-family:var(--font-playfair),serif")

with open(css_path, 'w', encoding='utf-8') as f:
    f.write(content)
