import "dotenv/config";
import { OpenAPIHandler } from "@orpc/openapi/node";
import { OpenAPIReferencePlugin } from "@orpc/openapi/plugins";
import { ZodToJsonSchemaConverter } from "@orpc/zod/zod4";
import { RPCHandler } from "@orpc/server/node";
import { onError } from "@orpc/server";
import { appRouter } from "@react-node-expense-tracker/api/routers/index";
import cors from "cors";
import express from "express";

const app = express();

app.use(
	cors({
		origin: process.env.CORS_ORIGIN || "",
		methods: ["GET", "POST", "OPTIONS"],
	}),
);

const rpcHandler = new RPCHandler(appRouter, {
	interceptors: [
		onError((error) => {
			console.error(error);
		}),
	],
});
const apiHandler = new OpenAPIHandler(appRouter, {
	plugins: [
		new OpenAPIReferencePlugin({
			schemaConverters: [new ZodToJsonSchemaConverter()],
		}),
	],
	interceptors: [
		onError((error) => {
			console.error(error);
		}),
	],
});

app.use(async (req, res, next) => {
	const rpcResult = await rpcHandler.handle(req, res, {
		prefix: "/rpc",
		context: {},
	});
	if (rpcResult.matched) return;

	const apiResult = await apiHandler.handle(req, res, {
		prefix: "/api-reference",
		context: {},
	});
	if (apiResult.matched) return;

	next();
});

app.use(express.json());

app.get("/", (_req, res) => {
	res.status(200).send("OK");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
