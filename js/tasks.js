document.addEventListener('DOMContentLoaded', () => {
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

  const currentDbVersion = 'v6';
  let tasks = JSON.parse(localStorage.getItem('todo-tasks'));
  const dbVersion = localStorage.getItem('todo-tasks-version');
  const needsMigration = !tasks || !Array.isArray(tasks) || tasks.length === 0 || dbVersion !== currentDbVersion;

  if (needsMigration) {
    tasks = defaultTasks;
    localStorage.setItem('todo-tasks', JSON.stringify(tasks));
    localStorage.setItem('todo-tasks-version', currentDbVersion);
  }

  const sortTasksChronologically = (taskList) => {
    return [...taskList].sort((a, b) => {
      const dateA = a.dateStart || '';
      const dateB = b.dateStart || '';
      
      if (dateA && !dateB) return -1;
      if (!dateA && dateB) return 1;
      
      if (dateA && dateB) {
        if (dateA < dateB) return -1;
        if (dateA > dateB) return 1;
      }
      
      const timeA = a.timeStart || '';
      const timeB = b.timeStart || '';
      
      if (timeA && !timeB) return -1;
      if (!timeA && timeB) return 1;
      
      if (timeA && timeB) {
        if (timeA < timeB) return -1;
        if (timeA > timeB) return 1;
      }
      
      return a.id.localeCompare(b.id);
    });
  };

  let editingTaskId = null;
  let activeAddColumn = null;
  let currentAmbitoFilter = 'todos';

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
    const bindRadioHighlight = (radioClass, activeColor = '#a78bfa', activeBg = 'rgba(167,139,250,0.18)') => {
      const radios = container.querySelectorAll(`.${radioClass}`);
      radios.forEach(r => {
        r.addEventListener('change', () => {
          radios.forEach(rb => {
            const lbl = rb.closest('label');
            if (!lbl) return;
            if (rb.checked) {
              lbl.style.borderColor = activeColor;
              lbl.style.background = activeBg;
              lbl.style.color = activeColor;
            } else {
              lbl.style.borderColor = 'rgba(255,255,255,0.1)';
              lbl.style.background = 'rgba(255,255,255,0.04)';
              lbl.style.color = '#94a3b8';
            }
          });
        });
      });
    };

    bindRadioHighlight('task-column-radio');
    bindRadioHighlight('task-ambito-radio');
    bindRadioHighlight('task-urgencia-radio');
    bindRadioHighlight('task-importancia-radio');
    bindRadioHighlight('task-dificultad-radio');

    const ambitoCustom = container.querySelector('.task-ambito-custom');
    if (ambitoCustom) {
      ambitoCustom.addEventListener('input', () => {
        if (ambitoCustom.value.trim()) {
          const radios = container.querySelectorAll('.task-ambito-radio');
          radios.forEach(r => {
            r.checked = false;
            const lbl = r.closest('label');
            if (lbl) {
              lbl.style.borderColor = 'rgba(255,255,255,0.1)';
              lbl.style.background = 'rgba(255,255,255,0.04)';
              lbl.style.color = '#94a3b8';
            }
          });
        }
      });
    }

    const dateRadios = container.querySelectorAll('.task-date-type-radio');
    const dateFieldsRow = container.querySelector('.date-fields-row');
    const dateEndField = container.querySelector('.date-end-field');

    dateRadios.forEach(r => {
      r.addEventListener('change', () => {
        const val = r.value;
        if (val === '') {
          if (dateFieldsRow) dateFieldsRow.style.display = 'none';
        } else {
          if (dateFieldsRow) dateFieldsRow.style.display = 'flex';
          if (dateEndField) dateEndField.style.display = val === 'range' ? '' : 'none';
        }
      });
    });

    const timeRadios = container.querySelectorAll('.task-time-type-radio');
    const timeFieldsRow = container.querySelector('.time-fields-row');
    const timeEndField = container.querySelector('.time-end-field');

    timeRadios.forEach(r => {
      r.addEventListener('change', () => {
        const val = r.value;
        if (val === '') {
          if (timeFieldsRow) timeFieldsRow.style.display = 'none';
        } else {
          if (timeFieldsRow) timeFieldsRow.style.display = 'flex';
          if (timeEndField) timeEndField.style.display = val === 'range' ? '' : 'none';
        }
      });
    });
  };


  const getFormHtml = (taskObj = {}, isEdit = false) => {
    const labels = getDynamicLabels();
    const cardColor = taskObj.cardColor || '#170e30';
    let cardTextColor = taskObj.cardTextColor;
    if (!cardTextColor) {
      const lum = getLuminance(cardColor);
      cardTextColor = lum < 0.5 ? '#ffffff' : '#1f2937';
    }
    const fontSize = taskObj.fontSize || 'medium';
    const lang = localStorage.getItem('app-language') || 'es';

    const fldStyle = `width:100%;box-sizing:border-box;padding:8px 12px;border-radius:8px;border:1px solid rgba(255,255,255,0.15);background:rgba(255,255,255,0.07);color:#f1f5f9;font-size:0.92rem;font-family:inherit;outline:none;`;
    const lblStyle = `display:block;font-size:0.75rem;font-weight:700;color:#a78bfa;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:4px;`;
    const sectionStyle = `margin-bottom:1rem;`;
    const gridStyle = `display:grid;grid-template-columns:1fr 1fr;gap:0.6rem;`;
    const grid3Style = `display:grid;grid-template-columns:1fr 1fr 1fr;gap:0.5rem;`;

    
    const col = taskObj.column || 'not-done';
    const stateOptions = [
      { val: 'not-done',    emoji: '🕐', label: lang === 'en' ? 'Pending'     : 'Pendiente'  },
      { val: 'in-progress', emoji: '⚡', label: lang === 'en' ? 'In Progress' : 'En Proceso' },
      { val: 'done',        emoji: '✅', label: lang === 'en' ? 'Done'        : 'Hecho'      },
    ];

    const stateButtons = stateOptions.map(s => `
      <label class="state-radio-label" style="cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:4px;padding:8px 6px;border-radius:10px;border:2px solid ${col === s.val ? '#a78bfa' : 'rgba(255,255,255,0.1)'};background:${col === s.val ? 'rgba(167,139,250,0.15)' : 'rgba(255,255,255,0.04)'};font-size:0.78rem;font-weight:600;color:${col === s.val ? '#a78bfa' : '#94a3b8'};transition:all 0.2s;text-align:center;">
        <input type="radio" name="task-state" class="task-column-radio" value="${s.val}" ${col === s.val ? 'checked' : ''} style="display:none;">
        <span style="font-size:1.3rem;">${s.emoji}</span>
        ${s.label}
      </label>
    `).join('');

  
    const ambitoList = [
      { val:'familia',  emoji:'👪', label: lang==='en'?'Family':'Familia'  },
      { val:'personal', emoji:'👤', label: 'Personal'                       },
      { val:'social',   emoji:'👥', label: 'Social'                         },
      { val:'laboral',  emoji:'💼', label: lang==='en'?'Work':'Laboral'    },
      { val:'ocio',     emoji:'🎭', label: lang==='en'?'Leisure':'Ocio'    },
      { val:'salud',    emoji:'❤️', label: lang==='en'?'Health':'Salud'    },
      { val:'hogar',    emoji:'🏠', label: lang==='en'?'Home':'Hogar'      },
      { val:'finanzas', emoji:'💰', label: lang==='en'?'Finance':'Finanzas'},
      { val:'otro',     emoji:'🔄', label: lang==='en'?'Other':'Otro'      },
    ];
    const ambitoButtons = ambitoList.map(a => `
      <label class="ambito-radio-label" style="cursor:pointer;display:flex;align-items:center;gap:5px;padding:5px 8px;border-radius:8px;border:1.5px solid ${taskObj.ambito===a.val?'#a78bfa':'rgba(255,255,255,0.1)'};background:${taskObj.ambito===a.val?'rgba(167,139,250,0.18)':'rgba(255,255,255,0.04)'};font-size:0.78rem;font-weight:600;color:${taskObj.ambito===a.val?'#a78bfa':'#94a3b8'};white-space:nowrap;">
        <input type="radio" name="task-ambito" class="task-ambito-radio" value="${a.val}" ${taskObj.ambito===a.val?'checked':''} style="display:none;">
        ${a.emoji} ${a.label}
      </label>
    `).join('');

    
    const urgLevels = [
      { val:'alta',  emoji:'🔴', label: lang==='en'?'High':'Alta'   },
      { val:'media', emoji:'🟡', label: lang==='en'?'Medium':'Media'},
      { val:'baja',  emoji:'🟢', label: lang==='en'?'Low':'Baja'    },
    ];
    const impLevels = [
      { val:'muy',        emoji:'🔥', label: lang==='en'?'Very High':'Muy alta' },
      { val:'importante', emoji:'⭐', label: lang==='en'?'Important':'Importante'},
      { val:'menos',      emoji:'💤', label: lang==='en'?'Low':'Baja'           },
    ];
    const difLevels = [
      { val:'alta',  emoji:'🧗', label: lang==='en'?'Hard':'Alta'   },
      { val:'media', emoji:'⚙️', label: lang==='en'?'Medium':'Media'},
      { val:'baja',  emoji:'🌱', label: lang==='en'?'Easy':'Baja'   },
    ];

    const levelButtons = (levels, name, cssClass, current) => levels.map(l => `
      <label style="cursor:pointer;display:flex;align-items:center;gap:4px;padding:5px 8px;border-radius:8px;border:1.5px solid ${current===l.val?'#a78bfa':'rgba(255,255,255,0.1)'};background:${current===l.val?'rgba(167,139,250,0.18)':'rgba(255,255,255,0.04)'};font-size:0.78rem;font-weight:600;color:${current===l.val?'#a78bfa':'#94a3b8'};flex:1;justify-content:center;">
        <input type="radio" name="${name}" class="${cssClass}" value="${l.val}" ${current===l.val?'checked':''} style="display:none;">
        ${l.emoji} ${l.label}
      </label>
    `).join('');

    const dtType = taskObj.dateType || '';
    const tmType = taskObj.timeType || '';

    return `
      <div class="task-form-container" style="display:flex;flex-direction:column;gap:0;width:100%;text-align:left;background:rgba(10,5,27,0.82);border:1px solid rgba(167,139,250,0.2);border-radius:14px;padding:1.1rem 1rem;box-shadow:0 8px 32px rgba(0,0,0,0.4);">

        <!-- 1. Nombre y Descripción -->
        <div style="${sectionStyle}">
          <label style="${lblStyle}">📝 ${lang==='en'?'Task Name':'Nombre de la Tarea'} *</label>
          <input type="text" class="task-title-input" placeholder="${lang==='en'?'Task title...':'Escribe el nombre de la tarea...'}" value="${taskObj.text||''}" style="${fldStyle}" required>
        </div>

        <div style="${sectionStyle}">
          <label style="${lblStyle}">📄 ${lang==='en'?'Description':'Descripción'}</label>
          <input type="text" class="task-desc-input" placeholder="${lang==='en'?'Short description...':'Descripción breve de la tarea...'}" value="${taskObj.description||''}" style="${fldStyle}">
        </div>

        <!-- 2. Estado -->
        <div style="${sectionStyle}">
          <label style="${lblStyle}">📌 ${lang==='en'?'Status':'Estado de la Tarea'}</label>
          <div style="${grid3Style}">${stateButtons}</div>
        </div>

        <!-- 3. Ámbito -->
        <div style="${sectionStyle}">
          <label style="${lblStyle}">🗂️ ${lang==='en'?'Scope':'Ámbito'}</label>
          <div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:6px;">${ambitoButtons}</div>
          <input type="text" class="task-ambito-custom" placeholder="${lang==='en'?'Or write a custom scope...':'O escribe un ámbito personalizado...'}" value="${ambitoList.find(a=>a.val===taskObj.ambito)?'':taskObj.ambito||''}" style="${fldStyle}font-size:0.82rem;margin-top:2px;">
        </div>

        <!-- 4. Niveles -->
        <div style="${sectionStyle}">
          <div style="${gridStyle}align-items:start;">
            <div>
              <label style="${lblStyle}">🚨 ${lang==='en'?'Urgency':'Urgencia'}</label>
              <div style="display:flex;gap:4px;">${levelButtons(urgLevels,'task-urgencia','task-urgencia-radio',taskObj.urgencia)}</div>
            </div>
            <div>
              <label style="${lblStyle}">💎 ${lang==='en'?'Importance':'Importancia'}</label>
              <div style="display:flex;gap:4px;">${levelButtons(impLevels,'task-importancia','task-importancia-radio',taskObj.importancia)}</div>
            </div>
          </div>
          <div style="margin-top:0.55rem;">
            <label style="${lblStyle}">🧩 ${lang==='en'?'Difficulty':'Dificultad'}</label>
            <div style="display:flex;gap:4px;">${levelButtons(difLevels,'task-dificultad','task-dificultad-radio',taskObj.dificultad)}</div>
          </div>
        </div>

        <!-- 5. Fechas -->
        <div style="${sectionStyle}">
          <label style="${lblStyle}">📅 ${lang==='en'?'Dates':'Fechas'}</label>
          <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;">
            <label style="font-size:0.8rem;color:#94a3b8;display:flex;align-items:center;gap:4px;cursor:pointer;">
              <input type="radio" name="date-type" class="task-date-type-radio" value="" ${!dtType?'checked':''} style="accent-color:#a78bfa;"> ${lang==='en'?'None':'Sin fecha'}
            </label>
            <label style="font-size:0.8rem;color:#94a3b8;display:flex;align-items:center;gap:4px;cursor:pointer;">
              <input type="radio" name="date-type" class="task-date-type-radio" value="single" ${dtType==='single'?'checked':''} style="accent-color:#a78bfa;"> ${lang==='en'?'One date':'Una fecha'}
            </label>
            <label style="font-size:0.8rem;color:#94a3b8;display:flex;align-items:center;gap:4px;cursor:pointer;">
              <input type="radio" name="date-type" class="task-date-type-radio" value="range" ${dtType==='range'?'checked':''} style="accent-color:#a78bfa;"> ${lang==='en'?'Date range':'Rango de fechas'}
            </label>
          </div>
          <div class="date-fields-row" style="display:flex;gap:8px;flex-wrap:wrap;margin-top:8px;${!dtType?'display:none;':''}">
            <div style="flex:1;min-width:130px;">
              <label style="${lblStyle}font-size:0.68rem;">${lang==='en'?'Start Date':'Fecha Inicio'}</label>
              <input type="date" class="task-date-start-input" value="${taskObj.dateStart||''}" style="${fldStyle}">
            </div>
            <div class="date-end-field" style="flex:1;min-width:130px;${dtType!=='range'?'display:none;':''}">
              <label style="${lblStyle}font-size:0.68rem;">${lang==='en'?'End Date':'Fecha Fin'}</label>
              <input type="date" class="task-date-end-input" value="${taskObj.dateEnd||''}" style="${fldStyle}">
            </div>
          </div>
        </div>

        <!-- 6. Horario -->
        <div style="${sectionStyle}">
          <label style="${lblStyle}">🕒 ${lang==='en'?'Schedule':'Horario'}</label>
          <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;">
            <label style="font-size:0.8rem;color:#94a3b8;display:flex;align-items:center;gap:4px;cursor:pointer;">
              <input type="radio" name="time-type" class="task-time-type-radio" value="" ${!tmType?'checked':''} style="accent-color:#a78bfa;"> ${lang==='en'?'None':'Sin hora'}
            </label>
            <label style="font-size:0.8rem;color:#94a3b8;display:flex;align-items:center;gap:4px;cursor:pointer;">
              <input type="radio" name="time-type" class="task-time-type-radio" value="single" ${tmType==='single'?'checked':''} style="accent-color:#a78bfa;"> ${lang==='en'?'One time':'Una hora'}
            </label>
            <label style="font-size:0.8rem;color:#94a3b8;display:flex;align-items:center;gap:4px;cursor:pointer;">
              <input type="radio" name="time-type" class="task-time-type-radio" value="range" ${tmType==='range'?'checked':''} style="accent-color:#a78bfa;"> ${lang==='en'?'Time range':'Rango de horas'}
            </label>
          </div>
          <div class="time-fields-row" style="display:flex;gap:8px;flex-wrap:wrap;margin-top:8px;${!tmType?'display:none;':''}">
            <div style="flex:1;min-width:120px;">
              <label style="${lblStyle}font-size:0.68rem;">${lang==='en'?'Start Time':'Hora Inicio'}</label>
              <input type="time" class="task-time-start-input" value="${taskObj.timeStart||''}" style="${fldStyle}">
            </div>
            <div class="time-end-field" style="flex:1;min-width:120px;${tmType!=='range'?'display:none;':''}">
              <label style="${lblStyle}font-size:0.68rem;">${lang==='en'?'End Time':'Hora Fin'}</label>
              <input type="time" class="task-time-end-input" value="${taskObj.timeEnd||''}" style="${fldStyle}">
            </div>
          </div>
        </div>

        <!-- 8. Asignado y Comentario -->
        <div style="${sectionStyle}">
          <label style="${lblStyle}">👤 ${lang==='en'?'Assignee':'Asignado a'}</label>
          <input type="text" class="task-assignee-input" placeholder="${lang==='en'?'Person in charge...':'Persona encargada...'}" value="${taskObj.assignee||''}" style="${fldStyle}">
        </div>
        <div style="${sectionStyle}">
          <label style="${lblStyle}">💬 ${lang==='en'?'Comment':'Comentario'}</label>
          <textarea class="task-comment-input" placeholder="${lang==='en'?'Additional notes...':'Notas adicionales...'}" style="${fldStyle}min-height:60px;resize:vertical;">${taskObj.comment||''}</textarea>
        </div>

        <!-- 9. Botones guardar/cancelar -->
        <div style="display:flex;gap:8px;margin-top:0.3rem;">
          <button class="task-btn ${isEdit?'save-edit-btn':'save-add-btn'}" style="flex:1;background:linear-gradient(135deg,#7c3aed,#2563eb);color:#fff;padding:9px 16px;border:none;border-radius:9px;font-weight:700;font-size:0.95rem;cursor:pointer;transition:opacity 0.2s;">
            ${isEdit ? '💾 '+(lang==='en'?'Save':'Guardar') : '✅ '+(lang==='en'?'Add Task':'Añadir Tarea')}
          </button>
          <button class="task-btn ${isEdit?'cancel-edit-btn':'cancel-add-btn'}" style="background:rgba(255,255,255,0.08);color:#94a3b8;padding:9px 16px;border:1px solid rgba(255,255,255,0.1);border-radius:9px;font-weight:600;font-size:0.95rem;cursor:pointer;">
            ❌ ${lang==='en'?'Cancel':'Cancelar'}
          </button>
        </div>
      </div>
    `;
  };



  const getFormData = (container) => {
    const getRadio = (name) => {
      const checked = container.querySelector(`input[name="${name}"]:checked`);
      return checked ? checked.value : '';
    };
    // Ámbito: radio button OR custom text input
    const ambitoRadio = getRadio('task-ambito');
    const ambitoCustom = (container.querySelector('.task-ambito-custom')?.value || '').trim();
    const ambito = ambitoRadio || ambitoCustom;

    return {
      description: container.querySelector('.task-desc-input')?.value.trim() || '',
      assignee: container.querySelector('.task-assignee-input')?.value.trim() || '',
      comment: container.querySelector('.task-comment-input')?.value.trim() || '',
      ambito,
      urgencia:    getRadio('task-urgencia'),
      importancia: getRadio('task-importancia'),
      dificultad:  getRadio('task-dificultad'),
      tiempo:      container.querySelector('.task-tiempo-select')?.value || '',
      cardColor:   container.querySelector('.task-card-color-picker')?.value || '#170e30',
      cardTextColor: container.querySelector('.task-text-color-picker')?.value || '#ffffff',
      fontSize:    container.querySelector('.task-font-size-select')?.value || 'medium',
      taskEmoji:   container.querySelector('.task-emoji-select')?.value || '',
      dateType:    getRadio('date-type'),
      dateStart:   container.querySelector('.task-date-start-input')?.value || '',
      dateEnd:     container.querySelector('.task-date-end-input')?.value || '',
      timeType:    getRadio('time-type'),
      timeStart:   container.querySelector('.task-time-start-input')?.value || '',
      timeEnd:     container.querySelector('.task-time-end-input')?.value || '',
      column:      getRadio('task-state') || container.querySelector('.task-column-select')?.value || 'not-done'
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
      assignee: metadata.assignee || '',
      comment: metadata.comment || '',
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
      task.assignee = metadata.assignee;
      task.comment = metadata.comment;
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


  const renderCriteriaBreakdowns = () => {
    const labels = getDynamicLabels();
    const lang = localStorage.getItem('app-language') || 'es';


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

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const parts = dateStr.split('-');
    if (parts.length === 3) {
      return `${parts[2]}/${parts[1]}/${parts[0]}`;
    }
    return dateStr;
  };

  const buildTaskCardHtml = (li, task, columnId, lang, dict) => {
    let html = '';
          // Render normal card with badges
          const isDone = columnId === 'done';
          if (isDone) {
            li.classList.add('completed');
          }
          const isDeleted = columnId === 'deleted';
          if (isDeleted) {
            li.classList.add('deleted-card');
          }

          let emojiPrefix = '';
          if (task.taskEmoji) {
            emojiPrefix = `<span class="task-main-emoji" style="margin-right: 0.35rem; font-style: normal; font-size: 1.15rem;">${task.taskEmoji}</span>`;
          }

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

          let descHtml = '';
          if (task.description) {
            descHtml = `<div class="task-description" style="font-size: 0.88rem; color: #f1f5f9; margin: 0.35rem 0 0.5rem 0; line-height: 1.5; text-align: left;">${task.description}</div>`;
          }

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
              finanzas: lang === 'en' ? 'Finance' : 'Finanzas',
              otro: lang === 'en' ? 'Other' : 'Otro'
            };
            const emojisMap = {
              familia: '👥', personal: '👤', social: '🤝',
              laboral: '💼', ocio: '🎮', salud: '🩺',
              hogar: '🏠', finanzas: '💰', otro: '🔄'
            };
            const colorsMap = {
              familia: '#f472b6', personal: '#818cf8', social: '#60a5fa',
              laboral: '#fbbf24', ocio: '#a78bfa', salud: '#34d399',
              hogar: '#22d3ee', finanzas: '#2dd4bf', otro: '#facc15'
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

          let assigneeRow = '';
          if (task.assignee) {
            assigneeRow = `<div><span style="color: #a78bfa; font-weight: 600;">👤 ${lang==='en'?'Assignee:':'Asignado a:'}</span> <span style="color: #f1f5f9; font-weight: 500;">${task.assignee}</span></div>`;
          }

          let commentRow = '';
          if (task.comment) {
            commentRow = `<div><span style="color: #a78bfa; font-weight: 600;">💬 ${lang==='en'?'Comment:':'Comentario:'}</span> <span style="color: #cbd5e1; font-style: italic;">${task.comment}</span></div>`;
          }

          let metadataListHtml = '';
          if (ambitoRow || urgenciaRow || importanciaRow || dificultadRow || dateRow || timeRow || assigneeRow || commentRow) {
            metadataListHtml = `
              <div class="task-metadata-list" style="margin-top: 0.65rem; display: flex; flex-direction: column; gap: 4px; font-size: 0.84rem; width: 100%; border-top: 1px solid rgba(255,255,255,0.06); padding-top: 0.5rem; text-align: left; line-height: 1.5;">
                ${ambitoRow}
                ${assigneeRow}
                ${urgenciaRow}
                ${importanciaRow}
                ${dificultadRow}
                ${dateRow}
                ${timeRow}
                ${commentRow}
              </div>
            `;
          }

          const titleColor = task.cardTextColor && task.cardTextColor !== '#1f2937' ? task.cardTextColor : '#00f59b';
          let doneActionsHtml = '';

          let deletedActionsHtml = '';
          if (columnId === 'deleted') {
            const lblPend    = lang === 'en' ? 'Pending'     : 'Pendiente';
            const lblProg    = lang === 'en' ? 'In Progress' : 'En Proceso';
            const lblDone    = lang === 'en' ? 'Done'        : 'Hecho';
            const lblRecover = lang === 'en' ? 'Recover to:' : 'Recuperar a:';
            deletedActionsHtml = `
              <div class="recover-menu-wrapper" style="position:relative;display:inline-block;">
                <button class="task-btn recover-btn" title="${lblRecover}" style="padding:3px 7px;font-size:0.82rem;font-weight:700;background:rgba(99,102,241,0.18);border:1.5px solid rgba(99,102,241,0.4);border-radius:7px;color:#a78bfa;cursor:pointer;display:flex;align-items:center;gap:4px;">
                  🔄 ${lblRecover}
                </button>
                <div class="recover-dropdown" style="display:none;position:absolute;right:0;top:110%;background:#1e1533;border:1px solid rgba(167,139,250,0.3);border-radius:10px;box-shadow:0 8px 24px rgba(0,0,0,0.5);z-index:999;min-width:140px;overflow:hidden;">
                  <button class="recover-to-btn" data-col="not-done"    style="display:block;width:100%;padding:8px 14px;background:none;border:none;color:#f1f5f9;cursor:pointer;text-align:left;font-size:0.82rem;font-weight:600;">🕐 ${lblPend}</button>
                  <button class="recover-to-btn" data-col="in-progress" style="display:block;width:100%;padding:8px 14px;background:none;border:none;color:#f1f5f9;cursor:pointer;text-align:left;font-size:0.82rem;font-weight:600;">⚡ ${lblProg}</button>
                  <button class="recover-to-btn" data-col="done"        style="display:block;width:100%;padding:8px 14px;background:none;border:none;color:#f1f5f9;cursor:pointer;text-align:left;font-size:0.82rem;font-weight:600;">✅ ${lblDone}</button>
                </div>
              </div>
            `;
          }

          li.setAttribute('draggable', 'true');
          const deleteTooltip = columnId === 'deleted' ? (dict.task_delete_perm || 'Eliminar permanentemente') : (lang === 'en' ? 'Delete' : 'Eliminar');
          
          html += `
            <div class="task-header" style="display: flex; justify-content: space-between; align-items: flex-start; gap: 0.5rem; width: 100%;">
              <span class="task-text-container" style="display: flex; align-items: center; flex-wrap: wrap; gap: 6px;">
                ${columnId === 'not-done' || columnId === 'in-progress' ? `<button class="task-btn toggle-done-btn" style="padding: 0; background: none; border: none; cursor: pointer; font-size: 1.1rem; filter: grayscale(100%) opacity(0.5); transition: all 0.2s;" title="${lang==='en'?'Mark as done':'Marcar como hecha'}" onmouseover="this.style.filter='grayscale(0%) opacity(1)'" onmouseout="this.style.filter='grayscale(100%) opacity(0.5)'">✅</button>` : ''}
                ${columnId === 'done' ? `<button class="task-btn toggle-pending-btn" style="padding: 0; background: none; border: none; cursor: pointer; font-size: 1.1rem; filter: grayscale(100%) opacity(0.5); transition: all 0.2s;" title="${lang==='en'?'Mark as pending':'Marcar como pendiente'}" onmouseover="this.style.filter='grayscale(0%) opacity(1)'" onmouseout="this.style.filter='grayscale(100%) opacity(0.5)'">❌</button>` : ''}
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

    return html;
  };

  const bindTaskCardEvents = (li, task, columnId, lang, dict) => {
          if (columnId === 'deleted') {
            const recoverBtn = li.querySelector('.recover-btn');
            const recoverDropdown = li.querySelector('.recover-dropdown');

            recoverBtn.addEventListener('click', (e) => {
              e.stopPropagation();
              const isOpen = recoverDropdown.style.display === 'block';
              // Close all other open dropdowns first
              document.querySelectorAll('.recover-dropdown').forEach(d => { d.style.display = 'none'; });
              recoverDropdown.style.display = isOpen ? 'none' : 'block';
            });

            li.querySelectorAll('.recover-to-btn').forEach(btn => {
              btn.addEventListener('mouseenter', () => { btn.style.background = 'rgba(167,139,250,0.15)'; });
              btn.addEventListener('mouseleave', () => { btn.style.background = 'none'; });
              btn.addEventListener('click', (e) => {
                e.stopPropagation();
                task.column = btn.dataset.col;
                delete task.prevColumn;
                saveTasks();
                renderTasks();
              });
            });

            document.addEventListener('click', function closeDropdown() {
              if (recoverDropdown) recoverDropdown.style.display = 'none';
              document.removeEventListener('click', closeDropdown);
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
              const confirmMsg = lang === 'en' 
                ? `Are you sure you want to delete the task, yes or no?` 
                : `¿Estás seguro de que quieres eliminar la tarea, sí o no?`;
              if (confirm(confirmMsg)) {
                task.prevColumn = task.column;
                task.column = 'deleted';
                saveTasks();
                renderTasks();
              }
            }
          });

          if (columnId !== 'deleted') {
            const toggleDoneBtn = li.querySelector('.toggle-done-btn');
            if (toggleDoneBtn) {
              toggleDoneBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                task.prevColumn = task.column;
                task.column = 'done';
                saveTasks();
                renderTasks();
              });
            }

            const togglePendBtn = li.querySelector('.toggle-pending-btn');
            if (togglePendBtn) {
              togglePendBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                task.prevColumn = task.column;
                task.column = 'not-done';
                saveTasks();
                renderTasks();
              });
            }

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

  };

  window.renderTasks = () => {
    const labels = getDynamicLabels();
    const lang = localStorage.getItem('app-language') || 'es';
    const dict = window.translations ? (window.translations[lang] || window.translations.es) : {};

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
      
      const columnTasks = sortTasksChronologically(tasks.filter(t => t.column === columnId && (!currentAmbitoFilter || currentAmbitoFilter === 'todos' || t.ambito === currentAmbitoFilter)));

      columnTasks.forEach(task => {
        const li = document.createElement('li');
        li.className = 'task-card';
        li.dataset.id = task.id;

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
            if (!newText) {
              titleInput.style.border = '2px solid #ef4444';
              titleInput.focus();
              return;
            }
            const meta = getFormData(li);
            updateTask(task.id, newText, meta);
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
          li.innerHTML = buildTaskCardHtml(li, task, columnId, lang, dict);
          bindTaskCardEvents(li, task, columnId, lang, dict);
        }

        list.appendChild(li);
      });

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

    renderCriteriaBreakdowns(); 
  };

  
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

  
  const toggleInstructionsBtn = document.getElementById('toggle-instructions-btn');
  const boardIntro = document.querySelector('.board-intro');
  const instructionsArrow = document.getElementById('instructions-arrow');

  if (toggleInstructionsBtn && boardIntro) {
    
    const savedVisibility = localStorage.getItem('board-instructions-visible');
    
  
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
    
    const ambitoButtons = document.querySelectorAll('.ambitos-buttons button');
    ambitoButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const clickedAmbito = btn.dataset.ambito;
        
        if (currentAmbitoFilter === clickedAmbito) {
          if (clickedAmbito !== 'todos') {
            currentAmbitoFilter = 'todos';
            btn.style.boxShadow = '';
            btn.style.borderColor = 'rgba(255,255,255,0.1)';
            btn.style.background = 'rgba(255, 255, 255, 0.05)';
            const todosBtn = Array.from(ambitoButtons).find(b => b.dataset.ambito === 'todos');
            if (todosBtn) {
              todosBtn.style.borderColor = '#a78bfa';
              todosBtn.style.boxShadow = '0 0 10px rgba(167, 139, 250, 0.3)';
              todosBtn.style.background = 'rgba(167, 139, 250, 0.15)';
            }
          }
        } else {
          currentAmbitoFilter = clickedAmbito;
          ambitoButtons.forEach(b => {
            b.style.boxShadow = '';
            b.style.borderColor = 'rgba(255,255,255,0.1)';
            b.style.background = 'rgba(255, 255, 255, 0.05)';
          });
          btn.style.borderColor = '#a78bfa';
          btn.style.boxShadow = '0 0 10px rgba(167, 139, 250, 0.3)';
          btn.style.background = 'rgba(167, 139, 250, 0.15)';
        }
        renderTasks();
      });
    });
  }
  renderTasks();
});