import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: 'tests',
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173',
    // increase timeout to 120s to allow Vite to start on slower machines
    timeout: 120000,
    reuseExistingServer: true,
  },
  use: {
    baseURL: 'http://localhost:5173',
    headless: true,
    viewport: { width: 1280, height: 720 },
  },
});
