import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Mark lazy images as loaded once they finish loading
document.addEventListener('load', (e) => {
  const el = e.target;
  if (el instanceof HTMLImageElement && el.loading === 'lazy') {
    el.setAttribute('data-loaded', '');
  }
}, true);

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element not found. Ensure the HTML file contains a <div id="root"></div>');
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
