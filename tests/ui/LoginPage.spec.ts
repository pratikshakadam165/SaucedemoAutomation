import { test, expect } from '../../fixtures/pageFixtures';
import { users } from '../../test-data/users';

test.describe('LoginPage', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.open();
  });

  test('valid user lands on the products page', async ({ loginPage, productPage, page }) => {
    await loginPage.login(users.standard.username, users.standard.password);
    await expect(page).toHaveURL(/inventory\.html/);
    await expect(productPage.title).toHaveText('Products');
  });

  test('locked out user sees an error', async ({ loginPage }) => {
    await loginPage.login(users.locked.username, users.locked.password);
    await expect(loginPage.error).toContainText('this user has been locked out');
  });

  test('wrong password shows an error', async ({ loginPage }) => {
    await loginPage.login(users.standard.username, 'wrong_password');
    await expect(loginPage.error).toContainText('do not match any user');
  });

  test('username is case sensitive', async ({ loginPage }) => {
    await loginPage.login(users.standard.username.toUpperCase(), users.standard.password);
    await expect(loginPage.error).toContainText('do not match any user');
  });

  test('empty username and password shows a username required error', async ({ loginPage }) => {
    await loginPage.login('', '');
    await expect(loginPage.error).toContainText('Username is required');
  });

  test('empty username shows a required error', async ({ loginPage }) => {
    await loginPage.login('', users.standard.password);
    await expect(loginPage.error).toContainText('Username is required');
  });

  test('empty password shows a required error', async ({ loginPage }) => {
    await loginPage.login(users.standard.username, '');
    await expect(loginPage.error).toContainText('Password is required');
  });
});
