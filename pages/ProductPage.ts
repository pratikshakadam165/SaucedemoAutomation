import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductPage extends BasePage {
  readonly title: Locator;
  readonly cartLink: Locator;
  readonly cartBadge: Locator;
  readonly menuButton: Locator;
  readonly logoutLink: Locator;

  constructor(page: Page) {
    super(page);
    this.title = page.getByTestId('title');
    this.cartLink = page.getByTestId('shopping-cart-link');
    this.cartBadge = page.getByTestId('shopping-cart-badge');
    this.menuButton = page.getByRole('button', { name: 'Open Menu' });
    this.logoutLink = page.getByTestId('logout-sidebar-link');
  }

  async open() {
    await this.goto('/inventory.html');
  }

  addButton(productId: string): Locator {
    return this.page.getByTestId(`add-to-cart-${productId}`);
  }

  removeButton(productId: string): Locator {
    return this.page.getByTestId(`remove-${productId}`);
  }

  async addToCart(productId: string) {
    await this.addButton(productId).click();
  }

  async removeFromCart(productId: string) {
    await this.removeButton(productId).click();
  }

  async openCart() {
    await this.cartLink.click();
  }

  async logout() {
    await this.menuButton.click();
    await this.logoutLink.click();
  }
}
