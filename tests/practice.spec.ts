import { test, expect } from '../src/fixtures/baseTest';

// Paso clave: Importamos el objeto de datos (evitar hardcoding)
import data from '../data/practiceData.json';

test.describe('Pruebas de Elementos Dinámicos', () => {

    test('Escenario: Agregar y persistir información en fila dinámica', async ({ practicePage }) => {
        // 1. Acción: Disparar la aparición del elemento (Sincronización interna en el POM)
        await practicePage.addNewRow();

        // 2. Data Injection: Usamos el valor del JSON externo
        const textoParaIngresar = data.exceptionsTestData.row2Text;

        // 3. Interacción: Llenamos el campo
        await practicePage.row2Input.fill(textoParaIngresar);

        // 4. Persistencia: Guardamos y validamos el estado 'Disabled' (Lógica en el POM)
        await practicePage.saveRow2();

        // 5. Verificación de Contenido: El valor debe coincidir con nuestra fuente de datos
        await expect(practicePage.row2Input).toHaveValue(textoParaIngresar);

        // 6. Verificación de Mensaje Dinámico Validamos la notificación de éxito de los JSON (español e inglés)
        //Accedemos a las traducciones que el fixture ya cargó en el POM
        // Usamos toHaveText porque permite comparar el contenido de forma robusta
        const mensajeEsperado = practicePage.getExpectedSaveMessage();
        await expect(practicePage.msgRow2Added).toHaveText(mensajeEsperado);
    });
});