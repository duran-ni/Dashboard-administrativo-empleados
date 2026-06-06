/**
 * Recupera la lista de empleados de forma asíncrona desde el almacenamiento de datos JSON local.
 * @returns {Promise<Array>} Una promesa que se resuelve con el array de objetos de los empleados.
 */
export async function fetchEmployeesData() {
    const jsonUrl = 'src/data/employees.json';
    
    try {
        // Realizamos la petición asíncrona al archivo de datos local
        const response = await fetch(jsonUrl);
        
        // Si el servidor o archivo no responde correctamente, lanzamos un error con el código de estado
        if (!response.ok) {
            throw new Error(`¡Error HTTP! Estado: ${response.status}`);
        }
        
        // Parseamos la respuesta cruda convirtiéndola en un array de objetos JavaScript legibles
        const employeesList = await response.json();
        return employeesList;
        
    } catch (error) {
        // Registramos el fallo en la consola para facilitar la depuración técnica
        console.error('Fallo al recuperar los registros de empleados:', error.message);
        throw error;
    }
}