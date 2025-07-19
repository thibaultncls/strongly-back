import type { Context } from "hono";
import type { SyncWorkoutTemplate } from "../types/sync-workout-template.type.js";
import { InvalidArgumentsError } from "@shared/errors/InvalidArgumentsError.js";
import { RequestError } from "@hono/node-server";

export async function getClientWorkoutTemplates(c: Context) {
  const userId = c.get("user").id;
  const clientTemplates: SyncWorkoutTemplate = await c.req.json();

  console.log(`Received workout templates for user ${userId}:`, clientTemplates);
  return c.json({
    message: "Workout templates received successfully",
    templates: clientTemplates,
  });
}

export async function getWorkoutTemplates(c: Context) {
  const userId = c.get("user").id;
  const { lastSync } = await c.req.json();

  try {
    const templates: SyncWorkoutTemplate[] = await c.get("syncRepository").getWorkoutTemplates(userId, lastSync);
    return c.json({ templates: templates });
  } catch (error: any) {
    if (error instanceof InvalidArgumentsError) {
      return c.json({ error: error.message }, 400);
    }
    if (error instanceof RequestError) {
      return c.json({ error: error.message }, 500);
    }
    console.error("Error fetching workout templates:", error);
    return c.json({ error: "Failed to fetch workout templates" }, 500);
  }
}
