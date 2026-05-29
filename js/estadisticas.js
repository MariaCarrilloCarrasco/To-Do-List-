document.addEventListener('DOMContentLoaded', () => {
  const completed = 8;
  const total = 10;
  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

  const circle = document.getElementById('progress');
  const label = document.getElementById('progressValue');

  if (!circle || !label) return;

  const degrees = percentage * 3.6;
  circle.style.background = `conic-gradient(#4caf50 0deg ${degrees}deg, #e5e7eb ${degrees}deg 360deg)`;
  label.textContent = `${percentage}%`;
});