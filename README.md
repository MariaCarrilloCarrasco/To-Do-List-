# To-Do-List-
Herramienta de gestión del tiempo y organización personal que recopila, de forma estructurada, todas las actividades, pendientes o compromisos que una persona necesita realizar en un periodo determinado.  

Su propósito principal es liberar carga cognitiva —sacar los pensamientos de la cabeza y plasmarlos en un soporte físico o digital— para reducir la ansiedad, mejorar el enfoque y asegurar que nada importante se quede en el olvido.
### 🧱 Componentes clave de una To-Do List efectiva

Para que una lista de tareas sea realmente funcional (y no una simple acumulación de frustraciones), suele estructurarse bajo los siguientes pilares:

- **Acciones concretas (Tareas):** Elementos redactados de forma clara e individual, preferiblemente comenzando con un verbo de acción (ej. *"Redactar el informe trimestral"*, en lugar de solo *"Informe"*).
- **Estado de la tarea:** Indicadores visuales que marcan el ciclo de vida de cada pendiente (generalmente divididos en *Pendientes*, *En proceso* y *Completadas*).
- **Priorización o Categorización:** Etiquetas, colores o filtros que permiten agrupar las tareas por urgencia, contexto (trabajo, hogar, estudio) o nivel de energía requerido.
- **Fechas límite (Deadlines):** Asignación de plazos para dar sentido de urgencia y permitir una planificación realista en el calendario.
- **Diseño Adaptable (Responsive)**
- **Clases estables:** Definir clases claras desde el principio para que JavaScript pueda interactuar con el DOM sin romper los estilos.

### 2. Lógica y Métodos Avanzados (JavaScript Vanilla ES6+)

- **ESModules:** Separar el código en archivos independientes (ej. `api.js` y `app.js`) utilizando `import` y `export`.
- **Template Strings y Métodos de Array:** Uso obligatorio de `.forEach()` (para pintar), `.filter()` (para filtrar), `.some()` (para evitar duplicados) y `.reduce()` (para calcular los contadores/totales).

### 3. Base de Datos Local (JSON Server)

**Se utiliza para guardar las tareas reales** (el texto de la tarea y si está completada o no).
**¿Por qué lo usamos?** Porque actúa como un servidor de verdad. Si añades una tarea, se guarda en un archivo de tu ordenador (`db.json`). Si cierras el navegador, apagas el ordenador y vuelves al día siguiente, las tareas siguen ahí porque se quedaron guardadas "en el servidor".

### 4. Persistencia de la UI (LocalStorage)

- **Guardar Estado:** Almacenar en el navegador el filtro seleccionado por el usuario (Todas / Pendientes / Completadas) para que, al recargar la página, la app recuerde exactamente dónde estaba.

## **Creadora del Proyecto**:
- María Carrillo Carrasco.   *Social Developer*  **FactoríaF5**
### 1. Estructura y Estilos (HTML5 & CSS3)

- **HTML5 Semántico:** Uso obligatorio de etiquetas estructurales (`<header>`, `<main>`, `<section>`, `<footer>`)
