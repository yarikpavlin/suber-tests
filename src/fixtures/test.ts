import { APIRequest, test as baseTest, request } from '@playwright/test';
import { getApiKeyHeader } from '../api/auth';

export const test = baseTest.extend<{
  request: APIRequest;
}>({
  // eslint-disable-next-line no-empty-pattern
  request: async ({}, use) => {
    const apiRequestContext = await request.newContext({
      extraHTTPHeaders: {
        ...getApiKeyHeader(),
      },
    });

    await use(apiRequestContext);
    await apiRequestContext.dispose();
  },
});
