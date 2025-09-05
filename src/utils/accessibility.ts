/**
 * Accessibility Testing and Enhancement Utilities
 * Supports WCAG 2.1 AA compliance for luxury therapeutic design
 */

export interface ColorContrastResult {
  ratio: number;
  AA: boolean;
  AAA: boolean;
  level: 'AA' | 'AAA' | 'FAIL';
}

export interface ExtendedColorContrastResult extends ColorContrastResult {
  name: string;
  foreground: string;
  background: string;
}

export interface AccessibilityReport {
  colorContrast: ExtendedColorContrastResult[];
  focusableElements: number;
  ariaLabels: number;
  headingStructure: string[];
  issues: string[];
  recommendations: string[];
}

/**
 * Calculate color contrast ratio between foreground and background
 * Based on WCAG 2.1 guidelines
 */
export function getColorContrast(foreground: string, background: string): ColorContrastResult {
  // Convert hex to RGB
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  // Calculate relative luminance
  const getLuminance = (rgb: {r: number, g: number, b: number}) => {
    const rsRGB = rgb.r / 255;
    const gsRGB = rgb.g / 255;
    const bsRGB = rgb.b / 255;

    const r = rsRGB <= 0.03928 ? rsRGB / 12.92 : Math.pow((rsRGB + 0.055) / 1.055, 2.4);
    const g = gsRGB <= 0.03928 ? gsRGB / 12.92 : Math.pow((gsRGB + 0.055) / 1.055, 2.4);
    const b = bsRGB <= 0.03928 ? bsRGB / 12.92 : Math.pow((bsRGB + 0.055) / 1.055, 2.4);

    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };

  const fgRgb = hexToRgb(foreground);
  const bgRgb = hexToRgb(background);

  if (!fgRgb || !bgRgb) {
    return { ratio: 0, AA: false, AAA: false, level: 'FAIL' };
  }

  const fgLuminance = getLuminance(fgRgb);
  const bgLuminance = getLuminance(bgRgb);

  const ratio = (Math.max(fgLuminance, bgLuminance) + 0.05) / (Math.min(fgLuminance, bgLuminance) + 0.05);
  
  const AA = ratio >= 4.5;
  const AAA = ratio >= 7;

  return {
    ratio: Math.round(ratio * 100) / 100,
    AA,
    AAA,
    level: AAA ? 'AAA' : AA ? 'AA' : 'FAIL'
  };
}

/**
 * Test therapeutic color palette for WCAG compliance
 */
export function testTherapeuticPalette(): ExtendedColorContrastResult[] {
  const palette = {
    // Enhanced text colors for better contrast
    'text-primary': '#FFFFFF',     // Pure white for maximum contrast
    'text-secondary': '#E2E8F0',   // Light gray with better contrast
    'text-muted': '#CBD5E0',       // Improved muted text contrast
    
    // Background colors
    'bg-primary': '#0A0D10',       // Deepest luxury dark
    'bg-secondary': '#1A2028',     // Elevated card backgrounds
    'bg-tertiary': '#242A33',      // Interactive surfaces
    
    // Enhanced brand colors for better visibility
    'sage-primary': '#A1C7B1',     // Lighter sage for improved contrast
    'sage-dark': '#5D8E75',        // Darker sage that still passes contrast
    'sage-light': '#D1E6D8',       // Light sage for subtle accents
    
    // Improved state colors
    'warning': '#F7E98E',          // Brighter champagne for better visibility
    'error': '#FCA5A5',           // High contrast red for errors
    'success': '#86EFAC'          // High contrast green for success
  };

  const tests = [
    // Primary text combinations on dark backgrounds
    { fg: palette['text-primary'], bg: palette['bg-primary'], name: 'Primary white text on dark background' },
    { fg: palette['text-secondary'], bg: palette['bg-primary'], name: 'Secondary text on dark background' },
    { fg: palette['text-muted'], bg: palette['bg-primary'], name: 'Muted text on dark background' },
    
    // Enhanced sage combinations
    { fg: palette['text-primary'], bg: palette['sage-dark'], name: 'White text on sage dark' },
    { fg: palette['text-primary'], bg: palette['sage-primary'], name: 'White text on sage primary' },
    { fg: palette['sage-primary'], bg: palette['bg-primary'], name: 'Sage primary on dark background' },
    
    // Interactive button combinations
    { fg: '#FFFFFF', bg: palette['sage-dark'], name: 'White on sage dark button' },
    { fg: '#000000', bg: palette['sage-light'], name: 'Black on sage light button' },
    
    // Enhanced state combinations
    { fg: '#000000', bg: palette['warning'], name: 'Black on warning champagne' },
    { fg: '#FFFFFF', bg: palette['error'], name: 'White on error red' },
    { fg: '#000000', bg: palette['success'], name: 'Black on success green' },
    
    // Navigation combinations
    { fg: palette['text-secondary'], bg: 'rgba(26, 32, 40, 0.9)', name: 'Secondary text on nav background' },
    { fg: palette['text-primary'], bg: 'rgba(93, 142, 117, 0.3)', name: 'Primary text on sage nav background' }
  ];

  return tests.map(test => ({
    ...getColorContrast(test.fg, test.bg),
    name: test.name,
    foreground: test.fg,
    background: test.bg
  })) as ExtendedColorContrastResult[];
}

/**
 * Audit page accessibility
 */
export function auditPageAccessibility(): AccessibilityReport {
  const report: AccessibilityReport = {
    colorContrast: testTherapeuticPalette(),
    focusableElements: 0,
    ariaLabels: 0,
    headingStructure: [],
    issues: [],
    recommendations: []
  };

  // Count focusable elements
  const focusableSelectors = [
    'a[href]',
    'button:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])'
  ].join(', ');
  
  report.focusableElements = document.querySelectorAll(focusableSelectors).length;

  // Count elements with aria-label
  report.ariaLabels = document.querySelectorAll('[aria-label], [aria-labelledby]').length;

  // Check heading structure
  const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
  report.headingStructure = Array.from(headings).map(h => h.tagName.toLowerCase());

  // Check for common issues
  const images = document.querySelectorAll('img:not([alt])');
  if (images.length > 0) {
    report.issues.push(`${images.length} images without alt text`);
  }

  const buttons = document.querySelectorAll('button:not([aria-label]):not([title])');
  const emptyButtons = Array.from(buttons).filter(btn => !btn.textContent?.trim());
  if (emptyButtons.length > 0) {
    report.issues.push(`${emptyButtons.length} buttons without accessible names`);
  }

  const links = document.querySelectorAll('a:not([aria-label]):not([title])');
  const emptyLinks = Array.from(links).filter(link => !link.textContent?.trim());
  if (emptyLinks.length > 0) {
    report.issues.push(`${emptyLinks.length} links without accessible names`);
  }

  // Generate recommendations
  if (report.focusableElements < 5) {
    report.recommendations.push('Consider adding more interactive elements for better navigation');
  }

  const contrastIssues = report.colorContrast.filter(test => !test.AA);
  if (contrastIssues.length > 0) {
    report.recommendations.push(`${contrastIssues.length} color combinations fail WCAG AA contrast requirements`);
  }

  if (report.headingStructure.length === 0) {
    report.recommendations.push('Add heading structure for better screen reader navigation');
  }

  return report;
}

/**
 * Focus management utilities
 */
export class FocusManager {
  private static focusStack: HTMLElement[] = [];

  static saveFocus(): void {
    const activeElement = document.activeElement as HTMLElement;
    if (activeElement && activeElement !== document.body) {
      this.focusStack.push(activeElement);
    }
  }

  static restoreFocus(): void {
    const lastFocused = this.focusStack.pop();
    if (lastFocused && document.contains(lastFocused)) {
      lastFocused.focus();
    }
  }

  static trapFocus(container: HTMLElement): (() => void) {
    const focusableElements = container.querySelectorAll(
      'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
    ) as NodeListOf<HTMLElement>;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    container.addEventListener('keydown', handleTabKey);
    
    // Return cleanup function
    const cleanup = () => container.removeEventListener('keydown', handleTabKey);
    
    // Call the returned function to add event listeners
    container.addEventListener('keydown', handleTabKey);
    
    return cleanup;
  }
}

/**
 * Announce messages to screen readers
 */
export function announceToScreenReader(message: string, priority: 'polite' | 'assertive' = 'polite'): void {
  const announcement = document.createElement('div');
  announcement.setAttribute('aria-live', priority);
  announcement.setAttribute('aria-atomic', 'true');
  announcement.className = 'sr-only';
  announcement.textContent = message;

  document.body.appendChild(announcement);

  // Remove after announcement
  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
}

/**
 * Reduce motion for users who prefer it
 */
export function respectsReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Check if user prefers high contrast
 */
export function prefersHighContrast(): boolean {
  return window.matchMedia('(prefers-contrast: high)').matches;
}

/**
 * Therapeutic keyboard navigation handler
 */
export function handleTherapeuticKeyboardNavigation(event: KeyboardEvent, onNavigate?: (direction: 'up' | 'down' | 'left' | 'right') => void): void {
  const { key, target } = event;
  
  // Skip if typing in inputs
  if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement) {
    return;
  }

  switch (key) {
    case 'ArrowUp':
      event.preventDefault();
      onNavigate?.('up');
      break;
    case 'ArrowDown':
      event.preventDefault();
      onNavigate?.('down');
      break;
    case 'ArrowLeft':
      event.preventDefault();
      onNavigate?.('left');
      break;
    case 'ArrowRight':
      event.preventDefault();
      onNavigate?.('right');
      break;
    case 'Escape':
      // Remove focus from current element
      (document.activeElement as HTMLElement)?.blur();
      break;
  }
}