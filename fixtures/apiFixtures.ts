import { test as base, expect } from '@playwright/test';
import { admin, BookingData, newBooking } from '../test-data/booking';

type Fixtures = {
  token: string;
  booking: { id: number; data: BookingData };
};

export const test = base.extend<Fixtures>({
  // Auth token for the admin account.
  token: async ({ request }, use) => {
    const response = await request.post('/auth', { data: admin });
    await use((await response.json()).token);
  },

  // A fresh booking for each test, deleted afterwards so we leave no data behind.
  booking: async ({ request, token }, use) => {
    const data = newBooking();
    const response = await request.post('/booking', { data });
    const { bookingid } = await response.json();
    await use({ id: bookingid, data });
    await request.delete(`/booking/${bookingid}`, { headers: { Cookie: `token=${token}` } });
  },
});

export { expect };
