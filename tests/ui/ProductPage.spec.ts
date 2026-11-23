import { test, expect } from '../../fixtures/pageFixtures';
import { products, users } from '../../test-data/users';

test.describe('ProductPage › Add to cart', () => {
  test('add to cart button switches to remove and updates the badge', async ({ loggedInPage }) => {
    await loggedInPage.addToCart(products.backpack.id);
    await expect(loggedInPage.removeButton(products.backpack.id)).toBeVisible();
    await expect(loggedInPage.addButton(products.backpack.id)).toBeHidden();
    await expect(loggedInPage.cartBadge).toHaveText('1');
  });

  test('remove button switches back to add to cart and clears the badge', async ({ loggedInPage }) => {
    await loggedInPage.addToCart(products.backpack.id);
    await loggedInPage.removeFromCart(products.backpack.id);
    await expect(loggedInPage.addButton(products.backpack.id)).toBeVisible();
    await expect(loggedInPage.removeButton(products.backpack.id)).toBeHidden();
    await expect(loggedInPage.cartBadge).toBeHidden();
  });
});

test.describe('ProductPage › Logout', () => {
  test('logout returns to the login page', async ({ loggedInPage, loginPage, page }) => {
    await loggedInPage.logout();
    await expect(page).toHaveURL(/saucedemo\.com\/?$/);
    await expect(loginPage.loginButton).toBeVisible();
  });

  test('cart keeps its items after logging out and back in', async ({ loggedInPage, loginPage }) => {
    await loggedInPage.addToCart(products.backpack.id);
    await loggedInPage.logout();
    await loginPage.login(users.standard.username, users.standard.password);
    await expect(loggedInPage.cartBadge).toHaveText('1');
  });

  test('products page is not accessible after logout', async ({ loggedInPage, loginPage }) => {
    await loggedInPage.logout();
    await loggedInPage.open();
    await expect(loginPage.error).toContainText("You can only access '/inventory.html' when you are logged in");
  });
});
