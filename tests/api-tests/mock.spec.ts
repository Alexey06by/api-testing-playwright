import { test, expect } from '@playwright/test'

test('Should mock get request and verify responce', async({page})=>{
    await page.route('https://jsonplaceholder.typicode.com/users', async(route)=>{
        await route.fulfill({
            status: 200,
            contentType: "application/json",
            body: JSON.stringify([
                { id: 1, name: "Mocked User 1"},
                { id: 2, name: "Mocked User 2"},
            ]),
        });
    });

    await page.goto("data:text/html,<html></html>");

    const users = await page.evaluate(async()=> {
        const res = await fetch("https://jsonplaceholder.typicode.com/users");
        return res.json();
    });

    expect(users).toEqual([
        { id: 1, name: "Mocked User 1"},
        { id: 2, name: "Mocked User 2"},
    ]);
});