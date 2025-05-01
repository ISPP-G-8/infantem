import { Builder, Browser, By, until } from 'selenium-webdriver';
import assert from 'assert';

(async function testRegisterValidation() {
  const driver = await new Builder().forBrowser(Browser.FIREFOX).build();

  try {
    await driver.get('http://localhost:8081');
    await driver.sleep(2000);

    let signupLink = await driver.findElement(By.css("a[href='/signup']"));
    await signupLink.click();
    await driver.sleep(2000);

    const fillField = async (placeholder, value) => {
      const input = await driver.findElement(By.css(`input[placeholder='${placeholder}']`));
      await input.clear();
      await input.sendKeys(value);
    };

    const clickRegister = async () => {
      const btn = await driver.findElement(By.xpath("//div[contains(text(), 'Registrarse')]"));
      await btn.click();
      await driver.sleep(1000);
    };

    const expectError = async (expectedText) => {
      const errorElement = await driver.wait(until.elementLocated(By.xpath(`//*[contains(text(),'${expectedText}')]`)), 3000);
      const text = await errorElement.getText();
      assert.ok(text.includes(expectedText));
    };

    const validData = {
      nombre: "Ana",
      apellido: "Martínez",
      username: "anita123",
      email: "ana@example.com",
      password: "Hola123!",
    };

    await clickRegister();
    await expectError("Debes rellenar todos los campos.");

    await fillField("Nombre", validData.nombre);
    await fillField("Apellido", validData.apellido);
    await fillField("Nombre de usuario", validData.username);
    await fillField("Email", "correo@invalido");
    await fillField("Contraseña", validData.password);
    await fillField("Repite la contraseña", validData.password);
    await clickRegister();
    await expectError("El email no es válido.");

    await fillField("Nombre", "A");
    await fillField("Apellido", validData.apellido);
    await fillField("Nombre de usuario", validData.username);
    await fillField("Email", validData.email);
    await fillField("Contraseña", validData.password);
    await fillField("Repite la contraseña", validData.password);
    await clickRegister();
    await expectError("El nombre debe tener al menos 3 caracteres.");

    await fillField("Nombre", validData.nombre);
    await fillField("Contraseña", "hola");
    await fillField("Repite la contraseña", "hola");
    await clickRegister();
    await expectError("La contraseña debe tener al menos 8 caracteres");

    await fillField("Contraseña", validData.password);
    await fillField("Repite la contraseña", "Otra123!");
    await clickRegister();
    await expectError("Las contraseñas no coinciden.");

    
    await fillField("Repite la contraseña", validData.password);
    try {
      
      const checkbox = await driver.findElement(By.xpath("//div[contains(text(), 'Acepto los')]//preceding::div[1]"));
      
    } catch (e) {
      console.warn("⚠️ No se encontró el checkbox visualmente.");
    }
    await clickRegister();
    await expectError("Debes aceptar los términos y condiciones.");


  } catch (error) {
    console.error("Ocurrió un error:", error);
  } finally {
    await driver.quit();
  }

})();