document.addEventListener('DOMContentLoaded', () => {
  const navTargets = document.querySelectorAll('nav [reel], nav button[data-target]');
  navTargets.forEach((element) => {
    // Add pointer cursor since they are acting as buttons
    element.style.cursor = 'pointer';
    element.addEventListener('click', () => {
      const target = element.getAttribute('reel') || element.dataset.target;
      if (target) {
        window.location.href = target;
      }
    });
  });
});
