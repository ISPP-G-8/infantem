import { Builder, Browser } from 'selenium-webdriver';

// CHANGE THIS TEST TO ADAPT IT TO THE RECIPES MODULE
(async function helloSelenium() {
  let driver = await new Builder().forBrowser(Browser.CHROME).build();

  await driver.get('https://selenium.dev');

  await driver.quit();
})();