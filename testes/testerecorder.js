import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://todomvc.com/');
  // Click a:has-text("Download")
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('link', { name: 'Download' }).click();
  const download = await downloadPromise;
  // Save downloaded file somewhere
  await download.saveAs('downloaded-file.zip');
  await page.getByRole('link', { name: 'View on GitHub' }).click();
  // Click a:has-text("Blog")
  await page.getByRole('link', { name: 'Blog' }).click();
  // Click a:has-text("Examples")
  await page.getByRole('heading', { name: 'Examples' }).click();
  // Click a:has-text("New = New or updated app")
  await page.getByText('New = New or updated app').click();
  // Click a:has-text("JavaScript")
  await page.getByText('JavaScript', { exact: true }).click();
  // Click a:has-text("Compile-to-JS")
  await page.getByText('Compile-to-JS').click();
});