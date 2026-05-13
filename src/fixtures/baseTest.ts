import { test as base } from '@playwright/test';
import { PracticePage } from '../pages/PracticePage';
import path from 'path';

// Definimos qué objetos estarán disponibles en nuestros tests
type MyFixtures = {
    practicePage: PracticePage;
};

export const test = base.extend<MyFixtures>({
    practicePage: async ({ page }, use) => {
        // 1. Lógica de idiomas centralizada
        const locale = process.env.LOCALE || 'en';
        const translations = require(path.resolve(__dirname, `../../data/locales/${locale}.json`));

        // 2. Instanciación única
        const practicePage = new PracticePage(page, translations);
        await practicePage.navigate();

        // 3. "use" entrega el objeto al test y espera a que termine
        await use(practicePage);
    },
});

export { expect } from '@playwright/test';