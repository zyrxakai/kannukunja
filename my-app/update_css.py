import re

css_path = 'd:/kannumon/my-app/app/globals.css'

with open(css_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace variables
new_vars = """
:root{
  --bg: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
  --surf: rgba(255, 255, 255, 0.6);
  --border: rgba(255, 255, 255, 0.8);
  --gold: #ff758c;
  --gold-soft: rgba(255, 117, 140, 0.15);
  --rose: #f78ca0;
  --rose-soft: rgba(247, 140, 160, 0.15);
  --purple: #a18cd1;
  --purple-soft: rgba(161, 140, 209, 0.15);
  --text: #2d3748;
  --muted: rgba(45, 55, 72, 0.65);
  --dim: rgba(45, 55, 72, 0.4);
}
"""
content = re.sub(r':root\s*\{[^}]*\}', new_vars.strip(), content)

# Change .screen padding to handle safe-area
screen_css = """
.screen{
  position:fixed;inset:0;
  display:flex;flex-direction:column;
  align-items:center;justify-content:flex-start;
  opacity:0;pointer-events:none;
  transition:opacity .5s ease;
  z-index:10;overflow-y:auto;overflow-x:hidden;
  -webkit-overflow-scrolling:touch;
  padding:20px 15px calc(60px + env(safe-area-inset-bottom, 20px));
  height:100%;height:100dvh;
}
"""
content = re.sub(r'\.screen\s*\{[^}]*\}', screen_css.strip(), content)

# Change .nav-btn box shadow and margin for better mobile view
nav_btn_css = """
.nav-btn{
  display:inline-flex;align-items:center;gap:8px;
  background:linear-gradient(135deg, #ff9a9e, #fecfef);
  border:2px solid #fff;border-radius:100px;padding:14px 32px;
  font-size:16px;font-weight:700;color:#fff;cursor:pointer;
  font-family:var(--font-inter),sans-serif;
  box-shadow:0 6px 20px rgba(255,154,158,.4);
  margin-top:10px;
  opacity:0;animation:fadeUp .6s ease 3.2s forwards;
  transition:transform .2s, box-shadow .2s;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.1);
}
"""
content = re.sub(r'\.nav-btn\s*\{[^}]*\}', nav_btn_css.strip(), content)

# Update nav-back and nav-next buttons to match the pastel theme
nav_back_next_css = """
.nav-back {
  background: rgba(255,255,255,0.7); border: 2px solid #fff;
  color: #2d3748; font-weight: 700; backdrop-filter: blur(8px);
  box-shadow: 0 4px 10px rgba(0,0,0,0.05);
}
.nav-back:active { transform: scale(0.95); background: rgba(255,255,255,0.9); }
.nav-next {
  background: linear-gradient(135deg, #ff9a9e, #fecfef);
  border: 2px solid #fff; color: #fff;
  box-shadow: 0 4px 16px rgba(255,154,158,.3);
  text-shadow: 1px 1px 2px rgba(0,0,0,0.1);
}
"""
content = re.sub(r'\.nav-back\s*\{[^}]*\}\s*\.nav-back:active\s*\{[^}]*\}\s*\.nav-next\s*\{[^}]*\}', nav_back_next_css.strip(), content)

with open(css_path, 'w', encoding='utf-8') as f:
    f.write(content)
