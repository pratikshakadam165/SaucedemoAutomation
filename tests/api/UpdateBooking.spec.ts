import { test, expect } from '../../fixtures/apiFixtures';
import { newBooking } from '../../test-data/booking';

test.describe('Update booking', () => {
  test('PUT replaces the booking details', async ({ request, booking, token }) => {
    const updated = { ...newBooking(), firstname: 'Updated', totalprice: 999 };
    const response = await request.put(`/booking/${booking.id}`, {
      data: updated,
      headers: { Cookie: `token=${token}` },
    });
    expect(response.status()).toBe(200);
    expect(await response.json()).toEqual(updated);
  });

  test('PATCH changes only the given field', async ({ request, booking, token }) => {
    const response = await request.patch(`/booking/${booking.id}`, {
      data: { lastname: 'Patched' },
      headers: { Cookie: `token=${token}` },
    });
    expect(response.status()).toBe(200);
    expect(await response.json()).toEqual({ ...booking.data, lastname: 'Patched' });
  });

  test('PUT without a token is forbidden', async ({ request, booking }) => {
    const response = await request.put(`/booking/${booking.id}`, { data: newBooking() });
    expect(response.status()).toBe(403);
  });

  test('PUT with a wrong id is not allowed', async ({ request, token }) => {
    const response = await request.put('/booking/99999999', {
      data: newBooking(),
      headers: { Cookie: `token=${token}` },
    });
    expect(response.status()).toBe(405);
  });
});
