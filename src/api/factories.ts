import { faker } from '@faker-js/faker';
import { User } from '../core/user';

export const createUserPayload = (override: Partial<User> = {}) => {
  return {
    email: faker.internet.email(),
    password: faker.internet.password(),
    ...override,
  };
};
