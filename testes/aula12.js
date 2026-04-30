const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch({ headless: false, slowMo: 50 })
    const context = await browser.newContext({ acceptDownloads: true })
    const page = await context.newPage()

    await page.goto('https://github.com/gothinkster/react-redux-realworld-example-app')
   
    // abre o menu "Code"
    await page.getByRole('button', { name: 'Code' }).first().click()    
    
    // baixa o Zip do repositório
    const [ download ] = await Promise.all([
        page.waitForEvent('download'), 
        page.getByRole('link', { name: 'Download ZIP' }).click()
    ])

    const path = await download.path()
    console.log(path)

    await download.saveAs('./download.zip')
    
    await browser.close()
})()
