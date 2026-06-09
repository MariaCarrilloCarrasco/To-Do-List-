 document.addEventListener('DOMContentLoaded', () => {
        const btn = document.getElementById('toggle-instructions-btn');
        const section = document.querySelector('.board-intro');
        if (!btn || !section) return;

        // Restore previous state
        const hidden = localStorage.getItem('instructions-hidden') === 'true';
        if (hidden) {
          section.style.display = 'none';
          btn.textContent = '❓';
          btn.title = 'Mostrar instrucciones';
          btn.style.opacity = '0.5';
        }

        btn.addEventListener('click', () => {
          const lang = localStorage.getItem('app-language') || 'es';
          const titleShow = lang === 'en' ? 'Show instructions' : 'Mostrar instrucciones';
          const titleHide = lang === 'en' ? 'Hide instructions' : 'Ocultar instrucciones';

          const isVisible = section.style.display !== 'none';
          if (isVisible) {
            // Hide with smooth fade
            section.style.transition = 'opacity 0.3s ease, max-height 0.3s ease';
            section.style.opacity = '0';
            setTimeout(() => {
              section.style.display = 'none';
              section.style.opacity = '';
            }, 300);
            btn.title = titleShow;
            btn.style.opacity = '0.5';
            localStorage.setItem('instructions-hidden', 'true');
          } else {
            // Show with smooth fade
            section.style.display = '';
            section.style.opacity = '0';
            section.style.transition = 'opacity 0.3s ease';
            setTimeout(() => { section.style.opacity = '1'; }, 10);
            setTimeout(() => { section.style.transition = ''; section.style.opacity = ''; }, 320);
            btn.title = titleHide;
            btn.style.opacity = '1';
            localStorage.setItem('instructions-hidden', 'false');
          }
        });
        
        // Initialize tooltip based on language
        const lang = localStorage.getItem('app-language') || 'es';
        if (localStorage.getItem('instructions-hidden') === 'true') {
            btn.title = lang === 'en' ? 'Show instructions' : 'Mostrar instrucciones';
        } else {
            btn.title = lang === 'en' ? 'Hide instructions' : 'Ocultar instrucciones';
        }

        const fontSizeResetBtn = document.getElementById('font-size-reset-btn');
        const fontSizeBtn = document.getElementById('font-size-btn');
        const fontSizeLargerBtn = document.getElementById('font-size-larger-btn');
        const fontSizes = [16, 18, 20, 22, 24, 26, 28];
        const currentFontSize = parseInt(localStorage.getItem('app-font-size') || '16', 10);

        const updateFontSize = (size) => {
          document.documentElement.style.setProperty('--root-font-size', `${size}px`);
          localStorage.setItem('app-font-size', size);
          if (fontSizeBtn) {
            fontSizeBtn.title = `Aumentar tamaño desde ${size}px`;
          }
          if (fontSizeLargerBtn) {
            fontSizeLargerBtn.title = `Hacer la letra aún más grande (actual ${size}px)`;
          }
          if (fontSizeResetBtn) {
            fontSizeResetBtn.title = `Restaurar tamaño original (16px)`;
          }
        };

        const nextSize = () => {
          const activeSize = parseInt(localStorage.getItem('app-font-size') || '16', 10);
          const currentIndex = fontSizes.indexOf(activeSize);
          const nextIndex = currentIndex === -1 || currentIndex === fontSizes.length - 1 ? 0 : currentIndex + 1;
          return fontSizes[nextIndex];
        };

        const nextLargerSize = () => {
          const activeSize = parseInt(localStorage.getItem('app-font-size') || '16', 10);
          const currentIndex = fontSizes.indexOf(activeSize);
          const nextIndex = currentIndex === -1 ? 0 : Math.min(currentIndex + 2, fontSizes.length - 1);
          return fontSizes[nextIndex];
        };

        if (fontSizeBtn) {
          fontSizeBtn.addEventListener('click', () => {
            updateFontSize(nextSize());
          });
        }

        if (fontSizeLargerBtn) {
          fontSizeLargerBtn.addEventListener('click', () => {
            updateFontSize(nextLargerSize());
          });
        }

        if (fontSizeResetBtn) {
          fontSizeResetBtn.addEventListener('click', () => {
            updateFontSize(16);
          });
        }

        updateFontSize(currentFontSize);
      });