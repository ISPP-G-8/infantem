import { Builder, Browser, By, until } from 'selenium-webdriver';

(async function testLogInLogOut() {
  let driver = await new Builder().forBrowser(Browser.FIREFOX).build();

  try {

    await driver.get('http://localhost:8081');
    await driver.sleep(2000);

    let loginLink = await driver.findElement(By.xpath("//div[contains(text(), 'Iniciar sesión')]"));
    await loginLink.click();
    await driver.sleep(2000);

    let usernameInput = await driver.findElement(By.css("input[placeholder='Nombre de usuario']"));
    await usernameInput.sendKeys("user1");

    let passwordInput = await driver.findElement(By.css("input[placeholder='Contraseña']"));
    await passwordInput.sendKeys("user");

    await driver.sleep(3000);

    let ingresarButton = await driver.findElement(By.xpath("//div[contains(text(), 'Ingresar')]"));
    await ingresarButton.click();

    await driver.sleep(3000);

    let calendarioButton = await driver.findElement(By.xpath("//div[contains(text(), 'Calendario')]"));
    await calendarioButton.click();

    await driver.sleep(3000);

    let tusVacunasButton = await driver.findElement(By.xpath("//*[contains(text(), 'Tus ingestas')]"));
    await tusVacunasButton.click();

    await driver.sleep(3000);

    let crearVacunaButton = await driver.findElement(By.xpath("//*[contains(text(), 'Añade una ingesta')]"));
    await crearVacunaButton.click();

    await driver.sleep(3000);

    let intakeDateInput = await driver.findElement(By.xpath("//input[@placeholder='AAAA-MM-DD HH:MM']"));
    await intakeDateInput.sendKeys("2025-05-01");
    await driver.sleep(1000);

    let cantidadInput = await driver.findElement(By.xpath("//input[@placeholder='Ej. 120']"));
    await cantidadInput.sendKeys("20");
    await driver.sleep(1000);

    let observacionesInput = await driver.findElement(By.xpath("//textarea[@placeholder='Ej. Tomó bien la leche']"));
    await observacionesInput.sendKeys("No le gustó el puré de verduras");
    await driver.sleep(1000);

    /*await driver.wait(until.elementLocated(By.xpath("//div[contains(text(), 'Crema de Calabaza y Calabacín')]")), 2000);
    let receta = await driver.findElement(By.xpath("//div[contains(text(), 'Crema de Calabaza y Calabacín')]"));
    await receta.click();

    await driver.sleep(1000); 

    let babyPicker = await driver.findElement(By.css("select"));
    await babyPicker.click();
    await driver.sleep(1000);

    await babyPicker.sendKeys("ArrowDown");
    await babyPicker.sendKeys("Enter");

    
    let saveButton = await driver.findElement(By.xpath("//div[contains(text(), 'Guardar')]"));
    await saveButton.click();
    await driver.sleep(3000);
    */



} catch (error) {
    console.error("Ocurrió un error:", error);
  } finally {
    await driver.quit();
  }

})();