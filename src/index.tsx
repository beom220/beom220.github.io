import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {RecoilRoot} from "recoil";
import {QueryClientProvider, QueryClient} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import {DebugObserver} from "@/app/debug";

(async () => {
    const {worker} = await import('@/mock/worker');
    return worker.start();
})();

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 2,
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
            <App/>
        </QueryClientProvider>
    </RecoilRoot>,

    // <React.StrictMode>
    //   <App />
    // </React.StrictMode>,
);

reportWebVitals();
