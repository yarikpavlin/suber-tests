import { expect } from '@playwright/test';
import { test } from '../../src/fixtures/test';
import { createUserPayload } from '../../src/api/factories';
import { User } from '../../src/core/user';

test.describe.serial('@api @users /users', () => {
  let userToken: string;
  let userData: User;

  test.beforeAll(async ({ request }) => {
    const userSignupResponse = await request.post('/auth/signup', {
      data: createUserPayload(),
    });
    userToken = userSignupResponse.headers()['authorization'];
    userData = await userSignupResponse.json();
  });

  test('GET /:id should return user by id', async ({ request }) => {
    const response = await request.get(`/users/${userData.id}`, {
      headers: {
        Authorization: userToken,
      },
    });
    expect(response.status()).toBe(200);
  });

  test('GET /:id should return 404 if user not found', async ({ request }) => {
    const response = await request.get(`/users/123`, {
      headers: {
        Authorization: userToken,
      },
    });
    expect(response.status()).toBe(404);
  });
});
