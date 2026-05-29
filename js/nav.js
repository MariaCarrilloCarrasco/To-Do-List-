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

  const downloadButton = document.querySelector('nav button[data-action="download-board"]');
  if (downloadButton) {
    downloadButton.addEventListener('click', () => {
      const downloadUrl = 'options/tablero.html?print=true';
      window.open(downloadUrl, '_blank');
    });
  }
});
