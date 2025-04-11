import { test, expect } from '@playwright/test';
import { mockUserData } from '../../src/api/users';

test.describe.serial('/users', () => {
  test('@api GET / positive', async ({ request }, testInfo) => {
    const response = await request.get('/users');
    testInfo.attach(response.url(), {
      body: JSON.stringify(response, null, 2),
      contentType: 'text/json',
    });
    expect(response.status()).toBe(200);
    expect(response.body()).toBeDefined();
  });

  test('@api GET /:id positive', async ({ request }) => {
    const response = await request.get(`/users/${mockUserData.validData.id}`);
    expect(response.status()).toBe(200);
    expect(await response.json()).toEqual(mockUserData.validData);
  });

  test('@api GET /:id negative', async ({ request }) => {
    const response = await request.get(`/users/123`);
    expect(response.status()).toBe(404);
  });
});
