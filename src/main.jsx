import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { TransportProvider } from './context/TransportContext';
import { testSupabaseConnection } from './lib/supabase';
import './index.css';

// Run connection test in dev mode - visible in browser console (F12)
// Safe: app loads normally in both connected and offline/fallback states
if (import.meta.env.DEV) {
  testSupabaseConnection().then(result => {
    if (result.status === 'NOT_CONFIGURED') {
      console.info(
        '%c[MOVEIT] Running in local data mode. To connect Supabase, fill in VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env.local and restart the dev server.',
        'color: #f97316; font-weight: bold;'
      );
    } else if (result.status === 'CONNECTED') {
      console.info(
        `%c[MOVEIT] Supabase connected! ${result.count} bus_stops loaded from database.`,
        'color: #10b981; font-weight: bold;'
      );
    }
  });
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <TransportProvider>
        <App />
      </TransportProvider>
    </BrowserRouter>
  </React.StrictMode>
);
