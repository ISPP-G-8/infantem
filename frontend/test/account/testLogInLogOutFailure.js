import { Builder, Browser, By } from 'selenium-webdriver';

(async function testLogInFailure() {
    let driver = await new Builder().forBrowser(Browser.FIREFOX).build();
  
    try {
  
      await driver.get('http://localhost:8081');
      await driver.sleep(2000);
  
      let loginLink = await driver.findElement(By.xpath("//div[contains(text(), 'Iniciar sesión')]"));
      await loginLink.click();
      await driver.sleep(2000);
  
      let usernameInput = await driver.findElement(By.css("input[placeholder='Nombre de usuario']"));
  
      let passwordInput = await driver.findElement(By.css("input[placeholder='Contraseña']"));

      let ingresarButton = await driver.findElement(By.xpath("//div[contains(text(), 'Ingresar')]"));

      await ingresarButton.click();

      await driver.sleep(3000);

      await passwordInput.sendKeys("user");

      await driver.sleep(3000);

      await ingresarButton.click();

      await driver.sleep(3000);
  
      await usernameInput.sendKeys("juanita");
      await driver.sleep(3000);
      await ingresarButton.click();
  

      await driver.sleep(3000);
  
    } catch (error) {
      console.error("Ocurrió un error:", error);
    } finally {
      await driver.quit();
    }
  
  })();