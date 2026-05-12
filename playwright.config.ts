import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';
import path from 'path';

/**
 * Leemos el archivo .env.qa que está en la carpeta data/env
 */
dotenv.config({ path: path.resolve(__dirname, 'data/env', '.env.qa') });

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
    baseURL: process.env.BASE_URL,

    /* CAMBIO: Guardar rastro siempre que falle (sin esperar al reintento) */
    trace: 'retain-on-failure',

    /* Captura de pantalla si falla */
    screenshot: 'only-on-failure',

    /* Opcional: Graba video si falla */
    video: 'retain-on-failure',
  },

  /* Configuramos solo Chromium (Chrome) para empezar */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});