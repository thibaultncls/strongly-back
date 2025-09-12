import { zValidator } from "@hono/zod-validator";
import type z from "zod";

export function validate(object: z.ZodObject) {
  return zValidator("json", object, (result, c) => {
    if (!result.success) {
      console.error("Validation error:", result.error);
      return c.json({ error: result.error.issues[0].message }, 400);
    }
  });
}
