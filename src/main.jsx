import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from '@/App';
import '@/index.css';
import { QueryParamProvider } from '@/contexts/QueryParamContext';
import '@/i18n/config';

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

// Signal that app is ready for prerendering
if (typeof window !== 'undefined' && window.prerenderReady) {
  window.prerenderReady = false;
  setTimeout(() => {
    window.prerenderReady = true;
    document.dispatchEvent(new Event('app-rendered'));
  }, 0);
}

root.render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <QueryParamProvider>
          <App />
        </QueryParamProvider>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);