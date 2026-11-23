import { test, expect } from '../../fixtures/apiFixtures';
import { admin } from '../../test-data/booking';

test.describe('Auth', () => {
  test('valid credentials return a token', async ({ request }) => {
    const response = await request.post('/auth', { data: admin });
    expect(response.status()).toBe(200);
    expect((await response.json()).token).toBeTruthy();
  });

  test('wrong password is rejected', async ({ request }) => {
    const response = await request.post('/auth', { data: { ...admin, password: 'wrong' } });
    expect((await response.json()).reason).toBe('Bad credentials');
  });
});
