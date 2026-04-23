const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('http://todomvc.com/examples/react/#/');
  await page.screenshot({ path: 'todo.png' });
  await browser.close();
})();
