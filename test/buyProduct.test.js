const {By, Builder,until } = require('selenium-webdriver');
const fs = require('fs');
const jsonData = require('./user.json');

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
        await driver.findElement(By.id(loginButtonOnNavBar)).click();
        await driver.findElement(By.id(loginEmail)).sendKeys(jsonData.email);
        await driver.findElement(By.id(loginPassword)).sendKeys(jsonData.password);
        await driver.findElement(By.id(loginFormButton)).click();

        // add product to cart
        await driver.navigate().to("http://localhost:3000/product-detail/8O1UZ8jF1ztrXPYkWbh8");
        const buyNow = 'buyNow';
        await driver.wait(until.elementLocated(By.id(buyNow)), 10000); 
        await driver.findElement(By.id(buyNow)).click();
        const orderButton = 'orderButton';
        await driver.wait(until.elementLocated(By.id(orderButton)), 10000); 
        await driver.findElement(By.id(orderButton)).click();
        // input user information
        const inputName = "full name", inputPhone ="number phone",inputAddress="address",inputNote="note",addpaymentMethod="addPaymentMethod";
        const numberPhone = "0706529021"
        await driver.wait(until.elementLocated(By.name(inputName)), 10000);
        await driver.findElement(By.name(inputName)).sendKeys("Le Dang Nguyen Minh Hai");
        await driver.wait(until.elementLocated(By.name(inputPhone)), 10000);
        await driver.findElement(By.name(inputPhone)).sendKeys(numberPhone);
        await driver.wait(until.elementLocated(By.name(inputAddress)), 10000);
        await driver.findElement(By.name(inputAddress)).sendKeys("tt16 tam dao p15 q10 tphcm");
        await driver.wait(until.elementLocated(By.name(inputNote)), 10000);
        await driver.findElement(By.name(inputNote)).sendKeys("giao hang can than");
        await driver.wait(until.elementLocated(By.id(addpaymentMethod)), 10000);
        await driver.findElement(By.id(addpaymentMethod)).click();
        // choose payment method
        const visaChoice = 'visa', thanhToanNgay = 'thanhToanNgay';
        await driver.wait(until.elementLocated(By.id(visaChoice)), 10000);
        await driver.findElement(By.id(visaChoice)).click();
        await driver.wait(until.elementLocated(By.id(thanhToanNgay)), 10000);
        await driver.findElement(By.id(thanhToanNgay)).click();
        // add visa 
        const cardNumber = 'number', expiry = 'expiry',  cvc = 'cvc', name='name',addCard='addCard';
        await driver.wait(until.elementLocated(By.name(cardNumber)), 10000);
        await driver.findElement(By.name(cardNumber)).sendKeys("4021245455465462");
        await driver.wait(until.elementLocated(By.name(expiry)), 10000);
        await driver.findElement(By.name(expiry)).sendKeys("0834");
        await driver.wait(until.elementLocated(By.name(cvc)), 10000);
        await driver.findElement(By.name(cvc)).sendKeys("123");
        await driver.wait(until.elementLocated(By.name(name)), 10000);
        await driver.findElement(By.name(name)).sendKeys("Le Dang Nguyen Minh Hai");
        await driver.wait(until.elementLocated(By.id(addCard)), 10000);
        await driver.findElement(By.id(addCard)).click();
        // finish transaction
        const finishTransaction = "finishTransaction";
        await driver.wait(until.elementLocated(By.id(finishTransaction)), 10000);
        await driver.findElement(By.id(finishTransaction)).click();
        // get transaction id
        const transactionMessage = "transactionMessage";
        setTimeout(()=>{
            driver.wait(until.elementLocated(By.id(transactionMessage)), 10000);
            const resultMessage = driver.findElement(By.id(transactionMessage)).getText()
            resultMessage.then((text)=>{
                const writeData = `{"transactionID":"${text.split(" ")[3]}","phoneNumber":"${numberPhone}"}`
                fs.writeFile('seleniumTest.json',writeData,(error)=>{
                    if (error) {
                        console.log("can't read file");
                    }
                })
            })
        },1000)
    } catch (error) {
        console.log(error);
        
    } finally{
        // await driver.quit();
    }
})();
