import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // IMPORTANTE: Le dice a Vitest que SOLO busque y ejecute archivos con extensión .test.js
    include: ['tests/**/*.test.js'],
    // Le dice a Vitest que ignore por completo los archivos de Playwright (.spec.js)
    exclude: ['tests/**/*.spec.js', 'node_modules'],
  },
});