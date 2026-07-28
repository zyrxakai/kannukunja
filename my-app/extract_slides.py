import re
import json

html_path = 'd:/kannumon/index.html'
out_path = 'd:/kannumon/my-app/app/components/slidesData.ts'

with open(html_path, 'r', encoding='utf-8') as f:
    content = f.read()

# find all jslide blocks
slides = []
blocks = re.findall(r'<div class="jslide".*?>(.*?)</div>\s*</div>\s*(?=<div class="jslide"|</div)', content, re.DOTALL)

for i, b in enumerate(blocks):
    img_match = re.search(r'src="(.*?)"', b)
    if not img_match: continue
    src = img_match.group(1)
    
    title_match = re.search(r'<div class="jslide-title">(.*?)</div>', b)
    title = title_match.group(1) if title_match else ""
    
    text_match = re.search(r'<div class="jslide-text">(.*?)</div>', b)
    text = text_match.group(1) if text_match else ""
    
    slides.append({
        "id": i + 1,
        "src": src,
        "title": title,
        "text": text,
        "type": "video" if src.upper().endswith(".MOV") or src.upper().endswith(".MP4") else "image"
    })

# Write to typescript file
ts_content = f"export const slidesData = {json.dumps(slides, indent=2)};"

with open(out_path, 'w', encoding='utf-8') as f:
    f.write(ts_content)
