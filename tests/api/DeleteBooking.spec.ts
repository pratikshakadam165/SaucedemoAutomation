import { test, expect } from '../../fixtures/apiFixtures';

test.describe('Delete booking', () => {
  test('deletes the booking so it can no longer be read', async ({ request, booking, token }) => {
    const response = await request.delete(`/booking/${booking.id}`, { headers: { Cookie: `token=${token}` } });
    expect(response.status()).toBe(201);
    expect((await request.get(`/booking/${booking.id}`)).status()).toBe(404);
  });

  test('DELETE without a token is forbidden and keeps the booking', async ({ request, booking }) => {
    const response = await request.delete(`/booking/${booking.id}`);
    expect(response.status()).toBe(403);
    expect((await request.get(`/booking/${booking.id}`)).status()).toBe(200);
  });

  test('DELETE with a wrong id is not allowed', async ({ request, token }) => {
    const response = await request.delete('/booking/99999999', { headers: { Cookie: `token=${token}` } });
    expect(response.status()).toBe(405);
  });
});
