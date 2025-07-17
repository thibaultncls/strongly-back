import type { Context } from "hono";

export async function getClientWorkoutTemplates(c: Context) {
  const userId = c.get("user").id;
  const { clientTemplates } = await c.req.json();

  console.log(`Received workout templates for user ${userId}:`, clientTemplates);
}
