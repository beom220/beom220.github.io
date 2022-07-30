import { setupWorker } from "msw";
import { handlers } from "@/mock/handler";

export const worker = setupWorker(...handlers);
