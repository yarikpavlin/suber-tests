import { expect } from '@playwright/test';
import { createUserPayload } from '../../src/api/factories';
import { test } from '../../src/fixtures/test';

test.describe.serial('@api @auth /auth', () => {
  test('POST /signup should create a new user and return a token', async ({ request }) => {
    const userData = createUserPayload();
    const response = await request.post('/auth/signup', {
      data: userData,
    });
    const token = response.headers()['authorization'];

    expect(response.status()).toBe(201);
    expect(token).toBeDefined();
  });

  test('POST /signup should return 409 if user already exists', async ({ request }) => {
    const userData = createUserPayload();
    await request.post('/auth/signup', {
      data: userData,
    });

    await new Promise((resolve) => setTimeout(resolve, 200));

    const response = await request.post('/auth/signup', {
      data: userData,
    });
    expect(response.status()).toBe(409);
  });

  test('POST /login should return a token', async ({ request }) => {
    const userData = createUserPayload();
    await request.post('/auth/signup', {
      data: userData,
    });

    await new Promise((resolve) => setTimeout(resolve, 500));

    const response = await request.post('/auth/login', {
      data: userData,
    });
    const token = response.headers()['authorization'];

    expect(response.status()).toBe(200);
    expect(token).toBeDefined();
  });

  test('POST /login should return 401 if user does not exist', async ({ request }) => {
    const userData = createUserPayload();
    const response = await request.post('/auth/login', {
      data: userData,
    });
    expect(response.status()).toBe(401);
  });

  test('POST /login should return 401 if password is incorrect', async ({ request }) => {
    const userData = createUserPayload();
    await request.post('/auth/login', {
      data: userData,
    });

    await new Promise((resolve) => setTimeout(resolve, 500));

    const response = await request.post('/auth/login', {
      data: { ...userData, password: 'incorrect' },
    });
    expect(response.status()).toBe(401);
  });
});
