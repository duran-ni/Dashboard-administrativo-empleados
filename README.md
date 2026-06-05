# Dashboard Administrativo de Gestión de Empleados

#  📝 Descripción

Este proyecto consiste en una aplicación web dinámica de tipo **dashboard administrativo** para la gestión interna de personal. 
La plataforma implementa un sistema de control de acceso privado que protege los datos organizacionales frente a usuarios no autenticados.

A nivel técnico, la aplicación valida las credenciales en el cliente y utiliza almacenamiento local persistente para el manejo del estado de la sesión. Una vez superada la autenticación, se realiza una petición asíncrona a una API REST externa para recuperar la información de los trabajadores, renderizándola dinámicamente en una **tabla administrativa organizada** que cuenta con controles interactivos de filtrado alfabético y por nombre.

# 🔍 Análisis
* **Portal de Sesión (Login)**: Formulario centralizado con validación síncrona de correo electrónico y contraseñas de alta seguridad (mínimo 8 caracteres y al menos un dígito).
* **Vista de Tabla Administrativa**: Visualización estructurada de empleados estructurada en columnas clave: Nombre, Email, Calle, Suite, Ciudad y Código Postal.
* **Filtrado Alfabético Superior**: Una barra de navegación con el abecedario completo (`Todos`, `A`, `B`, `C`...) para segmentar de forma instantánea a los empleados según la inicial de su nombre.
* **Barra de Búsqueda Integrada**: Filtro dinámico adicional para localizar trabajadores por nombre.
* **Persistencia en Navegador**: Mantenimiento de sesión activa mediante almacenamiento local, impidiendo la pérdida de estado al refrescar.

# 📷 Prototipo

# 👤↝ User Flow

# 📦 Instalación

En este proyecto se realizaron los siguientes pasos:

## Clonar el repositorio.
* **1-** git clone https://github.com/duran-ni/Dashboard-administrativo-empleados.git
* **2-** cd Dashboard-administrativo-empleados
* **3-** code .
## Inicialización del proyecto e Instalación de Dependencias
* **1-** npm init -y
* **2-** npm install -D vitest
* **3-** npm init playwright@latest  
## Creación de la Estructura de Carpetas
* **1-** mkdir -p src/assets/icons src/styles src/scripts
* **2-** touch index.html dashboard.html config.json src/styles/main.css src/styles/auth.css 
* **3-** src/styles/dashboard.css src/scripts/auth.js src/scripts/api.js src/scripts/storage.js src/scripts/ui.js

## Ejecutar Proyecto
**Paso 1:** Implementación de HTML del Login 

**Paso 2:** Implementación de Estilos CSS del Login

**Paso 3:** Borrar carpeta Dashboard con el comando: rm dashboard.html

**Paso 4:** Estructuración del HTML Unificado (SPA)

**Paso 5:** Implementar las Subtareas registradas en Jira


#  🛠️ Planificación

# 📋 Historias de Usuario y Criterios de Aceptación




#  💻 Tecnologías Utilizadas

* HTML5
* CSS3
* JavaScript (vanilla)

# 📷 Captura Tests

# ✍️ Autora

* duran-ni