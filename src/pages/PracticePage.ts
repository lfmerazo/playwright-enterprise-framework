import { type Locator, type Page, expect } from '@playwright/test';

export class PracticePage {
    private translations: any; // Guardamos la referencia para usarla luego
    readonly page: Page;
    readonly addButton: Locator;
    readonly row2Input: Locator;
    readonly row2SaveButton: Locator; // Nueva propiedad
    readonly msgRow2Added: Locator;

    constructor(page: Page, translations: any) {
        this.page = page;
        this.translations = translations; // Guardamos las traducciones

        /** 
         * PLANTILLA INDUSTRIAL:
         * El selector busca por ROL (estabilidad) y por NOMBRE DINÁMICO (multilenguaje).
         */

        // Botón que ya existe al cargar la página
        //this.addButton = page.locator('#add_btn'); // Búsqueda por Selectores Técnicos (CSS/XPath)
        this.addButton = page.getByRole('button', {
            name: translations.practicePage.buttons.add
        }); //Búsqueda por Locators Orientados al Usuario

        // Este input NO existe al principio, aparecerá después

        // Localizamos el contenedor de la fila 2 primero
        const row2Container = page.locator('#row2');

        // Ahora definimos los elementos INTERNOS de esa fila
        // Esto es mucho más robusto que buscar en toda la página
        //this.row2Input = row2Container.locator('input');
        this.row2Input = row2Container.getByRole('textbox');

        //this.row2SaveButton = row2Container.locator('button[name="Save"]');
        this.row2SaveButton = row2Container.getByRole('button', {
            name: translations.practicePage.buttons.save
        });

        this.msgRow2Added = page.locator('#confirmation');
    }

    async navigate() {
        await this.page.goto('https://practicetestautomation.com/practice-test-exceptions/');
    }

    /**
     * ACTUALIZACIÓN: Este método dispara la aparición de la fila 2.
     * Mantenemos la espera de 10s por el bug de "disaplay" que detectamos.
     */
    async addNewRow() {
        await this.addButton.waitFor({ state: 'visible' });
        await this.addButton.click();
        // Esperamos a que el input anidado sea visible antes de retornar el control al test
        await this.row2Input.waitFor({ state: 'visible', timeout: 10000 });
    }

    /**
     * ACCIÓN: Guarda la información y valida el estado bloqueado (Read-only).
     */
    async saveRow2() {
        await this.row2SaveButton.click();
        // Como expertos, esperamos a que el input se bloquee (disabled)
        // Esto confirma que el guardado fue exitoso en el backend/UI
        await expect(this.row2Input).toBeDisabled();
    }

    // Obtener mensaje de adición de fila 2 con éxito, Declaramos explícitamente el tipo de retorno.
    async getConfirmationText(): Promise<string | null> {
        // Esperamos a que el mensaje sea visible antes de extraer el texto
        await this.msgRow2Added.waitFor({ state: 'visible' });
        return await this.msgRow2Added.textContent();
    }

    getExpectedSaveMessage(): string {
        return this.translations.practicePage.messages.rowSaved;
    }



}