const { test, expect } = require('@playwright/test');

async function getBrokenImages(page) {
  // Wait for every <img> to finish loading (complete is true for both success and error)
  await page.waitForFunction(() =>
    [...document.querySelectorAll('img')].every(img => img.complete)
  );
  return page.evaluate(() =>
    [...document.querySelectorAll('img')]
      .filter(img => img.naturalWidth === 0)
      .map(img => img.getAttribute('src'))
  );
}

test('no broken images on Home page', async ({ page }) => {
  await page.goto('/');
  await page.waitForSelector('.gs-brand');
  const broken = await getBrokenImages(page);
  expect(broken).toEqual([]);
});

test('no broken images on Projects page', async ({ page }) => {
  await page.goto('/');
  await page.waitForSelector('.gs-brand');
  await page.click('.gs-nav-btn:has-text("Projects")');
  await page.waitForSelector('.gs-tile');
  const broken = await getBrokenImages(page);
  expect(broken).toEqual([]);
});

test('every project has a non-null image field', async ({ page }) => {
  await page.goto('/');
  await page.waitForSelector('.gs-brand');

  const missing = await page.evaluate(() =>
    window.PROJECTS
      .filter(p => !p.image)
      .map(p => p.id)
  );

  expect(
    missing,
    `Projects missing an image (null/undefined/empty): ${missing.join(', ')}`
  ).toEqual([]);
});

test('every project image URL loads successfully', async ({ page }) => {
  await page.goto('/');
  await page.waitForSelector('.gs-brand');

  const imageUrls = await page.evaluate(() =>
    window.PROJECTS
      .filter(p => p.image)
      .map(p => ({ id: p.id, src: p.image }))
  );

  const broken = await page.evaluate(async (urls) => {
    const results = await Promise.all(
      urls.map(({ id, src }) =>
        new Promise(resolve => {
          const img = new Image();
          img.onload = () => resolve(null);
          img.onerror = () => resolve(`${id}: ${src}`);
          img.src = src;
        })
      )
    );
    return results.filter(Boolean);
  }, imageUrls);

  expect(broken, `Project images that failed to load:\n${broken.join('\n')}`).toEqual([]);
});

test('LinkedIn link has correct href and target', async ({ page }) => {
  await page.goto('/');
  await page.waitForSelector('.gs-brand');
  const link = page.locator('a[href*="linkedin.com"]');
  await expect(link).toHaveAttribute('href', 'https://www.linkedin.com/in/jasoncabrejos/');
  await expect(link).toHaveAttribute('target', '_blank');
  await expect(link).toHaveAttribute('rel', /noopener/);
});
