import os

html_path = 'd:/kannumon/index.html'
css_path = 'd:/kannumon/my-app/app/globals.css'

with open(html_path, 'r', encoding='utf-8') as f:
    content = f.read()

start_idx = content.find('<style>') + len('<style>')
end_idx = content.find('</style>')

css_content = content[start_idx:end_idx].strip()

new_css = '@import "tailwindcss";\n\n' + css_content

with open(css_path, 'w', encoding='utf-8') as f:
    f.write(new_css)
