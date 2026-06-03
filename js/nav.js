document.addEventListener('DOMContentLoaded', () => {
  const navTargets = document.querySelectorAll('nav button[data-target]');
  navTargets.forEach((button) => {
    button.addEventListener('click', () => {
      const target = button.dataset.target;
      if (target) {
        window.location.href = target;
      }
    });
  });
});
