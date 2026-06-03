// Helper to compute luminance for smart card adjustments
function getLuminance(hex) {
  let color = hex.replace('#', '');
  if (color.length === 3) {
    color = color[0] + color[0] + color[1] + color[1] + color[2] + color[2];
  }
  const r = parseInt(color.substr(0, 2), 16) / 255;
  const g = parseInt(color.substr(2, 2), 16) / 255;
  const b = parseInt(color.substr(4, 2), 16) / 255;
  
  const a = [r, g, b].map(v => {
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

// Applies custom theme colors to the page using a dynamic style block
function applyTheme(bgColor, textColor) {
  let styleEl = document.getElementById('custom-theme-styles');
  if (!styleEl) {
    styleEl = document.createElement('style');
    styleEl.id = 'custom-theme-styles';
    document.head.appendChild(styleEl);
  }

  if (!bgColor || !textColor) {
    styleEl.textContent = '';
    return;
  }

  const luminance = getLuminance(bgColor);
  const isDark = luminance < 0.5;

  const cardBg = isDark ? 'rgba(255, 255, 255, 0.07)' : 'rgba(255, 255, 255, 0.85)';
  const cardBorder = isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.06)';
  const cardShadow = isDark ? '0 10px 30px rgba(0, 0, 0, 0.35)' : '0 10px 24px rgba(15, 23, 42, 0.05)';
  
  styleEl.textContent = `
    body {
      background: ${bgColor} !important;
      color: ${textColor} !important;
    }
    h1:not(.theme-panel *), h2:not(.theme-panel *), h3:not(.theme-panel *), h4:not(.theme-panel *), h5:not(.theme-panel *), h6:not(.theme-panel *), p:not(.theme-panel *), li:not(.theme-panel *), span:not(.theme-panel *):not(.social-btn *), summary:not(.theme-panel *), label:not(.theme-panel *) {
      color: ${textColor} !important;
    }
    main a:not(.nav-btn), .detalles a, .board-intro a {
      color: ${isDark ? '#60a5fa' : '#2563eb'} !important;
    }
    .column, .board-intro, .ambitos, .detalles, nav {
      background: ${cardBg} !important;
      color: ${textColor} !important;
      border: 1px solid ${cardBorder} !important;
      box-shadow: ${cardShadow} !important;
    }
    .ambitos details, .detalles details {
      background: ${isDark ? 'rgba(255, 255, 255, 0.03)' : '#fafbff'} !important;
      border: 1px solid ${cardBorder} !important;
    }
    .ambitos details[open], .detalles details[open] {
      background: ${cardBg} !important;
    }
    .brand-name:not(.theme-panel *) {
      color: ${textColor} !important;
    }
    .column li {
      border-bottom: 1px solid ${cardBorder} !important;
    }
  `;
}

// Early theme application to avoid screen flash
(function() {
  const savedBg = localStorage.getItem('theme-bg-color');
  const savedText = localStorage.getItem('theme-text-color');
  if (savedBg && savedText) {
    const runEarly = () => {
      const parent = document.head || document.documentElement;
      if (parent) {
        applyTheme(savedBg, savedText);
      } else {
        setTimeout(runEarly, 0);
      }
    };
    runEarly();
  }
})();

// DOM Injections and logic when page loads
document.addEventListener('DOMContentLoaded', () => {
  const themeControlCss = document.createElement('style');
  themeControlCss.textContent = `
    .theme-trigger-btn {
      position: fixed;
      bottom: 24px;
      right: 24px;
      width: 56px;
      height: 56px;
      border-radius: 50%;
      background: linear-gradient(135deg, #6366f1, #06b6d4);
      color: #ffffff;
      border: none;
      box-shadow: 0 10px 25px rgba(99, 102, 241, 0.4);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
      z-index: 9999;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .theme-trigger-btn:hover {
      transform: scale(1.1) rotate(15deg);
      box-shadow: 0 15px 30px rgba(99, 102, 241, 0.5);
    }
    
    .theme-trigger-btn:active {
      transform: scale(0.95);
    }
    
    .theme-panel {
      position: fixed;
      bottom: 96px;
      right: 24px;
      width: 320px;
      background: rgba(255, 255, 255, 0.85);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid rgba(255, 255, 255, 0.3);
      border-radius: 20px;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
      z-index: 9998;
      padding: 20px;
      transform: scale(0.9) translateY(20px);
      opacity: 0;
      pointer-events: none;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      color: #1e293b;
    }
    
    .theme-panel.active {
      transform: scale(1) translateY(0);
      opacity: 1;
      pointer-events: auto;
    }
    
    .theme-panel.dark-theme-panel {
      background: rgba(15, 23, 42, 0.9);
      border: 1px solid rgba(255, 255, 255, 0.1);
      color: #f1f5f9;
    }
    
    .theme-panel h3 {
      margin-top: 0;
      margin-bottom: 15px;
      font-size: 1.1rem;
      font-weight: 700;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      padding-bottom: 8px;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    
    .theme-panel.dark-theme-panel h3 {
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      color: #f1f5f9;
    }
    
    .preset-container {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 8px;
      margin-bottom: 18px;
    }
    
    .preset-btn {
      padding: 8px 10px;
      border-radius: 8px;
      border: 1px solid rgba(0, 0, 0, 0.1);
      background: #f8fafc;
      color: #334155;
      font-size: 0.85rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
    }
    
    .theme-panel.dark-theme-panel .preset-btn {
      background: #1e293b;
      color: #cbd5e1;
      border: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    .preset-btn:hover {
      background: #e2e8f0;
      transform: translateY(-1px);
    }
    
    .theme-panel.dark-theme-panel .preset-btn:hover {
      background: #334155;
    }
    
    .preset-btn.active {
      border-color: #4f46e5;
      background: #eff6ff;
      color: #1e40af;
      box-shadow: 0 0 0 2px rgba(79, 70, 229, 0.2);
    }
    
    .theme-panel.dark-theme-panel .preset-btn.active {
      border-color: #6366f1;
      background: rgba(99, 102, 241, 0.15);
      color: #e0e7ff;
    }
    
    .preset-preview-colors {
      display: flex;
      gap: 4px;
      margin-top: 2px;
    }
    
    .preview-dot {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      border: 1px solid rgba(0,0,0,0.1);
    }
    
    .custom-pickers {
      display: flex;
      flex-direction: column;
      gap: 12px;
      margin-bottom: 18px;
      padding-top: 12px;
      border-top: 1px solid rgba(0, 0, 0, 0.08);
    }
    
    .theme-panel.dark-theme-panel .custom-pickers {
      border-top: 1px solid rgba(255, 255, 255, 0.08);
    }
    
    .picker-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    
    .picker-row label {
      font-size: 0.9rem;
      font-weight: 500;
      display: flex;
      align-items: center;
      gap: 6px;
      color: inherit;
    }
    
    .color-input-wrapper {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    
    .color-input-wrapper input[type="color"] {
      -webkit-appearance: none;
      border: none;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      cursor: pointer;
      background: none;
    }
    
    .color-input-wrapper input[type="color"]::-webkit-color-swatch-wrapper {
      padding: 0;
    }
    
    .color-input-wrapper input[type="color"]::-webkit-color-swatch {
      border: 2px solid rgba(0,0,0,0.15);
      border-radius: 50%;
    }
    
    .color-hex {
      font-family: monospace;
      font-size: 0.8rem;
      color: #64748b;
    }
    
    .theme-panel.dark-theme-panel .color-hex {
      color: #94a3b8;
    }
    
    .reset-theme-btn {
      width: 100%;
      padding: 10px;
      border-radius: 8px;
      border: none;
      background: #ef4444;
      color: #ffffff;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      font-size: 0.9rem;
    }
    
    .reset-theme-btn:hover {
      background: #dc2626;
      box-shadow: 0 4px 12px rgba(239, 68, 68, 0.2);
    }
    
    /* Injected Ambitos button styles to ensure they always load in color */
    .ambitos-buttons button {
      border: none !important;
      padding: 0.7rem 1.25rem !important;
      border-radius: 999px !important;
      cursor: pointer !important;
      font-weight: 600 !important;
      color: #ffffff !important;
      opacity: 0.8 !important;
      transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1) !important;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03) !important;
    }
    
    .ambitos-buttons button:hover,
    .ambitos-buttons button.active {
      opacity: 1 !important;
      transform: translateY(-2px) !important;
      box-shadow: 0 8px 16px -4px rgba(0, 0, 0, 0.15), 0 4px 8px -2px rgba(0, 0, 0, 0.08) !important;
    }
    
    .ambitos-buttons button:active {
      transform: translateY(0) !important;
    }
    
    .ambitos-buttons button[data-ambito="familia"] {
      background: linear-gradient(135deg, #ec4899, #db2777) !important;
    }
    .ambitos-buttons button[data-ambito="personal"] {
      background: linear-gradient(135deg, #6366f1, #4f46e5) !important;
    }
    .ambitos-buttons button[data-ambito="social"] {
      background: linear-gradient(135deg, #3b82f6, #1d4ed8) !important;
    }
    .ambitos-buttons button[data-ambito="laboral"] {
      background: linear-gradient(135deg, #f59e0b, #d97706) !important;
    }
    .ambitos-buttons button[data-ambito="ocio"] {
      background: linear-gradient(135deg, #8b5cf6, #7c3aed) !important;
    }
    .ambitos-buttons button[data-ambito="salud"] {
      background: linear-gradient(135deg, #10b981, #059669) !important;
    }
    .ambitos-buttons button[data-ambito="hogar"] {
      background: linear-gradient(135deg, #06b6d4, #0891b2) !important;
    }
    .ambitos-buttons button[data-ambito="finanzas"] {
      background: linear-gradient(135deg, #14b8a6, #0d9488) !important;
    }
  `;
  document.head.appendChild(themeControlCss);
  
  const body = document.body;
  
  const triggerBtn = document.createElement('button');
  triggerBtn.className = 'theme-trigger-btn';
  triggerBtn.setAttribute('aria-label', 'Personalizar colores');
  triggerBtn.innerHTML = '🎨';
  body.appendChild(triggerBtn);
  
  const panel = document.createElement('div');
  panel.className = 'theme-panel';
  panel.innerHTML = `
    <h3>🎨 Colores de la página</h3>
    
    <div class="preset-container">
      <button class="preset-btn active" data-preset="default">
        <span>Defecto</span>
        <div class="preset-preview-colors">
          <div class="preview-dot" style="background: #f2f6fb;"></div>
          <div class="preview-dot" style="background: #1f2937;"></div>
        </div>
      </button>
      
      <button class="preset-btn" data-preset="light-soft">
        <span>Claro Suave</span>
        <div class="preset-preview-colors">
          <div class="preview-dot" style="background: #fafbff;"></div>
          <div class="preview-dot" style="background: #334155;"></div>
        </div>
      </button>
      
      <button class="preset-btn" data-preset="dark">
        <span>Modo Oscuro</span>
        <div class="preset-preview-colors">
          <div class="preview-dot" style="background: #0f172a;"></div>
          <div class="preview-dot" style="background: #f8fafc;"></div>
        </div>
      </button>
      
      <button class="preset-btn" data-preset="sepia">
        <span>Sepia</span>
        <div class="preset-preview-colors">
          <div class="preview-dot" style="background: #fdf6e3;"></div>
          <div class="preview-dot" style="background: #5c4033;"></div>
        </div>
      </button>
      
      <button class="preset-btn" data-preset="high-contrast" style="grid-column: span 2;">
        <span>Alto Contraste</span>
        <div class="preset-preview-colors">
          <div class="preview-dot" style="background: #000000;"></div>
          <div class="preview-dot" style="background: #ffff00;"></div>
        </div>
      </button>
    </div>
    
    <div class="custom-pickers">
      <div class="picker-row">
        <label>🖼️ Fondo:</label>
        <div class="color-input-wrapper">
          <span class="color-hex" id="bg-hex">#F2F6FB</span>
          <input type="color" id="bg-color-picker" value="#f2f6fb">
        </div>
      </div>
      
      <div class="picker-row">
        <label>✍️ Letras:</label>
        <div class="color-input-wrapper">
          <span class="color-hex" id="text-hex">#1F2937</span>
          <input type="color" id="text-color-picker" value="#1f2937">
        </div>
      </div>
    </div>
    
    <button class="reset-theme-btn" id="reset-theme">
      🔄 Restablecer original
    </button>
  `;
  body.appendChild(panel);
  
  const bgPicker = document.getElementById('bg-color-picker');
  const textPicker = document.getElementById('text-color-picker');
  const bgHex = document.getElementById('bg-hex');
  const textHex = document.getElementById('text-hex');
  const resetBtn = document.getElementById('reset-theme');
  const presetBtns = panel.querySelectorAll('.preset-btn');
  
  triggerBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    panel.classList.toggle('active');
  });
  
  document.addEventListener('click', (e) => {
    if (!panel.contains(e.target) && e.target !== triggerBtn) {
      panel.classList.remove('active');
    }
  });
  
  const presets = {
    'default': { bg: '#f2f6fb', text: '#1f2937' },
    'light-soft': { bg: '#fafbff', text: '#334155' },
    'dark': { bg: '#0f172a', text: '#f8fafc' },
    'sepia': { bg: '#fdf6e3', text: '#5c4033' },
    'high-contrast': { bg: '#000000', text: '#ffff00' }
  };
  
  const updateControlsUI = (bg, text) => {
    bgPicker.value = bg;
    textPicker.value = text;
    bgHex.textContent = bg.toUpperCase();
    textHex.textContent = text.toUpperCase();
    
    const isDarkBg = getLuminance(bg) < 0.5;
    if (isDarkBg) {
      panel.classList.add('dark-theme-panel');
    } else {
      panel.classList.remove('dark-theme-panel');
    }
  };
  
  const initialBg = localStorage.getItem('theme-bg-color') || '#f2f6fb';
  const initialText = localStorage.getItem('theme-text-color') || '#1f2937';
  
  updateControlsUI(initialBg, initialText);
  
  let matchedPreset = 'custom';
  for (const [key, value] of Object.entries(presets)) {
    if (value.bg.toLowerCase() === initialBg.toLowerCase() && value.text.toLowerCase() === initialText.toLowerCase()) {
      matchedPreset = key;
      break;
    }
  }
  
  presetBtns.forEach(btn => {
    if (btn.dataset.preset === matchedPreset) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
  
  presetBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      presetBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      const presetKey = btn.dataset.preset;
      const theme = presets[presetKey];
      
      if (presetKey === 'default') {
        localStorage.removeItem('theme-bg-color');
        localStorage.removeItem('theme-text-color');
        applyTheme('', '');
        updateControlsUI('#f2f6fb', '#1f2937');
      } else {
        localStorage.setItem('theme-bg-color', theme.bg);
        localStorage.setItem('theme-text-color', theme.text);
        applyTheme(theme.bg, theme.text);
        updateControlsUI(theme.bg, theme.text);
      }
    });
  });
  
  const handleCustomColorChange = () => {
    presetBtns.forEach(b => b.classList.remove('active'));
    
    const bgVal = bgPicker.value;
    const textVal = textPicker.value;
    
    bgHex.textContent = bgVal.toUpperCase();
    textHex.textContent = textVal.toUpperCase();
    
    localStorage.setItem('theme-bg-color', bgVal);
    localStorage.setItem('theme-text-color', textVal);
    applyTheme(bgVal, textVal);
    
    const isDarkBg = getLuminance(bgVal) < 0.5;
    if (isDarkBg) {
      panel.classList.add('dark-theme-panel');
    } else {
      panel.classList.remove('dark-theme-panel');
    }
  };
  
  bgPicker.addEventListener('input', handleCustomColorChange);
  textPicker.addEventListener('input', handleCustomColorChange);
  
  resetBtn.addEventListener('click', () => {
    presetBtns.forEach(b => b.classList.remove('active'));
    panel.querySelector('[data-preset="default"]').classList.add('active');
    
    localStorage.removeItem('theme-bg-color');
    localStorage.removeItem('theme-text-color');
    applyTheme('', '');
    updateControlsUI('#f2f6fb', '#1f2937');
  });

  // Full-screen Logo Modal viewer
  const logos = document.querySelectorAll('.logo');
  logos.forEach(logo => {
    logo.style.cursor = 'zoom-in';
    logo.style.transition = 'transform 0.2s ease';
    
    logo.addEventListener('mouseenter', () => {
      logo.style.transform = 'scale(1.08)';
    });
    logo.addEventListener('mouseleave', () => {
      logo.style.transform = 'scale(1)';
    });
    
    logo.addEventListener('click', () => {
      const overlay = document.createElement('div');
      overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(15, 23, 42, 0.95);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        z-index: 999999;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        cursor: zoom-out;
        opacity: 0;
        transition: opacity 0.3s ease;
      `;
      
      const img = document.createElement('img');
      img.src = logo.src;
      img.alt = logo.alt;
      img.style.cssText = `
        max-width: 90vw;
        max-height: 80vh;
        border-radius: 20px;
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        transform: scale(0.9);
        transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        border: 4px solid rgba(255, 255, 255, 0.1);
      `;
      
      const closeTip = document.createElement('div');
      closeTip.textContent = 'Presiona cualquier lugar o ESC para cerrar';
      closeTip.style.cssText = `
        color: rgba(255, 255, 255, 0.6);
        margin-top: 20px;
        font-family: system-ui, -apple-system, sans-serif;
        font-size: 0.9rem;
        font-weight: 500;
        background: rgba(255, 255, 255, 0.1);
        padding: 8px 16px;
        border-radius: 999px;
      `;
      
      overlay.appendChild(img);
      overlay.appendChild(closeTip);
      document.body.appendChild(overlay);
      
      setTimeout(() => {
        overlay.style.opacity = '1';
        img.style.transform = 'scale(1)';
      }, 10);
      
      const closeOverlay = () => {
        overlay.style.opacity = '0';
        img.style.transform = 'scale(0.9)';
        setTimeout(() => {
          overlay.remove();
        }, 300);
      };
      
      overlay.addEventListener('click', closeOverlay);
      
      const handleEsc = (e) => {
        if (e.key === 'Escape') {
          closeOverlay();
          document.removeEventListener('keydown', handleEsc);
        }
      };
      document.addEventListener('keydown', handleEsc);
    });
  });
});
