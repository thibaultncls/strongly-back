import type { Context } from "hono";
import type { SyncWorkoutTemplate } from "../types/sync-workout-template.js";

export async function getClientWorkoutTemplates(c: Context) {
  const userId = c.get("user").id;
  const clientTemplates: SyncWorkoutTemplate = await c.req.json();

  console.log(`Received workout templates for user ${userId}:`, clientTemplates);
  return c.json({
    message: "Workout templates received successfully",
    templates: clientTemplates,
  });
}
