import { Locator, Page } from '@playwright/test';
import { BasePage } from './basePage';

export class BookingResultsPage extends BasePage {
  readonly resultsSummary: Locator;

  constructor(page: Page) {
    super(page);
    this.resultsSummary = page.getByText(/resultados|results|alojamientos|properties/i).first();
  }
}
