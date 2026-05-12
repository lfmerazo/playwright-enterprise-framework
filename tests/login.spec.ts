import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage'; // Importamos el archivo que creaste antes
import { LOGIN_MESSAGES } from '../src/constants/messages'; // Importamos los mensajes

// 'describe' agrupa tests relacionados (Suite de Login)
test.describe('Pruebas del Módulo de Login', () => {

    let loginPage: LoginPage; // Declaramos la variable fuera para que todos la vean

    test.beforeEach(async ({ page }) => {
        // Esto se ejecuta antes de cada test

        // Acción: Navegar a la web (la URL viene del .env.qa)
        loginPage = new LoginPage(page);
        await loginPage.navigate();
    });

    // Test 1: Login Exitoso
    test('Debe permitir el inicio de sesión con credenciales válidas', async ({ page }) => {

        // Acción: Ejecutar el login con los datos de nuestras variables de entorno
        // El símbolo '!' al final le dice a TypeScript: "confía en que este dato existe"
        await loginPage.login(process.env.USER_NAME!, process.env.PASSWORD!);

        // Aserción: Verificamos que la URL después del login sea la correcta
        // Opc A: Usamos una expresión regular para verificar que contenga 'logged-in-successfully'
        //await expect(page).toHaveURL(/.*logged-in-successfully/);

        // Opc B: vericamos que contenda la constante
        await expect(page).toHaveURL(new RegExp(LOGIN_MESSAGES.SUCCESS_URL_PART));

        // Aserción: Verificamos que el mensaje de éxito sea visible

        // Opc A: Usamos el texto explìcito
        //const successMessage = page.getByText('Logged In Successfully');

        // Opc B: Usamos la constante para el texto de éxito
        const successMessage = page.getByText(LOGIN_MESSAGES.SUCCESS_TEXT);
        await expect(successMessage).toBeVisible();
    });

    // Test 2: Error de Username
    test('Debe mostrar error al ingresar username inválido', async ({ page }) => {

        // Intentamos login con una clave incorrecta
        // Usamos el usuario real pero una clave cualquiera
        await loginPage.login('usernoexist', 'ClaveIncorrecta123');

        // Aserción: El mensaje de error debe ser visible y contener el texto correcto
        const errorMessage = page.locator('#error');
        await expect(errorMessage).toBeVisible();
        await expect(errorMessage).toHaveText(LOGIN_MESSAGES.ERROR_INVALID_USERNAME);
    });

    // Test 3: Error de Password
    test('Debe mostrar error al ingresar password inválido', async ({ page }) => {

        // Intentamos login con una clave incorrecta
        // Usamos el usuario real pero una clave cualquiera
        await loginPage.login(process.env.USER_NAME!, 'ClaveIncorrecta123');

        // Aserción: El mensaje de error debe ser visible y contener el texto correcto
        const errorMessage = page.locator('#error');
        await expect(errorMessage).toBeVisible();
        await expect(errorMessage).toHaveText(LOGIN_MESSAGES.ERROR_INVALID_PASSWORD);
    });

});