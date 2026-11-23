import { test, expect } from '../../fixtures/apiFixtures';

test.describe('Read booking', () => {
  test('returns the booking by id', async ({ request, booking }) => {
    const response = await request.get(`/booking/${booking.id}`);
    expect(response.status()).toBe(200);
    expect(await response.json()).toEqual(booking.data);
  });

  test('finds the booking in the list when filtering by first name', async ({ request, booking }) => {
    const response = await request.get('/booking', { params: { firstname: booking.data.firstname } });
    expect(response.status()).toBe(200);
    expect(await response.json()).toContainEqual({ bookingid: booking.id });
  });

  test('returns 404 for a wrong id', async ({ request }) => {
    const response = await request.get('/booking/99999999');
    expect(response.status()).toBe(404);
  });
});
