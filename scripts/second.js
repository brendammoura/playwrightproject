const { chromium } = require('playwright');
const expect = require('expect');

(async () => {
  const browser = await chromium.launch()
  const context = await browser.newContext({ storageState: 'state.json' })
  const page = await context.newPage()
  
  await page.goto('https://react-redux.realworld.io/#/')
  const html = await page.innerHTML('.feed-toggle')
  expect(html).toMatch('Your Feed')
  await browser.close()
})()