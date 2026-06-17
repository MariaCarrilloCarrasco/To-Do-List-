document.addEventListener('DOMContentLoaded', () => {
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

  // Font size scaling logic
  const btnReset = document.getElementById('font-size-reset-btn');
  const btnLarge = document.getElementById('font-size-btn');
  const btnLarger = document.getElementById('font-size-larger-btn');

  const applyFontSize = (size) => {
    document.documentElement.style.fontSize = size;
    document.documentElement.style.setProperty('--root-font-size', size);
    localStorage.setItem('app-font-size', size);
  };

  if (btnReset) {
    btnReset.addEventListener('click', () => applyFontSize('16px'));
  }
  if (btnLarge) {
    btnLarge.addEventListener('click', () => applyFontSize('20px'));
  }
  if (btnLarger) {
    btnLarger.addEventListener('click', () => applyFontSize('24px'));
  }

  // Restore saved font size on load
  const savedFontSize = localStorage.getItem('app-font-size');
  if (savedFontSize) {
    applyFontSize(savedFontSize);
  }
});
