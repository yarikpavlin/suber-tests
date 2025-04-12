export const getApiKeyHeader = () => {
  return {
    'x-api-key': process.env.X_API_KEY as string,
  };
};
