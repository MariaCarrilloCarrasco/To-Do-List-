document.addEventListener('DOMContentLoaded', () => {
  
  const defaultTasks = [
    { id: 'task-1', text: 'Task 1', column: 'done' },
    { id: 'task-2', text: 'Task 2', column: 'done' },
    { id: 'task-3', text: 'Task 3', column: 'done' },
    { id: 'task-4', text: 'Task 4', column: 'not-done' },
    { id: 'task-5', text: 'Task 5', column: 'not-done' },
    { id: 'task-6', text: 'Task 6', column: 'not-done' },
    { id: 'task-7', text: 'Task 7', column: 'in-progress' },
    { id: 'task-8', text: 'Task 8', column: 'in-progress' },
    { id: 'task-9', text: 'Task 9', column: 'in-progress' }
  ];

  
  const seededTaskHours = {
    'task-1': 10,
    'task-2': 10,
    'task-3': 11,
    'task-4': 14,
    'task-5': 15,
    'task-6': 16,
    'task-7': 10,
    'task-8': 11,
    'task-9': 14
  };

  const renderStats = () => {
    let tasks = JSON.parse(localStorage.getItem('todo-tasks'));
    if (!tasks || !Array.isArray(tasks) || tasks.length === 0) {
      tasks = defaultTasks;
    }

    const lang = localStorage.getItem('app-language') || 'es';

    const activeTasks = tasks.filter(t => t.column !== 'deleted');
    const total = activeTasks.length;
    const completed = activeTasks.filter(t => t.column === 'done').length;
    const inProgress = activeTasks.filter(t => t.column === 'in-progress').length;
    const pending = activeTasks.filter(t => t.column === 'not-done').length;

    const totalEl = document.getElementById('count-total');
    const doneEl = document.getElementById('count-done');
    const progressEl = document.getElementById('count-progress');
    const pendingEl = document.getElementById('count-pending');

    if (totalEl) totalEl.textContent = total;
    if (doneEl) doneEl.textContent = completed;
    if (progressEl) progressEl.textContent = inProgress;
    if (pendingEl) pendingEl.textContent = pending;

    const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);
    const inProgressPercentage = total === 0 ? 0 : Math.round((inProgress / total) * 100);
    const pendingPercentage = total === 0 ? 0 : Math.round((pending / total) * 100);

    const circle = document.getElementById('progress');
    const label = document.getElementById('progressValue');

    if (circle && label) {
      const degDone = percentage * 3.6;
      const degProgress = degDone + (inProgressPercentage * 3.6);
      
      if (total === 0) {
        circle.style.background = `rgba(120, 120, 120, 0.15)`;
      } else {
        circle.style.background = `conic-gradient(
          #10b981 0deg ${degDone}deg,
          #f59e0b ${degDone}deg ${degProgress}deg,
          #ef4444 ${degProgress}deg 360deg
        )`;
      }
      
      const dict = window.translations ? (window.translations[lang] || window.translations.es) : {};
      const labelDone = dict.col_done || 'Hecho';
      const labelProgress = dict.kpi_progress || 'En Proceso';
      const labelPending = dict.kpi_pending || 'Pendiente';

      label.innerHTML = `
        <div style="font-size: 1.8rem; font-weight: 800; color: #10b981; line-height: 1;">${percentage}%</div>
        <div style="font-size: 0.62rem; font-weight: 700; color: #6b7280; text-transform: uppercase; margin-bottom: 2px;">${labelDone}</div>
        <div style="font-size: 0.78rem; font-weight: 800; color: #f59e0b; line-height: 1;">${inProgressPercentage}% <span style="font-size: 0.6rem; font-weight: 600;">${labelProgress}</span></div>
        <div style="font-size: 0.78rem; font-weight: 800; color: #ef4444; line-height: 1; margin-top: 1px;">${pendingPercentage}% <span style="font-size: 0.6rem; font-weight: 600;">${labelPending}</span></div>
      `;
    }

    const barChartContainer = document.getElementById('bar-chart-container');
    if (barChartContainer) {
      barChartContainer.innerHTML = '';
      
      const hourlyCounts = new Array(24).fill(0);

      activeTasks.forEach(task => {
        if (!task || !task.id) return;
        const idStr = String(task.id);
        if (seededTaskHours[idStr] !== undefined) {
          const hour = seededTaskHours[idStr];
          hourlyCounts[hour]++;
        } else if (idStr.startsWith('task-')) {
          const tsStr = idStr.replace('task-', '');
          const ts = parseInt(tsStr, 10);
          if (!isNaN(ts) && ts > 1000000) {
            const hour = new Date(ts).getHours();
            if (hour >= 0 && hour < 24) {
              hourlyCounts[hour]++;
            }
          }
        } else {
          const ts = parseInt(idStr, 10);
          if (!isNaN(ts) && ts > 1000000) {
            const hour = new Date(ts).getHours();
            if (hour >= 0 && hour < 24) {
              hourlyCounts[hour]++;
            }
          }
        }
      });

      
      const maxCount = Math.max(...hourlyCounts, 1);

      
      for (let i = 0; i < 24; i++) {
        const count = hourlyCounts[i];
        const heightPercent = (count / maxCount) * 100;
        
        const barCol = document.createElement('div');
        barCol.className = 'bar-container';
        
        const tooltipText = lang === 'en'
          ? `${count} ${count === 1 ? 'task' : 'tasks'}`
          : `${count} ${count === 1 ? 'tarea' : 'tareas'}`;

        barCol.innerHTML = `
          <div class="bar" style="height: ${heightPercent}%;" title="${tooltipText}">
            <span class="bar-tooltip">${tooltipText}</span>
          </div>
          <span class="bar-label">${String(i).padStart(2, '0')}</span>
        `;
        barChartContainer.appendChild(barCol);
      }
    }
  };

  
  window.renderStats = renderStats;

  
  renderStats();

  
  window.addEventListener('languagechanged', () => {
    renderStats();
  });

  // Handle auto-print or auto-download query params
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('print') === 'true') {
    setTimeout(() => {
      window.print();
    }, 1000);
  } else if (urlParams.get('png') === 'true') {
    setTimeout(() => {
      if (window.triggerStatsPngExport) {
        window.triggerStatsPngExport();
      }
    }, 1000);
  }

  // Expose triggerStatsPngExport globally
  window.triggerStatsPngExport = () => {
    // Hide nav actions for export
    const elementsToHide = document.querySelectorAll('nav, .theme-trigger-btn, .theme-panel, .board-status-footer, a[data-translate="back_to_home"]');
    elementsToHide.forEach(el => el.style.setProperty('display', 'none', 'important'));

    const targetElement = document.querySelector('main') || document.body;
    const computedBg = getComputedStyle(document.documentElement).getPropertyValue('--bg-color').trim() || '#f2f6fb';

    if (typeof html2canvas === 'undefined') {
      console.error('html2canvas is not loaded yet');
      elementsToHide.forEach(el => el.style.removeProperty('display'));
      return;
    }

    html2canvas(targetElement, {
      useCORS: true,
      allowTaint: true,
      backgroundColor: computedBg,
      scale: 2
    }).then(canvas => {
      elementsToHide.forEach(el => el.style.removeProperty('display'));

      const link = document.createElement('a');
      link.download = 'miiacttodo-stats.png';
      link.href = canvas.toDataURL('image/png');
      link.click();

      // Redirect back if opened from param
      if (urlParams.get('png') === 'true') {
        setTimeout(() => {
          if (document.referrer && !document.referrer.includes('/estadisticasymejoras/')) {
            window.location.href = document.referrer;
          } else {
            const isSubPage = window.location.pathname.includes('/pages/');
            window.location.href = isSubPage ? '../../index.html' : 'index.html';
          }
        }, 1000);
      }
    }).catch(err => {
      console.error('Error exporting stats image:', err);
      elementsToHide.forEach(el => el.style.removeProperty('display'));
    });
  };
});