// ======================================================================
// MÓDULO LOGÍSTICO PARA EL FILTRADO ALFABÉTICO
// ======================================================================

/* Copia local en memoria para salvaguardar el array general de empleados */
let cachedEmployees = [];
/* Variable de estado para recordar qué letra está seleccionada actualmente */
let currentActiveLetter = 'ALL';

/**
 * Almacena los empleados descargados para poder aplicar filtros repetidamente
 * @param {Array<Object>} employeesList - Lista original traída desde el servidor/JSON
 * @returns {void}
 */
export function setFilteringData(employeesList) {
    /* Clonamos el array con el operador spread para asegurar la inmutabilidad */
    cachedEmployees = [...employeesList];
}

/**
 * Inicializa los controladores de eventos en el contenedor del abecedario
 * @param {Function} renderCallback - Función modular encargada de redibujar la tabla
 * @returns {void}
 */
export function initializeAlphabetFilters(renderCallback) {
    
    const alphabetContainer = document.querySelector('.dashboard__alphabet-filter');
    if (!alphabetContainer) return;

    /* Implementamos delegación de eventos escuchando directamente en el padre */
    alphabetContainer.addEventListener('click', (event) => {
        
        const targetButton = event.target.closest('.dashboard__alphabet-btn');
        if (!targetButton) return;

        /* Removemos la clase de activación de todos los botones */
        const allButtons = alphabetContainer.querySelectorAll('.dashboard__alphabet-btn');
        allButtons.forEach(button => {
            button.classList.remove('dashboard__alphabet-btn--active');
        });

        /* Agregamos la clase de activación al botón seleccionado */
        targetButton.classList.add('dashboard__alphabet-btn--active');

        /* Extraemos el valor del atributo data-letter que añadiremos al HTML */
        currentActiveLetter = targetButton.getAttribute('data-letter') || 'ALL';
        
        /* Disparamos el flujo de filtrado y actualización de la interfaz */
        executeFilteringFlow(renderCallback);
    });
}

/**
 * Evalúa los criterios de filtrado alfabético y actualiza el DOM
 * @param {Function} renderCallback - Callback encargado de pintar las filas en la tabla
 * @returns {void}
 */
export function executeFilteringFlow(renderCallback) {
    /* Si se pulsa 'Todos', restauramos el listado completo de la caché */
    if (currentActiveLetter === 'ALL') {
        renderCallback(cachedEmployees);
        toggleEmptyStateMessage(false);
        return;
    }

    /* Filtramos el array evaluando la inicial de la propiedad name */
    const filteredResult = cachedEmployees.filter(employee => {
        const nameStartsWithLetter = employee.name
            .trim()
            .toUpperCase()
            .startsWith(currentActiveLetter.toUpperCase());
        return nameStartsWithLetter;
    });

    /* Si el array resultante está vacío, gestionamos el mensaje de aviso */
    if (filteredResult.length === 0) {
        toggleEmptyStateMessage(true);
    } else {
        toggleEmptyStateMessage(false);
    }

    /* Invocamos al renderizador pasándole los empleados que han superado el filtro */
    renderCallback(filteredResult);
}

/**
 * Modifica las propiedades display nativas para alternar el mensaje de error
 * @param {boolean} showBanner - Determina si se muestra el aviso de datos no encontrados
 * @returns {void}
 */
function toggleEmptyStateMessage(showBanner) {
    
    const emptyBanner = document.getElementById('no-results-message');
    const tableElement = document.querySelector('.employee-table');
    
    if (!emptyBanner || !tableElement) return;

    /* Control de visibilidad con estilos display en lugar de clases utilitarias */
    if (showBanner) {
        emptyBanner.style.display = 'flex';
        tableElement.style.display = 'none';
    } else {
        emptyBanner.style.display = 'none';
        tableElement.style.display = 'table';
    }
}