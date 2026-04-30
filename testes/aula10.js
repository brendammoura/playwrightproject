const { chromium } = require('playwright');
const expect = require('expect');

(async () => {
    const browser = await chromium.launch({headless:false, slowMo: 100})
    const context = await browser.newContext();
    const page = await context.newPage()

    await page.goto('https://demo.applitools.com/')

    await page.fill('input[type = "text"]', 'Admin')
    await page.press('input[type = "text"]', 'Tab')
    await page.type('input[type = "password"]', 'Admin123')
    await page.click("form >> 'Sign in'")

       // Screenshot
    await page.screenshot({path: 'SignIn.png', fullPage: true})
    console.log('Screenshot capturado com sucesso!')

    await browser.close()
})()