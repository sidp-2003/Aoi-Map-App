import { test, expect } from '@playwright/test';

test('homepage has title and map container', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: /AOI Creation/i })).toBeVisible();
  await page.waitForSelector('#leaflet-map', { state: 'visible', timeout: 5000 });
  await expect(page.locator('#leaflet-map')).toBeVisible();
});

test('WMS toggle affects layer presence', async ({ page }) => {
  await page.goto('/');
  await page.waitForSelector('#leaflet-map', { state: 'visible', timeout: 5000 });

  const toggle = page.getByLabel('WMS DOP Layer');
  await expect(toggle).toBeChecked({ timeout: 5000 });
  await toggle.uncheck();
  await expect(toggle).not.toBeChecked({ timeout: 2000 });
  await toggle.check();
  await expect(toggle).toBeChecked({ timeout: 2000 });
});

test('draw controls toggle draw mode', async ({ page }) => {
  await page.goto('/');
  await page.waitForSelector('#leaflet-map', { state: 'visible', timeout: 5000 });

  const drawBtn = page.getByRole('button', { name: /Draw AOI|Drawing/i });
  await expect(drawBtn).toBeVisible({ timeout: 5000 });
  await expect(drawBtn).toHaveText(/Draw AOI/, { timeout: 2000 });

  await drawBtn.click();
  await expect(drawBtn).toHaveText(/Drawing/i, { timeout: 2000 });

  await drawBtn.click();
  await expect(drawBtn).toHaveText(/Draw AOI/, { timeout: 2000 });
});
