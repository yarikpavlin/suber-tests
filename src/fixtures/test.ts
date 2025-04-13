import { APIRequest, APIRequestContext, test as baseTest, request } from '@playwright/test';
import { getApiKeyHeader } from '../api/auth';

export const test = baseTest.extend<{
  request: APIRequest;
}>({
  request: async ({}, use) => {
    const apiRequestContext = await request.newContext({
      extraHTTPHeaders: {
        ...getApiKeyHeader(),
        'Test': "asdasd",
        'Content-Type': 'application/json'
      },
    });

    await use(apiRequestContext);
    await apiRequestContext.dispose();
  },
});
