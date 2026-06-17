const fs = require('fs');

const es = {
    footer_reminder: "Por favor, no olvide mover las tareas a la columna de \"Hecho\" cuando estén realizadas. Gracias.",
    footer_save_success: "Los cambios realizados se han guardado automáticamente, de manera, exitosa.",
    footer_save_error: "ERROR: El sistema ha detectado un problema para guardar, automáticamente, su resultado. Por favor, espere a que nuestros agentes puedan terminar de resolverlo. Antes de seguir modificando. Espere unos minutos y vuelva en un rato. Sentimos las molestias.",
    nav_home: "Inicio",
    nav_about: "Acerca de",
    nav_board: "Tablero",
    nav_stats: "Estadísticas y mejoras",
    nav_share: "Compartir",
    nav_download: "Descargar",
    col_done: "Hecho",
    col_not_done: "Pendiente",
    col_in_progress: "En proceso",
    col_deleted: "Eliminadas",
    task_restore: "Recuperar tarea",
    task_restore_tooltip: "<strong>Recuperar tarea</strong>:<br>Recuperar como pendiente, en proceso o hecho.",
    task_delete_perm: "Eliminar permanentemente",
    confirm_delete_perm: "¿Estás seguro de eliminar permanentemente esta tarea?",
    edit_tooltip: "<strong>Modificar tarea</strong>:<br>Permite cambiar el nombre de la tarea, su estado (hecho, en proceso o finalizado), la descripción de la tarea, la fecha, la hora, el ámbito, la urgencia, la importancia y la dificultad.",
    guide_restore: "Recupera la tarea a su estado activo original (Pendiente, En proceso o Hecho).",
    add_tooltip: "<strong>Añadir tarea</strong>:<br>Permite introducir el nombre de la tarea, descripción, estado de ejecución, fecha de realización, hora aproximada, ámbito, urgencia, importancia y dificultad.",
    intro_title: "Instrucciones de Uso (Perspectiva de Usuario):",
    intro_desc: "En el cuerpo principal tienes tu tablero con tres columnas: Hecho, Pendiente y En progreso. Más abajo verás los ámbitos desplegables.",
    main_board_title: "Tablero de tareas",
    main_board_desc: "En el cuerpo principal tienes tu tablero interactivo con tres columnas: <span style='font-weight: 700; color: #00f59b;'>Hecho</span>, <span style='font-weight: 700; color: #00f59b;'>Pendiente</span> y <span style='font-weight: 700; color: #00f59b;'>En proceso</span>.",
    intro_bullet_1: "<strong>Arrastrar o pulsar estado</strong>: Puede mover una tarea de una columna a otra arrastrándola, o pulsando el tic ✅ o cruz ❌ junto al nombre para cambiarla entre pendiente y hecha.",
    intro_bullet_2: "<strong>Añadir Tarea</strong>: Pulse el botón <strong style='color: #00f59b;'>[+]</strong> en la cabecera de cualquier columna para añadir una tarea (indicando título, descripción y temporalización programada).",
    intro_bullet_3: "<strong>Modificar o Eliminar</strong>: Utilice los iconos ✏️ (editar) o 🗑️ (eliminar) dentro de cada tarjeta para cambiar su información o quitarla.",
    board_tablero_title: "Tablero",
    board_tablero_desc: "En el tablero se muestran tus tres columnas principales y los ámbitos desplegables.",
    about_title: "Manual de Uso y Accesibilidad",
    about_subtitle: "Esta página está diseñada para que todas las personas, sin importar sus capacidades, puedan aprender a utilizar nuestra aplicación.",
    narrator_title: "Lector por Voz Integrado: Puedes escuchar el manual en audio.",
    narrator_btn_speak: "🔊 Escuchar Manual",
    narrator_btn_speaking: "⏸️ Narrando...",
    narrator_btn_stop: "⏹️ Detener",
    easy_title: "📖 Instrucciones Sencillas (Lectura Fácil)",
    easy_subtitle: "(Haz clic en cada paso para reproducir la voz y ver la interpretación en Lengua de Signos LSE)",
    lse_title: "🧏 Lengua de Signos (LSE)",
    lse_desc: "El asistente virtual LSE muestra los movimientos corporales para cada paso de las instrucciones seleccionadas.",
    lse_status_init: "¡Hola! Selecciona un paso",
    lse_chapter_init: "Capítulo: Inicio",
    braille_title: "⠃ Braille (Visualizador táctil)",
    braille_desc: "Escribe texto aquí abajo para verlo traducido al sistema Braille:",
    braille_placeholder: "Escribe aquí... (ej: hola)",
    picto_title: "🖼️ Pictogramas (Buscador cognitivo)",
    picto_desc: "Pictogramas clave. Escribe palabras en español para buscar más (ej: casa, familia, dinero, trabajo):",
    picto_placeholder: "Buscar pictograma...",
    picto_attribution: "Pictogramas de ARASAAC (BY-NC-SA) de Sergio Palao, Gobierno de Aragón.",
    back_to_board: "← Volver al Tablero Principal",
    back_to_home: "Volver al inicio",
    share_title: "Compartir",
    share_desc: "Esta es la vista para compartir tu lista de tareas con otras personas.",
    share_preview_title: "Vista previa del mensaje a compartir:",
    share_copy_btn: "📋 Copiar al Portapapeles",
    share_copied_toast: "¡Copiado con éxito!",
    share_whatsapp: "Compartir por WhatsApp",
    share_twitter: "Compartir en X / Twitter",
    share_telegram: "Compartir por Telegram",
    share_facebook: "Compartir en Facebook",
    share_email: "Compartir por Correo",
    share_summary_title: "📊 Resumen de mis tareas en MiiActToDo:",
    stats_title: "Estadísticas y Mejoras",
    stats_desc: "Aquí puedes encontrar el resumen y métricas de tus tareas.",
    kpi_total: "Total Registradas",
    kpi_done: "Total Realizadas",
    kpi_progress: "En Proceso",
    kpi_pending: "Pendientes",
    kpi_desc_circle: "Porcentaje de progreso",
    chart_bar_title: "Horas de mayor registro de tareas",
    chart_bar_desc: "Representación de las horas del día con mayor volumen de creación.",
    ambitos_section_title: "Ámbitos",
    ambitos_familia: "👪 Familia",
    ambitos_personal: "👤 Personal",
    ambitos_social: "👥 Social",
    ambitos_laboral: "💼 Laboral",
    ambitos_ocio: "🎭 Ocio",
    ambitos_salud: "❤️ Salud",
    ambitos_hogar: "🏠 Hogar",
    ambitos_finanzas: "💰 Finanzas",
    ambitos_otro: "🔄 Otro",
    ambitos_todos: "🌐 Todos",
    otros_criterios_title: "Otros criterios",
    criterio_urgencia: "Urgencia",
    criterio_importancia: "Importancia",
    criterio_dificultad: "Dificultad",
    criterio_tiempo: "Tiempo",
    urgencia_alta: "🔴 Alta urgencia",
    urgencia_media: "🟡 Media urgencia",
    urgencia_baja: "🟢 Baja urgencia",
    importancia_muy: "🔥 Muy importante",
    importancia_imp: "✨ Importante",
    importancia_menos: "💤 Menos importante",
    dificultad_alta: "🧗 Alta dificultad",
    dificultad_media: "⚙️ Media dificultad",
    dificultad_baja: "🌱 Baja dificultad",
    tiempo_poco: "⏱️ Poco: 2 días",
    tiempo_medio: "⏳ Medio: 4 días",
    tiempo_largo: "📅 Largo: más de una semana",
    empty_tasks: "No hay tareas",
    print_note: "Abre esta página en modo descarga para imprimir o guardar como PDF.",
    print_header_title: "Tablero de Tareas - Impresión",
    print_header_desc: "Organización actual de tus tareas por columnas.",
    form_ambito: 'Ámbito:',
    form_urgencia: 'Urgencia:',
    form_importancia: 'Importancia:',
    form_dificultad: 'Dificultad:',
    form_tiempo: 'Tiempo:',
    form_color: '🎨 Color:',
    form_text_color: '✍️ Letras:',
    form_size: '🔤 Tamaño:',
    form_size_s: 'Pequeño',
    form_size_m: 'Mediano',
    form_size_l: 'Grande',
    form_desc: 'Descripción:',
    form_desc_placeholder: 'Descripción de la tarea...',
    form_date_type: '📅 Tipo Fecha:',
    form_date_single: 'Una fecha',
    form_date_range: 'Rango de fechas',
    form_time_type: '🕒 Tipo Hora:',
    form_time_single: 'Una hora',
    form_time_range: 'Rango de horas',
    form_date_start_label: 'Fecha:',
    form_date_start_range: 'F. Inicio:',
    form_date_end_label: 'F. Fin:',
    form_time_start_label: 'Hora:',
    form_time_start_range: 'H. Inicio:',
    form_time_end_label: 'H. Fin:',
    form_none: 'Ninguno',
    form_none_f: 'Ninguna',
    form_emoji_main: '⭐ Emoticono:',
    form_save: '💾 Guardar',
    form_cancel: '❌ Cancelar',
    form_add: 'Añadir',
    form_col_dest: 'Mover a:',
    form_connect_word: 'al',
    form_connect_time: 'a',
    download_modal_title: "Descargar / Guardar Tablero",
    download_modal_desc: "Selecciona cómo deseas guardar o imprimir la información de tus tareas:",
    download_pdf_btn: "📄 Guardar como PDF / Imprimir",
    download_png_btn: "🖼️ Descargar como Imagen (PNG)"
};

const langs = ['ca', 'gl', 'eu']; // Just these 3 for now as a test and to satisfy the prompt

async function translateText(text, targetLang) {
    if(!text) return "";
    try {
        const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=es&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`;
        const res = await fetch(url);
        const data = await res.json();
        return data[0].map(x => x[0]).join('');
    } catch(e) {
        return text;
    }
}

async function run() {
    let output = '';
    for(const lang of langs) {
        console.log(`Translating ${lang}...`);
        output += `\n  ${lang}: {\n`;
        const keys = Object.keys(es);
        for(let i = 0; i < keys.length; i += 1) { // 1 by 1
            const key = keys[i];
            const translated = await translateText(es[key], lang);
            output += `    ${key}: ${JSON.stringify(translated)},\n`;
        }
        output += `  },`;
    }
    fs.writeFileSync('translations_extra.js', output);
    console.log("Done");
}
run();
