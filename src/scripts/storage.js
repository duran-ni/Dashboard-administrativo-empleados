// Clave única para identificar los datos de la sesión en el almacenamiento local
const SESSION_KEY = 'admin_session_active';

/**
 * Guarda de forma persistente los datos de la sesión del usuario administrador.
 * @param {Object} userData - Objeto que contiene el email del administrador.
 */
export function setSession(userData) {
    localStorage.setItem(SESSION_KEY, JSON.stringify(userData));
}

/**
 * Recupera los datos de la sesión activa si existen en el navegador.
 * @returns {Object|null} Retorna el objeto de sesión o null si no hay sesión iniciada.
 */
export function getSession() {
    const session = localStorage.getItem(SESSION_KEY);
    return session ? JSON.parse(session) : null;
}

/**
 * Elimina por completo la sesión del almacenamiento local (Logout).
 */
export function clearSession() {
    localStorage.removeItem(SESSION_KEY);
}