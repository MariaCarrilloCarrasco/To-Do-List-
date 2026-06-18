document.addEventListener('DOMContentLoaded', () => {
  const ambitoButtons = document.querySelectorAll('button[data-ambito]');

  if (!ambitoButtons.length) {
    return;
  }

  ambitoButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const target = button.dataset.ambito;
      if (target !== 'todos') {
        // Wait a small tick for renderTasks to display/open the target details section
        setTimeout(() => {
          const targetSection = document.querySelector(`details[data-ambito-section="${target}"]`);
          if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }, 50);
      }
    });
  });
});
