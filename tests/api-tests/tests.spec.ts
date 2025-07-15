import { test, expect, request} from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();

test('Should get posts', async() => {
    const context = await request.newContext({
        baseURL: process.env.BASE_URL,
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

test('Should get single post', async() => {
    const context = await request.newContext({
        baseURL: process.env.BASE_URL,
    });

    const response = await context.get('/posts/1');
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body).toHaveProperty('userId');
    expect(body).toHaveProperty('id');
    expect(body).toHaveProperty('title');
    expect(body).toHaveProperty('body');     
});

test('Should create post', async() => {
    const context = await request.newContext({
        baseURL: process.env.BASE_URL,
    });
    const reqBody = {
        title: 'foo',
        body: 'bar',
        userId: 1,
    };

    const response = await context.post('/posts', {
        data: reqBody
    });
    expect(response.status()).toBe(201);  
    
    const body = await response.json();
    expect(body).toHaveProperty('userId');
    expect(body).toHaveProperty('id');
    expect(body).toHaveProperty('title');
    expect(body).toHaveProperty('body');    
});


