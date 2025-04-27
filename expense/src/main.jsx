import React from 'react';
import { createRoot } from 'react-dom/client';
import { Auth0Provider } from "@auth0/auth0-react";
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from "@vercel/speed-insights/react"
import './index.css';
import App from './App';

const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-64x2c7ktrwnmij7t.us.auth0.com"
      clientId="McgYV8DLt14VT2fORvF9vHEbD8igFxjU"
      authorizationParams={{
        redirect_uri: process.env.NODE_ENV === 'production' 
          ? 'https://expense-tracker-web-smoky.vercel.app'
          : window.location.origin
      }}
      cacheLocation="localstorage"
      useRefreshTokens={true}
    >
      <App />
      <Analytics />
      <SpeedInsights />
    </Auth0Provider>
  </React.StrictMode>
);