const {By, Builder, until} = require('selenium-webdriver');
require("dotenv").config();
/*
    
*/
 

(async ()=>{
    let driver;
    try {
        driver = await new Builder().forBrowser('chrome').build();
        await driver.get('https://mlearning.hoasen.edu.vn/');
        let title = await driver.getTitle();
        console.log('title:',title);

        
        const username = "inputName", password="inputPassword",submitButton = "submit";
        await driver.wait(until.elementLocated(By.id(username)), 10000); 
        await driver.findElement(By.id(username)).sendKeys(process.env.name);
        await driver.wait(until.elementLocated(By.id(password)), 10000); 
        await driver.findElement(By.id(password)).sendKeys(process.env.pass);
        await driver.wait(until.elementLocated(By.id(submitButton)), 10000); 
        await driver.findElement(By.id(submitButton)).click();

    } catch (error) {
        console.log(error);
        
    } finally{
        // await driver.quit();
    }
})()