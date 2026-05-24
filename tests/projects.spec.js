const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await page.waitForSelector('.gs-brand');
  await page.click('.gs-nav-btn:has-text("Projects")');
  await page.waitForSelector('.gs-tile');
});

test('tile expands on click', async ({ page }) => {
  const tile = page.locator('.gs-tile').first();
  await tile.click();
  await expect(tile).toHaveClass(/open/);
});

test('tile collapses on second click', async ({ page }) => {
  const tile = page.locator('.gs-tile').first();
  await tile.click();
  await expect(tile).toHaveClass(/open/);
  await tile.click();
  await expect(tile).not.toHaveClass(/open/);
});

test('only one tile is expanded at a time', async ({ page }) => {
  const tiles = page.locator('.gs-tile');
  await tiles.nth(0).click();
  await expect(tiles.nth(0)).toHaveClass(/open/);

  await tiles.nth(1).click();
  await expect(tiles.nth(0)).not.toHaveClass(/open/);
  await expect(tiles.nth(1)).toHaveClass(/open/);
  await expect(page.locator('.gs-tile.open')).toHaveCount(1);
});

test('expanded tile shows full blurb and all tags', async ({ page }) => {
  const tile = page.locator('.gs-tile').first();
  await tile.click();
  await expect(tile.locator('.gs-tile-blurb')).toBeVisible();
  await expect(tile.locator('.gs-tile-tags')).toBeVisible();
});

test('expanded tile shows Close label in footer', async ({ page }) => {
  const tile = page.locator('.gs-tile').first();
  await tile.click();
  await expect(tile.locator('.gs-tile-foot-cta:has-text("Close")')).toBeVisible();
});

test('collapsed tile shows Detail label in footer', async ({ page }) => {
  const tile = page.locator('.gs-tile').first();
  await expect(tile.locator('.gs-tile-foot-cta:has-text("Detail")')).toBeVisible();
});
