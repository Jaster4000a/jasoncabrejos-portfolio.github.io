const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await page.waitForSelector('.gs-slideshow');
});

test('next button advances the slide counter', async ({ page }) => {
  const before = await page.locator('.gs-ss-count').textContent();
  await page.click('.gs-ss-nav.next');
  const after = await page.locator('.gs-ss-count').textContent();
  expect(after).not.toBe(before);
});

test('prev button changes the slide counter', async ({ page }) => {
  // Advance first so prev has somewhere to go cleanly
  await page.click('.gs-ss-nav.next');
  const before = await page.locator('.gs-ss-count').textContent();
  await page.click('.gs-ss-nav.prev');
  const after = await page.locator('.gs-ss-count').textContent();
  expect(after).not.toBe(before);
});

test('dot button jumps to the correct slide', async ({ page }) => {
  await page.locator('.gs-ss-dot').nth(2).click(); // 0-based → slide 3
  await expect(page.locator('.gs-ss-count')).toHaveText('03');
  await expect(page.locator('.gs-ss-dot').nth(2)).toHaveClass(/active/);
});

test('first dot is active on load', async ({ page }) => {
  await expect(page.locator('.gs-ss-dot').first()).toHaveClass(/active/);
  await expect(page.locator('.gs-ss-count')).toHaveText('01');
});

test('slideshow auto-advances after 5 seconds', async ({ page }) => {
  test.setTimeout(12000);
  const before = await page.locator('.gs-ss-count').textContent();
  await page.waitForTimeout(5500);
  const after = await page.locator('.gs-ss-count').textContent();
  expect(after).not.toBe(before);
});
