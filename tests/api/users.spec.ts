import { test, expect } from '@playwright/test';
import { mockUserData } from '../../src/api/users';
import { createUserPayload } from '../../src/api/factories';
import { User } from '../../src/core/user';

test.describe('/users', () => {
    const createdUsers: User[] = [];
    
    test('@api GET / positive', async ({request}, testInfo) => {
        const response = await request.get('/users');
        testInfo.attach(response.url(), {
            body: JSON.stringify(response, null, 2),
            contentType: 'text/json'
        });
        expect(response.status()).toBe(200);
        expect(response.body()).toBeDefined();
    });
    
    test('@api GET /:id positive', async ({request}) => {
        const response = await request.get(`/users/${mockUserData.validData.id}`);
        expect(response.status()).toBe(200);
        expect(await response.json()).toEqual(mockUserData.validData);
    });

    test('@api GET /:id negative', async ({request}) => {
        const response = await request.get(`/users/123`);
        expect(response.status()).toBe(404);
    });

    test('@api POST / positive', async ({request}) => {
        const newUser = createUserPayload();
        const response = await request.post('/users', {
            data: newUser
        });
        createdUsers.push(await response.json());
        const returnedUser = await response.json();
        expect(response.status()).toBe(201);
        expect({email: returnedUser.email, password: returnedUser.password}).toEqual(newUser);
    });

    test('@api POST / negative 409', async ({request}) => {
        const user = createdUsers[createUserPayload.length -1];
        const response = await request.post('/users', {
            data: user
        });
        expect(response.status()).toBe(409);
    });
});