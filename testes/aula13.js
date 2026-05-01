const { chromium } = require('playwright');
const { expect } = require('expect');

(async () => {
  const browser = await chromium.launch({ headless: false, slowMo: 50 })
  const context = await browser.newContext()
  const page = await context.newPage()
  
  await page.goto('https://react-redux.realworld.io/#/login')
  await page.fill('input[type = "email"]', 'alanvoigt@yahoo.com.br')
  await page.fill('input[type = "password"]', 'test123')
  await page.click('form >> "Sign in"')

  await page.waitForSelector('.feed-toggle')

  const token = await page.evaluate(() => localStorage.getItem('jwt'))
  expect(token).toBeTruthy()

  const html = await page.innerHTML('.feed-toggle')
  expect(html).toMatch('Your Feed')  

  await context.storageState({ path: 'state.json' })

  const newContext = await browser.newContext({ storageState: 'state.json' })
  const newPage = await newContext.newPage()

  await newPage.goto('https://react-redux.realworld.io/#/')
  await newPage.waitForSelector('.feed-toggle')

  const newHtml = await newPage.innerHTML('.feed-toggle')
  expect(newHtml).toMatch('Your Feed')
  
  await browser.close()
})()
