// @vitest-environment jsdom
import { describe, it, expect } from 'vitest';
// Importamos 'aplicarFiltros', que es el nombre real de tu función pura en filters.js
import { aplicarFiltros } from '../src/scripts/filters.js';

describe('HU-06: Lógica de búsqueda', () => {
    it('debería filtrar correctamente los empleados por nombre', () => {
        const empleados = [
            { name: 'Ana Garcia' },
            { name: 'Juan Perez' },
            { name: 'Alejandro Sanz' }
        ];
        
        // Prueba 1: Buscamos "Ana" en toda la lista (ALL)
        const resultadoTexto = aplicarFiltros(empleados, 'ALL', 'Ana');
        expect(resultadoTexto).toHaveLength(1);
        expect(resultadoTexto[0].name).toBe('Ana Garcia');
    });

    it('debería filtrar correctamente por la letra inicial', () => {
        const empleados = [
            { name: 'Ana Garcia' },
            { name: 'Juan Perez' },
            { name: 'Alejandro Sanz' }
        ];

        // Prueba 2: Filtramos por la letra 'A' sin escribir texto
        const resultadoLetra = aplicarFiltros(empleados, 'A', '');
        expect(resultadoLetra).toHaveLength(2); // Ana y Alejandro
    });

    it('debería devolver un array vacío si no hay coincidencias', () => {
        const empleados = [
            { name: 'Ana Garcia' }
        ];

        // Prueba 3: Buscamos un nombre que no existe
        const resultadoVacio = aplicarFiltros(empleados, 'ALL', 'Carlos');
        expect(resultadoVacio).toHaveLength(0);
    });
});