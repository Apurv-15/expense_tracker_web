import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import './index.css';
import App from './App.jsx';

const root = createRoot(document.getElementById('root'));

root.render(
  <StrictMode>
    <Auth0Provider
      domain="dev-64x2c7ktrwnmij7t.us.auth0.com"
      clientId="zaY1VKhKxFpLx2RHhyKBV3HuxAZDlwH0"
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
    >
      <App />
    </Auth0Provider>
  </StrictMode>
);