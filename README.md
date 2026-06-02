# 📋 Ficha de Proyecto: MiiActToDo

Herramienta de gestión del tiempo y organización personal que recopila, de forma estructurada, todas las actividades, pendientes o compromisos que una persona necesita realizar en un periodo determinado. Su propósito principal es liberar carga cognitiva —sacar los pensamientos de la cabeza y plasmarlos en un soporte físico o digital— para reducir la ansiedad, mejorar el enfoque y asegurar que nada importante se quede en el olvido.

## 1. Stack Tecnológico y Arquitectura
*   **Frontend:** SPA (Single Page Application) desarrollada con **React** (o HTML5, CSS3, JS Vanilla con ES Modules y Template Strings, según fase de desarrollo). Diseño *Responsive* (móvil, tablet, desktop y smartwatch) compatible con Chrome, Firefox, Safari y Edge.
*   **Backend y Datos:** Autenticación y base de datos con **Firebase** (gestión de usuarios, ámbitos y prioridades), **JSON Server** y persistencia local mediante **LocalStorage**.
*   **Despliegue y Calidad:** Control de versiones con Git (Git Flow), despliegue en **GitHub Pages** y configuración dinámica de textos mediante JSON.
*   **Accesibilidad Universal:** Traducción de contenidos, lenguaje de signos, braille, pictogramas e instrucciones para personas mayores.

## 2. Requisitos Funcionales y Journey de Usuario
*   **Gestión del Tablero Kanban:** Estructura en tres columnas: **"Pendiente"**, **"En proceso"** y **"Hecho"** con capacidad de mover tareas entre ellas.
*   **Flujo de Tareas (CRUD):** Creación, modificación, eliminación y visualización detallada (fecha de inicio/fin, horas estimadas y notas).
*   **Planificación y Ámbitos:** Visualización por día, semana, mes y año. Clasificación por ámbitos: laboral, personal, social, ocio y financiero.
*   **Priorización y Filtros:** Clasificación por urgencia, importancia y nivel de dificultad mediante emoticonos interactivos.
*   **Colaboración y Compartición:** Asignación de tareas, adición de etiquetas y opciones para compartir en redes sociales o descargar el tablero en **PDF/PNG**.
*   **Productividad Visual:** Gráficos estadísticos del rendimiento e histórico de productividad para identificar horas de mayor rendimiento.

## 3. Criterios de Aceptación Técnicos (JS ES6)
*   **`.forEach()`**: Renderizado dinámico de tareas en pantalla.
*   **`.filter()`**: Gestión y filtrado de tareas según estados, urgencias o ámbitos.
*   **`.some()`**: Validación contra duplicados antes de añadir nuevas tareas.
*   **`.reduce()`**: Cálculo en tiempo real de contadores y estadísticas de productividad.

## 4. Escenarios de Comportamiento (Gherkin)
*   **Acceso y Bienvenida:** Al abrir la aplicación, el usuario inicia en una pantalla de bienvenida y navega directamente a la sección de exploración.
*   **Ayuda e Idiomas:** El botón **"Acerca de"** despliega guías de uso accesibles (braille, pictogramas, lenguaje de signos).
*   **Compartir y Descargar:** Los botones **"Compartir"** y **"Descargar"** permiten difundir el tablero o exportarlo a PDF/PNG manteniendo la navegación.
*   **Operaciones del Tablero:** Al añadir, modificar, cambiar de columna o categorizar tareas mediante emoticonos, la aplicación persiste el estado de la sesión anterior.
*   **Productividad:** Al presionar la sección de analíticas, se cargan de forma dinámica los gráficos de rendimiento del usuario.
