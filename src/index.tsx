import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

(async () => {
    const {worker} = await import('@/mock/worker');
    return worker.start();
})();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const queryClient = new QueryClient();
root.render(
    <QueryClientProvider client={queryClient}>
    <App />
    </QueryClientProvider>,
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>,
);

reportWebVitals();
