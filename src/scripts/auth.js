// ======================================================================
// CONFIGURACIÓN E INICIALIZACIÓN DE ELEMENTOS DEL DOM
// ======================================================================

// Importamos los mecanismos modulares de persistencia de datos en el navegador
import { setSession, getSession, clearSession } from './storage.js';

// Elementos contenedores de las vistas principales (SPA)
const authView = document.getElementById('auth-view');
const dashboardView = document.getElementById('dashboard-view');

// Elementos del formulario de inicio de sesión
const loginForm = document.getElementById('login-form');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const submitButton = document.getElementById('login-submit');

// Elemento para mostrar mensajes de error en el Login
const errorMessageArea = document.getElementById('login-error-message');

// Elemento interactivo para alternar la visibilidad de la contraseña
const togglePasswordButton = document.getElementById('toggle-password');

// Seleccionamos el nuevo botón de Cerrar Sesión ubicado arriba a la derecha 
const logoutButton = document.getElementById('logout-btn');

// Expresión regular estándar para comprobar el formato de un correo 
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// ======================================================================
// COMPROBACIÓN DE SESIÓN ACTIVA AL CARGAR LA PÁGINA 
// ======================================================================

document.addEventListener('DOMContentLoaded', () => {
    const activeSession = getSession();
    
    // Si la sesión existe en el localStorage, hacemos el salto directo al Dashboard
    if (activeSession) {
        authView.setAttribute('hidden', 'true');
        dashboardView.removeAttribute('hidden');
        
        // Pintamos el email del usuario que recuperamos del almacenamiento local
        document.getElementById('user-display-email').textContent = activeSession.email;
    }
});

// ======================================================================
// VALIDACIÓN DE CAMPOS EN TIEMPO REAL
// ======================================================================

function validateFormInputs() {
    const isEmailValid = EMAIL_REGEX.test(emailInput.value.trim());
    const isPasswordFilled = passwordInput.value.length >= 1;

    if (isEmailValid && isPasswordFilled) {
        submitButton.removeAttribute('disabled');
    } else {
        submitButton.setAttribute('disabled', 'true');
    }
}

emailInput.addEventListener('input', validateFormInputs);
passwordInput.addEventListener('input', validateFormInputs);

// ======================================================================
// MOSTRAR / OCULTAR CONTRASEÑA
// ======================================================================

togglePasswordButton.addEventListener('click', () => {
    const isPasswordType = passwordInput.getAttribute('type') === 'password';
    passwordInput.setAttribute('type', isPasswordType ? 'text' : 'password');
    
    const eyeIcon = togglePasswordButton.querySelector('.login-form__icon--eye');
    if (eyeIcon) {
        eyeIcon.textContent = isPasswordType ? 'visibility_off' : 'visibility';
    }
});

// ======================================================================
// PROCESO ASÍNCRONO DE AUTENTICACIÓN
// ======================================================================

loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    
    errorMessageArea.setAttribute('hidden', 'true');
    errorMessageArea.textContent = '';

    const emailValue = emailInput.value.trim();
    const passwordValue = passwordInput.value;

    try {
        const response = await fetch('/config.json');
        
        if (!response.ok) {
            throw new Error('No se pudo verificar la configuración de seguridad local.');
        }

        const credentials = await response.json();

        if (emailValue === credentials.adminEmail && passwordValue === credentials.adminPassword) {
            
            // Guardamos de forma persistente los datos del usuario en el localStorage 
            setSession({ email: emailValue });

            // REDIRECCIÓN SPA: Ocultamos el Login y revelamos el Dashboard
            authView.setAttribute('hidden', 'true');
            dashboardView.removeAttribute('hidden');
            
            document.getElementById('user-display-email').textContent = emailValue;
            
        } else {
            errorMessageArea.textContent = 'Correo electrónico o contraseña incorrectos.';
            errorMessageArea.removeAttribute('hidden');
        }

    } catch (error) {
        errorMessageArea.textContent = `Error del sistema: ${error.message}`;
        errorMessageArea.removeAttribute('hidden');
    }
});

// ======================================================================
// LOGOUT DEL DASHBOARD 
// ======================================================================

logoutButton.addEventListener('click', () => {
    // 1. Eliminamos la sesión del almacenamiento local (HU-3 T03)
    clearSession();

    // 2. Limpiamos los campos del formulario de entrada por seguridad
    loginForm.reset();
    
    // 3. Bloqueamos de nuevo el botón azul
    submitButton.setAttribute('disabled', 'true');

    // 4. REDIRECCIÓN SPA: Ocultamos el Dashboard y volvemos a mostrar el Login (HU-3 T04)
    dashboardView.setAttribute('hidden', 'true');
    authView.removeAttribute('hidden');
});