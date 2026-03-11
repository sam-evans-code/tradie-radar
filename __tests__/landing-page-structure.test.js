/**
 * Tests for landing page HTML structure and SEO elements
 */
const { loadLandingPage } = require('./helpers/loadHtml');

describe('Landing Page Structure', () => {
  let dom, document, window;

  beforeAll(async () => {
    const loaded = await loadLandingPage();
    dom = loaded.dom;
    document = loaded.document;
    window = loaded.window;
  });

  afterAll(() => {
    if (dom) {
      dom.window.close();
    }
  });

  describe('Basic HTML Structure', () => {
    test('should have proper document structure', () => {
      expect(document.doctype.name).toBe('html');
      expect(document.documentElement.lang).toBe('en');
      expect(document.documentElement.dir).toBe('ltr');
    });

    test('should have required meta tags', () => {
      const charset = document.querySelector('meta[charset]');
      expect(charset.getAttribute('charset')).toBe('UTF-8');

      const viewport = document.querySelector('meta[name="viewport"]');
      expect(viewport.getAttribute('content')).toBe('width=device-width, initial-scale=1.0');
    });

    test('should have proper title and description', () => {
      const title = document.querySelector('title');
      expect(title.textContent).toBe('Competitor Analysis Tools for B2B SaaS Teams | Compete');

      const description = document.querySelector('meta[name="description"]');
      expect(description.getAttribute('content')).toContain('Track competitor pricing');
      expect(description.getAttribute('content')).toContain('small teams');
    });
  });

  describe('SEO Elements', () => {
    test('should have proper Open Graph tags', () => {
      const ogType = document.querySelector('meta[property="og:type"]');
      expect(ogType.getAttribute('content')).toBe('website');

      const ogTitle = document.querySelector('meta[property="og:title"]');
      expect(ogTitle.getAttribute('content')).toContain('Competitor Analysis Tools');

      const ogDescription = document.querySelector('meta[property="og:description"]');
      expect(ogDescription.getAttribute('content')).toContain('Track competitor pricing');

      const ogImage = document.querySelector('meta[property="og:image"]');
      expect(ogImage.getAttribute('content')).toContain('compete-logo.png');
    });

    test('should have proper Twitter Card tags', () => {
      const twitterCard = document.querySelector('meta[property="twitter:card"]');
      expect(twitterCard.getAttribute('content')).toBe('summary_large_image');

      const twitterTitle = document.querySelector('meta[property="twitter:title"]');
      expect(twitterTitle.getAttribute('content')).toContain('Competitor Analysis Tools');
    });

    test('should have structured data (JSON-LD)', () => {
      const jsonLdScripts = document.querySelectorAll('script[type="application/ld+json"]');
      expect(jsonLdScripts.length).toBeGreaterThan(0);

      const softwareAppSchema = jsonLdScripts[0];
      const schemaData = JSON.parse(softwareAppSchema.textContent);

      expect(schemaData['@context']).toBe('https://schema.org');
      expect(schemaData['@type']).toBe('SoftwareApplication');
      expect(schemaData.name).toBe('Compete');
      expect(schemaData.applicationCategory).toContain('BusinessApplication');
    });

    test('should have canonical URL', () => {
      const canonical = document.querySelector('link[rel="canonical"]');
      expect(canonical.getAttribute('href')).toContain('try-compete');
    });

    test('should have proper robots meta tag', () => {
      const robots = document.querySelector('meta[name="robots"]');
      expect(robots.getAttribute('content')).toBe('index, follow');
    });
  });

  describe('Favicon Configuration', () => {
    test('should have multiple favicon formats', () => {
      const ico = document.querySelector('link[rel="icon"][type="image/x-icon"]');
      expect(ico.getAttribute('href')).toContain('favicon.ico');

      const svg = document.querySelector('link[rel="icon"][type="image/svg+xml"]');
      expect(svg.getAttribute('href')).toContain('compete-favicon.svg');

      const appleTouchIcon = document.querySelector('link[rel="apple-touch-icon"]');
      expect(appleTouchIcon.getAttribute('href')).toContain('compete-logo.png');
    });
  });

  describe('Performance Optimizations', () => {
    test('should have font preloading', () => {
      const fontPreconnect = document.querySelector('link[rel="preconnect"][href*="fonts.googleapis.com"]');
      expect(fontPreconnect).toBeTruthy();

      const fontPreload = document.querySelector('link[rel="preload"][as="style"]');
      expect(fontPreload.getAttribute('href')).toContain('fonts.googleapis.com');
    });

    test('should have image preloading for critical assets', () => {
      const logoPreload = document.querySelector('link[rel="preload"][as="image"]');
      expect(logoPreload.getAttribute('href')).toContain('compete-logo.png');
    });
  });

  describe('Core Page Sections', () => {
    test('should have main navigation', () => {
      const nav = document.querySelector('nav');
      expect(nav).toBeTruthy();

      const logo = document.querySelector('nav img, nav svg');
      expect(logo).toBeTruthy();
    });

    test('should have hero section', () => {
      const heroHeading = document.querySelector('h1');
      expect(heroHeading).toBeTruthy();
      expect(heroHeading.textContent).toContain('losing');
    });

    test('should have problem tiles section', () => {
      const problemSection = document.querySelector('.problem-tiles, [class*="problem"]');
      expect(problemSection).toBeTruthy();
    });

    test('should have ROI calculator section', () => {
      const roiSection = document.querySelector('#roi-calculator, [id*="roi"], [class*="calculator"]');
      expect(roiSection).toBeTruthy();
    });

    test('should have FAQ section', () => {
      const faqSection = document.querySelector('#faq, [class*="faq"]');
      expect(faqSection).toBeTruthy();

      const faqItems = document.querySelectorAll('.faq-item, [class*="faq-item"]');
      expect(faqItems.length).toBeGreaterThan(0);
    });

    test('should have pricing section', () => {
      const pricingSection = document.querySelector('#pricing, [class*="pricing"]');
      expect(pricingSection).toBeTruthy();
    });

    test('should have contact/signup forms or call-to-action buttons', () => {
      const emailInputs = document.querySelectorAll('input[type="email"]');
      const forms = document.querySelectorAll('form');
      const ctaButtons = document.querySelectorAll('button, [class*="cta"], [class*="button"]');

      // Should have either forms or CTA buttons
      expect(emailInputs.length > 0 || forms.length > 0 || ctaButtons.length > 0).toBeTruthy();
    });
  });

  describe('Accessibility', () => {
    test('should have proper heading hierarchy', () => {
      const h1 = document.querySelectorAll('h1');
      expect(h1.length).toBe(1); // Only one H1 per page

      const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
      expect(headings.length).toBeGreaterThan(1); // Multiple heading levels
    });

    test('should have alt text for images', () => {
      const images = document.querySelectorAll('img');
      images.forEach(img => {
        const alt = img.getAttribute('alt');
        const ariaLabel = img.getAttribute('aria-label');
        // Images should have alt text or aria-label, or be decorative (alt="")
        expect(alt !== null || ariaLabel !== null).toBeTruthy();
      });
    });

    test('should have proper form labels', () => {
      const inputs = document.querySelectorAll('input[type="email"], input[type="text"], input[type="number"], textarea');
      inputs.forEach(input => {
        const id = input.getAttribute('id');
        const ariaLabel = input.getAttribute('aria-label');
        const placeholder = input.getAttribute('placeholder');
        const label = id ? document.querySelector(`label[for="${id}"]`) : null;

        // Inputs should have labels, aria-label, or descriptive placeholder
        expect(label || ariaLabel || placeholder).toBeTruthy();
      });
    });
  });
});