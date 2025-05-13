import { test, expect } from '@playwright/test';

/**
 * Test suite for the authentication page
 * Verifies that both email/password and GitHub login options are available
 */
test.describe('Authentication Page', () => {
  test('should show both email/password form and GitHub login option', async ({ page }) => {
    // Navigate to the login page
    await page.goto('https://massage-booking.gyurmatag.workers.dev/');
    
    // Check page title and heading
    await expect(page).toHaveTitle(/Massage Booking App/);
    await expect(page.getByText('Company Wellness Portal')).toBeVisible();
    
    // Verify email and password fields are visible
    const emailInput = page.getByLabel('Email');
    const passwordInput = page.getByLabel('Password');
    
    await expect(emailInput).toBeVisible();
    await expect(passwordInput).toBeVisible();
    
    // Verify email and password form submit button
    const emailSignInButton = page.getByRole('button', { name: 'Sign in with Email' });
    await expect(emailSignInButton).toBeVisible();
    
    // Verify separator is visible
    await expect(page.getByText('Or continue with')).toBeVisible();
    
    // Verify GitHub login button is visible
    const githubButton = page.getByRole('button', { name: /Sign in with GitHub/i });
    await expect(githubButton).toBeVisible();
    
    // Verify GitHub icon is visible
    await expect(page.locator('svg').first()).toBeVisible();
    
    // Verify Terms of Service and Privacy Policy links are still visible
    await expect(page.getByRole('link', { name: 'Terms of Service' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Privacy Policy' })).toBeVisible();
    
    // Test form validation
    await emailSignInButton.click();
    await expect(page.getByText('Please enter a valid email address')).toBeVisible();
    
    // Enter invalid email
    await emailInput.fill('invalid-email');
    await emailSignInButton.click();
    await expect(page.getByText('Please enter a valid email address')).toBeVisible();
    
    // Enter valid email but no password
    await emailInput.fill('test@example.com');
    await emailSignInButton.click();
    await expect(page.getByText('Password must be at least 6 characters')).toBeVisible();
    
    // Enter valid email and short password
    await emailInput.fill('test@example.com');
    await passwordInput.fill('12345');
    await emailSignInButton.click();
    await expect(page.getByText('Password must be at least 6 characters')).toBeVisible();
    
    // Enter valid credentials
    await emailInput.fill('test@example.com');
    await passwordInput.fill('123456');
    // Don't actually submit as this would navigate away from the page
  });
});