document.addEventListener('DOMContentLoaded', () => {
  const ambitoButtons = document.querySelectorAll('button[data-ambito]');
  const ambitoSections = document.querySelectorAll('details[data-ambito-section]');

  if (!ambitoButtons.length || !ambitoSections.length) {
    return;
  }

  ambitoButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const target = button.dataset.ambito;
      const targetSection = document.querySelector(`details[data-ambito-section="${target}"]`);

      if (!targetSection) {
        return;
      }

      ambitoSections.forEach((section) => {
        section.open = section === targetSection;
      });

      ambitoButtons.forEach((btn) => {
        btn.classList.toggle('active', btn === button);
      });

      targetSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  });
});
