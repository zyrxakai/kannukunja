import re

# 1. Update page.tsx
page_path = 'd:/kannumon/my-app/app/page.tsx'
with open(page_path, 'r', encoding='utf-8') as f:
    page = f.read()

# Change audio source
page = page.replace('src="/assets/audio/dude-bgm.mp3"', 'src="/assets/audio/voice-bgm.mp3"')
# Trigger audio directly on button click
page = page.replace("onNext={() => goToScreen('journey')}", "onNext={() => { playStoryBgm(); goToScreen('journey'); }}")
with open(page_path, 'w', encoding='utf-8') as f:
    f.write(page)

# 2. Update JourneyScreen.tsx
journey_path = 'd:/kannumon/my-app/app/components/JourneyScreen.tsx'
with open(journey_path, 'r', encoding='utf-8') as f:
    journey = f.read()

# Remove playStoryBgm() from the timeout inside JourneyScreen
journey = journey.replace('playStoryBgm();', '// playStoryBgm() triggered earlier')

# Move the Next button to the bottom
# Remove nav-next from screen-top-nav
journey = re.sub(r'<button className="nav-next" onClick=\{[^}]+\}>Story →</button>', '', journey)

# Insert the bottom bar just before the closing </div> of journey-scroll
bottom_bar = """
          <div className="j-bottom-bar">
            <button className="nav-btn" onClick={() => { pauseStoryBgm(); onNext(); }} style={{ animation: 'none', opacity: 1, margin: 0 }}>Continue to Story →</button>
          </div>
"""
journey = journey.replace('</div>\n      </div>\n    </div>', f'{bottom_bar}</div>\n      </div>\n    </div>')

with open(journey_path, 'w', encoding='utf-8') as f:
    f.write(journey)

# 3. Update globals.css
css_path = 'd:/kannumon/my-app/app/globals.css'
with open(css_path, 'r', encoding='utf-8') as f:
    css = f.read()

# Change aspect-ratio to 4/3
css = css.replace('aspect-ratio: 3 / 4;', 'aspect-ratio: 4 / 3;')
css = css.replace('aspect-ratio: 3/4;', 'aspect-ratio: 4 / 3;')

# Change j-bottom-bar background to match pastel theme
css = re.sub(r'background:\s*rgba\(7,\s*7,\s*15,\s*0\.85\);', 'background: rgba(255, 255, 255, 0.65); border-top: 1px solid rgba(255,255,255,0.8);', css)

with open(css_path, 'w', encoding='utf-8') as f:
    f.write(css)

print("Fixes applied.")
