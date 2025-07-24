
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from '@/App';
import '@/index.css';
import { AuthProvider } from '@/contexts/SupabaseAuthContext';
import { QueryParamProvider } from '@/contexts/QueryParamContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <QueryParamProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </QueryParamProvider>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);
