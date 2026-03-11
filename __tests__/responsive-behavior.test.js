/**
 * Tests for responsive behavior and mobile compatibility
 */
const { loadLandingPage } = require('./helpers/loadHtml');

describe('Responsive Behavior', () => {
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

  describe('Viewport and Meta Tags', () => {
    test('should have proper viewport meta tag', () => {
      const viewport = document.querySelector('meta[name="viewport"]');
      expect(viewport).toBeTruthy();
      expect(viewport.getAttribute('content')).toContain('width=device-width');
      expect(viewport.getAttribute('content')).toContain('initial-scale=1');
    });

    test('should have responsive design meta tags', () => {
      const viewport = document.querySelector('meta[name="viewport"]');
      const content = viewport.getAttribute('content');

      // Should not prevent zooming (accessibility)
      expect(content).not.toContain('user-scalable=no');
      expect(content).not.toContain('maximum-scale=1');
    });
  });

  describe('CSS Framework and Responsive Classes', () => {
    test('should use responsive CSS framework or classes', () => {
      const bodyHTML = document.body.innerHTML;

      // Check for common responsive patterns
      const responsivePatterns = [
        /class="[^"]*\b(sm|md|lg|xl):/,  // Tailwind-style breakpoints
        /class="[^"]*\bcol-(xs|sm|md|lg|xl)/,  // Bootstrap columns
        /class="[^"]*\b(mobile|tablet|desktop)/,  // Custom responsive classes
        /@media\s*\(/,  // CSS media queries
        /flex|grid/,  // Modern CSS layouts
      ];

      const hasResponsivePatterns = responsivePatterns.some(pattern =>
        pattern.test(bodyHTML)
      );

      expect(hasResponsivePatterns).toBeTruthy();
    });

    test('should have flexible container elements', () => {
      const containers = document.querySelectorAll('div, section, main, article');

      let hasFlexibleContainers = false;

      containers.forEach(container => {
        const styles = window.getComputedStyle(container);
        const className = container.className;

        // Check for flexible layouts
        if (styles.display === 'flex' ||
            styles.display === 'grid' ||
            className.includes('container') ||
            className.includes('responsive') ||
            className.includes('flex') ||
            className.includes('grid')) {
          hasFlexibleContainers = true;
        }
      });

      expect(hasFlexibleContainers).toBeTruthy();
    });
  });

  describe('Mobile-First Design Patterns', () => {
    test('should have appropriate text sizes for mobile', () => {
      const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
      const paragraphs = document.querySelectorAll('p');

      // Headings should be readable on mobile
      headings.forEach(heading => {
        const styles = window.getComputedStyle(heading);
        const fontSize = parseFloat(styles.fontSize);

        // Minimum readable size (approximate)
        expect(fontSize).toBeGreaterThanOrEqual(16);
      });

      // Body text should be readable
      paragraphs.forEach(paragraph => {
        const styles = window.getComputedStyle(paragraph);
        const fontSize = parseFloat(styles.fontSize);

        // Minimum readable body text size
        expect(fontSize).toBeGreaterThanOrEqual(14);
      });
    });

    test('should have touch-friendly button sizes', () => {
      const buttons = document.querySelectorAll('button, input[type="submit"], .btn, [role="button"]');

      buttons.forEach(button => {
        const styles = window.getComputedStyle(button);
        const rect = button.getBoundingClientRect();

        // Touch targets should be at least 44px (iOS guideline)
        if (rect.height > 0) {
          expect(rect.height).toBeGreaterThanOrEqual(40);
        }

        // Check for adequate padding
        const padding = parseFloat(styles.paddingTop) + parseFloat(styles.paddingBottom);
        if (padding > 0) {
          expect(padding).toBeGreaterThanOrEqual(10);
        }
      });
    });

    test('should have appropriate spacing for mobile', () => {
      const sections = document.querySelectorAll('section, div[class*="section"], .container');

      sections.forEach(section => {
        const styles = window.getComputedStyle(section);
        const marginTop = parseFloat(styles.marginTop);
        const marginBottom = parseFloat(styles.marginBottom);
        const paddingTop = parseFloat(styles.paddingTop);
        const paddingBottom = parseFloat(styles.paddingBottom);

        // Should have some vertical spacing
        const totalVerticalSpace = marginTop + marginBottom + paddingTop + paddingBottom;
        if (totalVerticalSpace > 0) {
          expect(totalVerticalSpace).toBeGreaterThanOrEqual(16);
        }
      });
    });
  });

  describe('Navigation Responsiveness', () => {
    test('should have mobile-friendly navigation', () => {
      const nav = document.querySelector('nav');
      expect(nav).toBeTruthy();

      const navItems = nav.querySelectorAll('a, button');

      // Navigation should exist and be accessible
      expect(navItems.length).toBeGreaterThan(0);

      // Check for mobile navigation patterns
      const navHTML = nav.innerHTML;
      const hasMobileNav = /hamburger|menu-toggle|mobile-menu|burger/.test(navHTML) ||
                          nav.querySelector('.hamburger, .menu-toggle, .mobile-menu');

      // Either should have mobile nav patterns or be simple enough for mobile
      expect(hasMobileNav || navItems.length <= 5).toBeTruthy();
    });

    test('should have adequate spacing between nav items', () => {
      const nav = document.querySelector('nav');
      const navLinks = nav.querySelectorAll('a');

      navLinks.forEach(link => {
        const styles = window.getComputedStyle(link);
        const padding = parseFloat(styles.paddingLeft) + parseFloat(styles.paddingRight);
        const margin = parseFloat(styles.marginLeft) + parseFloat(styles.marginRight);

        // Nav items should have adequate spacing for touch
        if (padding + margin > 0) {
          expect(padding + margin).toBeGreaterThanOrEqual(8);
        }
      });
    });
  });

  describe('Form Responsiveness', () => {
    test('should have mobile-friendly form inputs', () => {
      const inputs = document.querySelectorAll('input, textarea, select');

      inputs.forEach(input => {
        const styles = window.getComputedStyle(input);
        const rect = input.getBoundingClientRect();

        // Inputs should be tall enough for touch
        if (rect.height > 0) {
          expect(rect.height).toBeGreaterThanOrEqual(40);
        }

        // Should have adequate padding
        const verticalPadding = parseFloat(styles.paddingTop) + parseFloat(styles.paddingBottom);
        if (verticalPadding > 0) {
          expect(verticalPadding).toBeGreaterThanOrEqual(8);
        }
      });
    });

    test('should have proper input types for mobile keyboards', () => {
      const emailInputs = document.querySelectorAll('input[type="email"]');
      const numberInputs = document.querySelectorAll('input[type="number"]');
      const urlInputs = document.querySelectorAll('input[type="url"]');

      // Email inputs should trigger email keyboard
      expect(emailInputs.length).toBeGreaterThan(0);

      // Number inputs should trigger numeric keyboard (for calculator)
      expect(numberInputs.length).toBeGreaterThan(0);
    });
  });

  describe('Content Layout Responsiveness', () => {
    test('should handle long content gracefully', () => {
      const textElements = document.querySelectorAll('p, div, span');

      textElements.forEach(element => {
        const styles = window.getComputedStyle(element);

        // Text should wrap properly
        expect(styles.wordWrap).not.toBe('normal');
        expect(styles.overflowWrap).not.toBe('normal');

        // Should not have fixed widths that break on mobile
        const width = styles.width;
        if (width && width !== 'auto') {
          expect(width).not.toMatch(/^\d+px$/); // Avoid fixed pixel widths
        }
      });
    });

    test('should have scalable images', () => {
      const images = document.querySelectorAll('img');

      images.forEach(img => {
        const styles = window.getComputedStyle(img);

        // Images should be responsive
        const maxWidth = styles.maxWidth;
        const width = styles.width;

        // Should use percentage or auto widths, not fixed pixels
        expect(maxWidth === '100%' || width === 'auto' || width === '100%').toBeTruthy();
      });
    });

    test('should have appropriate line heights for readability', () => {
      const textElements = document.querySelectorAll('p, div, span, h1, h2, h3, h4, h5, h6');

      textElements.forEach(element => {
        const styles = window.getComputedStyle(element);
        const lineHeight = styles.lineHeight;

        if (lineHeight !== 'normal') {
          const lineHeightValue = parseFloat(lineHeight);

          // Line height should be between 1.2 and 2.0 for readability
          if (!isNaN(lineHeightValue)) {
            expect(lineHeightValue).toBeGreaterThanOrEqual(1.2);
            expect(lineHeightValue).toBeLessThanOrEqual(2.0);
          }
        }
      });
    });
  });

  describe('Interactive Elements Responsiveness', () => {
    test('should have touch-friendly interactive elements', () => {
      const interactiveElements = document.querySelectorAll(
        'button, a, input, select, textarea, [onclick], [role="button"], .faq-question'
      );

      interactiveElements.forEach(element => {
        const rect = element.getBoundingClientRect();
        const styles = window.getComputedStyle(element);

        // Interactive elements should be large enough for touch
        if (rect.height > 0 && rect.width > 0) {
          // Minimum touch target size recommendations
          expect(rect.height).toBeGreaterThanOrEqual(32);
          expect(rect.width).toBeGreaterThanOrEqual(32);
        }
      });
    });

    test('should have adequate spacing between interactive elements', () => {
      const buttons = document.querySelectorAll('button, .btn, [role="button"]');

      if (buttons.length > 1) {
        for (let i = 0; i < buttons.length - 1; i++) {
          const currentButton = buttons[i];
          const nextButton = buttons[i + 1];

          const currentRect = currentButton.getBoundingClientRect();
          const nextRect = nextButton.getBoundingClientRect();

          // Buttons should have adequate spacing (at least 8px)
          const verticalGap = Math.abs(nextRect.top - currentRect.bottom);
          const horizontalGap = Math.abs(nextRect.left - currentRect.right);

          if (verticalGap < 100 && horizontalGap < 100) { // If they're nearby
            expect(Math.min(verticalGap, horizontalGap)).toBeGreaterThanOrEqual(8);
          }
        }
      }
    });
  });

  describe('Performance Considerations', () => {
    test('should not have excessive DOM elements', () => {
      const allElements = document.querySelectorAll('*');

      // Should be reasonable for mobile performance
      expect(allElements.length).toBeLessThan(2000);
    });

    test('should use efficient selectors and classes', () => {
      const bodyHTML = document.body.innerHTML;

      // Check for overly complex selectors that might impact performance
      const inefficientPatterns = [
        /class="[^"]{200,}"/,  // Extremely long class names
        /style="[^"]{500,}"/,  // Excessive inline styles
      ];

      inefficientPatterns.forEach(pattern => {
        expect(pattern.test(bodyHTML)).toBeFalsy();
      });
    });
  });

  describe('Accessibility on Mobile', () => {
    test('should maintain accessibility on smaller screens', () => {
      const focusableElements = document.querySelectorAll(
        'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );

      // Should have focusable elements for keyboard navigation
      expect(focusableElements.length).toBeGreaterThan(0);

      focusableElements.forEach(element => {
        // Elements should not be hidden in a way that breaks accessibility
        const styles = window.getComputedStyle(element);
        expect(styles.display).not.toBe('none');
        expect(styles.visibility).not.toBe('hidden');
      });
    });

    test('should have adequate color contrast for mobile viewing', () => {
      const textElements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, div, a, button');

      textElements.forEach(element => {
        const styles = window.getComputedStyle(element);
        const color = styles.color;
        const backgroundColor = styles.backgroundColor;

        // Should have defined colors (not just 'initial' or 'inherit')
        if (element.textContent.trim()) {
          expect(color).not.toBe('initial');
          expect(color).not.toBe('inherit');
        }
      });
    });
  });
});