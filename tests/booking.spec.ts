import { expect, test } from '@playwright/test';
import { BookingHomePage } from '../pages/bookingHomePage';
import { BookingResultsPage } from '../pages/bookingResultsPage';

test.describe('Booking Argentina homepage', () => {
  test('should open the Booking home page and show the search form', async ({ page }) => {
    const homePage = new BookingHomePage(page);
    const resultsPage = new BookingResultsPage(page);

    await homePage.gotoHome();
    await homePage.acceptCookiesIfVisible();

    await expect(homePage.destinationInput).toBeVisible();
    await expect(homePage.searchButton).toBeVisible();

    await homePage.searchForDestination('Buenos Aires');

    await expect(resultsPage.resultsSummary).toBeVisible();
  });

  test('should fill destination, dates and pet occupancy and search', async ({ page }) => {
    const homePage = new BookingHomePage(page);

    await homePage.gotoHome();
    await homePage.acceptCookiesIfVisible();

    await expect(homePage.destinationInput).toBeVisible();
    await expect(homePage.calendarButton).toBeVisible();

    await homePage.searchForDestinationWithDatesAndPets(
      'San Carlos de Bariloche',
      '12',
      '16'
    );

    await page.screenshot({ path: 'test-results/booking-search.png', fullPage: true });
  });
});
