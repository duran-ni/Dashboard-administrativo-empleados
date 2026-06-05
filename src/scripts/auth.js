// ======================================================================
// CONFIGURACIÓN E INICIALIZACIÓN DE ELEMENTOS DEL DOM
// ======================================================================

// Elementos contenedores de las vistas principales (SPA)
const authView = document.getElementById('auth-view');
const dashboardView = document.getElementById('dashboard-view');

// Elementos del formulario de inicio de sesión
const loginForm = document.getElementById('login-form');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const submitButton = document.getElementById('login-submit');

// Elemento interactivo para alternar la visibilidad de la contraseña
const togglePasswordButton = document.getElementById('toggle-password');

// Expresión regular estándar para comprobar el formato de un correo
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// ======================================================================
// VALIDACIÓN DE CAMPOS EN TIEMPO REAL
// ======================================================================

/**
 * Revisa el contenido de los inputs para activar o desactivar el botón azul
 */
function validateFormInputs() {
    // Verificamos si el texto cumple con la regla matemática del correo electrónico 
    const isEmailValid = EMAIL_REGEX.test(emailInput.value.trim());
    
    // Verificamos si la contraseña tiene al menos un carácter escrito 
    const isPasswordFilled = passwordInput.value.length >= 1;

    // Si ambas condiciones se cumplen con éxito, habilitamos el botón de envío
    if (isEmailValid && isPasswordFilled) {
        submitButton.removeAttribute('disabled');
    } else {
        // Si falla alguna, nos aseguramos de que el botón se mantenga bloqueado
        submitButton.setAttribute('disabled', 'true');
    }
}

// Escuchamos el evento 'input' en vivo para ejecutar la validación tecla a tecla
emailInput.addEventListener('input', validateFormInputs);
passwordInput.addEventListener('input', validateFormInputs);

// ======================================================================
// MOSTRAR / OCULTAR CONTRASEÑA
// ======================================================================

/**
 * Alterna el tipo de input del campo de contraseña al pulsar el ojo 
 */
togglePasswordButton.addEventListener('click', () => {
    // Averiguamos si el tipo de input actual es oculto ('password')
    const isPasswordType = passwordInput.getAttribute('type') === 'password';
    
    // Si es password lo pasamos a text (visible), si no lo regresamos a password (enmascarado)
    passwordInput.setAttribute('type', isPasswordType ? 'text' : 'password');
    
    // Cambiamos el glifo de Google Fonts según el estado de la visibilidad 
    const eyeIcon = togglePasswordButton.querySelector('.login-form__icon--eye');
    if (eyeIcon) {
        // Si la contraseña ahora es visible en claro, ponemos el ojo tachado
        // Si vuelve a estar oculta, restauramos el ojo normal
        eyeIcon.textContent = isPasswordType ? 'visibility_off' : 'visibility';
    }
});

// ======================================================================
// PROCESO ASÍNCRONO DE AUTENTICACIÓN
// ======================================================================

/**
 * Captura el envío del formulario para validar las credenciales de forma asíncrona 
 */
loginForm.addEventListener('submit', async (event) => {
    // Evitamos que la página se recargue automáticamente (comportamiento nativo)
    event.preventDefault();
    
    // Limpamos y ocultamos mensajes de error previos antes de un nuevo intento
    errorMessageArea.setAttribute('hidden', 'true');
    errorMessageArea.textContent = '';

    const emailValue = emailInput.value.trim();
    const passwordValue = passwordInput.value;

    try {
        // Realizamos una petición asíncrona HTTP hacia nuestro archivo de configuración local
        const response = await fetch('/config.json');
        
        // Si el archivo no existe o falla la petición, lanzamos una excepción al bloque catch
        if (!response.ok) {
            throw new Error('No se pudo verificar la configuración de seguridad local.');
        }

        // Procesamos y convertimos la respuesta JSON en un objeto JavaScript legible
        const credentials = await response.json();

        // Evaluamos si lo que escribió el usuario coincide exactamente con el JSON de seguridad 
        if (emailValue === credentials.adminEmail && passwordValue === credentials.adminPassword) {
            
            // REDIRECCIÓN SPA: Ocultamos el Login y revelamos el Dashboard en la misma página 
            authView.setAttribute('hidden', 'true');
            dashboardView.removeAttribute('hidden');
            
            // Actualizamos visualmente el email del administrador en la esquina del Dashboard
            document.getElementById('user-display-email').textContent = emailValue;
            
        } else {
            // CONTROL DE FALLOS: Si no coinciden, mostramos el error genérico 
            errorMessageArea.textContent = 'Correo electrónico o contraseña incorrectos.';
            errorMessageArea.removeAttribute('hidden');
        }

    } catch (error) {
        // Captura de errores críticos del sistema (por ejemplo, si el JSON se rompe o no se encuentra)
        errorMessageArea.textContent = `Error del sistema: ${error.message}`;
        errorMessageArea.removeAttribute('hidden');
    }
});