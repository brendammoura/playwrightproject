const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch({ headless: false, slowMo: 100 });
    const page = await browser.newPage();

    // Acessar o site
    await page.goto('https://demo.applitools.com/');

    // Preencher usuário
    await page.fill('input[type="text"]', 'Admin');

    // Preencher senha
    await page.type('input[id="password"]', 'Admin123', {delay: 250, timeout: 45000});

    // Clicar no botão "Sign in"
    await page.click('text=Sign in');

    // ✅ Validação (espera carregar a próxima página)
    await page.waitForSelector('#time');

    console.log('✅ Login realizado com sucesso!');

    // Espera pra visualizar (opcional)
    await page.waitForTimeout(4500);

    await browser.close();
})();