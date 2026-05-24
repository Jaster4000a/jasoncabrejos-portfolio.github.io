const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await page.waitForSelector('.gs-brand');
});

test('resume modal opens via Résumé button', async ({ page }) => {
  await page.click('button:has-text("Résumé")');
  await expect(page.locator('.gs-resume-modal')).toBeVisible();
});

test('resume modal closes via × button', async ({ page }) => {
  await page.click('button:has-text("Résumé")');
  await expect(page.locator('.gs-resume-modal')).toBeVisible();
  await page.click('.gs-resume-close');
  await expect(page.locator('.gs-resume-modal')).not.toBeVisible();
});

test('resume modal closes via backdrop click', async ({ page }) => {
  await page.click('button:has-text("Résumé")');
  await expect(page.locator('.gs-resume-modal')).toBeVisible();
  // Click the backdrop in the top-left corner, outside the dialog box
  await page.locator('.gs-resume-modal').click({ position: { x: 10, y: 10 } });
  await expect(page.locator('.gs-resume-modal')).not.toBeVisible();
});

test('PDF iframe is present and points to LatestResume.pdf', async ({ page }) => {
  await page.click('button:has-text("Résumé")');
  const iframe = page.locator('.gs-resume-frame iframe');
  await expect(iframe).toBeVisible();
  await expect(iframe).toHaveAttribute('src', /LatestResume\.pdf/);
});
