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