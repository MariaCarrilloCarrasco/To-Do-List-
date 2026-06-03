// js/language.js
// Multilingual Language Support (9 Languages) with Premium Dropdown Selector and Global Download Modal

const translations = {
  es: {
    nav_home: "Inicio",
    nav_about: "Acerca de...",
    nav_board: "Tablero",
    nav_stats: "Estadísticas y mejoras",
    nav_share: "Compartir",
    nav_download: "Descargar",
    
    col_done: "Hecho",
    col_not_done: "Pendiente",
    col_in_progress: "En progreso",
    
    intro_title: "Tablero de tareas",
    intro_desc: "En el cuerpo principal tienes tu tablero con tres columnas: Hecho, Pendiente y En progreso. Más abajo verás los ámbitos desplegables.",
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

    // Form labels
    form_ambito: 'Ámbito:',
    form_urgencia: 'Urgencia:',
    form_importancia: 'Importancia:',
    form_dificultad: 'Dificultad:',
    form_tiempo: 'Tiempo:',
    form_color: '🎨 Color:',
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

    // Download modal
    download_modal_title: "Descargar / Guardar Tablero",
    download_modal_desc: "Selecciona cómo deseas guardar o imprimir la información de tus tareas:",
    download_pdf_btn: "📄 Guardar como PDF / Imprimir",
    download_png_btn: "🖼️ Descargar como Imagen (PNG)"
  },
  en: {
    nav_home: "Home",
    nav_about: "About",
    nav_board: "Board",
    nav_stats: "Stats & Improvements",
    nav_share: "Share",
    nav_download: "Download",
    
    col_done: "Done",
    col_not_done: "Pending",
    col_in_progress: "In Progress",
    
    intro_title: "Task Board",
    intro_desc: "In the main body you have your board with three columns: Done, Pending and In Progress. Below you will see the collapsible scopes.",
    board_tablero_title: "Board",
    board_tablero_desc: "The board displays your three main columns and collapsible scopes.",
    
    about_title: "User Manual and Accessibility",
    about_subtitle: "This page is designed so that all people, regardless of their abilities, can learn to use our application.",
    narrator_title: "Integrated Voice Reader: You can listen to the manual in audio.",
    narrator_btn_speak: "🔊 Listen to Manual",
    narrator_btn_speaking: "⏸️ Narrating...",
    narrator_btn_stop: "⏹️ Stop",
    easy_title: "📖 Simple Instructions (Easy Read)",
    easy_subtitle: "(Click on each step to play the voice and see the interpretation in Sign Language LSE)",
    
    lse_title: "🧏 Sign Language (LSE)",
    lse_desc: "The LSE virtual assistant shows body movements for each step of the selected instructions.",
    lse_status_init: "Hello! Select a step",
    lse_chapter_init: "Chapter: Start",
    
    braille_title: "⠃ Braille (Tactile Visualizer)",
    braille_desc: "Type text below to see it translated into the Braille system:",
    braille_placeholder: "Type here... (e.g., hello)",
    
    picto_title: "🖼️ Pictograms (Cognitive Search)",
    picto_desc: "Key pictograms. Type words in English to search for more (e.g., house, family, money, work):",
    picto_placeholder: "Search pictogram...",
    picto_attribution: "ARASAAC Pictograms (BY-NC-SA) by Sergio Palao, Aragon Government.",
    
    back_to_board: "← Back to Main Board",
    back_to_home: "Back to home",
    share_title: "Share",
    share_desc: "This is the view where you can share your task list with others.",
    share_preview_title: "Preview of the message to share:",
    share_copy_btn: "📋 Copy to Clipboard",
    share_copied_toast: "Copied successfully!",
    share_whatsapp: "Share on WhatsApp",
    share_twitter: "Share on X / Twitter",
    share_telegram: "Share on Telegram",
    share_facebook: "Share on Facebook",
    share_email: "Share via Email",
    share_summary_title: "📊 Summary of my tasks in MiiActToDo:",
    
    stats_title: "Stats & Improvements",
    stats_desc: "Here you can find the summary and metrics of your tasks.",
    kpi_total: "Total Registered",
    kpi_done: "Total Completed",
    kpi_progress: "In Progress",
    kpi_pending: "Pending",
    kpi_desc_circle: "Progress percentage",
    chart_bar_title: "Peak hours of task registration",
    chart_bar_desc: "Representation of the hours of the day with the highest creation volume.",
    
    ambitos_section_title: "Scopes",
    ambitos_familia: "👪 Family",
    ambitos_personal: "👤 Personal",
    ambitos_social: "👥 Social",
    ambitos_laboral: "💼 Work",
    ambitos_ocio: "🎭 Leisure",
    ambitos_salud: "❤️ Health",
    ambitos_hogar: "🏠 Home",
    ambitos_finanzas: "💰 Finance",
    
    otros_criterios_title: "Other criteria",
    criterio_urgencia: "Urgency",
    criterio_importancia: "Importance",
    criterio_dificultad: "Difficulty",
    criterio_tiempo: "Time",
    
    urgencia_alta: "🔴 High urgency",
    urgencia_media: "🟡 Medium urgency",
    urgencia_baja: "🟢 Low urgency",
    importancia_muy: "🔥 Very important",
    importancia_imp: "✨ Important",
    importancia_menos: "💤 Less important",
    dificultad_alta: "🧗 High difficulty",
    dificultad_media: "⚙️ Medium difficulty",
    dificultad_baja: "🌱 Low difficulty",
    tiempo_poco: "⏱️ Little: 2 days",
    tiempo_medio: "⏳ Medium: 4 days",
    tiempo_largo: "📅 Long: more than a week",
    
    empty_tasks: "No tasks",
    print_note: "Open this page in download mode to print or save as PDF.",
    print_header_title: "Task Board - Print",
    print_header_desc: "Current organization of your tasks by columns.",

    // Form labels
    form_ambito: 'Scope:',
    form_urgencia: 'Urgency:',
    form_importancia: 'Importance:',
    form_dificultad: 'Difficulty:',
    form_tiempo: 'Time:',
    form_color: '🎨 Color:',
    form_size: '🔤 Size:',
    form_size_s: 'Small',
    form_size_m: 'Medium',
    form_size_l: 'Large',
    form_desc: 'Description:',
    form_desc_placeholder: 'Task description...',
    form_date_type: '📅 Date Type:',
    form_date_single: 'Single date',
    form_date_range: 'Date range',
    form_time_type: '🕒 Time Type:',
    form_time_single: 'Single time',
    form_time_range: 'Time range',
    form_date_start_label: 'Date:',
    form_date_start_range: 'Start Date:',
    form_date_end_label: 'End Date:',
    form_time_start_label: 'Time:',
    form_time_start_range: 'Start Time:',
    form_time_end_label: 'End Time:',
    form_none: 'None',
    form_none_f: 'None',
    form_emoji_main: '⭐ Emoticon:',
    form_save: '💾 Save',
    form_cancel: '❌ Cancel',
    form_add: 'Add',
    form_col_dest: 'Move to:',
    form_connect_word: 'to',
    form_connect_time: 'to',

    // Download modal
    download_modal_title: "Download / Save Board",
    download_modal_desc: "Select how you want to save or print your task information:",
    download_pdf_btn: "📄 Save as PDF / Print",
    download_png_btn: "🖼️ Download as Image (PNG)"
  },
  fr: {
    nav_home: "Accueil",
    nav_about: "À propos",
    nav_board: "Tableau",
    nav_stats: "Stats & Améliorations",
    nav_share: "Partager",
    nav_download: "Télécharger",
    col_done: "Fait",
    col_not_done: "En attente",
    col_in_progress: "En cours",
    intro_title: "Tableau des tâches",
    intro_desc: "Dans le corps principal se trouve votre tableau avec trois colonnes : Fait, En attente et En cours.",
    board_tablero_title: "Tableau",
    board_tablero_desc: "Le tableau affiche vos trois colonnes principales.",
    about_title: "Manuel d'utilisation",
    about_subtitle: "Cette page est conçue pour apprendre à utiliser notre application.",
    narrator_title: "Lecteur vocal intégré",
    narrator_btn_speak: "🔊 Écouter le Manuel",
    narrator_btn_speaking: "⏸️ Narration...",
    narrator_btn_stop: "⏹️ Arrêter",
    easy_title: "📖 Instructions simples (Lecture Facile)",
    easy_subtitle: "(Cliquez sur chaque étape pour lire la voix)",
    lse_title: "🧏 Langue des Signes (LSE)",
    lse_desc: "Mouvements corporels pour chaque étape.",
    lse_status_init: "Bonjour ! Sélectionnez une étape",
    lse_chapter_init: "Début",
    braille_title: "⠃ Braille",
    braille_desc: "Traducteur Braille :",
    braille_placeholder: "Écrivez ici...",
    picto_title: "🖼️ Pictogrammes",
    picto_desc: "Pictogrammes clés :",
    picto_placeholder: "Rechercher...",
    picto_attribution: "Pictogrammes d'ARASAAC (BY-NC-SA) par Sergio Palao.",
    back_to_board: "← Retour au Tableau",
    back_to_home: "Retour à l'accueil",
    share_title: "Partager",
    share_desc: "Partager votre liste de tâches.",
    share_preview_title: "Aperçu du message à partager :",
    share_copy_btn: "📋 Copier dans le presse-papiers",
    share_copied_toast: "Copié avec succès !",
    share_whatsapp: "Partager sur WhatsApp",
    share_twitter: "Partager sur X / Twitter",
    share_telegram: "Partager sur Telegram",
    share_facebook: "Partager sur Facebook",
    share_email: "Partager par e-mail",
    share_summary_title: "📊 Résumé de mes tâches sur MiiActToDo :",
    stats_title: "Statistiques & Améliorations",
    stats_desc: "Résumé et métriques de vos tâches.",
    kpi_total: "Total Enregistré",
    kpi_done: "Total Réalisé",
    kpi_progress: "En Cours",
    kpi_pending: "En Attente",
    kpi_desc_circle: "Progression",
    chart_bar_title: "Heures d'enregistrement",
    chart_bar_desc: "Volume de création par heure.",
    ambitos_section_title: "Domaines",
    ambitos_familia: "👪 Famille",
    ambitos_personal: "👤 Personnel",
    ambitos_social: "👥 Social",
    ambitos_laboral: "💼 Travail",
    ambitos_ocio: "🎭 Loisirs",
    ambitos_salud: "❤️ Santé",
    ambitos_hogar: "🏠 Maison",
    ambitos_finanzas: "💰 Finances",
    otros_criterios_title: "Autres critères",
    criterio_urgencia: "Urgence",
    criterio_importancia: "Importance",
    criterio_dificultad: "Difficulté",
    criterio_tiempo: "Temps",
    urgencia_alta: "🔴 Urgence Haute",
    urgencia_media: "🟡 Urgence Moyenne",
    urgencia_baja: "🟢 Urgence Basse",
    importancia_muy: "🔥 Très important",
    importancia_imp: "✨ Important",
    importancia_menos: "💤 Moins important",
    dificultad_alta: "🧗 Difficulté Haute",
    dificultad_media: "⚙️ Difficulté Moyenne",
    dificultad_baja: "🌱 Difficulté Basse",
    tiempo_poco: "⏱️ Court: 2 jours",
    tiempo_medio: "⏳ Moyen: 4 jours",
    tiempo_largo: "📅 Long: + d'une semaine",
    empty_tasks: "Aucune tâche",
    print_note: "Imprimer ou enregistrer en PDF.",
    print_header_title: "Impression",
    print_header_desc: "Organisation de vos tâches.",
    form_ambito: 'Domaine:',
    form_urgencia: 'Urgence:',
    form_importancia: 'Importance:',
    form_dificultad: 'Difficulté:',
    form_tiempo: 'Temps:',
    form_color: '🎨 Couleur:',
    form_size: '🔤 Taille:',
    form_size_s: 'Petit',
    form_size_m: 'Moyen',
    form_size_l: 'Grand',
    form_desc: 'Description:',
    form_desc_placeholder: 'Description...',
    form_date_type: '📅 Type Date:',
    form_date_single: 'Une date',
    form_date_range: 'Plage de dates',
    form_time_type: '🕒 Type Heure:',
    form_time_single: 'Une heure',
    form_time_range: 'Plage d\'heures',
    form_date_start_label: 'Date:',
    form_date_start_range: 'D. Début:',
    form_date_end_label: 'D. Fin:',
    form_time_start_label: 'Heure:',
    form_time_start_range: 'H. Début:',
    form_time_end_label: 'H. Fin:',
    form_none: 'Aucun',
    form_none_f: 'Aucune',
    form_emoji_main: '⭐ Émoticône:',
    form_save: '💾 Sauver',
    form_cancel: '❌ Annuler',
    form_add: 'Ajouter',
    form_col_dest: 'Déplacer:',
    form_connect_word: 'au',
    form_connect_time: 'à',
    download_modal_title: "Télécharger / Sauvegarder",
    download_modal_desc: "Choisissez comment enregistrer ou imprimer le tableau :",
    download_pdf_btn: "📄 Enregistrer en PDF / Imprimer",
    download_png_btn: "🖼️ Télécharger l'image (PNG)"
  },
  de: {
    nav_home: "Startseite",
    nav_about: "Über uns",
    nav_board: "Board",
    nav_stats: "Statistiken",
    nav_share: "Teilen",
    nav_download: "Herunterladen",
    col_done: "Erledigt",
    col_not_done: "Ausstehend",
    col_in_progress: "In Bearbeitung",
    intro_title: "Aufgaben-Board",
    intro_desc: "Hauptboard mit drei Spalten: Erledigt, Ausstehend und In Bearbeitung.",
    board_tablero_title: "Board",
    board_tablero_desc: "Das Board zeigt Ihre drei Hauptspalten.",
    about_title: "Bedienungsanleitung",
    about_subtitle: "Diese Seite hilft Ihnen, die Anwendung zu erlernen.",
    narrator_title: "Integrierter Sprachleser",
    narrator_btn_speak: "🔊 Vorlesen lassen",
    narrator_btn_speaking: "⏸️ Liest vor...",
    narrator_btn_stop: "⏹️ Stopp",
    easy_title: "📖 Einfache Anleitung",
    easy_subtitle: "(Klicken Sie auf den Schritt)",
    lse_title: "🧏 Gebärdensprache",
    lse_desc: "Körperbewegungen für jeden Schritt.",
    lse_status_init: "Hallo! Schritt auswählen",
    lse_chapter_init: "Start",
    braille_title: "⠃ Braille",
    braille_desc: "Braille-Übersetzer:",
    braille_placeholder: "Hier schreiben...",
    picto_title: "🖼️ Piktogramme",
    picto_desc: "Wichtige Piktogramme:",
    picto_placeholder: "Suchen...",
    picto_attribution: "ARASAAC Piktogramme von Sergio Palao.",
    back_to_board: "← Zurück zum Board",
    back_to_home: "Zurück zum Start",
    share_title: "Teilen",
    share_desc: "Aufgabenliste teilen.",
    share_preview_title: "Vorschau der Nachricht zum Teilen:",
    share_copy_btn: "📋 In Zwischenablage kopieren",
    share_copied_toast: "Erfolgreich kopiert!",
    share_whatsapp: "Auf WhatsApp teilen",
    share_twitter: "Auf X / Twitter teilen",
    share_telegram: "Auf Telegram teilen",
    share_facebook: "Auf Facebook teilen",
    share_email: "Per E-Mail teilen",
    share_summary_title: "📊 Zusammenfassung meiner Aufgaben auf MiiActToDo:",
    stats_title: "Statistiken",
    stats_desc: "Zusammenfassung Ihrer Aufgaben.",
    kpi_total: "Gesamt",
    kpi_done: "Erledigt",
    kpi_progress: "In Bearbeitung",
    kpi_pending: "Ausstehend",
    kpi_desc_circle: "Fortschritt",
    chart_bar_title: "Spitzenzeiten",
    chart_bar_desc: "Erstellungsvolumen nach Uhrzeit.",
    ambitos_section_title: "Bereiche",
    ambitos_familia: "👪 Familie",
    ambitos_personal: "👤 Persönlich",
    ambitos_social: "👥 Sozial",
    ambitos_laboral: "💼 Arbeit",
    ambitos_ocio: "🎭 Freizeit",
    ambitos_salud: "❤️ Gesundheit",
    ambitos_hogar: "🏠 Zuhause",
    ambitos_finanzas: "💰 Finanzen",
    otros_criterios_title: "Andere Kriterien",
    criterio_urgencia: "Dringlichkeit",
    criterio_importancia: "Wichtigkeit",
    criterio_dificultad: "Schwierigkeit",
    criterio_tiempo: "Zeitbedarf",
    urgencia_alta: "🔴 Hoch",
    urgencia_media: "🟡 Mittel",
    urgencia_baja: "🟢 Niedrig",
    importancia_muy: "🔥 Sehr wichtig",
    importancia_imp: "✨ Wichtig",
    importancia_menos: "💤 Weniger wichtig",
    dificultad_alta: "🧗 Schwer",
    dificultad_media: "⚙️ Mittel",
    dificultad_baja: "🌱 Leicht",
    tiempo_poco: "⏱️ Wenig: 2 Tage",
    tiempo_medio: "⏳ Mittel: 4 Tage",
    tiempo_largo: "📅 Viel: >1 Woche",
    empty_tasks: "Keine Aufgaben",
    print_note: "Drucken oder als PDF speichern.",
    print_header_title: "Druckansicht",
    print_header_desc: "Ihre Aufgabenliste.",
    form_ambito: 'Bereich:',
    form_urgencia: 'Dringlichkeit:',
    form_importancia: 'Wichtigkeit:',
    form_dificultad: 'Schwierigkeit:',
    form_tiempo: 'Zeitbedarf:',
    form_color: '🎨 Farbe:',
    form_size: '🔤 Größe:',
    form_size_s: 'Klein',
    form_size_m: 'Mittel',
    form_size_l: 'Groß',
    form_desc: 'Beschreibung:',
    form_desc_placeholder: 'Beschreibung...',
    form_date_type: '📅 Datumstyp:',
    form_date_single: 'Einzelnes Datum',
    form_date_range: 'Datumsbereich',
    form_time_type: '🕒 Uhrzeittyp:',
    form_time_single: 'Einzelne Uhrzeit',
    form_time_range: 'Uhrzeitbereich',
    form_date_start_label: 'Datum:',
    form_date_start_range: 'Startdatum:',
    form_date_end_label: 'Enddatum:',
    form_time_start_label: 'Uhrzeit:',
    form_time_start_range: 'Startzeit:',
    form_time_end_label: 'Endzeit:',
    form_none: 'Keine',
    form_none_f: 'Keine',
    form_emoji_main: '⭐ Emoticon:',
    form_save: '💾 Speichern',
    form_cancel: '❌ Abbrechen',
    form_add: 'Hinzufügen',
    form_col_dest: 'Verschieben:',
    form_connect_word: 'bis',
    form_connect_time: 'bis',
    download_modal_title: "Board herunterladen",
    download_modal_desc: "Wählen Sie, wie Sie das Board speichern möchten:",
    download_pdf_btn: "📄 Als PDF speichern / Drucken",
    download_png_btn: "🖼️ Als Bild speichern (PNG)"
  },
  it: {
    nav_home: "Home",
    nav_about: "Informazioni",
    nav_board: "Tabellone",
    nav_stats: "Statistiche",
    nav_share: "Condividi",
    nav_download: "Scarica",
    col_done: "Completato",
    col_not_done: "In attesa",
    col_in_progress: "In corso",
    intro_title: "Tabellone compiti",
    intro_desc: "Corpo principale con tre colonne: Completato, In attesa e In corso.",
    board_tablero_title: "Tabellone",
    board_tablero_desc: "Visualizza le tre colonne principali.",
    about_title: "Manuale Utente",
    about_subtitle: "Pagina per imparare a usare l'applicazione.",
    narrator_title: "Lettore vocale integrato",
    narrator_btn_speak: "🔊 Ascolta il manuale",
    narrator_btn_speaking: "⏸️ Lettura...",
    narrator_btn_stop: "⏹️ Ferma",
    easy_title: "📖 Istruzioni Semplici",
    easy_subtitle: "(Clicca su ogni passo)",
    lse_title: "🧏 Lingua dei Segni",
    lse_desc: "Movimenti corporei per ogni passo.",
    lse_status_init: "Ciao! Seleziona un passo",
    lse_chapter_init: "Inizio",
    braille_title: "⠃ Braille",
    braille_desc: "Traduttore Braille:",
    braille_placeholder: "Scrivi qui...",
    picto_title: "🖼️ Pittogrammi",
    picto_desc: "Pittogrammi chiave:",
    picto_placeholder: "Cerca...",
    picto_attribution: "Pittogrammi ARASAAC di Sergio Palao.",
    back_to_board: "← Torna al Tabellone",
    back_to_home: "Torna alla home",
    share_title: "Condividi",
    share_desc: "Condividi la tua lista.",
    share_preview_title: "Anteprima del messaggio da condividere:",
    share_copy_btn: "📋 Copia negli appunti",
    share_copied_toast: "Copiato con successo!",
    share_whatsapp: "Condividi su WhatsApp",
    share_twitter: "Condividi su X / Twitter",
    share_telegram: "Condividi su Telegram",
    share_facebook: "Condividi su Facebook",
    share_email: "Condividi via e-mail",
    share_summary_title: "📊 Riepilogo dei miei compiti su MiiActToDo:",
    stats_title: "Statistiche",
    stats_desc: "Riepilogo dei tuoi compiti.",
    kpi_total: "Totale",
    kpi_done: "Completati",
    kpi_progress: "In corso",
    kpi_pending: "In attesa",
    kpi_desc_circle: "Progresso",
    chart_bar_title: "Orari di punta",
    chart_bar_desc: "Volume di creazione per ora.",
    ambitos_section_title: "Ambiti",
    ambitos_familia: "👪 Famiglia",
    ambitos_personal: "👤 Personale",
    ambitos_social: "👥 Social",
    ambitos_laboral: "💼 Lavoro",
    ambitos_ocio: "🎭 Tempo Libero",
    ambitos_salud: "❤️ Salute",
    ambitos_hogar: "🏠 Casa",
    ambitos_finanzas: "💰 Finanze",
    otros_criterios_title: "Altri criteri",
    criterio_urgencia: "Urgenza",
    criterio_importancia: "Importanza",
    criterio_dificultad: "Difficoltà",
    criterio_tiempo: "Tempo",
    urgencia_alta: "🔴 Alta",
    urgencia_media: "🟡 Media",
    urgencia_baja: "🟢 Bossa",
    importancia_muy: "🔥 Molto importante",
    importancia_imp: "✨ Importante",
    importancia_menos: "💤 Meno importante",
    dificultad_alta: "🧗 Alta",
    dificultad_media: "⚙️ Media",
    dificultad_baja: "🌱 Bassa",
    tiempo_poco: "⏱️ Poco: 2 giorni",
    tiempo_medio: "⏳ Medio: 4 giorni",
    tiempo_largo: "📅 Lungo: >1 settimana",
    empty_tasks: "Nessun compito",
    print_note: "Stampa o salva in PDF.",
    print_header_title: "Stampa",
    print_header_desc: "Organizzazione dei compiti.",
    form_ambito: 'Ambito:',
    form_urgencia: 'Urgenza:',
    form_importancia: 'Importanza:',
    form_dificultad: 'Difficoltà:',
    form_tiempo: 'Tempo:',
    form_color: '🎨 Colore:',
    form_size: '🔤 Dimensione:',
    form_size_s: 'Piccolo',
    form_size_m: 'Medio',
    form_size_l: 'Grande',
    form_desc: 'Descrizione:',
    form_desc_placeholder: 'Descrizione...',
    form_date_type: '📅 Tipo data:',
    form_date_single: 'Una data',
    form_date_range: 'Intervallo date',
    form_time_type: '🕒 Tipo ora:',
    form_time_single: 'Un\'ora',
    form_time_range: 'Intervallo ore',
    form_date_start_label: 'Data:',
    form_date_start_range: 'D. Inizio:',
    form_date_end_label: 'D. Fine:',
    form_time_start_label: 'Ora:',
    form_time_start_range: 'H. Inizio:',
    form_time_end_label: 'H. Fine:',
    form_none: 'Nessuno',
    form_none_f: 'Nessuna',
    form_emoji_main: '⭐ Emoticon:',
    form_save: '💾 Salva',
    form_cancel: '❌ Annulla',
    form_add: 'Aggiungi',
    form_col_dest: 'Sposta:',
    form_connect_word: 'al',
    form_connect_time: 'a',
    download_modal_title: "Scarica il tabellone",
    download_modal_desc: "Scegli come salvare o stampare il tabellone:",
    download_pdf_btn: "📄 Salva come PDF / Stampa",
    download_png_btn: "🖼️ Scarica immagine (PNG)"
  },
  pt: {
    nav_home: "Início",
    nav_about: "Sobre",
    nav_board: "Quadro",
    nav_stats: "Estatísticas",
    nav_share: "Partilhar",
    nav_download: "Descarregar",
    col_done: "Concluído",
    col_not_done: "Pendente",
    col_in_progress: "Em progresso",
    intro_title: "Quadro de tarefas",
    intro_desc: "Quadro principal com três colunas: Concluído, Pendente e Em progresso.",
    board_tablero_title: "Quadro",
    board_tablero_desc: "Mostra as três colunas principais.",
    about_title: "Manual do Utilizador",
    about_subtitle: "Esta página ensina a usar a nossa aplicação.",
    narrator_title: "Leitor de voz integrado",
    narrator_btn_speak: "🔊 Ouvir manual",
    narrator_btn_speaking: "⏸️ Lendo...",
    narrator_btn_stop: "⏹️ Parar",
    easy_title: "📖 Instruções Simples",
    easy_subtitle: "(Clique em cada passo)",
    lse_title: "🧏 Língua gestual",
    lse_desc: "Gestos corporais para cada passo.",
    lse_status_init: "Olá! Selecione um passo",
    lse_chapter_init: "Início",
    braille_title: "⠃ Braille",
    braille_desc: "Tradutor Braille:",
    braille_placeholder: "Escreva aqui...",
    picto_title: "🖼️ Pictogramas",
    picto_desc: "Pictogramas chave:",
    picto_placeholder: "Procurar...",
    picto_attribution: "Pictogramas ARASAAC por Sergio Palao.",
    back_to_board: "← Voltar ao Quadro",
    back_to_home: "Voltar ao início",
    share_title: "Parthar",
    share_desc: "Partilhar lista.",
    share_preview_title: "Pré-visualização da mensagem a partilhar:",
    share_copy_btn: "📋 Copiar para a área de transferência",
    share_copied_toast: "Copiado com sucesso!",
    share_whatsapp: "Partilhar no WhatsApp",
    share_twitter: "Partilhar no X / Twitter",
    share_telegram: "Partilhar no Telegram",
    share_facebook: "Partilhar no Facebook",
    share_email: "Partilhar por e-mail",
    share_summary_title: "📊 Resumo das minhas tarefas no MiiActToDo:",
    stats_title: "Estatísticas",
    stats_desc: "Resumo das suas tarefas.",
    kpi_total: "Total",
    kpi_done: "Concluídas",
    kpi_progress: "Em progresso",
    kpi_pending: "Pendentes",
    kpi_desc_circle: "Progresso",
    chart_bar_title: "Horários de pico",
    chart_bar_desc: "Criação por hora.",
    ambitos_section_title: "Ámbitos",
    ambitos_familia: "👪 Família",
    ambitos_personal: "👤 Pessoal",
    ambitos_social: "👥 Social",
    ambitos_laboral: "💼 Trabalho",
    ambitos_ocio: "🎭 Lazer",
    ambitos_salud: "❤️ Saúde",
    ambitos_hogar: "🏠 Casa",
    ambitos_finanzas: "💰 Finanças",
    otros_criterios_title: "Outros critérios",
    criterio_urgencia: "Urgência",
    criterio_importancia: "Importância",
    criterio_dificultad: "Dificuldade",
    criterio_tiempo: "Tempo",
    urgencia_alta: "🔴 Alta",
    urgencia_media: "🟡 Média",
    urgencia_baja: "🟢 Baixa",
    importancia_muy: "🔥 Muito importante",
    importancia_imp: "✨ Importante",
    importancia_menos: "💤 Menos importante",
    dificultad_alta: "🧗 Alta",
    dificultad_media: "⚙️ Média",
    dificultad_baja: "🌱 Baixa",
    tiempo_poco: "⏱️ Pouco: 2 dias",
    tiempo_medio: "⏳ Médio: 4 dias",
    tiempo_largo: "📅 Longo: >1 semana",
    empty_tasks: "Sem tarefas",
    print_note: "Imprimir ou salvar em PDF.",
    print_header_title: "Impressão",
    print_header_desc: "Organização das tarefas.",
    form_ambito: 'Âmbito:',
    form_urgencia: 'Urgência:',
    form_importancia: 'Importância:',
    form_dificultad: 'Dificuldade:',
    form_tiempo: 'Tempo:',
    form_color: '🎨 Cor:',
    form_size: '🔤 Tamanho:',
    form_size_s: 'Pequeno',
    form_size_m: 'Médio',
    form_size_l: 'Grande',
    form_desc: 'Descrição:',
    form_desc_placeholder: 'Descrição...',
    form_date_type: '📅 Tipo data:',
    form_date_single: 'Uma data',
    form_date_range: 'Intervalo datas',
    form_time_type: '🕒 Tipo hora:',
    form_time_single: 'Uma hora',
    form_time_range: 'Intervalo horas',
    form_date_start_label: 'Data:',
    form_date_start_range: 'D. Início:',
    form_date_end_label: 'D. Fim:',
    form_time_start_label: 'Hora:',
    form_time_start_range: 'H. Início:',
    form_time_end_label: 'H. Fim:',
    form_none: 'Nenhum',
    form_none_f: 'Nenhuma',
    form_emoji_main: '⭐ Emoticon:',
    form_save: '💾 Gravar',
    form_cancel: '❌ Cancelar',
    form_add: 'Adicionar',
    form_col_dest: 'Mover:',
    form_connect_word: 'a',
    form_connect_time: 'a',
    download_modal_title: "Descarregar Quadro",
    download_modal_desc: "Escolha como deseja guardar ou imprimir o quadro:",
    download_pdf_btn: "📄 Guardar como PDF / Imprimir",
    download_png_btn: "🖼️ Descarregar imagem (PNG)"
  },
  ca: {
    nav_home: "Inici",
    nav_about: "Quant a...",
    nav_board: "Tauler",
    nav_stats: "Estadístiques",
    nav_share: "Compartir",
    nav_download: "Descarregar",
    col_done: "Fet",
    col_not_done: "Pendent",
    col_in_progress: "En progrés",
    intro_title: "Tauler de tasques",
    intro_desc: "El tauler mostra les teves tres columnes principals: Fet, Pendent i En progrés.",
    board_tablero_title: "Tauler",
    board_tablero_desc: "Es mostren les tres columnes principals.",
    about_title: "Manual d'ús i Accessibilitat",
    about_subtitle: "Aquesta pàgina està dissenyada per aprendre a fer servir l'aplicació.",
    narrator_title: "Lector per veu integrat",
    narrator_btn_speak: "🔊 Escolta el manual",
    narrator_btn_speaking: "⏸️ Narrant...",
    narrator_btn_stop: "⏹️ Aturar",
    easy_title: "📖 Instruccions senzilles (Lectura Fàcil)",
    easy_subtitle: "(Clica a cada pas per escoltar-lo)",
    lse_title: "🧏 Llengua de Signes",
    lse_desc: "Moviments corporals per a cada pas.",
    lse_status_init: "Hola! Selecciona un pas",
    lse_chapter_init: "Inici",
    braille_title: "⠃ Braille",
    braille_desc: "Escriu text per traduir-lo a Braille:",
    braille_placeholder: "Escriu aquí...",
    picto_title: "🖼️ Pictogrames",
    picto_desc: "Cerca de pictogrames d'ARASAAC:",
    picto_placeholder: "Cercar...",
    picto_attribution: "Pictogrames d'ARASAAC de Sergio Palao.",
    back_to_board: "← Tornar al tauler",
    back_to_home: "Tornar a l'inici",
    share_title: "Compartir",
    share_desc: "Compartir la teva llista.",
    share_preview_title: "Previsualització del missatge a compartir:",
    share_copy_btn: "📋 Copiar al porta-retalls",
    share_copied_toast: "Copiat amb èxit!",
    share_whatsapp: "Compartir per WhatsApp",
    share_twitter: "Compartir a X / Twitter",
    share_telegram: "Compartir per Telegram",
    share_facebook: "Compartir a Facebook",
    share_email: "Compartir per correu",
    share_summary_title: "📊 Resum de les meves tasques a MiiActToDo:",
    stats_title: "Estadístiques",
    stats_desc: "Resum de tasques.",
    kpi_total: "Total",
    kpi_done: "Fetes",
    kpi_progress: "En progrés",
    kpi_pending: "Pendents",
    kpi_desc_circle: "Progrés",
    chart_bar_title: "Hores punta",
    chart_bar_desc: "Freqüència de creació per hores.",
    ambitos_section_title: "Àmbits",
    ambitos_familia: "👪 Família",
    ambitos_personal: "👤 Personal",
    ambitos_social: "👥 Social",
    ambitos_laboral: "💼 Laboral",
    ambitos_ocio: "🎭 Oci",
    ambitos_salud: "❤️ Salut",
    ambitos_hogar: "🏠 Llar",
    ambitos_finanzas: "💰 Finances",
    otros_criterios_title: "Altres criteris",
    criterio_urgencia: "Urgència",
    criterio_importancia: "Importància",
    criterio_dificultad: "Dificultat",
    criterio_tiempo: "Temps",
    urgencia_alta: "🔴 Alta",
    urgencia_media: "🟡 Mitjana",
    urgencia_baja: "🟢 Baixa",
    importancia_muy: "🔥 Molt important",
    importancia_imp: "✨ Important",
    importancia_menos: "💤 Menys important",
    dificultad_alta: "🧗 Alta",
    dificultad_media: "⚙️ Mitjana",
    dificultad_baja: "🌱 Baixa",
    tiempo_poco: "⏱️ Poc: 2 dies",
    tiempo_medio: "⏳ Mig: 4 dies",
    tiempo_largo: "📅 Llarg: >1 setmana",
    empty_tasks: "No hi ha tasques",
    print_note: "Imprimir o desar com a PDF.",
    print_header_title: "Impressió",
    print_header_desc: "Organització de tasques.",
    form_ambito: 'Àmbit:',
    form_urgencia: 'Urgència:',
    form_importancia: 'Importància:',
    form_dificultad: 'Dificultat:',
    form_tiempo: 'Temps:',
    form_color: '🎨 Color:',
    form_size: '🔤 Mida:',
    form_size_s: 'Petit',
    form_size_m: 'Mitjà',
    form_size_l: 'Gran',
    form_desc: 'Descripció:',
    form_desc_placeholder: 'Descripció de la tasca...',
    form_date_type: '📅 Tipus data:',
    form_date_single: 'Una data',
    form_date_range: 'Rang de dates',
    form_time_type: '🕒 Tipus hora:',
    form_time_single: 'Una hora',
    form_time_range: 'Rang d\'hores',
    form_date_start_label: 'Data:',
    form_date_start_range: 'D. Inici:',
    form_date_end_label: 'D. Fi:',
    form_time_start_label: 'Hora:',
    form_time_start_range: 'H. Inici:',
    form_time_end_label: 'H. Fi:',
    form_none: 'Cap',
    form_none_f: 'Cap',
    form_emoji_main: '⭐ Emoticona:',
    form_save: '💾 Desar',
    form_cancel: '❌ Cancel·lar',
    form_add: 'Afegir',
    form_col_dest: 'Moure a:',
    form_connect_word: 'al',
    form_connect_time: 'a',
    download_modal_title: "Descarregar Tauler",
    download_modal_desc: "Selecciona com vols desar o imprimir el tauler:",
    download_pdf_btn: "📄 Desar com a PDF / Imprimir",
    download_png_btn: "🖼️ Descarregar com a Imatge (PNG)"
  },
  gl: {
    nav_home: "Inicio",
    nav_about: "Acerca de...",
    nav_board: "Taboleiro",
    nav_stats: "Estadísticas",
    nav_share: "Compartir",
    nav_download: "Descargar",
    col_done: "Feito",
    col_not_done: "Pendente",
    col_in_progress: "En progreso",
    intro_title: "Taboleiro de tarefas",
    intro_desc: "O taboleiro amosa as tres columnas principais: Feito, Pendente e En progreso.",
    board_tablero_title: "Taboleiro",
    board_tablero_desc: "Amósanse as tres columnas principais.",
    about_title: "Manual de uso e Accesibilidade",
    about_subtitle: "Páxina deseñada para aprender a usar a nosa aplicación.",
    narrator_title: "Lector por voz integrado",
    narrator_btn_speak: "🔊 Escoitar manual",
    narrator_btn_speaking: "⏸️ Narrant...",
    narrator_btn_stop: "⏹️ Deter",
    easy_title: "📖 Instruccións sinxelas (Lectura Fácil)",
    easy_subtitle: "(Clica en cada paso)",
    lse_title: "🧏 Lingua de Signos",
    lse_desc: "Movementos corporais para cada paso.",
    lse_status_init: "Ola! Selecciona un paso",
    lse_chapter_init: "Inicio",
    braille_title: "⠃ Braille",
    braille_desc: "Tradutor Braille:",
    braille_placeholder: "Escribe aquí...",
    picto_title: "🖼️ Pictogramas",
    picto_desc: "Pictogramas de ARASAAC:",
    picto_placeholder: "Buscar...",
    picto_attribution: "Pictogramas de ARASAAC de Sergio Palao.",
    back_to_board: "← Volver ao taboleiro",
    back_to_home: "Volver ao inicio",
    share_title: "Compartir",
    share_desc: "Compartir a túa lista.",
    share_preview_title: "Previsualización da mensaxe a compartir:",
    share_copy_btn: "📋 Copiar ao portapapeis",
    share_copied_toast: "Copiado con éxito!",
    share_whatsapp: "Compartir por WhatsApp",
    share_twitter: "Compartir en X / Twitter",
    share_telegram: "Compartir por Telegram",
    share_facebook: "Compartir en Facebook",
    share_email: "Compartir por correo",
    share_summary_title: "📊 Resumo das miñas tarefas en MiiActToDo:",
    stats_title: "Estadísticas",
    stats_desc: "Resumo das túas tarefas.",
    kpi_total: "Total",
    kpi_done: "Feitas",
    kpi_progress: "En progreso",
    kpi_pending: "Pendentes",
    kpi_desc_circle: "Progreso",
    chart_bar_title: "Horas punta",
    chart_bar_desc: "Frecuencia de creacióon por horas.",
    ambitos_section_title: "Ámbitos",
    ambitos_familia: "👪 Familia",
    ambitos_personal: "👤 Persoal",
    ambitos_social: "👥 Social",
    ambitos_laboral: "💼 Laboral",
    ambitos_ocio: "🎭 Lecer",
    ambitos_salud: "❤️ Saúde",
    ambitos_hogar: "🏠 Fogar",
    ambitos_finanzas: "💰 Finanzas",
    otros_criterios_title: "Outros criterios",
    criterio_urgencia: "Urxencia",
    criterio_importancia: "Importancia",
    criterio_dificultad: "Dificultade",
    criterio_tiempo: "Tempo",
    urgencia_alta: "🔴 Alta",
    urgencia_media: "🟡 Media",
    urgencia_baja: "🟢 Baixa",
    importancia_muy: "🔥 Moi importante",
    importancia_imp: "✨ Importante",
    importancia_menos: "💤 Menos importante",
    dificultad_alta: "🧗 Alta",
    dificultad_media: "⚙️ Media",
    dificultad_baja: "🌱 Baixa",
    tiempo_poco: "⏱️ Pouco: 2 días",
    tiempo_medio: "⏳ Medio: 4 días",
    tiempo_largo: "📅 Longo: >1 semana",
    empty_tasks: "Non hai tarefas",
    print_note: "Imprimir ou gardar como PDF.",
    print_header_title: "Impresión",
    print_header_desc: "Organización das tarefas.",
    form_ambito: 'Ámbito:',
    form_urgencia: 'Urxencia:',
    form_importancia: 'Importancia:',
    form_dificultad: 'Dificultade:',
    form_tiempo: 'Tempo:',
    form_color: '🎨 Color:',
    form_size: '🔤 Tamañó:',
    form_size_s: 'Pequeno',
    form_size_m: 'Mediano',
    form_size_l: 'Grande',
    form_desc: 'Descrición:',
    form_desc_placeholder: 'Descrición...',
    form_date_type: '📅 Tipo data:',
    form_date_single: 'Unha data',
    form_date_range: 'Rango de datas',
    form_time_type: '🕒 Tipo hora:',
    form_time_single: 'Unha hora',
    form_time_range: 'Rango de horas',
    form_date_start_label: 'Data:',
    form_date_start_range: 'D. Início:',
    form_date_end_label: 'D. Fin:',
    form_time_start_label: 'Hora:',
    form_time_start_range: 'H. Inicio:',
    form_time_end_label: 'H. Fin:',
    form_none: 'Ningún',
    form_none_f: 'Ningunha',
    form_emoji_main: '⭐ Emoticono:',
    form_save: '💾 Gardar',
    form_cancel: '❌ Cancelar',
    form_add: 'Engadir',
    form_col_dest: 'Mover a:',
    form_connect_word: 'ao',
    form_connect_time: 'a',
    download_modal_title: "Descargar Taboleiro",
    download_modal_desc: "Selecciona como desexas gardar ou imprimir o taboleiro:",
    download_pdf_btn: "📄 Gardar como PDF / Imprimir",
    download_png_btn: "🖼️ Descargar como Imaxe (PNG)"
  },
  eu: {
    nav_home: "Hasiera",
    nav_about: "Honi buruz...",
    nav_board: "Arbel",
    nav_stats: "Estatistikak",
    nav_share: "Partekatu",
    nav_download: "Deskargatu",
    col_done: "Egina",
    col_not_done: "Zain",
    col_in_progress: "Bidean",
    intro_title: "Zereginen arbela",
    intro_desc: "Arbelak zure hiru zutabe nagusiak erakusten ditu: Egina, Zain eta Bidean.",
    board_tablero_title: "Arbela",
    board_tablero_desc: "Hiru zutabe nagusiak erakusten dira.",
    about_title: "Erabilera Eskuliburua",
    about_subtitle: "Gure aplikazioa erabiltzen ikasteko orrialdea.",
    narrator_title: "Ahots irakurgailu integratua",
    narrator_btn_speak: "🔊 Eskuliburua entzun",
    narrator_btn_speaking: "⏸️ Irakurtzen...",
    narrator_btn_stop: "⏹️ Gelditu",
    easy_title: "📖 Argibide errazak (Irakurketa Erraza)",
    easy_subtitle: "(Egin klik urrats bakoitzean)",
    lse_title: "🧏 Zeinu Hizkuntza",
    lse_desc: "Gorputz-mugimenduak urrats bakoitzerako.",
    lse_status_init: "Kaixo! Hautatu urrats bat",
    lse_chapter_init: "Hasiera",
    braille_title: "⠃ Braille",
    braille_desc: "Braille itzultzailea:",
    braille_placeholder: "Idatzi hemen...",
    picto_title: "🖼️ Piktogramak",
    picto_desc: "Bilatu piktogramak:",
    picto_placeholder: "Bilatu...",
    picto_attribution: "Sergio Palaok egindako ARASAAC piktogramak.",
    back_to_board: "← Arbelera itzuli",
    back_to_home: "Hasierara itzuli",
    share_title: "Partekatu",
    share_desc: "Zure zerrenda partekatu.",
    share_preview_title: "Partekatzeko mezuaren aurrebista:",
    share_copy_btn: "📋 Arbelean kopiatu",
    share_copied_toast: "Kopiatu da!",
    share_whatsapp: "WhatsApp bidez partekatu",
    share_twitter: "X / Twitter bidez partekatu",
    share_telegram: "Telegram bidez partekatu",
    share_facebook: "Facebook bidez partekatu",
    share_email: "E-posta bidez partekatu",
    share_summary_title: "📊 Nire zereginen laburpena MiiActToDo-n:",
    stats_title: "Estatistikak",
    stats_desc: "Zure zereginen laburpena.",
    kpi_total: "Guztira",
    kpi_done: "Eginak",
    kpi_progress: "Bidean",
    kpi_pending: "Zain",
    kpi_desc_circle: "Progresua",
    chart_bar_title: "Ordu gorenak",
    chart_bar_desc: "Sorkuntza maiztasuna orduka.",
    ambitos_section_title: "Esparruak",
    ambitos_familia: "👪 Familia",
    ambitos_personal: "👤 Pertsonala",
    ambitos_social: "👥 Soziala",
    ambitos_laboral: "💼 Lana",
    ambitos_ocio: "🎭 Aisialdia",
    ambitos_salud: "❤️ Osasuna",
    ambitos_hogar: "🏠 Etxea",
    ambitos_finanzas: "💰 Finantzak",
    otros_criterios_title: "Beste irizpide batzuk",
    criterio_urgencia: "Premia",
    criterio_importancia: "Garrantzia",
    criterio_dificultad: "Zailtasuna",
    criterio_tiempo: "Denbora",
    urgencia_alta: "🔴 Handia",
    urgencia_media: "🟡 Tartekoa",
    urgencia_baja: "🟢 Txikia",
    importancia_muy: "🔥 Oso garrantzitsua",
    importancia_imp: "✨ Garrantzitsua",
    importancia_menos: "💤 Garrantzi gutxikoa",
    dificultad_alta: "🧗 Handia",
    dificultad_media: "⚙️ Tartekoa",
    dificultad_baja: "🌱 Txikia",
    tiempo_poco: "⏱️ Gutxi: 2 egun",
    tiempo_medio: "⏳ Tartekoa: 4 egun",
    tiempo_largo: "📅 Luzea: >astebete",
    empty_tasks: "Ez dago zereginik",
    print_note: "Inprimatu edo PDF gisa gorde.",
    print_header_title: "Inprimatzea",
    print_header_desc: "Zereginen antolaketa.",
    form_ambito: 'Esparrua:',
    form_urgencia: 'Premia:',
    form_importancia: 'Garrantzia:',
    form_dificultad: 'Zailtasuna:',
    form_tiempo: 'Denbora:',
    form_color: 'Kolorea:',
    form_size: 'Tamaina:',
    form_size_s: 'Txikia',
    form_size_m: 'Tartekoa',
    form_size_l: 'Handia',
    form_desc: 'Azalpena:',
    form_desc_placeholder: 'Zereginaren azalpena...',
    form_date_type: '📅 Data mota:',
    form_date_single: 'Data bat',
    form_date_range: 'Data-tartea',
    form_time_type: '🕒 Ordu mota:',
    form_time_single: 'Ordu bat',
    form_time_range: 'Ordu-tartea',
    form_date_start_label: 'Data:',
    form_date_start_range: 'Hasiera D.:',
    form_date_end_label: 'Amaiera D.:',
    form_time_start_label: 'Ordua:',
    form_time_start_range: 'Hasiera O.:',
    form_time_end_label: 'Amaiera O.:',
    form_none: 'Batere ez',
    form_none_f: 'Batere ez',
    form_emoji_main: '⭐ Emotikonoa:',
    form_save: '💾 Gorde',
    form_cancel: 'Utzi',
    form_add: 'Gehitu',
    form_col_dest: 'Mugitu hona:',
    form_connect_word: 'hona',
    form_connect_time: 'hona',
    download_modal_title: "Deskargatu Arbela",
    download_modal_desc: "Hautatu nola gorde edo inprimatu nahi duzun arbela:",
    download_pdf_btn: "📄 Gorde PDF gisa / Inprimatu",
    download_png_btn: "🖼️ Deskargatu Irudi gisa (PNG)"
  }
};

const stepsTranslations = {
  es: {
    1: {
      title: "Añadir Tarea (Crear)",
      desc: "Pulsa el botón <strong>\"+ Añadir tarea\"</strong> en cualquier columna. Escribe lo que quieres hacer y haz clic en <strong>Añadir</strong>.",
      narrator: "Paso 1. Añadir una Tarea. Haz clic en el botón con la cruz que dice Añadir Tarea al final de la columna. Escribe el texto y pulsa Guardar para añadir tu tarea al tablero.",
      lseText: 'Señalar ➕ "Añadir". Mover manos hacia delante.',
      lseChapter: "Añadir"
    },
    2: {
      title: "Mover Tarea (Organizar)",
      desc: "Arrastra la tarea a otra columna con el ratón. O abre el <strong>desplegable</strong> en la tarjeta y selecciona otra columna.",
      narrator: "Paso 2. Mover una Tarea de columna. Puedes arrastrar la tarjeta con el ratón hacia otra columna, o si lo prefieres, abre el menú desplegable dentro de la tarjeta y selecciona la columna de destino.",
      lseText: 'Simular agarre 🔄 "Arrastrar". Manos unidas de lado.',
      lseChapter: "Mover"
    },
    3: {
      title: "Modificar Tarea (Editar)",
      desc: "Haz clic en el lápiz <strong>✏️</strong> o doble clic en el texto. Cambia el texto o categorías y haz clic en el disquete <strong>💾</strong>.",
      narrator: "Paso 3. Modificar Tarea. Pulsa el botón del lápiz amarillo en la tarjeta de la tarea o haz doble clic sobre el texto para cambiarlo y pulsa el disquete para guardar.",
      lseText: 'Escribir en el aire ✏️ "Editar". Mano derecha trazando.',
      lseChapter: "Editar"
    },
    4: {
      title: "Marcar Tarea (Tick y Cruz)",
      desc: "Haz clic en la cruz <strong>❌</strong> para completarla (se moverá a Hecho). Pulsa el tick verde <strong>✅</strong> para volver a activarla.",
      narrator: "Paso 4. Marcar Tarea como Hecha. Haz clic en la cruz roja al inicio de la tarjeta para marcarla como completada. Cambiará al tick verde y se moverá sola a la columna Hecho. Puedes clicar el tick verde para volver a hacerla pendiente.",
      lseText: 'Hacer check 📈 "Hecho". Pulgar arriba feliz.',
      lseChapter: "Marcar"
    },
    5: {
      title: "Eliminar Tarea (Borrar)",
      desc: "Haz clic en la papelera <strong>🗑️</strong> para borrar la tarea si ya no la necesitas.",
      narrator: "Paso 5. Eliminar Tarea. Pulsa el botón de la papelera roja en la tarjeta para borrar definitivamente la tarea. Te pediremos confirmación antes de borrarla.",
      lseText: 'Tirar abajo 🗑️ "Eliminar". Mano hacia suelo.',
      lseChapter: "Borrar"
    }
  },
  en: {
    1: {
      title: "Add Task (Create)",
      desc: "Click the <strong>\"+ Add task\"</strong> button in any column. Write what you want to do and click <strong>Add</strong>.",
      narrator: "Step 1. Add a Task. Click the button with the cross that says Add Task at the bottom of the column. Write the text and press Save to add your task to the board.",
      lseText: 'Point ➕ "Add". Move hands forward.',
      lseChapter: "Add"
    },
    2: {
      title: "Move Task (Organize)",
      desc: "Drag the task to another column with the mouse. Or open the <strong>dropdown</strong> on the card and select another column.",
      narrator: "Step 2. Move a Task to another column. You can drag the card with the mouse to another column, or if you prefer, open the dropdown menu inside the card and select the target column.",
      lseText: 'Simulate grip 🔄 "Drag". Hands joined sideways.',
      lseChapter: "Move"
    },
    3: {
      title: "Modify Task (Edit)",
      desc: "Click the pencil <strong>✏️</strong> or double-click on the text. Change the text or categories and click on the floppy disk <strong>💾</strong>.",
      narrator: "Step 3. Modify Task. Press the yellow pencil button on the task card or double-click on the text to change it and press the floppy disk to save.",
      lseText: 'Write in the air ✏️ "Edit". Right hand tracing.',
      lseChapter: "Edit"
    },
    4: {
      title: "Mark Task (Tick and Cross)",
      desc: "Click the cross <strong>❌</strong> to complete it (it will move to Done). Press the green tick <strong>✅</strong> to reactivate it.",
      narrator: "Step 4. Mark Task as Done. Click the red cross at the beginning of the card to mark it as completed. It will change to the green tick and move on its own to the Done column. You can click the green tick to make it pending again.",
      lseText: 'Make check 📈 "Done". Happy thumb up.',
      lseChapter: "Mark"
    },
    5: {
      title: "Delete Task (Delete)",
      desc: "Click on the trash can <strong>🗑️</strong> to delete the task if you no longer need it.",
      narrator: "Step 5. Delete Task. Press the red trash button on the card to permanently delete the task. We will ask you for confirmation before deleting it.",
      lseText: 'Pull down 🗑️ "Delete". Hand towards floor.',
      lseChapter: "Delete"
    }
  },
  fr: {
    1: { title: "Ajouter tâche", desc: "Cliquez sur + Ajouter tâche.", narrator: "Étape 1. Cliquez sur le bouton ajouter tâche.", lseText: "Ajouter tâche", lseChapter: "Ajouter" },
    2: { title: "Déplacer tâche", desc: "Glissez la tâche ou utilisez le menu.", narrator: "Étape 2. Déplacez la tâche dans une autre colonne.", lseText: "Déplacer", lseChapter: "Déplacer" },
    3: { title: "Modifier tâche", desc: "Cliquez sur le crayon.", narrator: "Étape 3. Cliquez sur le crayon pour éditer.", lseText: "Modifier", lseChapter: "Modifier" },
    4: { title: "Terminer tâche", desc: "Cliquez sur la croix rouge.", narrator: "Étape 4. Cliquez sur la croix rouge pour terminer.", lseText: "Terminer", lseChapter: "Terminer" },
    5: { title: "Supprimer tâche", desc: "Cliquez sur la poubelle.", narrator: "Étape 5. Cliquez sur la poubelle pour supprimer.", lseText: "Supprimer", lseChapter: "Supprimer" }
  },
  de: {
    1: { title: "Aufgabe hinzufügen", desc: "Klicken Sie auf + Hinzufügen.", narrator: "Schritt 1. Klicken Sie auf Aufgabe hinzufügen.", lseText: "Hinzufügen", lseChapter: "Hinzufügen" },
    2: { title: "Aufgabe verschieben", desc: "Ziehen Sie die Aufgabe.", narrator: "Schritt 2. Verschieben Sie die Aufgabe in eine andere Spalte.", lseText: "Verschieben", lseChapter: "Verschieben" },
    3: { title: "Aufgabe bearbeiten", desc: "Klicken Sie auf den Stift.", narrator: "Schritt 3. Klicken Sie auf den Stift zum Bearbeiten.", lseText: "Bearbeiten", lseChapter: "Bearbeiten" },
    4: { title: "Erledigen", desc: "Klicken Sie auf das rote Kreuz.", narrator: "Schritt 4. Klicken Sie auf das rote Kreuz.", lseText: "Erledigt", lseChapter: "Erledigt" },
    5: { title: "Löschen", desc: "Klicken Sie auf den Mülleimer.", narrator: "Schritt 5. Klicken Sie auf den Mülleimer.", lseText: "Löschen", lseChapter: "Löschen" }
  },
  it: {
    1: { title: "Aggiungi compito", desc: "Clicca su + Aggiungi compito.", narrator: "Passo 1. Clicca su Aggiungi compito.", lseText: "Aggiungi", lseChapter: "Aggiungi" },
    2: { title: "Sposta compito", desc: "Trascina il compito.", narrator: "Passo 2. Sposta il compito in un'altra colonna.", lseText: "Sposta", lseChapter: "Sposta" },
    3: { title: "Modifica compito", desc: "Clicca sulla matita.", narrator: "Passo 3. Clicca sulla matita per modificare.", lseText: "Modifica", lseChapter: "Modifica" },
    4: { title: "Completa compito", desc: "Clicca sulla croce rossa.", narrator: "Passo 4. Clicca sulla croce rossa.", lseText: "Completa", lseChapter: "Completa" },
    5: { title: "Elimina compito", desc: "Clicca sul cestino.", narrator: "Passo 5. Clicca sul cestino per eliminare.", lseText: "Elimina", lseChapter: "Elimina" }
  },
  pt: {
    1: { title: "Adicionar tarefa", desc: "Clique em + Adicionar tarefa.", narrator: "Passo 1. Clique em Adicionar tarefa.", lseText: "Adicionar", lseChapter: "Adicionar" },
    2: { title: "Mover tarefa", desc: "Arraste a tarefa.", narrator: "Passo 2. Mova a tarefa para outra coluna.", lseText: "Mover", lseChapter: "Mover" },
    3: { title: "Editar tarefa", desc: "Clique no lápis.", narrator: "Passo 3. Clique no lápis para editar.", lseText: "Editar", lseChapter: "Editar" },
    4: { title: "Concluir tarefa", desc: "Clique na cruz vermelha.", narrator: "Passo 4. Clique na cruz vermelha.", lseText: "Concluir", lseChapter: "Concluir" },
    5: { title: "Eliminar tarefa", desc: "Clique no caixote do lixo.", narrator: "Passo 5. Clique no caixote para apagar.", lseText: "Eliminar", lseChapter: "Eliminar" }
  },
  ca: {
    1: { title: "Afegir tasca", desc: "Clica en + Afegir tasca.", narrator: "Pas 1. Clica en Afegir tasca.", lseText: "Afegir", lseChapter: "Afegir" },
    2: { title: "Moure tasca", desc: "Arrossega la tasca.", narrator: "Pas 2. Mou la tasca de columna.", lseText: "Moure", lseChapter: "Moure" },
    3: { title: "Editar tasca", desc: "Clica en el llapis.", narrator: "Pas 3. Clica en el llapis per editar.", lseText: "Editar", lseChapter: "Editar" },
    4: { title: "Marcar com a feta", desc: "Clica en la creu vermella.", narrator: "Pas 4. Clica en la creu vermella.", lseText: "Fet", lseChapter: "Fet" },
    5: { title: "Eliminar tasca", desc: "Clica a la paperera.", narrator: "Pas 5. Clica a la paperera per esborrar.", lseText: "Eliminar", lseChapter: "Eliminar" }
  },
  gl: {
    1: { title: "Engadir tarefa", desc: "Preme + Engadir tarefa.", narrator: "Paso 1. Preme Engadir tarefa.", lseText: "Engadir", lseChapter: "Engadir" },
    2: { title: "Mover tarefa", desc: "Arastra a tarefa.", narrator: "Paso 2. Mova a tarefa de columna.", lseText: "Mover", lseChapter: "Mover" },
    3: { title: "Editar tarefa", desc: "Preme no lapis.", narrator: "Paso 3. Preme no lapis para editar.", lseText: "Editar", lseChapter: "Editar" },
    4: { title: "Marcar como feita", desc: "Preme na cruz vermella.", narrator: "Paso 4. Preme na cruz vermella.", lseText: "Feito", lseChapter: "Feito" },
    5: { title: "Eliminar tarefa", desc: "Preme no lixo.", narrator: "Paso 5. Preme no lixo para borrar.", lseText: "Eliminar", lseChapter: "Eliminar" }
  },
  eu: {
    1: { title: "Zeregina gehitu", desc: "Sakatu + Gehitu zeregina.", narrator: "1. urratsa. Gehitu zeregina sakatu.", lseText: "Gehitu", lseChapter: "Gehitu" },
    2: { title: "Zeregina mugitu", desc: "Mugitu zeregina zutabez.", narrator: "2. urratsa. Mugitu zeregina arrastatuz.", lseText: "Mugitu", lseChapter: "Mugitu" },
    3: { title: "Zeregina editatu", desc: "Sakatu arkatza.", narrator: "3. urratsa. Sakatu arkatza editatzeko.", lseText: "Editatu", lseChapter: "Editatu" },
    4: { title: "Egintzat jo", desc: "Sakatu gurutze gorria.", narrator: "4. urratsa. Sakatu gurutze gorria egintzat jotzeko.", lseText: "Egina", lseChapter: "Egina" },
    5: { title: "Zeregina ezabatu", desc: "Sakatu zakarrontzia.", narrator: "5. urratsa. Sakatu zakarrontzia ezabatzeko.", lseText: "Ezabatu", lseChapter: "Ezabatu" }
  }
};

// Expose globally so other scripts can access translations and active language
window.translations = translations;

window.updateUIForLanguage = (lang) => {
  const dict = translations[lang] || translations.es;
  
  // Update elements with data-translate attribute
  const elements = document.querySelectorAll('[data-translate]');
  elements.forEach(el => {
    const key = el.getAttribute('data-translate');
    if (dict[key]) {
      if (el.tagName === 'INPUT' && (el.type === 'text' || el.type === 'search')) {
        el.placeholder = dict[key];
      } else {
        el.innerHTML = dict[key];
      }
    }
  });

  // Specifically handle translating Steps in Manual (About page)
  const steps = document.querySelectorAll('.easy-step');
  const langSteps = stepsTranslations[lang] || stepsTranslations.es;
  
  steps.forEach(step => {
    const stepId = step.getAttribute('data-step');
    const stepInfo = langSteps[stepId] || langSteps[1] || stepsTranslations.es[1];
    if (stepInfo) {
      step.setAttribute('data-text', stepInfo.narrator || '');
      const titleEl = step.querySelector('.step-details h3');
      const descEl = step.querySelector('.step-details p');
      if (titleEl) titleEl.innerHTML = stepInfo.title || '';
      if (descEl) descEl.innerHTML = stepInfo.desc || '';
    }
  });

  // Re-translate active step in LSE player if page is about
  const activeStep = document.querySelector('.easy-step.active');
  const lseEmoji = document.getElementById('lse-avatar-emoji');
  const lseStatus = document.getElementById('lse-status-text');
  const lseChapter = document.getElementById('lse-chapter-badge');
  
  if (activeStep && lseEmoji && lseStatus && lseChapter) {
    const stepId = activeStep.getAttribute('data-step');
    const stepInfo = langSteps[stepId] || langSteps[1] || stepsTranslations.es[1];
    if (stepInfo) {
      lseStatus.innerHTML = stepInfo.lseText || '';
      lseChapter.innerHTML = 'LSE: ' + (stepInfo.lseChapter || '');
    }
  } else if (lseStatus && lseChapter && !activeStep) {
    lseStatus.innerHTML = dict.lse_status_init;
    lseChapter.innerHTML = dict.lse_chapter_init;
  }

  // Reload the task lists (if tasks script is present)
  if (typeof window.renderTasks === 'function') {
    window.renderTasks();
  }
  // Reload the statistics elements (if stats script is present)
  if (typeof window.renderStats === 'function') {
    window.renderStats();
  }

  // Sync select element value
  const select = document.getElementById('lang-select');
  if (select) {
    select.value = lang;
  }

  // Dispatch a global event in case other scripts need to re-render
  window.dispatchEvent(new CustomEvent('languagechanged', { detail: { language: lang } }));
};

// Global Download Modal Handler
const showDownloadModal = () => {
  const lang = localStorage.getItem('app-language') || 'es';
  const dict = translations[lang] || translations.es;
  
  const modalTitle = dict.download_modal_title || 'Descargar / Guardar Tablero';
  const modalDesc = dict.download_modal_desc || 'Selecciona cómo deseas guardar o imprimir la información de tus tareas:';
  const pdfBtnText = dict.download_pdf_btn || '📄 Guardar como PDF / Imprimir';
  const pngBtnText = dict.download_png_btn || '🖼️ Descargar como Imagen (PNG)';
  const cancelBtnText = dict.form_cancel || 'Cancelar';

  // Create Modal Overlay
  const overlay = document.createElement('div');
  overlay.id = 'download-modal-overlay';
  overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(15, 23, 42, 0.4);
    backdrop-filter: blur(8px);
    z-index: 99999;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.25s ease;
  `;

  const card = document.createElement('div');
  card.style.cssText = `
    background: var(--bg-card, #ffffff);
    color: var(--text-color, #1f2937);
    border: 1px solid var(--border-color, rgba(0,0,0,0.08));
    border-radius: 16px;
    padding: 1.75rem 2rem;
    width: 90%;
    max-width: 420px;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    display: flex;
    flex-direction: column;
    gap: 1rem;
    transform: translateY(10px);
    transition: transform 0.25s ease;
  `;

  card.innerHTML = `
    <h3 style="margin: 0; font-size: 1.2rem; font-weight: 800; text-align: center;">${modalTitle}</h3>
    <p style="margin: 0; font-size: 0.88rem; opacity: 0.8; text-align: center; line-height: 1.4;">${modalDesc}</p>
    
    <button type="button" id="modal-download-pdf" style="background: #2563eb; color: #fff; width: 100%; padding: 12px; font-weight: 700; border: none; border-radius: 8px; cursor: pointer; text-align: center; font-size: 0.85rem; transition: all 0.2s ease; outline: none; box-shadow: 0 4px 10px rgba(37, 99, 235, 0.2);">
      ${pdfBtnText}
    </button>
    
    <button type="button" id="modal-download-png" style="background: #10b981; color: #fff; width: 100%; padding: 12px; font-weight: 700; border: none; border-radius: 8px; cursor: pointer; text-align: center; font-size: 0.85rem; transition: all 0.2s ease; outline: none; box-shadow: 0 4px 10px rgba(16, 185, 129, 0.2);">
      ${pngBtnText}
    </button>
    
    <button type="button" id="modal-download-cancel" style="background: rgba(120,120,120,0.15); color: inherit; width: 100%; padding: 10px; font-weight: 700; border: none; border-radius: 8px; cursor: pointer; text-align: center; font-size: 0.85rem; transition: all 0.2s ease; margin-top: 4px; outline: none;">
      ${cancelBtnText}
    </button>
  `;

  overlay.appendChild(card);
  document.body.appendChild(overlay);

  // Trigger modal animations
  setTimeout(() => {
    overlay.style.opacity = '1';
    card.style.transform = 'translateY(0)';
  }, 10);

  const closeModal = () => {
    overlay.style.opacity = '0';
    card.style.transform = 'translateY(10px)';
    setTimeout(() => {
      overlay.remove();
    }, 250);
  };

  // Resolve current relative path prefix
  const isSubPage = window.location.pathname.includes('/pages/');
  const prefix = isSubPage ? '../../' : '';

  overlay.querySelector('#modal-download-pdf').addEventListener('click', () => {
    window.open(prefix + 'options/tablero.html?print=true', '_blank');
    closeModal();
  });

  overlay.querySelector('#modal-download-png').addEventListener('click', () => {
    window.open(prefix + 'options/tablero.html?png=true', '_blank');
    closeModal();
  });

  overlay.querySelector('#modal-download-cancel').addEventListener('click', closeModal);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });
};

// Global Download Button Setup
const setupGlobalDownloadListener = () => {
  const btn = document.querySelector('nav button[data-action="download-board"]');
  if (btn) {
    if (btn.dataset.bound === 'true') return;
    btn.dataset.bound = 'true';
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      showDownloadModal();
    });
  }
};

// Prepend Language Selector Dropdown dynamically
const injectLanguageSelector = () => {
  const navActions = document.querySelector('.nav-actions');
  if (!navActions) return;

  if (document.getElementById('lang-selector-container')) return;

  const container = document.createElement('div');
  container.id = 'lang-selector-container';
  container.className = 'lang-selector-nav';
  
  // Premium glassmorphic rounded pill style
  container.style.cssText = `
    display: inline-flex;
    align-items: center;
    gap: 4px;
    background: rgba(120, 120, 120, 0.1);
    padding: 4px 10px;
    border-radius: 999px;
    border: 1px solid rgba(120, 120, 120, 0.2);
    margin-right: 8px;
    align-self: center;
    color: inherit;
  `;
  
  const currentLang = localStorage.getItem('app-language') || 'es';

  // Label with globe and plus
  const label = document.createElement('span');
  label.innerHTML = '🌐 +';
  label.style.cssText = `
    font-size: 0.8rem;
    font-weight: 800;
    margin-right: 2px;
    user-select: none;
    opacity: 0.9;
  `;

  // Select dropdown element
  const select = document.createElement('select');
  select.id = 'lang-select';
  select.style.cssText = `
    border: none;
    background: transparent;
    color: inherit;
    font-size: 0.75rem;
    font-weight: 700;
    cursor: pointer;
    outline: none;
    padding-right: 4px;
  `;

  // Define 9 languages
  const options = [
    { code: 'es', label: 'Español (ES)' },
    { code: 'en', label: 'English (EN)' },
    { code: 'fr', label: 'Français (FR)' },
    { code: 'de', label: 'Deutsch (DE)' },
    { code: 'it', label: 'Italiano (IT)' },
    { code: 'pt', label: 'Português (PT)' },
    { code: 'ca', label: 'Català (CA)' },
    { code: 'gl', label: 'Galego (GL)' },
    { code: 'eu', label: 'Euskara (EU)' }
  ];

  options.forEach(opt => {
    const el = document.createElement('option');
    el.value = opt.code;
    el.textContent = opt.label;
    el.style.cssText = `
      background: var(--bg-card, #ffffff);
      color: var(--text-color, #1f2937);
      font-weight: 600;
    `;
    if (opt.code === currentLang) {
      el.selected = true;
    }
    select.appendChild(el);
  });

  select.addEventListener('change', (e) => {
    const selected = e.target.value;
    localStorage.setItem('app-language', selected);
    window.updateUIForLanguage(selected);
  });

  container.appendChild(label);
  container.appendChild(select);
  
  // Prepend to actions in nav
  navActions.insertBefore(container, navActions.firstChild);
};

// Initialize Language on DOM Load
document.addEventListener('DOMContentLoaded', () => {
  injectLanguageSelector();
  const currentLang = localStorage.getItem('app-language') || 'es';
  window.updateUIForLanguage(currentLang);
  setupGlobalDownloadListener();
});
