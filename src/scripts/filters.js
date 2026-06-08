// ======================================================================
// MÓDULO LOGÍSTICO PARA EL FILTRADO ALFABÉTICO Y DE TEXTO (HU-05 & HU-06)
// ======================================================================

/* Copia local en memoria para salvaguardar el array general de empleados */
let cachedEmployees = [];
/* Variable de estado para recordar qué letra está seleccionada actualmente */
let currentActiveLetter = 'ALL';
/* Variable de estado para almacenar el texto escrito en el input del buscador */
let currentSearchQuery = '';

/**
 * Almacena los empleados descargados para poder aplicar filtros repetidamente
 * @param {Array<Object>} employeesList - Lista original traída desde el servidor/JSON
 * @returns {void}
 */
export function setFilteringData(employeesList) {
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

    alphabetContainer.addEventListener('click', (event) => {
        const targetButton = event.target.closest('.dashboard__alphabet-btn');
        if (!targetButton) return;

        const allButtons = alphabetContainer.querySelectorAll('.dashboard__alphabet-btn');
        allButtons.forEach(button => {
            button.classList.remove('dashboard__alphabet-btn--active');
        });

        targetButton.classList.add('dashboard__alphabet-btn--active');
        currentActiveLetter = targetButton.getAttribute('data-letter') || 'ALL';
        
        /* Disparamos el flujo combinado de filtrado */
        executeFilteringFlow(renderCallback);
    });
}

/**
 * Inicializa el escuchador de eventos en tiempo real para el input de búsqueda (HU-6 T02)
 * @param {Function} renderCallback - Función modular encargada de redibujar la tabla
 * @returns {void}
 */
export function initializeTextSearch(renderCallback) {
    /* Selector del input nativo de tu index.html */
    const searchInput = document.getElementById('search-input');
    if (!searchInput) return;

    /* Escuchamos el evento 'input' para capturar cada tecla introducida en tiempo real */
    searchInput.addEventListener('input', (event) => {
        /* HU-6 T01: Pasamos el texto a minúsculas para ignorar mayúsculas/minúsculas */
        currentSearchQuery = event.target.value.trim().toLowerCase();
        
        /* Disparamos el flujo combinado para que respete la letra activa actual */
        executeFilteringFlow(renderCallback);
    });
}

/**
 * Evalúa de forma combinada los criterios de la letra y el buscador de texto (HU-5 T06)
 * @param {Function} renderCallback - Callback encargado de pintar las filas en la tabla
 * @returns {void}
 */
export function executeFilteringFlow(renderCallback) {
    /* Aplicamos consecutivamente las dos reglas de filtrado sobre el listado original */
    const filteredResult = cachedEmployees.filter(employee => {
        
        /* REGLA 1: Validación Alfabética (HU-5) */
        let matchesLetter = true;
        if (currentActiveLetter !== 'ALL') {
            matchesLetter = employee.name
                .trim()
                .toUpperCase()
                .startsWith(currentActiveLetter.toUpperCase());
        }

        /* REGLA 2: Búsqueda por Texto (HU-6 T05) */
        let matchesText = true;
        if (currentSearchQuery !== '') {
            /* Comprobamos si el término buscado está incluido en el nombre del empleado */
            matchesText = employee.name
                .toLowerCase()
                .includes(currentSearchQuery);
        }

        /* El empleado solo supera el corte si cumple ambas condiciones a la vez */
        return matchesLetter && matchesText;
    });

    /* HU-6 T03: Si el filtro cruzado vacía la lista, levantamos el estado sin resultados */
    if (filteredResult.length === 0) {
        toggleEmptyStateMessage(true);
    } else {
        toggleEmptyStateMessage(false);
    }

    /* Redibujamos la tabla pasándole el array procesado */
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

    if (showBanner) {
        emptyBanner.style.display = 'flex';
        tableElement.style.display = 'none';
    } else {
        emptyBanner.style.display = 'none';
        tableElement.style.display = 'table';
    }
}

/**
 * Lógica pura de filtrado
 * @param {Array} lista - Array de empleados
 * @param {string} letra - Letra del filtro alfabético
 * @param {string} texto - Texto del buscador
 */
export function aplicarFiltros(lista, letra, texto) {
    return lista.filter(employee => {
        const matchesLetter = letra === 'ALL' || employee.name.toUpperCase().startsWith(letra.toUpperCase());
        const matchesText = texto.toLowerCase() === '' || employee.name.toLowerCase().includes(texto.toLowerCase());
        return matchesLetter && matchesText;
    });
}

export function filtrarEmpleados(lista, letra, texto) {
    return lista.filter(empleado => {
        const coincideLetra = letra === 'ALL' || empleado.name.toUpperCase().startsWith(letra.toUpperCase());
        const coincideTexto = texto === '' || empleado.name.toLowerCase().includes(texto.toLowerCase());
        return coincideLetra && coincideTexto;
    });
}