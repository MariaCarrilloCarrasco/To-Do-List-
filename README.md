# 📋 Ficha de Proyecto: MiiActToDo

Herramienta de gestión del tiempo y organización personal que recopila, de forma estructurada, todas las actividades, pendientes o compromisos que una persona necesita realizar en un periodo determinado. Su propósito principal es liberar carga cognitiva —sacar los pensamientos de la cabeza y plasmarlos en un soporte físico o digital— para reducir la ansiedad, mejorar el enfoque y asegurar que nada importante se quede en el olvido.

---

## 🛠️ Tecnologías Utilizadas

*   **Frontend:** SPA (Single Page Application) desarrollada con **React** (o HTML5, CSS3, JS Vanilla con ES Modules y Template Strings, según fase de desarrollo). Diseño *Responsive* (móvil, tablet y desktop) compatible con Chrome, Firefox, Safari y Edge.
*   **Backend y Datos:** Autenticación y base de datos con **Firebase** (gestión de usuarios, ámbitos y prioridades), **JSON Server** y persistencia local mediante **LocalStorage**.
*   **Despliegue y Calidad:** Control de versiones con Git (Git Flow), despliegue en **GitHub Pages** y configuración dinámica de textos mediante JSON.
*   **Accesibilidad Universal:** Traducción de contenidos, lenguaje de signos, braille, pictogramas e instrucciones para personas mayores.

---

## 🚀 Cómo Empezar (Instrucciones)

Sigue estos pasos para configurar y ejecutar el proyecto localmente en tu equipo:

### 1. Requisitos Previos
Asegúrate de tener instalado [Node.js](https://nodejs.org/) (versión 16 o superior) y npm en tu sistema.

### 2. Clonar el Repositorio
Clona el repositorio desde GitHub a tu carpeta local:
```bash
git clone https://github.com/MariaCarrilloCarrasco/To-Do-List-.git
cd To-Do-List-
```

### 3. Instalación de Dependencias
Instala todas las dependencias necesarias definidas en el proyecto:
```bash
npm install
```

### 4. Servidor de Desarrollo
Para iniciar la aplicación en modo de desarrollo local:
```bash
npm run dev
```
O, si se trata de la versión de HTML/JS Vanilla, puedes servirla de forma sencilla ejecutando:
```bash
npx http-server . -p 8000
```
Luego, abre tu navegador y accede a:
👉 **http://127.0.0.1:5500/index.html**.

### 5. Compilación para Producción
Para compilar la aplicación para producción:
```bash
npm run build
```
