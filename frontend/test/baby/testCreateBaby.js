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

    let cuentaButton = await driver.findElement(By.xpath("//div[contains(text(), 'Cuenta')]"));
    await cuentaButton.click();

    await driver.sleep(3000);

    let bebesButton = await driver.findElement(By.xpath("//div[contains(text(), 'Tus bebés')]"));
    await bebesButton.click();

    await driver.sleep(3000);

    let añadirbebesButton = await driver.findElement(By.xpath("//div[contains(text(), 'Añadir un bebé')]"));
    await añadirbebesButton.click();

    await driver.sleep(3000);

    let nombreBebeInput = await driver.findElement(By.css("input[placeholder='Nombre']"));
    await nombreBebeInput.sendKeys("Manolín");

    await driver.sleep(3000);

    let fechanacimientoInput = await driver.findElement(By.css("input[placeholder='AAAA-MM-DD']"));
    await fechanacimientoInput.sendKeys("2024-01-01");

    await driver.sleep(3000);

    let generoSelect = await driver.findElement(By.css("select"));
    await generoSelect.click(); 

    let opcionNiño = await driver.findElement(By.css("option[value='MALE']"));
    await opcionNiño.click();

    await driver.sleep(2000);

    let pesoInput = await driver.findElement(By.css("input[placeholder='Ej. 3.5']"));
    await pesoInput.sendKeys("1.6");

    await driver.sleep(3000);

    let alturaInput = await driver.findElement(By.css("input[placeholder='Ej. 50']"));
    await alturaInput.sendKeys("50");

    await driver.sleep(3000);

    let cabezaInput = await driver.findElement(By.css("input[placeholder='Ej. 35']"));
    await cabezaInput.sendKeys("32");

    await driver.sleep(3000);

    let preferenciasInput = await driver.findElement(By.css("input[placeholder='Ej. Leche materna, fórmula, etc.']"));
    await preferenciasInput.sendKeys("Potitos");

    await driver.sleep(3000);

    let guardarbebesButton = await driver.findElement(By.xpath("//div[contains(text(), 'Guardar')]"));
    await guardarbebesButton.click();

  } catch (error) {
    console.error("Ocurrió un error:", error);
  } finally {
    await driver.quit();
  }

})();