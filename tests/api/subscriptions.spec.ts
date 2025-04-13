import { expect } from '@playwright/test';
import { test } from '../../src/fixtures/test';
import { createSubscriptionPayload, createUserPayload } from '../../src/api/factories';

test.describe.serial('@api @subscriptions /subscriptions', () => {
  test('POST /subscriptions should create a new subscription', async ({ request }) => {
    const userSignupResponse = await request.post('/auth/signup', {
      data: createUserPayload(),
    });

    const token = userSignupResponse.headers()['authorization'];
    const userData = await userSignupResponse.json();

    const subscriptionPayload = createSubscriptionPayload({ userId: userData.id });
    const response = await request.post('/subscriptions', {
      data: subscriptionPayload,
      headers: {
        Authorization: token,
      },
    });
    const subscriptionData = await response.json();

    expect(response.status()).toBe(201);
    expect(subscriptionData.userId).toBe(userData.id);
    expect(subscriptionData.name).toBe(subscriptionPayload.name);
    expect(subscriptionData.cost).toBe(subscriptionPayload.cost);
    expect(subscriptionData.currency).toBe(subscriptionPayload.currency);
    expect(subscriptionData.frequency).toBe(subscriptionPayload.frequency);
    expect(subscriptionData.isActive).toBe(subscriptionPayload.isActive);
  });

  test('PATCH /subscriptions/:id should update a subscription', async ({ request }) => {
    const userSignupResponse = await request.post('/auth/signup', {
      data: createUserPayload(),
    });

    const token = userSignupResponse.headers()['authorization'];
    const userData = await userSignupResponse.json();

    const subscriptionResponse = await request.post('/subscriptions', {
      data: createSubscriptionPayload({ userId: userData.id }),
      headers: {
        Authorization: token,
      },
    });

    const subscriptionData = await subscriptionResponse.json();
    const subscriptionId = subscriptionData._id;

    const updateResponse = await request.patch(`/subscriptions/${subscriptionId}`, {
      data: createSubscriptionPayload({ ...subscriptionData, name: 'Updated Subscription' }),
      headers: {
        Authorization: token,
      },
    });

    const updatedSubscriptionData = await updateResponse.json();

    expect(updateResponse.status()).toBe(200);
    expect(updatedSubscriptionData.name).toBe('Updated Subscription');
  });
});
