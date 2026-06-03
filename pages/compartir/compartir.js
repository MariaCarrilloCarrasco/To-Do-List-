// pages/compartir/compartir.js
// Handles task summarization, text preview compiling, clipboard copying and social network sharing links

document.addEventListener('DOMContentLoaded', () => {
  // Default tasks in case localStorage is empty
  const defaultTasks = [
    { id: 'task-1', text: 'Preparar cena familiar', column: 'done', ambito: 'familia', dateType: 'single', dateStart: '2026-06-03', timeType: 'single', timeStart: '20:30' },
    { id: 'task-2', text: 'Hacer ejercicio matutino', column: 'done', ambito: 'personal', dateType: 'single', dateStart: '2026-06-03', timeType: 'single', timeStart: '07:30' },
    { id: 'task-3', text: 'Quedar con amigos', column: 'done', ambito: 'social', dateType: 'single', dateStart: '2026-06-04', timeType: 'single', timeStart: '17:00' },
    { id: 'task-4', text: 'Entregar informe del proyecto', column: 'not-done', ambito: 'laboral', dateType: 'single', dateStart: '2026-06-05', timeType: 'single', timeStart: '12:00' },
    { id: 'task-5', text: 'Comprar entradas cine', column: 'not-done', ambito: 'ocio', dateType: 'single', dateStart: '2026-06-05', timeType: 'single', timeStart: '18:00' },
    { id: 'task-6', text: 'Revisión médica anual', column: 'not-done', ambito: 'salud', dateType: 'single', dateStart: '2026-06-08', timeType: 'single', timeStart: '09:00' },
    { id: 'task-7', text: 'Limpieza a fondo cocina', column: 'in-progress', ambito: 'hogar', dateType: 'range', dateStart: '2026-06-03', dateEnd: '2026-06-04', timeType: 'range', timeStart: '16:00', timeEnd: '18:00' },
    { id: 'task-8', text: 'Pagar facturas pendientes', column: 'in-progress', ambito: 'finanzas', dateType: 'single', dateStart: '2026-06-04', timeType: 'single', timeStart: '10:00' },
    { id: 'task-9', text: 'Estudiar temario oposiciones', column: 'in-progress', ambito: 'laboral', dateType: 'range', dateStart: '2026-06-01', dateEnd: '2026-06-07', timeType: 'range', timeStart: '08:00', timeEnd: '11:00' }
  ];

  const buildShareContent = () => {
    let tasks = JSON.parse(localStorage.getItem('todo-tasks'));
    if (!tasks || !Array.isArray(tasks) || tasks.length === 0) {
      tasks = defaultTasks;
    }

    const lang = localStorage.getItem('app-language') || 'es';
    const dict = window.translations ? (window.translations[lang] || window.translations.es) : {};

    // Get current stats
    const total = tasks.length;
    const completed = tasks.filter(t => t.column === 'done').length;
    const inProgress = tasks.filter(t => t.column === 'in-progress').length;
    const pending = tasks.filter(t => t.column === 'not-done').length;

    // Get translations for labels
    const titleText = dict.share_summary_title || '📊 Resumen de mis tareas en MiiActToDo:';
    const totalText = dict.kpi_total || 'Total Registradas';
    const completedText = dict.col_done || 'Hecho';
    const inProgressText = dict.col_in_progress || 'En progreso';
    const pendingText = dict.col_not_done || 'Pendiente';
    
    const highlightHeader = lang === 'en' ? '📝 Featured active tasks:' : '📝 Tareas activas destacadas:';
    const footerText = lang === 'en' ? 'Organize your day with MiiActToDo!' : '¡Organiza tu día con MiiActToDo!';

    // Format date string helper
    const formatDate = (dateStr) => {
      if (!dateStr) return '';
      const parts = dateStr.split('-');
      if (parts.length === 3) {
        return `${parts[2]}/${parts[1]}/${parts[0]}`;
      }
      return dateStr;
    };

    // Build task summary lines (list up to 5 non-done tasks)
    const activeTasks = tasks.filter(t => t.column !== 'done').slice(0, 5);
    let activeTasksLines = '';
    
    if (activeTasks.length > 0) {
      activeTasksLines = `\n${highlightHeader}\n`;
      activeTasks.forEach(task => {
        let schedule = '';
        let datePart = '';
        let timePart = '';
        const connectWord = dict.form_connect_word || (lang === 'en' ? 'to' : 'al');
        const connectTime = dict.form_connect_time || (lang === 'en' ? 'to' : 'a');

        if (task.dateType === 'single' && task.dateStart) {
          datePart = `${formatDate(task.dateStart)}`;
        } else if (task.dateType === 'range' && task.dateStart && task.dateEnd) {
          datePart = `${formatDate(task.dateStart)} ${connectWord} ${formatDate(task.dateEnd)}`;
        }

        if (task.timeType === 'single' && task.timeStart) {
          timePart = `${task.timeStart}`;
        } else if (task.timeType === 'range' && task.timeStart && task.timeEnd) {
          timePart = `${task.timeStart} ${connectTime} ${task.timeEnd}`;
        }

        if (datePart || timePart) {
          schedule = ` (📅 ${datePart || ''}${datePart && timePart ? ' | ' : ''}🕒 ${timePart || ''})`;
        }

        activeTasksLines += `- ${task.text}${schedule}\n`;
      });
    }

    // Combine message
    const message = `${titleText}
📋 ${totalText}: ${total}
✅ ${completedText}: ${completed}
⏳ ${inProgressText}: ${inProgress}
❌ ${pendingText}: ${pending}
${activeTasksLines}
🚀 ${footerText}`;

    // Fill in textarea
    const textarea = document.getElementById('sharePreview');
    if (textarea) {
      textarea.value = message;
    }

    // Update social links
    const encodedMessage = encodeURIComponent(message);
    const mockAppUrl = 'https://factoriaf5.org'; // Dummy URL to share alongside the quote

    const waBtn = document.getElementById('shareWA');
    const twBtn = document.getElementById('shareTW');
    const tgBtn = document.getElementById('shareTG');
    const fbBtn = document.getElementById('shareFB');
    const emailBtn = document.getElementById('shareEmail');

    if (waBtn) waBtn.href = `https://api.whatsapp.com/send?text=${encodedMessage}`;
    if (twBtn) twBtn.href = `https://twitter.com/intent/tweet?text=${encodedMessage}`;
    if (tgBtn) tgBtn.href = `https://t.me/share/url?url=${encodeURIComponent(mockAppUrl)}&text=${encodedMessage}`;
    if (fbBtn) fbBtn.href = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(mockAppUrl)}&quote=${encodedMessage}`;
    
    if (emailBtn) {
      const subject = encodeURIComponent(lang === 'en' ? 'My tasks in MiiActToDo' : 'Mis tareas en MiiActToDo');
      emailBtn.href = `mailto:?subject=${subject}&body=${encodedMessage}`;
    }
  };

  // Clipboard copy handler
  const copyBtn = document.getElementById('copyBtn');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const textarea = document.getElementById('sharePreview');
      if (!textarea) return;

      textarea.select();
      textarea.setSelectionRange(0, 99999); // For mobile devices

      navigator.clipboard.writeText(textarea.value).then(() => {
        // Visual Copy success feedback
        const lang = localStorage.getItem('app-language') || 'es';
        const dict = window.translations ? (window.translations[lang] || window.translations.es) : {};
        const successMsg = dict.share_copied_toast || '¡Copiado!';
        const originalText = copyBtn.innerHTML;

        copyBtn.innerHTML = `✅ ${successMsg}`;
        copyBtn.classList.add('copied');

        setTimeout(() => {
          copyBtn.innerHTML = originalText;
          copyBtn.classList.remove('copied');
        }, 2000);
      }).catch(err => {
        console.error('Could not copy text: ', err);
      });
    });
  }

  // Load share content
  buildShareContent();

  // Re-trigger building share message on language change
  window.addEventListener('languagechanged', () => {
    buildShareContent();
  });
});
