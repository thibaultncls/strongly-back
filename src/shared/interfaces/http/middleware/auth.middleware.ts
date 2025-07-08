import type { Context } from "hono";
import { createMiddleware } from "hono/factory";

export const authMiddleware = createMiddleware(async (c: Context, next: Function) => {});
