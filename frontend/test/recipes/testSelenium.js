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


(async function testAddRecipe() {
  let driver = await new Builder().forBrowser(Browser.FIREFOX).build();

  try {
    // Paso 1: Ir a la página de login
    await driver.get('http://localhost:8081/signin');

    // Paso 2: Ingresar credenciales
    const usernameInput = await driver.wait(until.elementLocated(By.xpath('//input[@placeholder="Nombre de usuario"]')), 10000);
    await usernameInput.sendKeys('user1');

    const passwordInput = await driver.wait(until.elementLocated(By.xpath('//input[@placeholder="Contraseña"]')), 10000);
    await passwordInput.sendKeys('user');

    // Paso 3: Hacer clic en el botón de "Ingresar"
    const loginButton = await driver.wait(until.elementLocated(By.xpath('//*[contains(text(), "Ingresar")]')), 10000);
    await loginButton.click();

    // Paso 4: Esperar que se redirija a la página de recetas
    await driver.wait(until.urlContains('/recipes'), 5000);

    // Paso 5: Ir a la página de añadir receta
    const addRecipeButton = await driver.wait(until.elementLocated(By.xpath('//*[text()="Añade una receta"]')), 10000);
    await addRecipeButton.click();

    // Paso 6: Esperar que la página de añadir receta cargue completamente
    await driver.wait(until.elementLocated(By.xpath('//*[contains(text(), "Añadir una receta")]')), 15000);

    // Paso 7: Completar el formulario
    const nameInput = await driver.wait(until.elementLocated(By.xpath('//input[@placeholder="Nombre"]')), 10000);
    await nameInput.sendKeys('Puré de Zanahoria');

    // Esperar que el campo "Descripción" esté visible y habilitado
    const descriptionInput = await driver.wait(until.elementLocated(By.xpath('//input[@placeholder="Descripción"]')), 15000);
    await driver.wait(until.elementIsVisible(descriptionInput), 15000);
    await driver.wait(until.elementIsEnabled(descriptionInput), 15000);
    await descriptionInput.sendKeys('Receta saludable de puré de zanahoria para bebés.');

    const ingredientsInput = await driver.wait(until.elementLocated(By.xpath('//input[@placeholder="Ingredientes"]')), 15000);
    await driver.wait(until.elementIsVisible(ingredientsInput), 15000);
    await driver.wait(until.elementIsEnabled(ingredientsInput), 15000);
    await ingredientsInput.sendKeys('Zanahoria, agua');

    const minAgeInput = await driver.wait(until.elementLocated(By.xpath('//input[@placeholder="Edad mínima recomendada"]')), 15000);
    await minAgeInput.sendKeys('6');

    const maxAgeInput = await driver.wait(until.elementLocated(By.xpath('//input[@placeholder="Edad máxima recomendada"]')), 15000);
    await maxAgeInput.sendKeys('12');

    const elaborationInput = await driver.wait(until.elementLocated(By.xpath('//input[@placeholder="Elaboración"]')), 15000);
    await elaborationInput.sendKeys('Cocinar la zanahoria, triturar y agregar agua para hacer el puré.');

    // Paso 8: Esperar el div "Guardar", asegurarse de que sea visible y habilitado
    const saveButton = await driver.wait(until.elementLocated(By.xpath('//div[contains(text(), "Guardar")]')), 15000); 
    await driver.wait(until.elementIsVisible(saveButton), 15000); // Espera a que el botón sea visible
    await driver.wait(until.elementIsEnabled(saveButton), 15000); // Espera a que el botón sea habilitado

    // Asegurarse de que el botón "Guardar" no esté cubierto por otro elemento
    await driver.executeScript("arguments[0].scrollIntoView(true);", saveButton); // Desplaza el botón para asegurarse de que esté en vista

    // Hacer clic en el botón usando executeScript para evitar problemas con elementos superpuestos
    await driver.executeScript("arguments[0].click();", saveButton);

    // Paso 9: Verificar que la receta se añadió
    await driver.wait(until.urlContains('/recipes'), 5000);
    console.log("Receta añadida correctamente.");

  } catch (error) {
    console.error('Error durante el test:', error);
  } finally {
    await driver.quit();
  }
})();

(async function testSearchRecipe() {
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

    // Paso 4: Esperar que se redirija a la página de recetas
    await driver.wait(until.urlContains('/recipes'), 5000); // Espera que la URL contenga "/recipes"

    // Paso 5: Encontrar el campo de búsqueda
    const searchInput = await driver.wait(until.elementLocated(By.xpath('//input[@placeholder="Busca recetas..."]')), 10000); // Espera a que el campo de búsqueda esté disponible

    // Paso 6: Ingresar un término de búsqueda
    await searchInput.sendKeys('Puré de Pollo'); // Ingresar el término de búsqueda

    // Paso 7: Iniciar la búsqueda presionando "Enter"
    await searchInput.sendKeys(Key.ENTER);

    // Paso 8: Esperar que los resultados de búsqueda se muestren
    await driver.wait(until.elementLocated(By.xpath('//div[contains(text(), "Puré de Pollo")]')), 5000); // Espera a que los resultados de búsqueda sean visibles (ajusta el texto si es necesario)

    console.log('Búsqueda de receta realizada correctamente.');

  } catch (error) {
    console.error('Error durante el test:', error);
  } finally {
    await driver.quit();
  }
})();