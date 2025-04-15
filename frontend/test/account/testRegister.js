import { Builder, Browser, By, until} from 'selenium-webdriver';

(async function testLogInLogOut() {
  let driver = await new Builder().forBrowser(Browser.FIREFOX).build();

  try {

    await driver.get('http://localhost:8081');
    await driver.sleep(2000);

    let signupLink = await driver.findElement(By.css("a[href='/signup']"));
    await signupLink.click();
    await driver.sleep(2000);

    let userInput = await driver.findElement(By.css("input[placeholder='Nombre']"));
    await userInput.sendKeys("paco");

    let surnameInput = await driver.findElement(By.css("input[placeholder='Apellido']"));
    await surnameInput.sendKeys("martínez");

    let usernameButton = await driver.findElement(By.css("input[placeholder='Nombre de usuario']"));
    await usernameButton.sendKeys("pacmarti");

    let emailButton = await driver.findElement(By.css("input[placeholder='Email']"));
    await emailButton.sendKeys("pacmar@gmail.com");

    let passwordButton = await driver.findElement(By.css("input[placeholder='Contraseña']"));
    await passwordButton.sendKeys("Prueba1234!");

    let repeatPasswordButton = await driver.findElement(By.css("input[placeholder='Repite la contraseña']"));
    await repeatPasswordButton.sendKeys("Prueba1234!");

    await driver.sleep(3000);

    let checkbox = await driver.findElement(By.xpath("(//div[contains(text(), 'Acepto')]/preceding-sibling::*)[1]"));
    await checkbox.click();

    let registrarseButton = await driver.findElement(By.xpath("//div[contains(text(), 'Registrarse')]"));
    await registrarseButton.click();

  } catch (error) {
    console.error("Ocurrió un error:", error);
  } finally {
    await driver.quit();
  }

})();