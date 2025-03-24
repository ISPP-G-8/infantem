import { Builder, Browser, By, until, Key } from 'selenium-webdriver'; 

(async function testAgeBasedRecommendations() {
  let driver = await new Builder().forBrowser(Browser.FIREFOX).build();

  try {
    // Paso 1: Ir a la página de login
    await driver.get('http://localhost:8081/signin');

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

  } catch (error) {
    console.error('Error durante el test:', error);
  } finally {
    await driver.quit();
  }
})();

//Test detalles
(async function testRecipeDetails() {
  let driver = await new Builder().forBrowser(Browser.FIREFOX).build();

  try {
    // Paso 1: Ir a la página de login
    await driver.get('http://localhost:8081/signin');

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
    await driver.get('http://localhost:8081/recipes');

    // Paso 1: Ir a la página de detalles de la receta
    const recipeId = '1'; 
    await driver.get(`http://localhost:8081/recipes/detail?recipeId=${recipeId}`);

    // Esperar a que la página cargue completamente
    await driver.sleep(2000); 
    console.log("Detalles de receta mostrados correctamente")

  } catch (error) {
    console.error("Error en la prueba:", error);
  } finally {
    await driver.quit();
  }
})();
