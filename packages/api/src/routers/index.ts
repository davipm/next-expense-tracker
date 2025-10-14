import { publicProcedure } from "../index";
import type { RouterClient } from "@orpc/server";
import { todoRouter } from "./todo";
import {transactionRouter} from "./transaction";

export const appRouter = {
	healthCheck: publicProcedure.handler(() => {
		return "OK";
	}),
	todo: todoRouter,
  transaction: transactionRouter,
};
export type AppRouter = typeof appRouter;
export type AppRouterClient = RouterClient<typeof appRouter>;
