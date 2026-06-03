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
      empty_tasks: dict.empty_tasks || 'No hay tareas',
      connect_word: dict.form_connect_word || 'al',
      connect_time: dict.form_connect_time || 'a'
    };
  };

  // Default seeded tasks for the board
  const defaultTasks = [
    { id: 'task-1', text: 'Preparar cena familiar', column: 'done', ambito: 'familia', urgencia: 'alta', importancia: 'muy', dificultad: 'baja', tiempo: 'poco', cardColor: '#ffffff', fontSize: 'medium', description: 'Reunión en casa de los abuelos', dateType: 'single', dateStart: '2026-06-03', timeType: 'single', timeStart: '20:30', taskEmoji: '👪' },
    { id: 'task-2', text: 'Hacer ejercicio matutino', column: 'done', ambito: 'personal', urgencia: 'media', importancia: 'importante', dificultad: 'media', tiempo: 'medio', cardColor: '#ffffff', fontSize: 'medium', description: 'Correr en el parque 30 min', dateType: 'single', dateStart: '2026-06-03', timeType: 'single', timeStart: '07:30', taskEmoji: '👤' },
    { id: 'task-3', text: 'Quedar con amigos', column: 'done', ambito: 'social', urgencia: 'baja', importancia: 'menos', dificultad: 'baja', tiempo: 'poco', cardColor: '#ffffff', fontSize: 'medium', description: 'Tomar café en la plaza', dateType: 'single', dateStart: '2026-06-04', timeType: 'single', timeStart: '17:00', taskEmoji: '👥' },
    { id: 'task-4', text: 'Entregar informe del proyecto', column: 'not-done', ambito: 'laboral', urgencia: 'alta', importancia: 'muy', dificultad: 'alta', tiempo: 'largo', cardColor: '#ffffff', fontSize: 'medium', description: 'Enviar pdf firmado por email', dateType: 'single', dateStart: '2026-06-05', timeType: 'single', timeStart: '12:00', taskEmoji: '💼' },
    { id: 'task-5', text: 'Comprar entradas cine', column: 'not-done', ambito: 'ocio', urgencia: 'media', importancia: 'importante', dificultad: 'media', tiempo: 'medio', cardColor: '#ffffff', fontSize: 'medium', description: 'Función del viernes noche', dateType: 'single', dateStart: '2026-06-05', timeType: 'single', timeStart: '18:00', taskEmoji: '🎭' },
    { id: 'task-6', text: 'Revisión médica anual', column: 'not-done', ambito: 'salud', urgencia: 'baja', importancia: 'menos', dificultad: 'baja', tiempo: 'poco', cardColor: '#ffffff', fontSize: 'medium', description: 'Analítica de sangre rutinaria', dateType: 'single', dateStart: '2026-06-08', timeType: 'single', timeStart: '09:00', taskEmoji: '❤️' },
    { id: 'task-7', text: 'Limpieza a fondo cocina', column: 'in-progress', ambito: 'hogar', urgencia: 'alta', importancia: 'muy', dificultad: 'media', tiempo: 'medio', cardColor: '#ffffff', fontSize: 'medium', description: 'Limpiar horno y armarios', dateType: 'range', dateStart: '2026-06-03', dateEnd: '2026-06-04', timeType: 'range', timeStart: '16:00', timeEnd: '18:00', taskEmoji: '🏠' },
    { id: 'task-8', text: 'Pagar facturas pendientes', column: 'in-progress', ambito: 'finanzas', urgencia: 'media', importancia: 'importante', dificultad: 'baja', tiempo: 'poco', cardColor: '#ffffff', fontSize: 'medium', description: 'Factura de luz y wifi', dateType: 'single', dateStart: '2026-06-04', timeType: 'single', timeStart: '10:00', taskEmoji: '💰' },
    { id: 'task-9', text: 'Estudiar temario oposiciones', column: 'in-progress', ambito: 'laboral', urgencia: 'baja', importancia: 'menos', dificultad: 'alta', tiempo: 'largo', cardColor: '#ffffff', fontSize: 'medium', description: 'Temas del 10 al 15 completos', dateType: 'range', dateStart: '2026-06-01', dateEnd: '2026-06-07', timeType: 'range', timeStart: '08:00', timeEnd: '11:00', taskEmoji: '🧗' }
  ];

  const currentDbVersion = 'v3';
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
      fontSize: container.querySelector('.task-font-size-select').value,
      taskEmoji: container.querySelector('.task-emoji-select').value,
      dateType: container.querySelector('.task-date-type-select').value,
      dateStart: container.querySelector('.task-date-start-input')?.value || '',
      dateEnd: container.querySelector('.task-date-end-input')?.value || '',
      timeType: container.querySelector('.task-time-type-select').value,
      timeStart: container.querySelector('.task-time-start-input')?.value || '',
      timeEnd: container.querySelector('.task-time-end-input')?.value || ''
    };
  };

  const addTask = (text, columnId, metadata) => {
    const newTask = {
      id: 'task-' + Date.now(),
      text: text,
      column: columnId,
      ambito: metadata.ambito || '',
      urgencia: metadata.urgencia || '',
      importancia: metadata.importancia || '',
      dificultad: metadata.dificultad || '',
      tiempo: metadata.tiempo || '',
      cardColor: metadata.cardColor || '#ffffff',
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
      task.fontSize = metadata.fontSize;
      task.description = metadata.description;
      task.dateType = metadata.dateType;
      task.dateStart = metadata.dateStart;
      task.dateEnd = metadata.dateEnd;
      task.timeType = metadata.timeType;
      task.timeStart = metadata.timeStart;
      task.timeEnd = metadata.timeEnd;
      task.taskEmoji = metadata.taskEmoji;
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
      
      const filteredTasks = tasks.filter(t => t[key] === val);
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
          li.style.backgroundColor = task.cardColor;
          const lum = getLuminance(task.cardColor);
          const textColor = lum < 0.5 ? '#ffffff' : '#1f2937';
          li.style.color = textColor;
          li.style.setProperty('--text-color', textColor);
          li.style.borderColor = lum < 0.5 ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.08)';
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
          const toggleSymbol = isDone ? '✅' : '❌';
          const toggleTitle = isDone 
            ? (lang === 'en' ? 'Mark as pending' : 'Marcar como pendiente') 
            : (lang === 'en' ? 'Mark as completed' : 'Marcar como completada');
          
          if (isDone) {
            li.classList.add('completed');
          }

          // Build dynamic emoticon prefix next to title
          let emojiPrefix = '';
          if (task.taskEmoji) {
            emojiPrefix = `<span class="task-main-emoji" style="margin-right: 0.35rem; font-style: normal; font-size: 1.15rem;">${task.taskEmoji}</span>`;
          } else {
            // Fallback: build dynamic emoticons prefix of active categories
            let fallbacks = '';
            if (task.ambito) {
              const emojis = {
                familia: '👪', personal: '👤', social: '👥',
                laboral: '💼', ocio: '🎭', salud: '❤️',
                hogar: '🏠', finanzas: '💰'
              };
              fallbacks += (emojis[task.ambito] || '') + ' ';
            }
            if (task.urgencia) {
              const emojis = { alta: '🔴', media: '🟡', baja: '🟢' };
              fallbacks += (emojis[task.urgencia] || '') + ' ';
            }
            if (task.importancia) {
              const emojis = { muy: '🔥', importante: '⭐', menos: '💤' };
              fallbacks += (emojis[task.importancia] || '') + ' ';
            }
            if (task.dificultad) {
              const emojis = { alta: '🧗', media: '⚙️', baja: '🌱' };
              fallbacks += (emojis[task.dificultad] || '') + ' ';
            }
            if (task.tiempo) {
              const emojis = { poco: '⏱️', medio: '⏳', largo: '📅' };
              fallbacks += (emojis[task.tiempo] || '') + ' ';
            }
            if (fallbacks) {
              emojiPrefix = `<span class="task-title-emojis" style="margin-right: 0.35rem; font-style: normal; letter-spacing: 0.1rem;">${fallbacks.trim()}</span>`;
            }
          }

          // Build description HTML
          let descHtml = '';
          if (task.description) {
            descHtml = `<div class="task-description" style="font-size: 0.8rem; opacity: 0.75; margin: 0.25rem 0 0.4rem 0; font-style: italic; line-height: 1.3;">${task.description}</div>`;
          }

          // Build scheduling HTML
          let scheduleHtml = '';
          let datePart = '';
          let timePart = '';

          if (task.dateType === 'single' && task.dateStart) {
            datePart = `📅 ${formatDate(task.dateStart)}`;
          } else if (task.dateType === 'range' && task.dateStart && task.dateEnd) {
            datePart = `📅 ${formatDate(task.dateStart)} ${labels.connect_word} ${formatDate(task.dateEnd)}`;
          }

          if (task.timeType === 'single' && task.timeStart) {
            timePart = `🕒 ${task.timeStart}`;
          } else if (task.timeType === 'range' && task.timeStart && task.timeEnd) {
            timePart = `🕒 ${task.timeStart} ${labels.connect_time} ${task.timeEnd}`;
          }

          if (datePart || timePart) {
            scheduleHtml = `
              <div class="task-schedule-info" style="display: flex; flex-direction: column; gap: 2px; font-size: 0.72rem; opacity: 0.8; margin-top: 0.25rem; font-weight: 600;">
                ${datePart ? `<div>${datePart}</div>` : ''}
                ${timePart ? `<div>${timePart}</div>` : ''}
              </div>
            `;
          }

          // Build dynamic badges HTML
          let badgesHtml = '';
          if (task.ambito) {
            const labelsMap = {
              familia: lang === 'en' ? '👪 Family' : '👪 Familia',
              personal: lang === 'en' ? '👤 Personal' : '👤 Personal',
              social: lang === 'en' ? '👥 Social' : '👥 Social',
              laboral: lang === 'en' ? '💼 Work' : '💼 Laboral',
              ocio: lang === 'en' ? '🎭 Leisure' : '🎭 Ocio',
              salud: lang === 'en' ? '❤️ Health' : '❤️ Salud',
              hogar: lang === 'en' ? '🏠 Home' : '🏠 Hogar',
              finanzas: lang === 'en' ? '💰 Finance' : '💰 Finanzas'
            };
            badgesHtml += `<span class="tag tag-ambito tag-ambito-${task.ambito}">${labelsMap[task.ambito]}</span>`;
          }
          if (task.urgencia) {
            const labelsMap = {
              alta: lang === 'en' ? '🔴 High' : '🔴 Alta',
              media: lang === 'en' ? '🟡 Medium' : '🟡 Media',
              baja: lang === 'en' ? '🟢 Low' : '🟢 Baja'
            };
            badgesHtml += `<span class="tag tag-urgencia-${task.urgencia}">${labelsMap[task.urgencia]}</span>`;
          }
          if (task.importancia) {
            const labelsMap = {
              muy: lang === 'en' ? '🔥 Very' : '🔥 Muy',
              importante: lang === 'en' ? '⭐ Imp.' : '⭐ Imp.',
              menos: lang === 'en' ? '💤 Less' : '💤 Menos'
            };
            badgesHtml += `<span class="tag tag-importancia-${task.importancia}">${labelsMap[task.importancia]}</span>`;
          }
          if (task.dificultad) {
            const labelsMap = {
              alta: lang === 'en' ? '🧗 High' : '🧗 Alta',
              media: lang === 'en' ? '⚙️ Medium' : '⚙️ Media',
              baja: lang === 'en' ? '🌱 Low' : '🌱 Baja'
            };
            badgesHtml += `<span class="tag tag-dificultad-${task.dificultad}">${labelsMap[task.dificultad]}</span>`;
          }
          if (task.tiempo) {
            const labelsMap = {
              poco: lang === 'en' ? '⏱️ Little' : '⏱️ Poco',
              medio: lang === 'en' ? '⏳ Medium' : '⏳ Medio',
              largo: lang === 'en' ? '📅 Long' : '📅 Largo'
            };
            badgesHtml += `<span class="tag tag-tiempo-${task.tiempo}">${labelsMap[task.tiempo]}</span>`;
          }
          
          li.setAttribute('draggable', 'true');
          li.innerHTML = `
            <button class="task-btn status-toggle-btn" title="${toggleTitle}">${toggleSymbol}</button>
            <div class="task-content" style="display: flex; flex-direction: column; width: 100%; overflow: hidden;">
              <span class="task-text-container" style="display: flex; align-items: center; flex-wrap: wrap;">
                ${emojiPrefix}
                <span class="task-text" style="font-weight: 700;">${task.text}</span>
              </span>
              ${descHtml}
              ${scheduleHtml}
              ${badgesHtml ? `<div class="task-tags">${badgesHtml}</div>` : ''}
            </div>
            <div class="task-actions">
              <select class="task-move-select" aria-label="${labels.col_dest}">
                <option value="done" ${columnId === 'done' ? 'selected' : ''}>${labels.col_done}</option>
                <option value="not-done" ${columnId === 'not-done' ? 'selected' : ''}>${labels.col_not_done}</option>
                <option value="in-progress" ${columnId === 'in-progress' ? 'selected' : ''}>${labels.col_in_progress}</option>
              </select>
              <button class="task-btn edit-btn" title="Editar">✏️</button>
              <button class="task-btn delete-btn" title="Eliminar">🗑️</button>
            </div>
          `;

          // Action Listeners
          li.querySelector('.status-toggle-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            const newColumn = isDone ? 'not-done' : 'done';
            moveTaskColumn(task.id, newColumn);
          });

          li.querySelector('.delete-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            const confirmMsg = lang === 'en' 
              ? `Are you sure you want to delete "${task.text}"?`
              : `¿Estás seguro de eliminar la tarea "${task.text}"?`;
            if (confirm(confirmMsg)) {
              deleteTask(task.id);
            }
          });

          li.querySelector('.edit-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            editingTaskId = task.id;
            renderTasks();
          });

          li.querySelector('.task-move-select').addEventListener('change', (e) => {
            moveTaskColumn(task.id, e.target.value);
          });

          li.querySelector('.task-text').addEventListener('dblclick', () => {
            editingTaskId = task.id;
            renderTasks();
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

      // Render Add Task Form/Trigger
      let addContainer = col.querySelector('.add-task-container');
      if (addContainer) {
        addContainer.remove();
      }

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
    });

    renderCriteriaBreakdowns(); // Update category details list breakdowns
  };

  // Run initial render
  renderTasks();
});
