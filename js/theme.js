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

// Applies custom theme colors by setting CSS Variables on documentElement
function applyTheme(bgColor, textColor) {
  const root = document.documentElement;
  if (!bgColor || !textColor) {
    root.style.removeProperty('--bg-color');
    root.style.removeProperty('--text-color');
    root.style.removeProperty('--card-bg');
    root.style.removeProperty('--card-border');
    root.style.removeProperty('--card-shadow');
    root.style.removeProperty('--link-color');
    return;
  }

  const luminance = getLuminance(bgColor);
  const isDark = luminance < 0.5;

  const cardBg = isDark ? 'rgba(255, 255, 255, 0.07)' : 'rgba(255, 255, 255, 0.85)';
  const cardBorder = isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.06)';
  const cardShadow = isDark ? '0 10px 30px rgba(0, 0, 0, 0.35)' : '0 10px 24px rgba(15, 23, 42, 0.05)';
  const linkColor = isDark ? '#60a5fa' : '#2563eb';

  root.style.setProperty('--bg-color', bgColor);
  root.style.setProperty('--text-color', textColor);
  root.style.setProperty('--card-bg', cardBg);
  root.style.setProperty('--card-border', cardBorder);
  root.style.setProperty('--card-shadow', cardShadow);
  root.style.setProperty('--link-color', linkColor);
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
  // Navigation Links Click Handler
  const navTargets = document.querySelectorAll('nav [reel], nav button[data-target]');
  navTargets.forEach((element) => {
    element.style.cursor = 'pointer';
    element.addEventListener('click', () => {
      const target = element.getAttribute('reel') || element.dataset.target;
      if (target) {
        window.location.href = target;
      }
    });
  });

  // Font Size Scaling Control
  const btnDecrease = document.getElementById('font-size-decrease-btn');
  const btnReset = document.getElementById('font-size-reset-btn');
  const btnLarge = document.getElementById('font-size-btn');
  const btnLarger = document.getElementById('font-size-larger-btn');

  const applyFontSize = (size) => {
    document.documentElement.style.setProperty('font-size', size, 'important');
    document.documentElement.style.setProperty('--root-font-size', size);
    localStorage.setItem('app-font-size', size);
  };

  if (btnDecrease) btnDecrease.addEventListener('click', () => applyFontSize('13px'));
  if (btnReset) btnReset.addEventListener('click', () => applyFontSize('16px'));
  if (btnLarge) btnLarge.addEventListener('click', () => applyFontSize('20px'));
  if (btnLarger) btnLarger.addEventListener('click', () => applyFontSize('24px'));

  const savedFontSize = localStorage.getItem('app-font-size');
  if (savedFontSize) applyFontSize(savedFontSize);

  // Ambitos Smooth Scroll Trigger
  const ambitoButtons = document.querySelectorAll('button[data-ambito]');
  ambitoButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const target = button.dataset.ambito;
      if (target && target !== 'todos') {
        setTimeout(() => {
          const targetSection = document.querySelector(`details[data-ambito-section="${target}"]`);
          if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }, 50);
      }
    });
  });

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
          <div class="preset-preview-colors">
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
    const navThemeBtn = document.getElementById('nav-theme-btn');
  
    const togglePanel = (e) => {
      e.stopPropagation();
      panel.classList.toggle('active');
    };
  
    triggerBtn.addEventListener('click', togglePanel);
    if (navThemeBtn) {
      navThemeBtn.addEventListener('click', togglePanel);
    }
    
    document.addEventListener('click', (e) => {
      const isNavThemeClick = navThemeBtn && navThemeBtn.contains(e.target);
      if (!panel.contains(e.target) && e.target !== triggerBtn && !isNavThemeClick) {
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
