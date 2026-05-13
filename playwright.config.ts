import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

/**
 * INGENIERÍA DE ENTORNOS:
 * Leemos la variable ENV de la terminal. Si no existe, usamos 'qa' por defecto.
 * Esto permite ejecutar: ENV=prod npx playwright test
 */
const ENV = process.env.ENV || 'qa';

/**
 * CARGA DINÁMICA:
 * Localizamos el archivo basado en el ambiente actual.
 */
dotenv.config({
  path: path.resolve(__dirname, 'data/env', `.env.${ENV}`)
});

export default defineConfig({
  testDir: './tests',
  /* Ejecución en paralelo: Tu procesador M4 lo hará rapidísimo */
  fullyParallel: true,
  /* Fallar el build en CI si olvidaste un .only en el código */
  forbidOnly: !!process.env.CI,
  /* Reintentar una vez si el test falla por un error aleatorio */
  retries: 1,
  /* Reporte detallado en HTML */
  reporter: 'html',

  use: {
    /* Usamos la URL que definimos en el archivo .env.qa */
    // Si la variable de entorno no existe, usa la URL de QA por defecto
    baseURL: process.env.BASE_URL || 'https://practicetestautomation.com/',

    /* CAMBIO: Guardar rastro siempre que falle (sin esperar al reintento) */
    trace: 'retain-on-failure',

    /* Captura de pantalla si falla */
    screenshot: 'only-on-failure',

    /* Graba video si falla para ver el comportamiento dinámico */
    video: 'retain-on-failure',

    /* Acción Senior: Aseguramos que los IDs de test (data-testid) sean nuestra prioridad */
    testIdAttribute: 'data-testid',
  },

  /* Configuramos solo Chromium (Chrome) para empezar */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});