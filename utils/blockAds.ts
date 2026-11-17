import type { BrowserContext } from '@playwright/test';

export async function blockGoogleAds(context: BrowserContext): Promise<void> {
  await context.route(
    /https?:\/\/(?:[^/]+\.)*(?:doubleclick\.net|googlesyndication\.com|googleadservices\.com)(?:\/|$)/i,
    route => route.abort()
  );
}