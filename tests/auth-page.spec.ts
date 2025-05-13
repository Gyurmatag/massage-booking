import { test, expect } from '@playwright/test';

/**
 * Test suite for the authentication page
 * Verifies that only GitHub login is available after the UI update
 */
test.describe('Authentication Page', () => {
  test('should only show GitHub login option', async ({ page }) => {
    // Navigate to the login page
    await page.goto('https://massage-booking.gyurmatag.workers.dev/');
    
    // Check page title and heading
    await expect(page).toHaveTitle(/Massage Booking App/);
    await expect(page.getByText('Company Wellness Portal')).toBeVisible();
    
    // Verify GitHub login button is visible
    const githubButton = page.getByRole('button', { name: /Sign in with GitHub/i });
    await expect(githubButton).toBeVisible();
    
    // Verify GitHub icon is visible
    await expect(page.locator('svg').first()).toBeVisible();
    
    // Verify email/password form is NOT present
    await expect(page.getByLabel('Email')).not.toBeVisible();
    await expect(page.getByLabel('Password')).not.toBeVisible();
    await expect(page.getByRole('tab', { name: 'Email' })).not.toBeVisible();
    
    // Verify there are no tabs visible
    await expect(page.getByRole('tablist')).not.toBeVisible();
    
    // Verify Terms of Service and Privacy Policy links are still visible
    await expect(page.getByRole('link', { name: 'Terms of Service' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Privacy Policy' })).toBeVisible();
  });
});
