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

  if (btnReset) {
    btnReset.addEventListener('click', () => {
      document.documentElement.style.setProperty('--root-font-size', '16px');
      localStorage.setItem('app-font-size', '16px');
    });
  }
  if (btnLarge) {
    btnLarge.addEventListener('click', () => {
      document.documentElement.style.setProperty('--root-font-size', '20px'); // Aumenta ~25%
      localStorage.setItem('app-font-size', '20px');
    });
  }
  if (btnLarger) {
    btnLarger.addEventListener('click', () => {
      document.documentElement.style.setProperty('--root-font-size', '24px'); // Aumenta ~50%
      localStorage.setItem('app-font-size', '24px');
    });
  }

  // Restore saved font size on load
  const savedFontSize = localStorage.getItem('app-font-size');
  if (savedFontSize) {
    document.documentElement.style.setProperty('--root-font-size', savedFontSize);
  }
});
