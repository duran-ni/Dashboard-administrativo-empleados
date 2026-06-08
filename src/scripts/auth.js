// ======================================================================
// CONFIGURACIÓN E INICIALIZACIÓN DE ELEMENTOS DEL DOM
// ======================================================================


// Importamos los mecanismos modulares de persistencia de datos en el navegador
import { setSession, getSession, clearSession } from './storage.js';
// Importación del servicio de empleados para la consulta asíncrona
import { fetchEmployeesData } from './employee-service.js';


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

// Selector para el contenedor donde se inyectarán las filas de los empleados
const employeeTableBody = document.getElementById('employee-table-body');

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

        // Almacenamos el elemento en una variable de control
        const userEmailDisplay = document.getElementById('user-display-email');
        
        // Ejecutamos la inserción de texto únicamente si el nodo existe en el DOM
        if (userEmailDisplay) {
            userEmailDisplay.textContent = activeSession.email;
        }
        
        // Disparamos la carga automática de empleados (¡ahora se ejecutará sin trabas!)
        loadAndRenderEmployees();
    }
});

/**
 * Recupera los registros de empleados de forma asíncrona y gestiona los estados de la interfaz.
 */
async function loadAndRenderEmployees() {
    if (!employeeTableBody) return;

    // Selectores para alternar el estado vacío (Empty State)
    const noResultsMessage = document.getElementById('no-results-message');
    const employeeTable = document.querySelector('.employee-table');

    try {
        // Invocamos el servicio asíncronamente para obtener el array de empleados
        const employees = await fetchEmployeesData();
        
        // Limpiamos cualquier contenido previo que hubiera en la tabla
        employeeTableBody.innerHTML = '';
        
        // Control condicional de visualización si no existen registros
        if (!employees || employees.length === 0) {
            if (employeeTable) employeeTable.style.display = 'none';
            if (noResultsMessage) noResultsMessage.style.display = 'flex';
            return;
        }

        // Si hay registros, nos aseguramos de mostrar la tabla y ocultar el mensaje informativo
        if (employeeTable) employeeTable.style.display = 'table';
        if (noResultsMessage) noResultsMessage.style.display = 'none';
        
        // Recorremos el array de empleados mediante un bucle para construir las filas dinámicamente
        employees.forEach(employee => {
            const tableRow = document.createElement('tr');
            
            // Estructuramos las celdas inyectando la clase oficial de tu maquetación
            tableRow.innerHTML = `
                <td class="employee-table__td">${employee.name}</td>
                <td class="employee-table__td">${employee.email}</td>
                <td class="employee-table__td">${employee.address.street}</td>
                <td class="employee-table__td">${employee.address.suite}</td>
                <td class="employee-table__td">${employee.address.city}</td>
                <td class="employee-table__td">${employee.address.zipcode}</td>
            `;
            
            // Inyectamos la fila completada dentro del cuerpo de la tabla en el DOM
            employeeTableBody.appendChild(tableRow);
        });
        
    } catch (error) {
        if (employeeTable) employeeTable.style.display = 'table';
        employeeTableBody.innerHTML = `
            <tr>
                <td colspan="6" style="color: red; text-align: center; padding: 15px; font-weight: bold;">
                    Fallo al cargar la lista de empleados: ${error.message}
                </td>
            </tr>
        `;
    }
}

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
            setSession({ email: emailValue });
            authView.setAttribute('hidden', 'true');
            dashboardView.removeAttribute('hidden');

            // 🟢 Blindaje de seguridad idéntico para el inicio de sesión manual
            const userEmailDisplay = document.getElementById('user-display-email');
            if (userEmailDisplay) {
                userEmailDisplay.textContent = emailValue;
            }
            
            // Disparamos la carga automática de empleados tras la validación de credenciales
            loadAndRenderEmployees();
            
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