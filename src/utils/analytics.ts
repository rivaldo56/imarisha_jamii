/**
 * Simple analytics mock for tracking conversion events.
 * In a real production environment, this would interface with GA4, Mixpanel, etc.
 */
const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
  if (!eventName || typeof eventName !== 'string') {
    console.warn('[Analytics Error] Missing or invalid eventName:', eventName);
    return;
  }

  if (properties && typeof properties !== 'object') {
    console.warn(`[Analytics Error] Invalid properties for event ${eventName}:`, properties);
    return;
  }

  // Log to console for development verification
  console.log(`[Analytics] Track Event: ${eventName}`, properties);
  
  if (GA_ID && typeof window !== 'undefined' && (window as any).gtag) {
    try {
      (window as any).gtag('event', eventName, properties);
    } catch (error) {
      console.error(`[Analytics Error] Failed to send event ${eventName} to GA:`, error);
    }
  }
};

export const ANALYTICS_EVENTS = {
  START_APPLICATION: 'start_application',
  SUBMIT_APPLICATION: 'submit_application',
  CONTACT_INQUIRY: 'contact_inquiry',
  CTA_CLICK: 'cta_click',
  VIEW_PROGRAM: 'view_program',
  CONTACT_FORM_SUBMIT: 'contact_form_submit',
};
