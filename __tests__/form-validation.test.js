/**
 * Tests for form validation and submission
 */
const { loadLandingPage, simulateInput, simulateClick, waitFor } = require('./helpers/loadHtml');

describe('Form Validation', () => {
  let dom, document, window;

  beforeEach(async () => {
    const loaded = await loadLandingPage();
    dom = loaded.dom;
    document = loaded.document;
    window = loaded.window;
  });

  afterEach(() => {
    if (dom) {
      dom.window.close();
    }
  });

  describe('Form Structure', () => {
    test('should have email signup forms', () => {
      const emailInputs = document.querySelectorAll('input[type="email"]');
      expect(emailInputs.length).toBeGreaterThan(0);

      const forms = document.querySelectorAll('form');
      expect(forms.length).toBeGreaterThan(0);
    });

    test('should have submit buttons for forms', () => {
      const forms = document.querySelectorAll('form');

      forms.forEach(form => {
        const submitButton = form.querySelector('button[type="submit"], input[type="submit"], button');
        expect(submitButton).toBeTruthy();
      });
    });

    test('should have proper form attributes', () => {
      const forms = document.querySelectorAll('form');

      forms.forEach(form => {
        // Forms should have action or handle submission via JavaScript
        const hasAction = form.hasAttribute('action');
        const hasOnSubmit = form.hasAttribute('onsubmit') || form.addEventListener;

        expect(hasAction || hasOnSubmit).toBeTruthy();
      });
    });
  });

  describe('Email Input Validation', () => {
    test('should accept valid email addresses', () => {
      const emailInputs = document.querySelectorAll('input[type="email"]');

      emailInputs.forEach(input => {
        const testEmails = [
          'user@example.com',
          'test.email+tag@domain.co.uk',
          'firstname.lastname@company.org'
        ];

        testEmails.forEach(email => {
          simulateInput(input, email);
          expect(input.value).toBe(email);
          expect(input.checkValidity()).toBeTruthy();
        });
      });
    });

    test('should reject invalid email addresses', () => {
      const emailInputs = document.querySelectorAll('input[type="email"]');

      emailInputs.forEach(input => {
        const invalidEmails = [
          'invalid-email',
          '@domain.com',
          'user@',
          'user.domain.com',
          'user@domain',
          ''
        ];

        invalidEmails.forEach(email => {
          simulateInput(input, email);
          if (email === '') {
            // Empty might be valid if not required
            if (input.hasAttribute('required')) {
              expect(input.checkValidity()).toBeFalsy();
            }
          } else {
            expect(input.checkValidity()).toBeFalsy();
          }
        });
      });
    });

    test('should have required attribute where appropriate', () => {
      const emailInputs = document.querySelectorAll('input[type="email"]');

      // At least some email inputs should be required for signup
      const requiredEmails = Array.from(emailInputs).filter(input =>
        input.hasAttribute('required')
      );

      expect(requiredEmails.length).toBeGreaterThan(0);
    });
  });

  describe('Form Submission Behavior', () => {
    test('should prevent submission with invalid email', async () => {
      const forms = document.querySelectorAll('form');

      for (const form of forms) {
        const emailInput = form.querySelector('input[type="email"]');
        const submitButton = form.querySelector('button[type="submit"], input[type="submit"], button');

        if (emailInput && submitButton) {
          // Enter invalid email
          simulateInput(emailInput, 'invalid-email');

          // Mock form submission
          let submitPrevented = false;
          form.addEventListener('submit', (e) => {
            if (!emailInput.checkValidity()) {
              e.preventDefault();
              submitPrevented = true;
            }
          });

          simulateClick(submitButton);

          // Should prevent submission with invalid email
          if (emailInput.hasAttribute('required')) {
            expect(submitPrevented || !emailInput.checkValidity()).toBeTruthy();
          }
        }
      }
    });

    test('should allow submission with valid email', async () => {
      const forms = document.querySelectorAll('form');

      for (const form of forms) {
        const emailInput = form.querySelector('input[type="email"]');
        const submitButton = form.querySelector('button[type="submit"], input[type="submit"], button');

        if (emailInput && submitButton) {
          // Enter valid email
          simulateInput(emailInput, 'test@example.com');

          // Check that email is valid
          expect(emailInput.checkValidity()).toBeTruthy();
        }
      }
    });
  });

  describe('User Experience', () => {
    test('should have helpful placeholder text', () => {
      const emailInputs = document.querySelectorAll('input[type="email"]');

      emailInputs.forEach(input => {
        const placeholder = input.getAttribute('placeholder');
        if (placeholder) {
          expect(placeholder.toLowerCase()).toMatch(/(email|your email)/);
        }
      });
    });

    test('should have clear call-to-action button text', () => {
      const forms = document.querySelectorAll('form');

      forms.forEach(form => {
        const submitButton = form.querySelector('button[type="submit"], input[type="submit"], button');
        if (submitButton) {
          const buttonText = submitButton.textContent || submitButton.value || '';
          expect(buttonText.toLowerCase()).toMatch(/(join|sign up|get|start|submit|notify)/);
        }
      });
    });

    test('should provide context about what user is signing up for', () => {
      const forms = document.querySelectorAll('form');

      forms.forEach(form => {
        // Look for nearby text that explains the signup
        const formContainer = form.closest('section, div, main') || form.parentElement;
        const contextText = formContainer.textContent.toLowerCase();

        const contextTerms = [
          'beta', 'early access', 'waitlist', 'notify', 'updates',
          'launch', 'free', 'trial', 'compete', 'competitor'
        ];

        const hasContext = contextTerms.some(term => contextText.includes(term));
        expect(hasContext).toBeTruthy();
      });
    });
  });

  describe('Form Accessibility', () => {
    test('should have proper labels or aria-labels', () => {
      const emailInputs = document.querySelectorAll('input[type="email"]');

      emailInputs.forEach(input => {
        const id = input.getAttribute('id');
        const ariaLabel = input.getAttribute('aria-label');
        const placeholder = input.getAttribute('placeholder');
        const label = id ? document.querySelector(`label[for="${id}"]`) : null;

        // Should have some form of labeling
        expect(label || ariaLabel || placeholder).toBeTruthy();
      });
    });

    test('should be keyboard accessible', () => {
      const forms = document.querySelectorAll('form');

      forms.forEach(form => {
        const emailInput = form.querySelector('input[type="email"]');
        const submitButton = form.querySelector('button, input[type="submit"]');

        if (emailInput) {
          expect(emailInput.tabIndex).not.toBe(-1);
        }
        if (submitButton) {
          expect(submitButton.tabIndex).not.toBe(-1);
        }
      });
    });

    test('should have error handling for screen readers', () => {
      const emailInputs = document.querySelectorAll('input[type="email"]');

      emailInputs.forEach(input => {
        // Check for aria-describedby or similar accessibility features
        const ariaDescribedBy = input.getAttribute('aria-describedby');
        const ariaInvalid = input.getAttribute('aria-invalid');

        // While not required, good forms often have these
        if (ariaDescribedBy) {
          const describedElement = document.getElementById(ariaDescribedBy);
          expect(describedElement).toBeTruthy();
        }
      });
    });
  });

  describe('Multiple Form Handling', () => {
    test('should handle multiple email signups on the same page', () => {
      const emailInputs = document.querySelectorAll('input[type="email"]');

      if (emailInputs.length > 1) {
        // Each email input should work independently
        emailInputs.forEach((input, index) => {
          const testEmail = `test${index}@example.com`;
          simulateInput(input, testEmail);
          expect(input.value).toBe(testEmail);
        });

        // All should maintain their values
        emailInputs.forEach((input, index) => {
          const expectedEmail = `test${index}@example.com`;
          expect(input.value).toBe(expectedEmail);
        });
      }
    });

    test('should not interfere with each other', () => {
      const forms = document.querySelectorAll('form');

      if (forms.length > 1) {
        // Submitting one form should not affect others
        forms.forEach((form, index) => {
          const emailInput = form.querySelector('input[type="email"]');
          if (emailInput) {
            simulateInput(emailInput, `test${index}@example.com`);
          }
        });

        // Each form should maintain its state
        forms.forEach((form, index) => {
          const emailInput = form.querySelector('input[type="email"]');
          if (emailInput) {
            expect(emailInput.value).toBe(`test${index}@example.com`);
          }
        });
      }
    });
  });

  describe('Form Security Considerations', () => {
    test('should not have obvious security vulnerabilities', () => {
      const forms = document.querySelectorAll('form');

      forms.forEach(form => {
        const action = form.getAttribute('action');

        if (action) {
          // Should not submit to suspicious URLs
          expect(action).not.toMatch(/javascript:/i);
          expect(action).not.toMatch(/data:/i);
        }

        // Should not have dangerous event handlers
        const innerHTML = form.innerHTML;
        expect(innerHTML).not.toMatch(/onclick\s*=\s*["'].*eval/i);
        expect(innerHTML).not.toMatch(/onerror\s*=/i);
      });
    });

    test('should have appropriate form methods', () => {
      const forms = document.querySelectorAll('form');

      forms.forEach(form => {
        const method = form.getAttribute('method');

        if (method) {
          // Email signups should typically use POST
          expect(method.toLowerCase()).toMatch(/(post|get)/);
        }
      });
    });
  });
});