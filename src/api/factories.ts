import { faker } from '@faker-js/faker';
import { User } from '../core/user';
import { Subscription } from '../core/subscription';

export const createUserPayload = (override: Partial<User> = {}) => {
  return {
    email: faker.internet.email(),
    password: faker.internet.password(),
    ...override,
  };
};

export const createSubscriptionPayload = (override: Partial<Subscription> = {}) => {
  return {
    userId: faker.string.uuid(),
    name: faker.commerce.productName(),
    cost: faker.number.int({ min: 1, max: 1000 }),
    currency: 'UAH',
    frequency: 'monthly',
    isActive: true,
    lastPaidDate: faker.date.recent(),
    nextDueDate: faker.date.future(),
    createdAt: faker.date.recent(),
    ...override,
  };
};
