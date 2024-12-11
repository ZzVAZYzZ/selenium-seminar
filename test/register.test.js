const { By, Builder, until } = require("selenium-webdriver");
const fs = require('fs');

(async () => {
  let driver;
  try {
    driver = await new Builder().forBrowser("chrome").build();
    await driver.manage().window().maximize();
    await driver.get("http://localhost:3000");
    let title = await driver.getTitle();
    console.log("title:", title);

    const loginButtonOnNavBar = "loginButton";
    const registerButton = "registerButton";
    const signupButton = "signupButton";
    const registerEmail = 'registerEmail', usernameEle = 'username', registerPassword = 'registerPassword';
    const email = 'haivip33@gmail.com';
    const username = 'hai';
    const password = '456'
    await driver.wait(until.elementLocated(By.id(loginButtonOnNavBar)), 10000);
    await driver.findElement(By.id(loginButtonOnNavBar)).click();
    await driver.wait(until.elementLocated(By.id(registerButton)), 10000);
    await driver.findElement(By.id(registerButton)).click();
    await driver.wait(until.elementLocated(By.id(registerEmail)), 10000);
    await driver.findElement(By.id(registerEmail)).sendKeys(email);
    await driver.wait(until.elementLocated(By.id(usernameEle)), 10000);
    await driver.findElement(By.id(usernameEle)).sendKeys(username);
    await driver.wait(until.elementLocated(By.id(registerPassword)), 10000);
    await driver.findElement(By.id(registerPassword)).sendKeys(password);
    await driver.wait(until.elementLocated(By.id(signupButton)), 10000);
    await driver.findElement(By.id(signupButton)).click();

    const writeData = `{"email":"${email}","username":"${username}","password":"${password}"}`
    fs.writeFile('user.json',writeData,(error)=>{
        if (error) {
            console.log("can't read file");
        }
    })


  } catch (error) {
    console.log(error);
  } finally {
    // await driver.quit();
  }
})();
