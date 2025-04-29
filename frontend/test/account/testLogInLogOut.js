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
    await usernameInput.sendKeys("lauramartinez");

    let passwordInput = await driver.findElement(By.css("input[placeholder='Contraseña']"));
    await passwordInput.sendKeys("user");

    let ingresarButton = await driver.findElement(By.xpath("//div[contains(text(), 'Ingresar')]"));
    await ingresarButton.click();

    await driver.sleep(3000);

    let cuentaButton = await driver.findElement(By.xpath("//div[contains(text(), 'Cuenta')]"));
    await cuentaButton.click();

    await driver.sleep(3000);

    let cerrarSesionButton = await driver.findElement(By.xpath("//div[contains(text(), 'Cerrar Sesión')]"));

    await driver.executeScript("arguments[0].scrollIntoView({ behavior: 'smooth', block: 'center' });", cerrarSesionButton);

    await driver.sleep(1000); 

    await cerrarSesionButton.click();

  } catch (error) {
    console.error("Ocurrió un error:", error);
  } finally {
    await driver.quit();
  }

})();