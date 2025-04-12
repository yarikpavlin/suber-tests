import { test, expect } from '@playwright/test';
import { createUserPayload } from '../../src/api/factories';
import { getApiKeyHeader } from '../../src/api/auth';

test.describe.serial('@api @auth /auth', () => {
  test('POST /signup should create a new user and return a token', async ({ request }) => {
    const userData = createUserPayload();
    const response = await request.post('/auth/signup', {
      data: userData,
      headers: getApiKeyHeader(),
    });
    const token = response.headers()['authorization'];

    expect(response.status()).toBe(201);
    expect(token).toBeDefined();
  });

  test('POST /signup should return 409 if user already exists', async ({ request }) => {
    const userData = createUserPayload();
    await request.post('/auth/signup', {
      data: userData,
      headers: getApiKeyHeader(),
    });

    await new Promise((resolve) => setTimeout(resolve, 200));

    const response = await request.post('/auth/signup', {
      data: userData,
      headers: getApiKeyHeader(),
    });
    expect(response.status()).toBe(409);
  });

  test('POST /login should return a token', async ({ request }) => {
    const userData = createUserPayload();
    await request.post('/auth/signup', {
      data: userData,
      headers: getApiKeyHeader(),
    });

    await new Promise((resolve) => setTimeout(resolve, 500));

    const response = await request.post('/auth/login', {
      data: userData,
      headers: getApiKeyHeader(),
    });
    const token = response.headers()['authorization'];

    expect(response.status()).toBe(200);
    expect(token).toBeDefined();
  });

  test('POST /login should return 401 if user does not exist', async ({ request }) => {
    const userData = createUserPayload();
    const response = await request.post('/auth/login', {
      data: userData,
      headers: getApiKeyHeader(),
    });
    expect(response.status()).toBe(401);
  });

  test('POST /login should return 401 if password is incorrect', async ({ request }) => {
    const userData = createUserPayload();
    await request.post('/auth/login', {
      data: userData,
      headers: getApiKeyHeader(),
    });

    await new Promise((resolve) => setTimeout(resolve, 500));

    const response = await request.post('/auth/login', {
      data: { ...userData, password: 'incorrect' },
      headers: getApiKeyHeader(),
    });
    expect(response.status()).toBe(401);
  });
});
