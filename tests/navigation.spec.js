const { test, expect } = require('@playwright/test');

const NAV_CASES = [
  { button: 'Home',                     selector: '.gs-h1', text: 'I design and ship' },
  { button: 'Projects',                 selector: '.gs-h2', text: 'Project index' },
  { button: 'Background',               selector: '.gs-h2', text: 'Background' },
  { button: 'Leadership & Memberships', selector: '.gs-h2', text: 'Leadership' },
  { button: 'Awards',                   selector: '.gs-h2', text: 'Awards & certifications' },
];

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await page.waitForSelector('.gs-brand'); // React + Babel ready
});

for (const { button, selector, text } of NAV_CASES) {
  test(`"${button}" nav renders expected heading`, async ({ page }) => {
    await page.click(`.gs-nav-btn:has-text("${button}")`);
    await expect(page.locator(`${selector}:has-text("${text}")`)).toBeVisible();
  });
}

test('active nav button gets the active class', async ({ page }) => {
  await page.click('.gs-nav-btn:has-text("Projects")');
  await expect(page.locator('.gs-nav-btn:has-text("Projects")')).toHaveClass(/active/);
  await expect(page.locator('.gs-nav-btn:has-text("Home")')).not.toHaveClass(/active/);
});

test('switching pages clears the expanded tile', async ({ page }) => {
  await page.click('.gs-nav-btn:has-text("Projects")');
  await page.waitForSelector('.gs-tile');
  await page.locator('.gs-tile').first().click();
  await expect(page.locator('.gs-tile.open')).toHaveCount(1);

  await page.click('.gs-nav-btn:has-text("Home")');
  await page.click('.gs-nav-btn:has-text("Projects")');
  await page.waitForSelector('.gs-tile');
  await expect(page.locator('.gs-tile.open')).toHaveCount(0);
});
