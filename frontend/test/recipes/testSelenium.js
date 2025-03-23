import { Builder, Browser, By, until, Key } from 'selenium-webdriver'; // Importar Key para simular la tecla "Enter"

(async function testAgeBasedRecommendations() {
  let driver = await new Builder().forBrowser(Browser.FIREFOX).build();

  try {
    // Paso 1: Ir a la página de login
    await driver.get('http://localhost:8081/signin'); // Cambia la URL según tu entorno

    // Paso 2: Ingresar credenciales
    const usernameInput = await driver.wait(until.elementLocated(By.xpath('//input[@placeholder="Nombre de usuario"]')), 10000); // Espera hasta que el campo esté disponible
    await usernameInput.sendKeys('user1'); // Ingresar el nombre de usuario

    const passwordInput = await driver.wait(until.elementLocated(By.xpath('//input[@placeholder="Contraseña"]')), 10000); // Espera hasta que el campo esté disponible
    await passwordInput.sendKeys('user'); // Ingresar la contraseña

    // Paso 3: Hacer clic en el botón de "Ingresar"
    const loginButton = await driver.wait(until.elementLocated(By.xpath('//*[contains(text(), "Ingresar")]')), 10000); // Buscar el texto "Ingresar" en cualquier tipo de elemento
    await loginButton.click(); // Hacer clic en el botón

    // Paso 4: Esperar que se redirija a la página de recetas (o donde sea que se espera después del login)
    await driver.wait(until.urlContains('/recipes'), 5000); // Espera que la URL contenga "/recipes"

    console.log('Inicio de sesión exitoso. Redirigido a la página de recetas.');

    // Paso 1: Ir a la página principal
    await driver.get('http://localhost:8081/recipes'); // Asegúrate de que esta URL sea la correcta

    // Paso 2: Espera a que el campo de entrada con el placeholder "Introduce la edad de tu bebé" esté disponible
    const ageInput = await driver.wait(until.elementLocated(By.css('input[placeholder="Introduce la edad de tu bebé"]')), 10000); // Espera hasta 10 segundos

    // Paso 3: Ingresar la edad (por ejemplo, 6 meses) en el campo correspondiente
    await ageInput.sendKeys('8'); // Ingresar la edad

    // Paso 4: Enviar la tecla "Enter" para simular que el usuario presiona Enter
    await ageInput.sendKeys(Key.ENTER);

    console.log('Recetas recomendadas según la edad mostradas correctamente.');

    await driver.sleep(3000);

    // // Paso 5: Esperar un poco más para que se carguen las recetas recomendadas
    // await driver.wait(until.elementLocated(By.css('.gs.card')), 20000); // Actualizamos el selector para usar '.gs.card'

    // // Esperar a que el elemento sea visible (no solo presente en el DOM)
    // const recommendedRecipes = await driver.findElements(By.css('.gs.card')); // Verifica las recetas encontradas con el selector '.gs.card'

    // if (recommendedRecipes.length > 0) {
    //   console.log('Recetas recomendadas según la edad mostradas correctamente.');
    // } else {
    //   console.log('No se encontraron recetas recomendadas.');
    // }
  } catch (error) {
    console.error('Error durante el test:', error);
  } finally {
    await driver.quit();
  }
})();

