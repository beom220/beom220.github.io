import { setupWorker, SetupWorkerApi } from 'msw';
import { handlers } from "@/mock/handler";

export const worker: SetupWorkerApi = setupWorker(...handlers);