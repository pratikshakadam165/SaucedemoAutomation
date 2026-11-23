import { test, expect } from '../../fixtures/apiFixtures';
import { newBooking } from '../../test-data/booking';

test.describe('Create booking', () => {
  test('creates a booking and returns its id and details', async ({ request, token }) => {
    const data = newBooking();
    const response = await request.post('/booking', { data });
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.bookingid).toBeGreaterThan(0);
    expect(body.booking).toEqual(data);
    await request.delete(`/booking/${body.bookingid}`, { headers: { Cookie: `token=${token}` } });
  });

  test('rejects a booking with missing fields', async ({ request }) => {
    const response = await request.post('/booking', { data: { firstname: 'OnlyName' } });
    expect(response.status()).toBe(500);
  });
});
