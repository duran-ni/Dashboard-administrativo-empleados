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

Los pasos en el proceso de instalación son los siguientes:

* **1-** Clonar el repositorio.
* **2-** Instalar el entorno de dependencias y ejecutar las herramientas de desarrollo.
* **3-** Testing.

**Paso 1:** Clonar el repositorio remoto

**Paso 2:** Acceder al directorio raíz del proyecto

**Paso 3:** Instalar las dependencias del ecosistema

**Paso 4:** Levantar el entorno de desarrollo local

**Paso 5:** Ejecutar la suite de pruebas automatizadas


#  🛠️ Planificación

# 📖 Historias de Usuario y Criterios de Aceptación




#  💻 Tecnologías Utilizadas

* HTML5
* CSS3
* JavaScript (vanilla)

# 📷 Captura Tests

# ✍️ Autora

* duran-ni