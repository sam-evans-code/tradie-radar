/**
 * Main test suite runner for landing page
 * This file imports and runs all landing page tests
 */

// Import all test suites
require('./landing-page-structure.test.js');
require('./faq-functionality.test.js');
require('./roi-calculator.test.js');
require('./form-validation.test.js');
require('./responsive-behavior.test.js');

describe('Landing Page Test Suite', () => {
  test('should run all landing page tests', () => {
    // This test serves as a placeholder to ensure the test suite loads
    expect(true).toBeTruthy();
  });
});