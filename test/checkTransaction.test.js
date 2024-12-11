const {By, Builder, until} = require('selenium-webdriver');
const jsonData = require('./seleniumTest.json');
const user = require('./user.json');
/*
    
*/
 

 (async()=>{
    let driver;
    try {


        driver = await new Builder().forBrowser('chrome').build();
        await driver.manage().window().maximize();
        await driver.get('http://localhost:3000');
        let title = await driver.getTitle();
        console.log('title:',title);

        
        const loginButtonOnNavBar = 'loginButton'; 
        const loginEmail = "email", loginPassword="loginPassword",loginFormButton = "loginFormButton";
        await driver.wait(until.elementLocated(By.id(loginButtonOnNavBar)), 10000); 
        await driver.findElement(By.id(loginButtonOnNavBar)).click();
        await driver.wait(until.elementLocated(By.id(loginEmail)), 10000); 
        await driver.findElement(By.id(loginEmail)).sendKeys(user.email);
        await driver.wait(until.elementLocated(By.id(loginPassword)), 10000); 
        await driver.findElement(By.id(loginPassword)).sendKeys(user.password);
        await driver.wait(until.elementLocated(By.id(loginFormButton)), 10000); 
        await driver.findElement(By.id(loginFormButton)).click();

        const checkTransactionButton = 'checkTransactionButton';
        await driver.wait(until.elementLocated(By.id(checkTransactionButton)), 10000); 
        await driver.findElement(By.id(checkTransactionButton)).click();

        const chooseId = 'id', phone = 'phoneNumber',checkButton = 'checkButton';
        await driver.wait(until.elementLocated(By.name(chooseId)), 10000); 
        await driver.findElement(By.name(chooseId)).sendKeys(jsonData.transactionID);
        await driver.wait(until.elementLocated(By.name(phone)), 10000); 
        await driver.findElement(By.name(phone)).sendKeys(jsonData.phoneNumber);
        await driver.wait(until.elementLocated(By.id(checkButton)), 10000); 
        await driver.findElement(By.id(checkButton)).click();
        
    } catch (error) {
        console.log(error);
        
    } finally{
        // await driver.quit();
    }
})();
