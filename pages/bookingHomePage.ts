import { Locator, Page } from '@playwright/test';
import { BasePage } from './basePage';

export class BookingHomePage extends BasePage {
  readonly destinationInput: Locator;
  readonly calendarButton: Locator;
  readonly occupancyButton: Locator;
  readonly searchButton: Locator;
  readonly cookieBanner: Locator;
  readonly acceptCookiesButton: Locator;
  readonly petCheckbox: Locator;

  constructor(page: Page) {
    super(page);
    this.destinationInput = page.locator('#searchbox-horizontal-destination-input, [role="combobox"][aria-label*="destino"], input[placeholder*="¿Adónde vas?"], input[placeholder*="¿A dónde vas?"]').first();
    this.calendarButton = page.locator('button[data-testid="searchbox-dates-container"], button:has-text("Seleccionar fechas"), button[aria-label*="Fecha"], button[aria-label*="date"]').first();
    this.occupancyButton = page.locator('button[aria-label*="personas"], button[aria-label*="habitaciones"], button:has-text("adultos")').first();
    this.searchButton = page.locator('button[type="submit"], button:has-text("Buscar")').filter({ hasText: /Buscar|Search/i }).first();
    this.cookieBanner = page.getByText(/cookies|aceptar|accept/i).first();
    this.acceptCookiesButton = page.getByRole('button', { name: /aceptar|accept/i }).first();
    this.petCheckbox = page.locator('input[name="pets"], input#pets').first();
  }

  async gotoHome() {
    await this.goto('https://www.booking.com/index.es-ar.html?');
    await this.page.waitForLoadState('networkidle').catch(() => {});
    await this.waitForLoad();
  }

  async acceptCookiesIfVisible() {
    if (await this.acceptCookiesButton.isVisible().catch(() => false)) {
      await this.acceptCookiesButton.click();
    }
  }

  async selectDestination(destination: string) {
    await this.destinationInput.fill(destination);
    const suggestion = this.page.locator('[role="option"], li').filter({ hasText: new RegExp(destination, 'i') }).first();
    await suggestion.waitFor({ state: 'visible', timeout: 10000 });
    await suggestion.click({ force: true });
  }

  async selectDates(startDay: string, endDay: string) {
    await this.page.keyboard.press('Escape').catch(() => {});
    await this.page.locator('button[aria-label*="Cerrar"], button[aria-label*="Close"], button:has-text("Cerrar"), button:has-text("Close")').first().click({ force: true }).catch(() => {});
    await this.page.locator('[role="dialog"], [aria-modal="true"], [data-testid*="modal"]').evaluateAll((els) => {
      els.forEach((el) => {
        (el as HTMLElement).style.display = 'none';
      });
    }).catch(() => {});

    await this.calendarButton.click({ force: true });
    await this.page.waitForTimeout(1000);

    const startDateButton = this.page.locator(`button[aria-label*="${startDay}"], button[aria-label*="${startDay} de octubre"], button[aria-label*="${startDay} de Octubre"]`).first();
    const endDateButton = this.page.locator(`button[aria-label*="${endDay}"], button[aria-label*="${endDay} de octubre"], button[aria-label*="${endDay} de Octubre"]`).first();

    await startDateButton.waitFor({ state: 'visible', timeout: 10000 }).catch(() => {});
    await startDateButton.click({ force: true }).catch(() => {});
    await endDateButton.waitFor({ state: 'visible', timeout: 10000 }).catch(() => {});
    await endDateButton.click({ force: true }).catch(() => {});
  }

  async setTwoAdultsAndPets() {
    await this.occupancyButton.click({ force: true }).catch(() => {});
    await this.petCheckbox.check({ force: true }).catch(() => {});
  }

  async searchForDestination(destination: string) {
    await this.selectDestination(destination);
    await this.searchButton.click();
  }

  async searchForDestinationWithDates(destination: string, startDate: string, endDate: string) {
    await this.selectDestination(destination);
    await this.selectDates(startDate, endDate);
    await this.searchButton.click();
  }

  async searchForDestinationWithDatesAndPets(destination: string, startDay: string, endDay: string) {
    await this.selectDestination(destination);
    await this.selectDates(startDay, endDay);
    await this.setTwoAdultsAndPets();
    await this.searchButton.click();
  }
}
