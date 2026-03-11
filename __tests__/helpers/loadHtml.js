/**
 * Test helper to load and parse the landing page HTML file
 */
const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

/**
 * Load the index.html file and return a JSDOM instance
 * @returns {Promise<{dom: JSDOM, document: Document, window: Window}>}
 */
async function loadLandingPage() {
  const htmlPath = path.join(__dirname, '../../index.html');
  const htmlContent = fs.readFileSync(htmlPath, 'utf8');

  const dom = new JSDOM(htmlContent, {
    runScripts: "dangerously",
    resources: "usable",
    beforeParse(window) {
      // Mock any globals that might be needed
      window.alert = jest.fn();
      window.console.log = jest.fn();

      // Mock browser APIs
      window.IntersectionObserver = jest.fn(() => ({
        observe: jest.fn(),
        unobserve: jest.fn(),
        disconnect: jest.fn(),
      }));

      window.scrollTo = jest.fn();
      window.matchMedia = jest.fn(() => ({
        matches: false,
        addListener: jest.fn(),
        removeListener: jest.fn(),
      }));
    }
  });

  // Wait for DOM to be ready
  await new Promise(resolve => {
    if (dom.window.document.readyState === 'loading') {
      dom.window.document.addEventListener('DOMContentLoaded', resolve);
    } else {
      resolve();
    }
  });

  return {
    dom,
    document: dom.window.document,
    window: dom.window
  };
}

/**
 * Simulate a click event on an element
 * @param {Element} element
 */
function simulateClick(element) {
  const event = new element.ownerDocument.defaultView.MouseEvent('click', {
    bubbles: true,
    cancelable: true,
  });
  element.dispatchEvent(event);
}

/**
 * Simulate input on a form field
 * @param {HTMLInputElement} input
 * @param {string} value
 */
function simulateInput(input, value) {
  input.value = value;
  const event = new input.ownerDocument.defaultView.Event('input', {
    bubbles: true,
    cancelable: true,
  });
  input.dispatchEvent(event);
}

/**
 * Wait for a condition to be true
 * @param {Function} condition
 * @param {number} timeout
 */
function waitFor(condition, timeout = 1000) {
  return new Promise((resolve, reject) => {
    const startTime = Date.now();
    const checkCondition = () => {
      if (condition()) {
        resolve();
      } else if (Date.now() - startTime > timeout) {
        reject(new Error('Timeout waiting for condition'));
      } else {
        setTimeout(checkCondition, 10);
      }
    };
    checkCondition();
  });
}

module.exports = {
  loadLandingPage,
  simulateClick,
  simulateInput,
  waitFor
};