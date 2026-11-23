import { test, expect } from '../../fixtures/pageFixtures';
import { products, checkoutInfo } from '../../test-data/users';

test.describe('CheckoutPage', () => {
  test.beforeEach(async ({ loggedInPage, cartPage }) => {
    await loggedInPage.addToCart(products.backpack.id);
    await loggedInPage.openCart();
    await cartPage.checkout();
  });

  test('completes an order with valid details', async ({ checkoutPage }) => {
    await checkoutPage.fillInfo(checkoutInfo);
    await checkoutPage.continue();
    await checkoutPage.finish();
    await expect(checkoutPage.completeHeader).toHaveText('Thank you for your order!');
  });

  test('missing first name shows an error', async ({ checkoutPage }) => {
    await checkoutPage.fillInfo({ ...checkoutInfo, firstName: '' });
    await checkoutPage.continue();
    await expect(checkoutPage.error).toContainText('First Name is required');
  });

  test('missing last name shows an error', async ({ checkoutPage }) => {
    await checkoutPage.fillInfo({ ...checkoutInfo, lastName: '' });
    await checkoutPage.continue();
    await expect(checkoutPage.error).toContainText('Last Name is required');
  });

  test('missing postal code shows an error', async ({ checkoutPage }) => {
    await checkoutPage.fillInfo({ ...checkoutInfo, postalCode: '' });
    await checkoutPage.continue();
    await expect(checkoutPage.error).toContainText('Postal Code is required');
  });

  test('cancel returns to the cart', async ({ checkoutPage, page }) => {
    await checkoutPage.cancel();
    await expect(page).toHaveURL(/cart\.html/);
  });

  test('order total equals item total plus tax', async ({ checkoutPage }) => {
    await checkoutPage.fillInfo(checkoutInfo);
    await checkoutPage.continue();
    const subtotal = await checkoutPage.amount(checkoutPage.subtotal);
    const tax = await checkoutPage.amount(checkoutPage.tax);
    const total = await checkoutPage.amount(checkoutPage.total);
    expect(total).toBeCloseTo(subtotal + tax, 2);
  });
});

test.describe('CheckoutPage › Empty cart', () => {
  // Known bug: the shop lets you check out with an empty cart.
  test('cannot start checkout with an empty cart', async ({ loggedInPage, cartPage, page }) => {
    test.fail();
    await loggedInPage.openCart();
    await cartPage.checkout();
    await expect(page).not.toHaveURL(/checkout-step-one\.html/);
  });
});
