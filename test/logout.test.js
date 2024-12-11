const {By, Builder,until } = require('selenium-webdriver');

(async ()=>{
    let driver;
    try {
        driver = await new Builder().forBrowser('chrome').build();
        await driver.manage().window().maximize();
        await driver.get('http://localhost:3000');
        let title = await driver.getTitle();
        console.log('title:',title);

        // login
        const loginButtonOnNavBar = 'loginButton'; 
        const loginEmail = "email", loginPassword="loginPassword",loginFormButton = "loginFormButton";
        await driver.wait(until.elementLocated(By.id(loginButtonOnNavBar)), 10000); 
        await driver.findElement(By.id(loginButtonOnNavBar)).click();
        await driver.wait(until.elementLocated(By.id(loginEmail)), 10000); 
        await driver.findElement(By.id(loginEmail)).sendKeys('haha@gmail.com');
        await driver.wait(until.elementLocated(By.id(loginPassword)), 10000); 
        await driver.findElement(By.id(loginPassword)).sendKeys('123');
        await driver.wait(until.elementLocated(By.id(loginFormButton)), 10000); 
        await driver.findElement(By.id(loginFormButton)).click();

        //logout
        setTimeout(()=>{
            const userZone = 'userZone',logout = 'logout';
        

            const actions = driver.actions({ async: true });
            const userZoneElement =  driver.findElement(By.id(userZone));
            actions.move({ origin: userZoneElement }).perform();
            driver.findElement(By.id(logout)).click();
        },1000)
       


    } catch (error) {
        console.log(error);
        
    } finally{
        // await driver.quit();
    }
})();


