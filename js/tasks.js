// js/tasks.js
// Dynamic Task Management with Categorized Badges, Scheduling & Bilingual Support

document.addEventListener('DOMContentLoaded', () => {
  // Dynamic labels helper using global translations
  const getDynamicLabels = () => {
    const lang = localStorage.getItem('app-language') || 'es';
    const dict = window.translations ? (window.translations[lang] || window.translations.es) : {};
    return {
      ambito: dict.form_ambito || 'Ámbito:',
      urgencia: dict.form_urgencia || 'Urgencia:',
      importancia: dict.form_importancia || 'Importancia:',
      dificultad: dict.form_dificultad || 'Dificultad:',
      tiempo: dict.form_tiempo || 'Tiempo:',
      color: dict.form_color || '🎨 Color:',
      textColor: dict.form_text_color || '✍️ Letras:',
      size: dict.form_size || '🔤 Tamaño:',
      size_s: dict.form_size_s || 'Pequeño',
      size_m: dict.form_size_m || 'Mediano',
      size_l: dict.form_size_l || 'Grande',
      desc_placeholder: dict.form_desc_placeholder || 'Descripción de la tarea...',
      date_type: dict.form_date_type || '📅 Tipo Fecha:',
      date_single: dict.form_date_single || 'Una fecha',
      date_range: dict.form_date_range || 'Rango de fechas',
      time_type: dict.form_time_type || '🕒 Tipo Hora:',
      time_single: dict.form_time_single || 'Una hora',
      time_range: dict.form_time_range || 'Rango de horas',
      date_start_label: dict.form_date_start_label || 'Fecha:',
      date_start_range: dict.form_date_start_range || 'F. Inicio:',
      date_end_label: dict.form_date_end_label || 'F. Fin:',
      time_start_label: dict.form_time_start_label || 'Hora:',
      time_start_range: dict.form_time_start_range || 'H. Inicio:',
      time_end_label: dict.form_time_end_label || 'H. Fin:',
      none: dict.form_none || 'Ninguno',
      none_f: dict.form_none_f || 'Ninguna',
      emoji_main: dict.form_emoji_main || '⭐ Emoticono:',
      save: dict.form_save || '💾 Guardar',
      cancel: dict.form_cancel || '❌ Cancelar',
      add: dict.form_add || 'Añadir',
      col_dest: dict.form_col_dest || 'Mover a:',
      col_done: dict.col_done || 'Hecho',
      col_not_done: dict.col_not_done || 'Pendiente',
      col_in_progress: dict.col_in_progress || 'En progreso',
      col_deleted: dict.col_deleted || 'Eliminadas',
      empty_tasks: dict.empty_tasks || 'No hay tareas',
      connect_word: dict.form_connect_word || 'al',
      connect_time: dict.form_connect_time || 'a'
    };
  };

  // Default seeded tasks for the board
  const defaultTasks = [
    { id: 'task-1', text: 'Preparar cena familiar', column: 'done', ambito: 'familia', urgencia: 'alta', importancia: 'muy', dificultad: 'baja', tiempo: 'poco', cardColor: '#170e30', cardTextColor: '#ffffff', fontSize: 'medium', description: 'Reunión en casa de los abuelos', dateType: 'single', dateStart: '2026-06-03', timeType: 'single', timeStart: '20:30', taskEmoji: '' },
    { id: 'task-2', text: 'Hacer ejercicio matutino', column: 'done', ambito: 'personal', urgencia: 'media', importancia: 'importante', dificultad: 'media', tiempo: 'medio', cardColor: '#170e30', cardTextColor: '#ffffff', fontSize: 'medium', description: 'Correr en el parque 30 min', dateType: 'single', dateStart: '2026-06-03', timeType: 'single', timeStart: '07:30', taskEmoji: '' },
    { id: 'task-3', text: 'Quedar con amigos', column: 'done', ambito: 'social', urgencia: 'baja', importancia: 'menos', dificultad: 'baja', tiempo: 'poco', cardColor: '#170e30', cardTextColor: '#ffffff', fontSize: 'medium', description: 'Tomar café en la plaza', dateType: 'single', dateStart: '2026-06-04', timeType: 'single', timeStart: '17:00', taskEmoji: '' },
    { id: 'task-4', text: 'Entregar informe del proyecto', column: 'not-done', ambito: 'laboral', urgencia: 'alta', importancia: 'muy', dificultad: 'alta', tiempo: 'largo', cardColor: '#170e30', cardTextColor: '#ffffff', fontSize: 'medium', description: 'Enviar pdf firmado por email', dateType: 'single', dateStart: '2026-06-05', timeType: 'single', timeStart: '12:00', taskEmoji: '' },
    { id: 'task-5', text: 'Comprar entradas cine', column: 'not-done', ambito: 'ocio', urgencia: 'media', importancia: 'importante', dificultad: 'media', tiempo: 'medio', cardColor: '#170e30', cardTextColor: '#ffffff', fontSize: 'medium', description: 'Función del viernes noche', dateType: 'single', dateStart: '2026-06-05', timeType: 'single', timeStart: '18:00', taskEmoji: '' },
    { id: 'task-6', text: 'Revisión médica anual', column: 'not-done', ambito: 'salud', urgencia: 'baja', importancia: 'menos', dificultad: 'baja', tiempo: 'poco', cardColor: '#170e30', cardTextColor: '#ffffff', fontSize: 'medium', description: 'Analítica de sangre rutinaria', dateType: 'single', dateStart: '2026-06-08', timeType: 'single', timeStart: '09:00', taskEmoji: '' },
    { id: 'task-7', text: 'Limpieza a fondo cocina', column: 'in-progress', ambito: 'hogar', urgencia: 'alta', importancia: 'muy', dificultad: 'media', tiempo: 'medio', cardColor: '#170e30', cardTextColor: '#ffffff', fontSize: 'medium', description: 'Limpiar horno y armarios', dateType: 'range', dateStart: '2026-06-03', dateEnd: '2026-06-04', timeType: 'range', timeStart: '16:00', timeEnd: '18:00', taskEmoji: '' },
    { id: 'task-8', text: 'Pagar facturas pendientes', column: 'in-progress', ambito: 'finanzas', urgencia: 'media', importancia: 'importante', dificultad: 'baja', tiempo: 'poco', cardColor: '#170e30', cardTextColor: '#ffffff', fontSize: 'medium', description: 'Factura de luz y wifi', dateType: 'single', dateStart: '2026-06-04', timeType: 'single', timeStart: '10:00', taskEmoji: '' },
    { id: 'task-9', text: 'Estudiar temario oposiciones', column: 'in-progress', ambito: 'laboral', urgencia: 'baja', importancia: 'menos', dificultad: 'alta', tiempo: 'largo', cardColor: '#170e30', cardTextColor: '#ffffff', fontSize: 'medium', description: 'Temas del 10 al 15 completos', dateType: 'range', dateStart: '2026-06-01', dateEnd: '2026-06-07', timeType: 'range', timeStart: '08:00', timeEnd: '11:00', taskEmoji: '' }
  ];

  const currentDbVersion = 'v5';
  let tasks = JSON.parse(localStorage.getItem('todo-tasks'));
  const dbVersion = localStorage.getItem('todo-tasks-version');
  const needsMigration = !tasks || !Array.isArray(tasks) || tasks.length === 0 || dbVersion !== currentDbVersion;

  if (needsMigration) {
    tasks = defaultTasks;
    localStorage.setItem('todo-tasks', JSON.stringify(tasks));
    localStorage.setItem('todo-tasks-version', currentDbVersion);
  }

  // Sort tasks chronologically helper function
  const sortTasksChronologically = (taskList) => {
    return [...taskList].sort((a, b) => {
      const dateA = a.dateStart || '';
      const dateB = b.dateStart || '';
      
      // Scheduled dates go first
      if (dateA && !dateB) return -1;
      if (!dateA && dateB) return 1;
      
      if (dateA && dateB) {
        if (dateA < dateB) return -1;
        if (dateA > dateB) return 1;
      }
      
      // If dates are equal or both missing, compare times
      const timeA = a.timeStart || '';
      const timeB = b.timeStart || '';
      
      if (timeA && !timeB) return -1;
      if (!timeA && timeB) return 1;
      
      if (timeA && timeB) {
        if (timeA < timeB) return -1;
        if (timeA > timeB) return 1;
      }
      
      // Secondary fallback: compare IDs to keep order stable
      return a.id.localeCompare(b.id);
    });
  };

  let editingTaskId = null;
  let activeAddColumn = null;

  // Helper functions
  const saveTasks = () => {
    localStorage.setItem('todo-tasks', JSON.stringify(tasks));
    renderCriteriaBreakdowns(); // Update details breakdowns
  };

  const getLuminance = (hex) => {
    if (!hex) return 1;
    let color = hex.replace('#', '');
    if (color.length === 3) {
      color = color[0] + color[0] + color[1] + color[1] + color[2] + color[2];
    }
    const r = parseInt(color.substr(0, 2), 16) / 255;
    const g = parseInt(color.substr(2, 2), 16) / 255;
    const b = parseInt(color.substr(4, 2), 16) / 255;
    
    const a = [r, g, b].map(v => {
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
  };

  const getActiveEmojisList = (taskObj = {}) => {
    const emojis = [];
    const scopeEmojis = {
      familia: '👪', personal: '👤', social: '👥',
      laboral: '💼', ocio: '🎭', salud: '❤️',
      hogar: '🏠', finanzas: '💰'
    };
    const urgencyEmojis = { alta: '🔴', media: '🟡', baja: '🟢' };
    const importanceEmojis = { muy: '🔥', importante: '⭐', menos: '💤' };
    const difficultyEmojis = { alta: '🧗', media: '⚙️', baja: '🌱' };

    if (taskObj.ambito && scopeEmojis[taskObj.ambito]) {
      emojis.push({ char: scopeEmojis[taskObj.ambito], type: 'Ámbito / Scope' });
    }
    if (taskObj.urgencia && urgencyEmojis[taskObj.urgencia]) {
      emojis.push({ char: urgencyEmojis[taskObj.urgencia], type: 'Urgencia / Urgency' });
    }
    if (taskObj.importancia && importanceEmojis[taskObj.importancia]) {
      emojis.push({ char: importanceEmojis[taskObj.importancia], type: 'Importancia / Importance' });
    }
    if (taskObj.dificultad && difficultyEmojis[taskObj.dificultad]) {
      emojis.push({ char: difficultyEmojis[taskObj.dificultad], type: 'Dificultad / Difficulty' });
    }
    return emojis;
  };

  const updateEmojiOptions = (formContainer) => {
    const scopeSelect = formContainer.querySelector('.task-ambito-select');
    const urgencySelect = formContainer.querySelector('.task-urgencia-select');
    const importanceSelect = formContainer.querySelector('.task-importancia-select');
    const difficultySelect = formContainer.querySelector('.task-dificultad-select');
    const emojiSelect = formContainer.querySelector('.task-emoji-select');
    
    if (!emojiSelect) return;

    const currentSelectedVal = emojiSelect.value;
    const labels = getDynamicLabels();

    const tempObj = {
      ambito: scopeSelect ? scopeSelect.value : '',
      urgencia: urgencySelect ? urgencySelect.value : '',
      importancia: importanceSelect ? importanceSelect.value : '',
      dificultad: difficultySelect ? difficultySelect.value : ''
    };

    const activeEmojis = getActiveEmojisList(tempObj);

    emojiSelect.innerHTML = `<option value="">${labels.none}</option>`;
    activeEmojis.forEach(item => {
      const isSel = item.char === currentSelectedVal;
      const option = document.createElement('option');
      option.value = item.char;
      option.textContent = `${item.char} (${item.type})`;
      if (isSel) option.selected = true;
      emojiSelect.appendChild(option);
    });
  };

  const bindFormEvents = (container) => {
    const labels = getDynamicLabels();

    // Date type switcher
    const dateTypeSelect = container.querySelector('.task-date-type-select');
    const dateStartWrapper = container.querySelector('.date-start-wrapper');
    const dateEndWrapper = container.querySelector('.date-end-wrapper');
    const dateStartLabel = container.querySelector('.date-start-label');

    if (dateTypeSelect && dateStartWrapper && dateEndWrapper && dateStartLabel) {
      dateTypeSelect.addEventListener('change', (e) => {
        const val = e.target.value;
        if (val === '') {
          dateStartWrapper.classList.add('hidden');
          dateEndWrapper.classList.add('hidden');
        } else if (val === 'single') {
          dateStartWrapper.classList.remove('hidden');
          dateEndWrapper.classList.add('hidden');
          dateStartLabel.textContent = labels.date_start_label;
        } else if (val === 'range') {
          dateStartWrapper.classList.remove('hidden');
          dateEndWrapper.classList.remove('hidden');
          dateStartLabel.textContent = labels.date_start_range;
        }
      });
    }

    // Time type switcher
    const timeTypeSelect = container.querySelector('.task-time-type-select');
    const timeStartWrapper = container.querySelector('.time-start-wrapper');
    const timeEndWrapper = container.querySelector('.time-end-wrapper');
    const timeStartLabel = container.querySelector('.time-start-label');

    if (timeTypeSelect && timeStartWrapper && timeEndWrapper && timeStartLabel) {
      timeTypeSelect.addEventListener('change', (e) => {
        const val = e.target.value;
        if (val === '') {
          timeStartWrapper.classList.add('hidden');
          timeEndWrapper.classList.add('hidden');
        } else if (val === 'single') {
          timeStartWrapper.classList.remove('hidden');
          timeEndWrapper.classList.add('hidden');
          timeStartLabel.textContent = labels.time_start_label;
        } else if (val === 'range') {
          timeStartWrapper.classList.remove('hidden');
          timeEndWrapper.classList.remove('hidden');
          timeStartLabel.textContent = labels.time_start_range;
        }
      });
    }

    // Watchers to rebuild emoticon options on the fly
    const selectsToWatch = [
      container.querySelector('.task-ambito-select'),
      container.querySelector('.task-urgencia-select'),
      container.querySelector('.task-importancia-select'),
      container.querySelector('.task-dificultad-select')
    ];

    selectsToWatch.forEach(sel => {
      if (sel) {
        sel.addEventListener('change', () => {
          updateEmojiOptions(container);
        });
      }
    });
  };

  const getFormHtml = (taskObj = {}, isEdit = false) => {
    const labels = getDynamicLabels();
    const cardColor = taskObj.cardColor || '#ffffff';
    let cardTextColor = taskObj.cardTextColor;
    if (!cardTextColor) {
      const lum = getLuminance(cardColor);
      cardTextColor = lum < 0.5 ? '#ffffff' : '#1f2937';
    }
    const fontSize = taskObj.fontSize || 'medium';
    
    const activeEmojis = getActiveEmojisList(taskObj);
    let emojiOptions = `<option value="">${labels.none}</option>`;
    activeEmojis.forEach(item => {
      const isSel = taskObj.taskEmoji === item.char;
      emojiOptions += `<option value="${item.char}" ${isSel ? 'selected' : ''}>${item.char} (${item.type})</option>`;
    });

    return `
      <div class="task-form-container" style="display: flex; flex-direction: column; gap: 0.5rem; width: 100%; text-align: left;">
        <div class="form-field">
          <input type="text" class="task-title-input" placeholder="${lang === 'en' ? 'Task title...' : 'Título de la tarea...'}" value="${taskObj.text || ''}" style="width: 100%; box-sizing: border-box; padding: 6px 10px; border-radius: 6px; border: 1px solid rgba(0,0,0,0.15);" required>
        </div>
        
        <div class="form-field">
          <input type="text" class="task-desc-input" placeholder="${labels.desc_placeholder}" value="${taskObj.description || ''}" style="width: 100%; box-sizing: border-box; padding: 6px 10px; border-radius: 6px; border: 1px solid rgba(0,0,0,0.15);">
        </div>

        <div class="edit-selectors-grid">
          <div class="selector-item">
            <label>${labels.ambito}</label>
            <select class="task-ambito-select">
              <option value="">${labels.none}</option>
              <option value="familia" ${taskObj.ambito === 'familia' ? 'selected' : ''}>👪 ${lang === 'en' ? 'Family' : 'Familia'}</option>
              <option value="personal" ${taskObj.ambito === 'personal' ? 'selected' : ''}>👤 ${lang === 'en' ? 'Personal' : 'Personal'}</option>
              <option value="social" ${taskObj.ambito === 'social' ? 'selected' : ''}>👥 ${lang === 'en' ? 'Social' : 'Social'}</option>
              <option value="laboral" ${taskObj.ambito === 'laboral' ? 'selected' : ''}>💼 ${lang === 'en' ? 'Work' : 'Laboral'}</option>
              <option value="ocio" ${taskObj.ambito === 'ocio' ? 'selected' : ''}>🎭 ${lang === 'en' ? 'Leisure' : 'Ocio'}</option>
              <option value="salud" ${taskObj.ambito === 'salud' ? 'selected' : ''}>❤️ ${lang === 'en' ? 'Health' : 'Salud'}</option>
              <option value="hogar" ${taskObj.ambito === 'hogar' ? 'selected' : ''}>🏠 ${lang === 'en' ? 'Home' : 'Hogar'}</option>
              <option value="finanzas" ${taskObj.ambito === 'finanzas' ? 'selected' : ''}>💰 ${lang === 'en' ? 'Finance' : 'Finanzas'}</option>
            </select>
          </div>
          
          <div class="selector-item">
            <label>${labels.urgencia}</label>
            <select class="task-urgencia-select">
              <option value="">${labels.none_f}</option>
              <option value="alta" ${taskObj.urgencia === 'alta' ? 'selected' : ''}>🔴 ${lang === 'en' ? 'High' : 'Alta'}</option>
              <option value="media" ${taskObj.urgencia === 'media' ? 'selected' : ''}>🟡 ${lang === 'en' ? 'Medium' : 'Media'}</option>
              <option value="baja" ${taskObj.urgencia === 'baja' ? 'selected' : ''}>🟢 ${lang === 'en' ? 'Low' : 'Baja'}</option>
            </select>
          </div>

          <div class="selector-item">
            <label>${labels.importancia}</label>
            <select class="task-importancia-select">
              <option value="">${labels.none_f}</option>
              <option value="muy" ${taskObj.importancia === 'muy' ? 'selected' : ''}>🔥 ${lang === 'en' ? 'Very' : 'Muy'}</option>
              <option value="importante" ${taskObj.importancia === 'importante' ? 'selected' : ''}>⭐ ${lang === 'en' ? 'Important' : 'Importante'}</option>
              <option value="menos" ${taskObj.importancia === 'menos' ? 'selected' : ''}>💤 ${lang === 'en' ? 'Less' : 'Menos'}</option>
            </select>
          </div>

          <div class="selector-item">
            <label>${labels.dificultad}</label>
            <select class="task-dificultad-select">
              <option value="">${labels.none_f}</option>
              <option value="alta" ${taskObj.dificultad === 'alta' ? 'selected' : ''}>🧗 ${lang === 'en' ? 'High' : 'Alta'}</option>
              <option value="media" ${taskObj.dificultad === 'media' ? 'selected' : ''}>⚙️ ${lang === 'en' ? 'Medium' : 'Media'}</option>
              <option value="baja" ${taskObj.dificultad === 'baja' ? 'selected' : ''}>🌱 ${lang === 'en' ? 'Low' : 'Baja'}</option>
            </select>
          </div>

          <div class="selector-item">
            <label>${labels.tiempo}</label>
            <select class="task-tiempo-select">
              <option value="">${labels.none}</option>
              <option value="poco" ${taskObj.tiempo === 'poco' ? 'selected' : ''}>⏱️ ${lang === 'en' ? 'Little (2d)' : 'Poco (2d)'}</option>
              <option value="medio" ${taskObj.tiempo === 'medio' ? 'selected' : ''}>⏳ ${lang === 'en' ? 'Medium (4d)' : 'Medio (4d)'}</option>
              <option value="largo" ${taskObj.tiempo === 'largo' ? 'selected' : ''}>📅 ${lang === 'en' ? 'Long (>1w)' : 'Largo (>1s)'}</option>
            </select>
          </div>

          <div class="selector-item">
            <label>${labels.color}</label>
            <input type="color" class="task-card-color-picker" value="${cardColor}">
          </div>

          <div class="selector-item">
            <label>${labels.textColor}</label>
            <input type="color" class="task-text-color-picker" value="${cardTextColor}">
          </div>

          <div class="selector-item">
            <label>${labels.size}</label>
            <select class="task-font-size-select">
              <option value="small" ${fontSize === 'small' ? 'selected' : ''}>${labels.size_s}</option>
              <option value="medium" ${fontSize === 'medium' ? 'selected' : ''}>${labels.size_m}</option>
              <option value="large" ${fontSize === 'large' ? 'selected' : ''}>${labels.size_l}</option>
            </select>
          </div>

          <div class="selector-item">
            <label>${labels.emoji_main}</label>
            <select class="task-emoji-select">
              ${emojiOptions}
            </select>
          </div>
        </div>

        <div class="edit-selectors-grid" style="border-color: rgba(37, 99, 235, 0.2); background: rgba(37, 99, 235, 0.02); margin: 0.25rem 0;">
          <div class="selector-item">
            <label>${labels.col_dest}</label>
            <select class="task-column-select">
              <option value="done" ${taskObj.column === 'done' ? 'selected' : ''}>${labels.col_done}</option>
              <option value="not-done" ${taskObj.column === 'not-done' ? 'selected' : ''}>${labels.col_not_done}</option>
              <option value="in-progress" ${taskObj.column === 'in-progress' ? 'selected' : ''}>${labels.col_in_progress}</option>
              <option value="deleted" ${taskObj.column === 'deleted' ? 'selected' : ''}>${labels.col_deleted}</option>
            </select>
          </div>

          <div class="selector-item">
            <label>${labels.date_type}</label>
            <select class="task-date-type-select">
              <option value="" ${!taskObj.dateType ? 'selected' : ''}>${labels.none_f}</option>
              <option value="single" ${taskObj.dateType === 'single' ? 'selected' : ''}>${labels.date_single}</option>
              <option value="range" ${taskObj.dateType === 'range' ? 'selected' : ''}>${labels.date_range}</option>
            </select>
          </div>
          
          <div class="selector-item date-start-wrapper ${taskObj.dateType ? '' : 'hidden'}">
            <label class="date-start-label">${taskObj.dateType === 'range' ? labels.date_start_range : labels.date_start_label}</label>
            <input type="date" class="task-date-start-input" value="${taskObj.dateStart || ''}" style="padding: 2px 4px; border-radius: 4px; border: 1px solid rgba(0,0,0,0.15);">
          </div>
          
          <div class="selector-item date-end-wrapper ${taskObj.dateType === 'range' ? '' : 'hidden'}">
            <label>${labels.date_end_label}</label>
            <input type="date" class="task-date-end-input" value="${taskObj.dateEnd || ''}" style="padding: 2px 4px; border-radius: 4px; border: 1px solid rgba(0,0,0,0.15);">
          </div>

          <div class="selector-item">
            <label>${labels.time_type}</label>
            <select class="task-time-type-select">
              <option value="" ${!taskObj.timeType ? 'selected' : ''}>${labels.none}</option>
              <option value="single" ${taskObj.timeType === 'single' ? 'selected' : ''}>${labels.time_single}</option>
              <option value="range" ${taskObj.timeType === 'range' ? 'selected' : ''}>${labels.time_range}</option>
            </select>
          </div>
          
          <div class="selector-item time-start-wrapper ${taskObj.timeType ? '' : 'hidden'}">
            <label class="time-start-label">${taskObj.timeType === 'range' ? labels.time_start_range : labels.time_start_label}</label>
            <input type="time" class="task-time-start-input" value="${taskObj.timeStart || ''}" style="padding: 2px 4px; border-radius: 4px; border: 1px solid rgba(0,0,0,0.15);">
          </div>
          
          <div class="selector-item time-end-wrapper ${taskObj.timeType === 'range' ? '' : 'hidden'}">
            <label>${labels.time_end_label}</label>
            <input type="time" class="task-time-end-input" value="${taskObj.timeEnd || ''}" style="padding: 2px 4px; border-radius: 4px; border: 1px solid rgba(0,0,0,0.15);">
          </div>
        </div>

        <div class="edit-actions" style="margin-top: 0.25rem;">
          <button class="task-btn ${isEdit ? 'save-edit-btn' : 'save-add-btn'}" style="background: #2563eb; color: #fff; padding: 5px 12px; border: none; border-radius: 6px; font-weight: 600; cursor: pointer;">${isEdit ? labels.save : labels.add}</button>
          <button class="task-btn ${isEdit ? 'cancel-edit-btn' : 'cancel-add-btn'}" style="background: rgba(0,0,0,0.06); padding: 5px 12px; border: none; border-radius: 6px; font-weight: 600; cursor: pointer;">${labels.cancel}</button>
        </div>
      </div>
    `;
  };

  const getFormData = (container) => {
    return {
      description: container.querySelector('.task-desc-input').value.trim(),
      ambito: container.querySelector('.task-ambito-select').value,
      urgencia: container.querySelector('.task-urgencia-select').value,
      importancia: container.querySelector('.task-importancia-select').value,
      dificultad: container.querySelector('.task-dificultad-select').value,
      tiempo: container.querySelector('.task-tiempo-select').value,
      cardColor: container.querySelector('.task-card-color-picker').value,
      cardTextColor: container.querySelector('.task-text-color-picker').value,
      fontSize: container.querySelector('.task-font-size-select').value,
      taskEmoji: container.querySelector('.task-emoji-select').value,
      dateType: container.querySelector('.task-date-type-select').value,
      dateStart: container.querySelector('.task-date-start-input')?.value || '',
      dateEnd: container.querySelector('.task-date-end-input')?.value || '',
      timeType: container.querySelector('.task-time-type-select').value,
      timeStart: container.querySelector('.task-time-start-input')?.value || '',
      timeEnd: container.querySelector('.task-time-end-input')?.value || '',
      column: container.querySelector('.task-column-select')?.value || ''
    };
  };

  const addTask = (text, columnId, metadata) => {
    const newTask = {
      id: 'task-' + Date.now(),
      text: text,
      column: metadata.column || columnId,
      ambito: metadata.ambito || '',
      urgencia: metadata.urgencia || '',
      importancia: metadata.importancia || '',
      dificultad: metadata.dificultad || '',
      tiempo: metadata.tiempo || '',
      cardColor: metadata.cardColor || '#170e30',
      cardTextColor: metadata.cardTextColor || '#ffffff',
      fontSize: metadata.fontSize || 'medium',
      description: metadata.description || '',
      dateType: metadata.dateType || '',
      dateStart: metadata.dateStart || '',
      dateEnd: metadata.dateEnd || '',
      timeType: metadata.timeType || '',
      timeStart: metadata.timeStart || '',
      timeEnd: metadata.timeEnd || '',
      taskEmoji: metadata.taskEmoji || ''
    };
    tasks.push(newTask);
    saveTasks();
  };

  const deleteTask = (id) => {
    tasks = tasks.filter(t => t.id !== id);
    saveTasks();
    renderTasks();
  };

  const updateTask = (id, newText, metadata) => {
    const task = tasks.find(t => t.id === id);
    if (task) {
      task.text = newText;
      task.ambito = metadata.ambito;
      task.urgencia = metadata.urgencia;
      task.importancia = metadata.importancia;
      task.dificultad = metadata.dificultad;
      task.tiempo = metadata.tiempo;
      task.cardColor = metadata.cardColor;
      task.cardTextColor = metadata.cardTextColor;
      task.fontSize = metadata.fontSize;
      task.description = metadata.description;
      task.dateType = metadata.dateType;
      task.dateStart = metadata.dateStart;
      task.dateEnd = metadata.dateEnd;
      task.timeType = metadata.timeType;
      task.timeStart = metadata.timeStart;
      task.timeEnd = metadata.timeEnd;
      task.taskEmoji = metadata.taskEmoji;
      if (metadata.column) {
        task.column = metadata.column;
      }
      saveTasks();
    }
  };

  const moveTaskColumn = (id, targetColumn) => {
    const task = tasks.find(t => t.id === id);
    if (task) {
      task.column = targetColumn;
      saveTasks();
      renderTasks();
    }
  };

  const saveTasksFromDOM = () => {
    const newTasks = [];
    const columns = document.querySelectorAll('.column[data-column]');
    
    columns.forEach(col => {
      const colId = col.dataset.column;
      const cards = col.querySelectorAll('.task-card');
      
      cards.forEach(card => {
        const taskId = card.dataset.id;
        const originalTask = tasks.find(t => t.id === taskId);
        
        let text = '';
        const textSpan = card.querySelector('.task-text');
        if (textSpan) {
          text = textSpan.textContent;
        } else {
          const editInput = card.querySelector('.task-title-input');
          if (editInput) {
            text = editInput.value;
          }
        }

        if (originalTask) {
          newTasks.push({
            ...originalTask,
            column: colId,
            text: text || originalTask.text
          });
        } else {
          newTasks.push({
            id: taskId,
            text: text,
            column: colId,
            ambito: '',
            urgencia: '',
            importancia: '',
            dificultad: '',
            tiempo: '',
            cardColor: '#ffffff',
            cardTextColor: '#1f2937',
            fontSize: 'medium',
            description: '',
            dateType: '',
            dateStart: '',
            dateEnd: '',
            timeType: '',
            timeStart: '',
            timeEnd: '',
            taskEmoji: ''
          });
        }
      });
    });

    tasks = newTasks;
    saveTasks();
  };

  const getDragAfterElement = (container, y) => {
    const draggableElements = [...container.querySelectorAll('.task-card:not(.dragging)')];
    
    return draggableElements.reduce((closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
  };

  // Render function for category breakdowns at the bottom of the page
  const renderCriteriaBreakdowns = () => {
    const labels = getDynamicLabels();
    const lang = localStorage.getItem('app-language') || 'es';

    const formatDate = (dateStr) => {
      if (!dateStr) return '';
      const parts = dateStr.split('-');
      if (parts.length === 3) {
        return `${parts[2]}/${parts[1]}/${parts[0]}`;
      }
      return dateStr;
    };

    const lists = document.querySelectorAll('.criteria-task-list');
    lists.forEach(list => {
      const key = list.dataset.criteriaKey;
      const val = list.dataset.criteriaVal;
      list.innerHTML = '';
      
      const filteredTasks = tasks.filter(t => t[key] === val && t.column !== 'deleted');
      if (filteredTasks.length === 0) {
        const li = document.createElement('li');
        li.innerHTML = `<em style="opacity: 0.5;">${labels.empty_tasks}</em>`;
        list.appendChild(li);
      } else {
        // Sort category tasks chronologically too
        const sortedFiltered = sortTasksChronologically(filteredTasks);
        sortedFiltered.forEach(task => {
          const li = document.createElement('li');
          const prefix = task.column === 'done' ? '✅ ' : '❌ ';
          
          let emoji = '';
          if (task.taskEmoji) {
            emoji = task.taskEmoji + ' ';
          }
          
          let datePart = '';
          let timePart = '';
          if (task.dateType === 'single' && task.dateStart) {
            datePart = `${formatDate(task.dateStart)}`;
          } else if (task.dateType === 'range' && task.dateStart && task.dateEnd) {
            datePart = `${formatDate(task.dateStart)} - ${formatDate(task.dateEnd)}`;
          }

          if (task.timeType === 'single' && task.timeStart) {
            timePart = `${task.timeStart}`;
          } else if (task.timeType === 'range' && task.timeStart && task.timeEnd) {
            timePart = `${task.timeStart} - ${task.timeEnd}`;
          }

          let scheduleText = '';
          if (datePart || timePart) {
            scheduleText = ` [📅 ${datePart || ''}${datePart && timePart ? ' | ' : ''}🕒 ${timePart || ''}]`;
          }

          li.textContent = prefix + emoji + task.text + scheduleText;
          if (task.column === 'done') {
            li.style.textDecoration = 'line-through';
            li.style.opacity = '0.6';
          }
          list.appendChild(li);
        });
      }
    });
  };

  // Main Render Function for Column Boards
  window.renderTasks = () => {
    const labels = getDynamicLabels();
    const lang = localStorage.getItem('app-language') || 'es';
    const dict = window.translations ? (window.translations[lang] || window.translations.es) : {};

    // Update header add tooltip dynamically
    const addBtnTooltip = document.querySelector('.column-add-btn[data-column="not-done"] .add-tooltip-content');
    if (addBtnTooltip) {
      addBtnTooltip.innerHTML = dict.add_tooltip || '';
    }

    const formatDate = (dateStr) => {
      if (!dateStr) return '';
      const parts = dateStr.split('-');
      if (parts.length === 3) {
        return `${parts[2]}/${parts[1]}/${parts[0]}`;
      }
      return dateStr;
    };

    const columns = document.querySelectorAll('.column[data-column]');
    
    columns.forEach(col => {
      const columnId = col.dataset.column;
      let list = col.querySelector('ul.task-list');
      
      if (!list) {
        list = col.querySelector('ul');
        if (list) {
          list.className = 'task-list';
        } else {
          list = document.createElement('ul');
          list.className = 'task-list';
          col.appendChild(list);
        }
      }

      list.innerHTML = '';
      // Filter tasks by column and sort them chronologically
      const columnTasks = sortTasksChronologically(tasks.filter(t => t.column === columnId));

      columnTasks.forEach(task => {
        const li = document.createElement('li');
        li.className = 'task-card';
        li.dataset.id = task.id;

        // Apply custom backgrounds and sizes dynamically
        if (task.cardColor) {
          li.style.setProperty('background-color', task.cardColor, 'important');
        }

        const textColor = task.cardTextColor || (getLuminance(task.cardColor || '#ffffff') < 0.5 ? '#ffffff' : '#1f2937');
        li.style.setProperty('color', textColor, 'important');
        li.style.setProperty('--text-color', textColor, 'important');

        if (task.cardColor) {
          const isDarkText = getLuminance(textColor) < 0.5;
          li.style.setProperty('border-color', isDarkText ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.15)', 'important');
        }

        if (task.fontSize) {
          const fontSizes = { small: '0.8rem', medium: '0.95rem', large: '1.25rem' };
          li.style.fontSize = fontSizes[task.fontSize] || fontSizes.medium;
        }

        if (editingTaskId === task.id) {
          li.classList.add('editing');
          
          li.innerHTML = getFormHtml(task, true);
          bindFormEvents(li);

          const titleInput = li.querySelector('.task-title-input');
          const saveBtn = li.querySelector('.save-edit-btn');
          const cancelBtn = li.querySelector('.cancel-edit-btn');

          const saveEdit = () => {
            const newText = titleInput.value.trim();
            if (newText) {
              const meta = getFormData(li);
              updateTask(task.id, newText, meta);
            }
            editingTaskId = null;
            renderTasks();
          };

          saveBtn.addEventListener('click', saveEdit);
          titleInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') saveEdit();
            if (e.key === 'Escape') {
              editingTaskId = null;
              renderTasks();
            }
          });
          cancelBtn.addEventListener('click', () => {
            editingTaskId = null;
            renderTasks();
          });

          setTimeout(() => titleInput.focus(), 0);
        } else {
          // Render normal card with badges
          const isDone = columnId === 'done';
          if (isDone) {
            li.classList.add('completed');
          }
          const isDeleted = columnId === 'deleted';
          if (isDeleted) {
            li.classList.add('deleted-card');
          }

          // Build dynamic emoticon prefix next to title (fallback or category specific)
          let emojiPrefix = '';
          if (task.taskEmoji) {
            emojiPrefix = `<span class="task-main-emoji" style="margin-right: 0.35rem; font-style: normal; font-size: 1.15rem;">${task.taskEmoji}</span>`;
          }

          // Build status text ✓ Vamos avanzando if Hecho, or encouragement text if Pendiente
          let statusTextHtml = '';
          if (isDone) {
            statusTextHtml = `
              <div class="task-status-text" style="color: #00f59b; font-size: 0.85rem; font-weight: 700; margin: 0.25rem 0 0.4rem 0; line-height: 1.35;">
                ✓ Vamos avanzando
                ${task.id === 'task-1' ? `<div style="font-size: 0.75rem; font-weight: 500; opacity: 0.85; margin-top: 2px;">(El tick "✓" significa tarea realizada)</div>` : ''}
              </div>
            `;
          } else if (columnId === 'not-done') {
            const encouragementText = lang === 'en' ? 'Keep it up!' 
                                    : lang === 'fr' ? 'Bon courage !'
                                    : lang === 'de' ? 'Kopf hoch!'
                                    : lang === 'it' ? 'Forza!'
                                    : lang === 'pt' ? 'Força!'
                                    : lang === 'ca' ? "Molt d'ànim!"
                                    : lang === 'gl' ? 'Moito ánimo!'
                                    : lang === 'eu' ? 'Eutsi goiari!'
                                    : '¡Mucho ánimo!';
            statusTextHtml = `
              <div class="task-status-text" style="color: #ef4444; font-size: 0.85rem; font-weight: 700; margin: 0.25rem 0 0.4rem 0; line-height: 1.35;">
                ${encouragementText}
              </div>
            `;
          }

          // Build description HTML
          let descHtml = '';
          if (task.description) {
            descHtml = `<div class="task-description" style="font-size: 0.88rem; color: #f1f5f9; margin: 0.35rem 0 0.5rem 0; line-height: 1.5; text-align: left;">${task.description}</div>`;
          }

          // Build custom vertical metadata stack matching Figma mockup
          const getDaysCountText = (startStr, endStr) => {
            if (!startStr || !endStr) return '';
            const start = new Date(startStr);
            const end = new Date(endStr);
            const diffTime = Math.abs(end - start);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            const daysLabel = lang === 'en' ? 'days' : 'días';
            return ` (${diffDays} ${daysLabel})`;
          };

          let ambitoRow = '';
          if (task.ambito) {
            const labelsMap = {
              familia: lang === 'en' ? 'Family' : 'Familiar',
              personal: lang === 'en' ? 'Personal' : 'Personal',
              social: lang === 'en' ? 'Social' : 'Social',
              laboral: lang === 'en' ? 'Work' : 'Laboral',
              ocio: lang === 'en' ? 'Leisure' : 'Ocio',
              salud: lang === 'en' ? 'Health' : 'Salud',
              hogar: lang === 'en' ? 'Home' : 'Hogar',
              finanzas: lang === 'en' ? 'Finance' : 'Finanzas'
            };
            const emojisMap = {
              familia: '👥', personal: '👤', social: '🤝',
              laboral: '💼', ocio: '🎮', salud: '🩺',
              hogar: '🏠', finanzas: '💰'
            };
            const colorsMap = {
              familia: '#f472b6', personal: '#818cf8', social: '#60a5fa',
              laboral: '#fbbf24', ocio: '#a78bfa', salud: '#34d399',
              hogar: '#22d3ee', finanzas: '#2dd4bf'
            };
            const label = labelsMap[task.ambito] || task.ambito;
            const emoji = emojisMap[task.ambito] || '📁';
            const color = colorsMap[task.ambito] || '#ffffff';
            ambitoRow = `<div><span style="color: #a78bfa; font-weight: 600;">Ámbito:</span> ${emoji} <span style="color: ${color}; font-weight: 500;">${label}</span></div>`;
          }

          let urgenciaRow = '';
          if (task.urgencia) {
            const labelsMap = {
              alta: lang === 'en' ? 'High' : 'Alta',
              media: lang === 'en' ? 'Medium' : 'Media',
              baja: lang === 'en' ? 'Low' : 'Baja'
            };
            const colorsMap = {
              alta: '#f87171',
              media: '#fbbf24',
              baja: '#34d399'
            };
            const label = labelsMap[task.urgencia] || task.urgencia;
            const color = colorsMap[task.urgencia] || '#ffffff';
            urgenciaRow = `<div><span style="color: #a78bfa; font-weight: 600;">🚨 Urgencia:</span> <span style="color: ${color}; font-weight: 500;">${label}</span></div>`;
          }

          let importanciaRow = '';
          if (task.importancia) {
            const labelsMap = {
              alta: lang === 'en' ? 'High' : 'Alta',
              muy: lang === 'en' ? 'High' : 'Alta',
              media: lang === 'en' ? 'Medium' : 'Media',
              importante: lang === 'en' ? 'Medium' : 'Media',
              baja: lang === 'en' ? 'Low' : 'Baja',
              menos: lang === 'en' ? 'Low' : 'Baja'
            };
            const colorsMap = {
              alta: '#60a5fa',
              muy: '#60a5fa',
              media: '#a78bfa',
              importante: '#a78bfa',
              baja: '#94a3b8',
              menos: '#94a3b8'
            };
            const label = labelsMap[task.importancia] || task.importancia;
            const color = colorsMap[task.importancia] || '#ffffff';
            importanciaRow = `<div><span style="color: #a78bfa; font-weight: 600;">💎 Importancia:</span> <span style="color: ${color}; font-weight: 500;">${label}</span></div>`;
          }

          let dificultadRow = '';
          if (task.dificultad) {
            const labelsMap = {
              alta: lang === 'en' ? 'High' : 'Alta',
              media: lang === 'en' ? 'Medium' : 'Media',
              baja: lang === 'en' ? 'Low' : 'Baja'
            };
            const colorsMap = {
              alta: '#f472b6',
              media: '#06b6d4',
              baja: '#34d399'
            };
            const label = labelsMap[task.dificultad] || task.dificultad;
            const color = colorsMap[task.dificultad] || '#ffffff';
            dificultadRow = `<div><span style="color: #a78bfa; font-weight: 600;">🧩 Dificultad:</span> <span style="color: ${color}; font-weight: 500;">${label}</span></div>`;
          }

          let dateRow = '';
          let datePart = '';
          if (task.dateType === 'single' && task.dateStart) {
            datePart = formatDate(task.dateStart);
          } else if (task.dateType === 'range' && task.dateStart && task.dateEnd) {
            datePart = `${formatDate(task.dateStart)} - ${formatDate(task.dateEnd)}${getDaysCountText(task.dateStart, task.dateEnd)}`;
          }
          if (datePart) {
            dateRow = `<div><span style="color: #a78bfa; font-weight: 600;">📅</span> <span style="color: #cbd5e1; font-weight: 500;">${datePart}</span></div>`;
          }

          let timeRow = '';
          let timePart = '';
          if (task.timeType === 'single' && task.timeStart) {
            timePart = task.timeStart;
          } else if (task.timeType === 'range' && task.timeStart && task.timeEnd) {
            timePart = `${task.timeStart} - ${task.timeEnd}`;
          }
          if (timePart) {
            timeRow = `<div><span style="color: #a78bfa; font-weight: 600;">🕒 Horario:</span> <span style="color: #cbd5e1; font-weight: 500;">${timePart}</span></div>`;
          }

          let metadataListHtml = '';
          if (ambitoRow || urgenciaRow || importanciaRow || dificultadRow || dateRow || timeRow) {
            metadataListHtml = `
              <div class="task-metadata-list" style="margin-top: 0.65rem; display: flex; flex-direction: column; gap: 4px; font-size: 0.84rem; width: 100%; border-top: 1px solid rgba(255,255,255,0.06); padding-top: 0.5rem; text-align: left; line-height: 1.5;">
                ${ambitoRow}
                ${urgenciaRow}
                ${importanciaRow}
                ${dificultadRow}
                ${dateRow}
                ${timeRow}
              </div>
            `;
          }

          const titleColor = task.cardTextColor && task.cardTextColor !== '#1f2937' ? task.cardTextColor : '#00f59b';

          let doneActionsHtml = '';
          if (isDone) {
            const tooltipText = lang === 'en' ? 'Mark as not done' : 'Marcar como no realizada';
            doneActionsHtml = `<button class="task-btn mark-not-done-btn" title="${tooltipText}" style="padding: 2px; font-size: 0.85rem; opacity: 0.85; transition: opacity 0.2s; background: transparent; border: none; cursor: pointer;">↩️</button>`;
          }

          let deletedActionsHtml = '';
          if (columnId === 'deleted') {
            deletedActionsHtml = `
              <button class="task-btn recover-btn" style="padding: 2px; font-size: 0.85rem; opacity: 0.85; transition: opacity 0.2s; background: transparent; border: none; cursor: pointer; position: relative;">
                🔄
                <span class="rich-tooltip-content recover-tooltip-content">${dict.task_restore_tooltip || 'Recuperar como pendiente, en proceso o hecho'}</span>
              </button>
            `;
          }

          li.setAttribute('draggable', 'true');
          const deleteTooltip = columnId === 'deleted' ? (dict.task_delete_perm || 'Eliminar permanentemente') : (lang === 'en' ? 'Delete' : 'Eliminar');
          
          li.innerHTML = `
            <div class="task-header" style="display: flex; justify-content: space-between; align-items: flex-start; gap: 0.5rem; width: 100%;">
              <span class="task-text-container" style="display: flex; align-items: center; flex-wrap: wrap;">
                ${emojiPrefix}
                <span class="task-text" style="font-weight: 700; color: ${titleColor}; font-size: 1.05rem; line-height: 1.35;">${task.text}</span>
              </span>
              <div class="task-actions-top" style="display: flex; gap: 6px; flex-shrink: 0; align-items: center;">
                ${doneActionsHtml}
                ${deletedActionsHtml}
                ${columnId !== 'deleted' ? `
                  <button class="task-btn edit-btn" style="padding: 2px; font-size: 0.85rem; opacity: 0.85; transition: opacity 0.2s; position: relative;">
                    ✏️
                    <span class="rich-tooltip-content edit-tooltip-content">${dict.edit_tooltip || ''}</span>
                  </button>
                ` : ''}
                <button class="task-btn delete-btn" title="${deleteTooltip}" style="padding: 2px; font-size: 0.85rem; opacity: 0.85; transition: opacity 0.2s;">🗑️</button>
              </div>
            </div>
            <div class="task-content" style="display: flex; flex-direction: column; width: 100%; overflow: hidden; margin-top: 2px;">
              ${statusTextHtml}
              ${descHtml}
              ${metadataListHtml}
            </div>
          `;

          // Action Listeners
          if (isDone) {
            li.querySelector('.mark-not-done-btn').addEventListener('click', (e) => {
              e.stopPropagation();
              task.column = 'not-done';
              saveTasks();
              renderTasks();
            });
          }

          if (columnId === 'deleted') {
            li.querySelector('.recover-btn').addEventListener('click', (e) => {
              e.stopPropagation();
              task.column = task.prevColumn || 'not-done';
              delete task.prevColumn;
              saveTasks();
              renderTasks();
            });
          }

          li.querySelector('.delete-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            if (columnId === 'deleted') {
              const confirmMsg = dict.confirm_delete_perm || (lang === 'en' 
                ? `Are you sure you want to permanently delete "${task.text}"?`
                : `¿Estás seguro de eliminar permanentemente la tarea "${task.text}"?`);
              if (confirm(confirmMsg)) {
                deleteTask(task.id);
              }
            } else {
              task.prevColumn = task.column;
              task.column = 'deleted';
              saveTasks();
              renderTasks();
            }
          });

          if (columnId !== 'deleted') {
            li.querySelector('.edit-btn').addEventListener('click', (e) => {
              e.stopPropagation();
              editingTaskId = task.id;
              renderTasks();
            });

            li.querySelector('.task-text').addEventListener('dblclick', () => {
              editingTaskId = task.id;
              renderTasks();
            });
          }
          });

          // Drag Events
          li.addEventListener('dragstart', (e) => {
            li.classList.add('dragging');
            e.dataTransfer.setData('text/plain', task.id);
          });

          li.addEventListener('dragend', () => {
            li.classList.remove('dragging');
            document.querySelectorAll('.task-list').forEach(tl => tl.classList.remove('drag-over'));
            saveTasksFromDOM();
            renderTasks();
          });
        }

        list.appendChild(li);
      });

      // Drag and drop column list events
      list.addEventListener('dragover', (e) => {
        e.preventDefault();
        list.classList.add('drag-over');
        const draggingCard = document.querySelector('.dragging');
        if (draggingCard) {
          const afterElement = getDragAfterElement(list, e.clientY);
          if (afterElement == null) {
            list.appendChild(draggingCard);
          } else {
            list.insertBefore(draggingCard, afterElement);
          }
        }
      });

      list.addEventListener('dragleave', () => {
        list.classList.remove('drag-over');
      });

      list.addEventListener('drop', (e) => {
        e.preventDefault();
        list.classList.remove('drag-over');
        saveTasksFromDOM();
        renderTasks();
      });

       // Render Add Task Form/Trigger or Guide Box
      let addContainer = col.querySelector('.add-task-container');
      if (addContainer) {
        addContainer.remove();
      }
      let guideContainer = col.querySelector('.board-guide-box');
      if (guideContainer) {
        guideContainer.remove();
      }

      if (columnId === 'not-done') {
        addContainer = document.createElement('div');
        addContainer.className = 'add-task-container';

        if (activeAddColumn === columnId) {
          addContainer.innerHTML = getFormHtml({}, false);
          bindFormEvents(addContainer);

          const input = addContainer.querySelector('.task-title-input');
          const saveBtn = addContainer.querySelector('.save-add-btn');
          const cancelBtn = addContainer.querySelector('.cancel-add-btn');

          const saveAdd = () => {
            const text = input.value.trim();
            if (text) {
              const meta = getFormData(addContainer);
              addTask(text, columnId, meta);
              activeAddColumn = null;
              renderTasks();
            }
          };

          saveBtn.addEventListener('click', saveAdd);
          input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') saveAdd();
            if (e.key === 'Escape') {
              activeAddColumn = null;
              renderTasks();
            }
          });
          cancelBtn.addEventListener('click', () => {
            activeAddColumn = null;
            renderTasks();
          });

          setTimeout(() => input.focus(), 0);
        } else {
          const addBtnText = lang === 'en' ? '+ Add task' : '+ Añadir tarea';
          addContainer.innerHTML = `<button class="add-task-btn">${addBtnText}</button>`;
          addContainer.querySelector('.add-task-btn').addEventListener('click', () => {
            activeAddColumn = columnId;
            renderTasks();
          });
        }

        col.appendChild(addContainer);
      } else if (columnId === 'deleted') {
        // Render permanent guide box in Deleted column
        guideContainer = document.createElement('div');
        guideContainer.className = 'board-guide-box';
        guideContainer.style.cssText = `
          margin-top: 1.25rem;
          padding: 0.95rem;
          background: rgba(255, 255, 255, 0.02);
          border: 1px dashed rgba(239, 68, 68, 0.35);
          border-radius: 14px;
          font-size: 0.76rem;
          line-height: 1.45;
          color: #cbd5e1;
        `;
        
        const guideTitle = lang === 'en' ? '📋 Actions Guide' : '📋 Guía de Acciones';
        const restoreText = `<strong>🔄 ${dict.task_restore || 'Recuperar tarea'}</strong>:<br>${dict.task_restore_tooltip || 'Recuperar como pendiente, en proceso o hecho.'}`;
        const editText = dict.edit_tooltip || '';
        
        guideContainer.innerHTML = `
          <div style="font-weight: 700; color: #ef4444; margin-bottom: 0.5rem; display: flex; align-items: center; gap: 6px; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.5px;">
            <span>📋</span> <span>${guideTitle}</span>
          </div>
          <div style="margin-bottom: 0.65rem; border-bottom: 1px solid rgba(255,255,255,0.06); padding-bottom: 0.65rem;">
            ${restoreText}
          </div>
          <div>
            ${editText}
          </div>
        `;
        col.appendChild(guideContainer);
      }
    });

    renderCriteriaBreakdowns(); // Update category details list breakdowns
  };

  // Bind column header add buttons (+ buttons)
  document.querySelectorAll('.column-add-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const colId = btn.getAttribute('data-column');
      if (colId) {
        activeAddColumn = colId;
        renderTasks();
      }
    });
  });

  // Bind instructions toggle help button
  const toggleInstructionsBtn = document.getElementById('toggle-instructions-btn');
  const boardIntro = document.querySelector('.board-intro');
  const instructionsArrow = document.getElementById('instructions-arrow');

  if (toggleInstructionsBtn && boardIntro) {
    // Read instructions visibility preference from localStorage
    const savedVisibility = localStorage.getItem('board-instructions-visible');
    
    // Default to visible if not set
    if (savedVisibility === 'false') {
      boardIntro.classList.add('collapsed');
      if (instructionsArrow) {
        instructionsArrow.style.opacity = '0';
        instructionsArrow.style.transform = 'scale(0.8) rotate(-15deg)';
      }
    }

    toggleInstructionsBtn.addEventListener('click', () => {
      const isCurrentlyCollapsed = boardIntro.classList.contains('collapsed');
      if (isCurrentlyCollapsed) {
        // Expand
        boardIntro.classList.remove('collapsed');
        localStorage.setItem('board-instructions-visible', 'true');
        if (instructionsArrow) {
          instructionsArrow.style.opacity = '1';
          instructionsArrow.style.transform = 'rotate(-5deg)';
        }
      } else {
        // Collapse
        boardIntro.classList.add('collapsed');
        localStorage.setItem('board-instructions-visible', 'false');
        if (instructionsArrow) {
          instructionsArrow.style.opacity = '0';
          instructionsArrow.style.transform = 'scale(0.8) rotate(-15deg)';
        }
      }
    });
  }

  // Run initial render
  renderTasks();
});
