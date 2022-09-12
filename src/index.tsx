import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {RecoilRoot} from "recoil";
import {QueryClientProvider, QueryClient} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import {BrowserRouter} from "react-router-dom";
import {DebugObserver} from "@/app/debug";
import {HelmetProvider} from 'react-helmet-async';
import MetaSeo from "@/components/common/metaSeo";
// (async () => {
//     const {worker} = await import('@/mock/worker');
//     return worker.start();
// })();

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 0,
            // onError: (error) => {
            //     window.location.href = '/error'
            // }
        },
    }
});
root.render(
    <RecoilRoot>
        <QueryClientProvider client={queryClient}>
            {process.env.NODE_ENV === "development" && (
                <>
                    <DebugObserver/>
                    <ReactQueryDevtools
                        initialIsOpen={false}
                        position={"bottom-right"}
                    />
                </>
            )}
            <BrowserRouter basename={process.env.PUBLIC_URL}>
                <HelmetProvider>
                    <MetaSeo title="ABM"/>
                    <App/>
                </HelmetProvider>
            </BrowserRouter>
        </QueryClientProvider>
    </RecoilRoot>,

    // <React.StrictMode>
    //   <App />
    // </React.StrictMode>,
);

reportWebVitals();
