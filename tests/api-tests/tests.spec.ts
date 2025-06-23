import { test, expect, request} from '@playwright/test'

test('Should get posts', async() => {
    const context = await request.newContext({
        baseURL: 'https://jsonplaceholder.typicode.com',
    });

    const response = await context.get('/posts');
    expect(response.status()).toBe(200);

    const body = await response.json();
    for (let i =0; i < 100; i++){
    expect(body[i]).toHaveProperty('userId');
    expect(body[i]).toHaveProperty('id');
    expect(body[i]).toHaveProperty('title');
    expect(body[i]).toHaveProperty('body');    
    }
});

