import { Builder, Browser, By } from 'selenium-webdriver';

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

    let tusVacunasButton = await driver.findElement(By.xpath("//*[contains(text(), 'Tus vacunas')]"));
    await tusVacunasButton.click();

    await driver.sleep(3000);

    let crearVacunaButton = await driver.findElement(By.xpath("//*[contains(text(), 'Añade una vacuna')]"));
    await crearVacunaButton.click();

    await driver.sleep(3000);

    let babyPicker = await driver.findElement(By.css("select"));
    await babyPicker.click();
    await driver.sleep(1000);

    await babyPicker.sendKeys("ArrowDown");
    await babyPicker.sendKeys("Enter");


    let vaccineNameInput = await driver.findElement(By.xpath("//input[@placeholder='Ej. Varicela']"));
    await vaccineNameInput.sendKeys("Vacuna para la varicela");
    await driver.sleep(1000);

    let vaccineDateInput = await driver.findElement(By.xpath("//input[@placeholder='AAAA-MM-dd']"));
    await vaccineDateInput.sendKeys("2025-05-01");
    await driver.sleep(1000);

    
    let saveButton = await driver.findElement(By.xpath("//div[contains(text(), 'Guardar')]"));
    await saveButton.click();
    await driver.sleep(3000);



} catch (error) {
    console.error("Ocurrió un error:", error);
  } finally {
    await driver.quit();
  }

})();