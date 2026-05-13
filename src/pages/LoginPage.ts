import { type Locator, type Page } from '@playwright/test';

// 1. Exportamos la clase para que otros archivos puedan usarla
export class LoginPage {

    // 2. Definimos las variables que usaremos (todas son de solo lectura)
    readonly page: Page;
    readonly usernameInput: Locator; // Caja para el elemento "Usuario"
    readonly passwordInput: Locator; // Caja para el elemento "Contraseña"
    readonly loginButton: Locator;    // Caja para el botón "Submit"

    // 3. El Constructor: Se ejecuta automáticamente al crear la página
    constructor(page: Page) {
        this.page = page; // Guardamos el navegador que nos pasan

        // Mapeamos los elementos del HTML a nuestras variables

        // getByLabel busca el texto que está junto al cuadro de escritura
        this.usernameInput = page.getByLabel('Username');
        this.passwordInput = page.getByLabel('Password');

        // getByRole busca específicamente un botón con el texto 'Submit'
        this.loginButton = page.getByRole('button', { name: 'Submit' });
    }

    // 4. Las Funciones (Métodos): Son las acciones que la página sabe hacer

    //Función para navegar a la URL base definida en el archivo .env.qa
    // "async" significa que la acción toma tiempo (como el internet)
    async navigate() {
        await this.page.goto('/practice-test-login/'); // "await" significa: "espera a que cargue"
    }

    //Función que agrupa la acción de escribir y hacer clic
    async login(user: string, pass: string) {
        await this.usernameInput.fill(user); // Escribe en el campo
        await this.passwordInput.fill(pass); // Escribe en el campo
        await this.loginButton.click();      // Presiona el botón
    }
}