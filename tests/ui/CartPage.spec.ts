import { test, expect } from '../../fixtures/pageFixtures';
import { products } from '../../test-data/users';

test.describe('CartPage', () => {
  test('cart is empty for a fresh login', async ({ loggedInPage }) => {
    await expect(loggedInPage.cartBadge).toBeHidden();
  });

  test('added product shows in the cart with badge count', async ({ loggedInPage, cartPage }) => {
    await loggedInPage.addToCart(products.backpack.id);
    await expect(loggedInPage.cartBadge).toHaveText('1');
    await loggedInPage.openCart();
    await expect(cartPage.itemNames).toHaveText([products.backpack.name]);
  });

  test('multiple products are all listed in the cart', async ({ loggedInPage, cartPage }) => {
    await loggedInPage.addToCart(products.backpack.id);
    await loggedInPage.addToCart(products.bikeLight.id);
    await expect(loggedInPage.cartBadge).toHaveText('2');
    await loggedInPage.openCart();
    await expect(cartPage.items).toHaveCount(2);
  });

  test('removing a product from the cart empties it', async ({ loggedInPage, cartPage }) => {
    await loggedInPage.addToCart(products.backpack.id);
    await loggedInPage.openCart();
    await cartPage.removeItem(products.backpack.id);
    await expect(cartPage.items).toHaveCount(0);
    await expect(loggedInPage.cartBadge).toBeHidden();
  });

  test('continue shopping returns to the products page', async ({ loggedInPage, cartPage, page }) => {
    await loggedInPage.openCart();
    await cartPage.continueShopping();
    await expect(page).toHaveURL(/inventory\.html/);
  });
});
