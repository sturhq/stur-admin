import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import * as Sentry from '@sentry/react';

if (import.meta.env.MODE !== 'dev') {
  Sentry.init({
    environment: import.meta.env.VITE_APP_ENV,
    dsn: 'https://fdb56c229f335ebfb0bf8ac8ec172889@o4508907665948672.ingest.us.sentry.io/4509179627110400',
    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.replayIntegration(),
    ],
    // Tracing
    tracesSampleRate: 1.0, //  Capture 100% of the transactions
    // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
    tracePropagationTargets: [import.meta.env.VITE_APP_TRACE_URL],
    // Session Replay
    replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
    replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
