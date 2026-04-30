const {chromium} = require('playwright');
(async() => {
    const browser = await chromium.launch({headless: false, slowMo: 300})
    const context = await browser.newContext()
    const page = await context.newPage()
    await page.goto('https://demo.applitools.com/')

    await page.fill('#username', 'Admin')
    await page.press('#username', 'Tab')
    await page.type('#password', 'Admin123')
    await page.click('#log-in')

    await page.waitForTimeout(5000)

    const logoText = await page.innerText('.logo-label');
    console.log('logoText:', logoText);
    const balanceCount = await page.$$eval('.balance', el => el.length);
    console.log('balanceCount:', balanceCount);
    
    const values = await page.$$eval('.balance-value', el =>  el.map(e => e.innerText));
    console.log('values:', values);
    
    const message = await page.innerText('#time');
    console.log('message:', message);

    await browser.close()
}) ()


