export interface BookingData {
  firstname: string;
  lastname: string;
  totalprice: number;
  depositpaid: boolean;
  bookingdates: { checkin: string; checkout: string };
  additionalneeds: string;
}

// Public demo credentials from the Restful-Booker docs.
export const admin = { username: 'admin', password: 'password123' };

// The site is shared, so every booking gets a unique first name.
export const newBooking = (): BookingData => ({
  firstname: `Test${Date.now()}${Math.floor(Math.random() * 1000)}`,
  lastname: 'User',
  totalprice: 150,
  depositpaid: true,
  bookingdates: { checkin: '2026-12-01', checkout: '2026-12-05' },
  additionalneeds: 'Breakfast',
});
