import os

html_path = 'd:/kannumon/index.html'

with open(html_path, 'r', encoding='utf-8') as f:
    content = f.read()

def save_section(id_name, filename):
    start_tag = f'<div id="{id_name}"'
    start_idx = content.find(start_tag)
    if start_idx == -1: return
    
    # find the matching closing div
    open_divs = 0
    end_idx = start_idx
    i = start_idx
    while i < len(content):
        if content[i:i+4] == '<div':
            open_divs += 1
            i += 4
        elif content[i:i+6] == '</div>':
            open_divs -= 1
            if open_divs == 0:
                end_idx = i + 6
                break
            i += 6
        else:
            i += 1
            
    section_content = content[start_idx:end_idx]
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(section_content)

save_section('story', 'd:/kannumon/my-app/app/components/story.html')
save_section('letter', 'd:/kannumon/my-app/app/components/letter.html')
save_section('austria', 'd:/kannumon/my-app/app/components/austria.html')
save_section('memories', 'd:/kannumon/my-app/app/components/memories.html')
save_section('final', 'd:/kannumon/my-app/app/components/final.html')
save_section('voice-screen', 'd:/kannumon/my-app/app/components/voice-screen.html')
